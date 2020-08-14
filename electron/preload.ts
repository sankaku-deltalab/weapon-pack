import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  readDir: () => ipcRenderer.invoke("read-dir"),
  save: (str: string) => ipcRenderer.invoke("save", str),
  executeGame: (path: string) => ipcRenderer.invoke("execute-game", path),
});
