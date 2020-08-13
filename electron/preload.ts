import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("myAPI", {
  readDir: () => ipcRenderer.invoke("read-dir"),
  save: (str: string) => ipcRenderer.invoke("save", str),
});
