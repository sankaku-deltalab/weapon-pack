import { RootDirectoryInfo, GameInfo } from "./save";

declare global {
  interface Window {
    myAPI: Sandbox;
  }
}

export interface Sandbox {
  /**
   * Load games and execute game.
   * @param gameId Game id.
   */
  playGame: (gameId: string) => Promise<void>;
  /**
   * Load root directories.
   */
  loadRootDirectories: () => Promise<RootDirectoryInfo[]>;
  /**
   * Load games.
   */
  loadGames: () => Promise<GameInfo[]>;
  /**
   * Scan games from root directories and save them.
   */
  scanGames: () => Promise<GameInfo[]>;
  /**
   * Save root directories.
   * @param roots Root directory infos.
   */
  saveRootDirectories: (roots: RootDirectoryInfo[]) => Promise<void>;
  /**
   * Update existing games info.
   * @param games Updating games.
   */
  updateGames: (games: GameInfo[]) => Promise<GameInfo[]>;
}
