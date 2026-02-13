// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ipcMain } from "electron";
import pkg from "../../../package.json";

ipcMain.handle("system:getVersion", () => {
  return {
    version: pkg.version,
    apiVersion: 1
  };
});