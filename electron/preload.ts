import { ipcRenderer, contextBridge } from "electron";
import { GameInfo, RootDirectoryInfo } from "../@types/save";

contextBridge.exposeInMainWorld("myAPI", {
  playGame: (gameId: string) => ipcRenderer.invoke("play-game", gameId),
  openGameDirectory: (gameId: string) =>
    ipcRenderer.invoke("open-game-directory", gameId),
  loadRootDirectories: () => ipcRenderer.invoke("load-root-directories"),
  loadGames: () => ipcRenderer.invoke("load-games"),
  scanGames: () => ipcRenderer.invoke("scan-games"),
  saveRootDirectories: (roots: RootDirectoryInfo[]) =>
    ipcRenderer.invoke("save-root-directories", roots),
  updateGames: (games: GameInfo[]) => ipcRenderer.invoke("update-game", games),
});
