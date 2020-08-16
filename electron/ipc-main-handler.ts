import { ipcMain } from "electron";
import * as Store from "electron-store";
import { promisify } from "util";
import * as path from "path";
import * as spawn from "cross-spawn";
import * as glob from "glob";
import * as uuid from "uuid";
import { GameInfo, RootDirectoryInfo } from "../@types/save";

const shortenPath = (filePath: string): string => {
  const tips = filePath.split("/");
  if (tips.length <= 3) return filePath;
  return tips.slice(tips.length - 3).join(path.sep);
};

const globAsync = promisify(glob);

const store = new Store<{
  games: Record<string, GameInfo>;
  rootDirectories: RootDirectoryInfo[];
}>();

const loadGamesRaw = (): Record<string, GameInfo> => {
  return store.get("games", {});
};

const saveGames = (games: Record<string, GameInfo>): void => {
  store.set("games", games);
};

/**
 * Load games and execute game.
 * @param gameId Game id.
 */
const playGame = (gameId: string): void => {
  const games = loadGamesRaw();

  const eGames = Object.entries(games).filter(([_, g]) => g.id === gameId);
  if (eGames.length !== 1) return;
  const gameAbsPath = eGames[0][0];

  spawn(gameAbsPath, [], { cwd: path.dirname(gameAbsPath) });
};

/**
 * Load root directories.
 */
const loadRootDirs = (): RootDirectoryInfo[] => {
  return store.get("rootDirectories", []);
};

/**
 * Load games.
 */
const loadGames = (): GameInfo[] => {
  const games = loadGamesRaw();
  return Object.entries(games).map(([path, game]) => game);
};

const createDefaultGame = (name: string): GameInfo => {
  return {
    id: uuid.v4(),
    name,
    isFavorite: false,
    tags: [],
    hide: false,
  };
};

/**
 * Scan games from root directories and save them.
 */
const scanGames = async (): Promise<GameInfo[]> => {
  const roots = loadRootDirs();
  const games = new Map(Object.entries(loadGamesRaw()));

  // scan games
  // NOTE: glob nocase option is not available in my env
  const scanning = roots.map((r) =>
    globAsync(path.join(r.absPath, "**/*.{exe,EXE}"))
  );
  const scanned = await Promise.all(scanning);
  const gamePaths = new Set(scanned.flat());

  // remove non-existing games
  for (const [gamePath] of games) {
    if (gamePaths.has(gamePath)) continue;
    games.delete(gamePath);
  }

  // add existing games
  for (const gamePath of gamePaths) {
    if (games.has(gamePath)) continue;
    games.set(gamePath, createDefaultGame(shortenPath(gamePath)));
  }

  saveGames(Object.fromEntries(games));
  return Array.from(games.entries()).map(([path, game]) => game);
};

const saveRootDirs = (roots: RootDirectoryInfo[]): void => {
  store.set("rootDirectories", roots);
};

const updateGames = (updatingGames: GameInfo[]): GameInfo[] => {
  const games = new Map(Object.entries(loadGamesRaw()));
  const updating = new Map(updatingGames.map((g) => [g.id, g]));

  // update games
  for (const [path, game] of games) {
    if (!updating.has(game.id)) continue;
    const newGame = updating.get(game.id)!;
    games.set(path, {
      ...newGame,
      id: game.id,
    });
  }

  saveGames(Object.fromEntries(games));
  return Array.from(games.entries()).map(([path, game]) => game);
};

export const initIpcMain = (): void => {
  ipcMain.handle("execute-game", (event, filePath: string): void => {
    const dirPath = path.dirname(filePath);
    spawn(filePath, [], { cwd: dirPath });
  });
  ipcMain.handle("play-game", (event, gameId: string): void =>
    playGame(gameId)
  );
  ipcMain.handle("load-root-directories", (): RootDirectoryInfo[] =>
    loadRootDirs()
  );
  ipcMain.handle("load-games", (): GameInfo[] => loadGames());
  ipcMain.handle("scan-games", async (): Promise<GameInfo[]> => scanGames());
  ipcMain.handle(
    "save-root-directories",
    (event, roots: RootDirectoryInfo[]): void => saveRootDirs(roots)
  );
  ipcMain.handle("update-game", (event, games: GameInfo[]): GameInfo[] =>
    updateGames(games)
  );
};
