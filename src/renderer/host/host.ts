// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { uiRegistry, themeRegistry } from "../../core/registry";
import { layout } from "./layout";

async function loadInitialData() {
  const providers = await window.zia.listProviders();
  const settings = await window.zia.loadConfig("default-settings");
  const history = await window.zia.loadConfig("chat-history");

  return { providers, settings, history };
}

function applyThemes() {
  const themes = themeRegistry.getAll();

  themes.forEach(cssPath => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssPath;
    document.head.appendChild(link);
  });
}

async function mountUI(initialData: any) {
  const components = uiRegistry.getAll();

  components.forEach(comp => {
    layout.mount(comp.slot, {
      ...comp,
      initialData
    });
  });
}

window.addEventListener("DOMContentLoaded", async () => {
  applyThemes();

  const initialData = await loadInitialData();

  mountUI(initialData);
});