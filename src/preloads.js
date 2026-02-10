const { contextBridge, ipcRenderer } = require('electron');

// Version API
contextBridge.exposeInMainWorld('electronAPI', {
  getVersion: () => ipcRenderer.invoke('get-version')
});

// Updater API
contextBridge.exposeInMainWorld("updater", {
  check: () => ipcRenderer.invoke("update:check"),
  download: () => ipcRenderer.invoke("update:download"),
  install: () => ipcRenderer.invoke("update:install"),

  onAvailable: (cb) => ipcRenderer.on("update:available", (_, info) => cb(info)),
  onNone: (cb) => ipcRenderer.on("update:none", () => cb()),
  onProgress: (cb) => ipcRenderer.on("update:progress", (_, p) => cb(p)),
  onReady: (cb) => ipcRenderer.on("update:ready", (_, info) => cb(info)),
  onError: (cb) => ipcRenderer.on("update:error", (_, err) => cb(err)),
});