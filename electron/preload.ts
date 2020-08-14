import { ipcRenderer, contextBridge } from "electron";
import { GameInfo, RootDirectoryInfo } from "../@types/save";

contextBridge.exposeInMainWorld("myAPI", {
  executeGame: (path: string) => ipcRenderer.invoke("execute-game", path),
  playGame: (gameId: string) => ipcRenderer.invoke("play-game", gameId),
  loadRootDirectories: () => ipcRenderer.invoke("load-root-directories"),
  loadGames: () => ipcRenderer.invoke("load-game"),
  scanGames: () => ipcRenderer.invoke("scan-games"),
  saveRootDirectories: (roots: RootDirectoryInfo[]) =>
    ipcRenderer.invoke("save-root-directories", roots),
  updateGames: (games: GameInfo[]) => ipcRenderer.invoke("update-game", games),
});
