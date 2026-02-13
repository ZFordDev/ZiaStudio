// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("zia", {
  // Providers
  listProviders: () => ipcRenderer.invoke("providers:list"),
  listModels: (providerId: string) =>
    ipcRenderer.invoke("providers:listModels", providerId),
  generate: (providerId: string, payload: any) =>
    ipcRenderer.invoke("providers:generate", providerId, payload),

  // Config
  loadConfig: (id: string) =>
    ipcRenderer.invoke("config:load", id),
  saveConfig: (id: string, data: any) =>
    ipcRenderer.invoke("config:save", id, data),

  // System
  getVersion: () => ipcRenderer.invoke("system:getVersion")
});