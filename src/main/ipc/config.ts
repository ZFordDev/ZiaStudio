// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ipcMain } from "electron";
import { configRegistry } from "../../core/registry/configRegistry";

ipcMain.handle("config:load", async (_, id) => {
  const mod = configRegistry.get(id);
  if (!mod) return null;

  return await mod.load();
});

ipcMain.handle("config:save", async (_, id, data) => {
  const mod = configRegistry.get(id);
  if (!mod) return false;

  await mod.save(data);
  return true;
});