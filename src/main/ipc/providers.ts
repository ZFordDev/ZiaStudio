// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ipcMain } from "electron";
import { providerRegistry } from "../../core/registry/providerRegistry";

ipcMain.handle("providers:list", () => {
  return providerRegistry.getAll().map(p => ({
    id: p.id,
    name: p.name,
    supportsChat: p.supportsChat
  }));
});

ipcMain.handle("providers:listModels", async (_, providerId) => {
  const provider = providerRegistry.get(providerId);
  if (!provider) return [];

  return await provider.listModels();
});

ipcMain.handle("providers:generate", async (_, providerId, payload) => {
  const provider = providerRegistry.get(providerId);
  if (!provider || !provider.generate) return null;

  return await provider.generate(payload);
});