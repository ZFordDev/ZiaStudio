// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import fs from "fs";
import path from "path";
import { ZiaManifest, ZiaResolvedEntrypoint } from "../api/ZiaManifest";
import { providerRegistry } from "../registry/providerRegistry";
import { uiRegistry } from "../registry/uiRegistry";
import { themeRegistry } from "../registry/themeRegistry";
import { outputRegistry } from "../registry/outputRegistry";
import { configRegistry } from "../registry/configRegistry";
import { loadEnv } from "./envLoader";

export interface LoadedAddon {
  id: string;
  manifest: ZiaManifest;
  entrypoints: ZiaResolvedEntrypoint[];
}

export async function loadAddons(): Promise<LoadedAddon[]> {
  const env = loadEnv();
  const addonDir = env.ZIA_ADDON_PATH;

  if (!fs.existsSync(addonDir)) {
    console.warn(`[ZIA] Addon directory not found: ${addonDir}`);
    return [];
  }

  const addons: LoadedAddon[] = [];

  const folders = fs.readdirSync(addonDir);

  for (const folder of folders) {
    const addonPath = path.join(addonDir, folder);
    const manifestPath = path.join(addonPath, "main.json");

    if (!fs.existsSync(manifestPath)) {
      console.warn(`[ZIA] Skipping addon '${folder}' — no main.json`);
      continue;
    }

    const manifest: ZiaManifest = JSON.parse(
      fs.readFileSync(manifestPath, "utf8")
    );

    const resolved = resolveEntrypoints(addonPath, manifest);

    // Register entrypoints
    await registerEntrypoints(resolved);

    addons.push({
      id: manifest.id,
      manifest,
      entrypoints: resolved
    });

    console.log(`[ZIA] Loaded addon: ${manifest.id}`);
  }

  return addons;
}

function resolveEntrypoints(
  addonPath: string,
  manifest: ZiaManifest
): ZiaResolvedEntrypoint[] {
  const resolved: ZiaResolvedEntrypoint[] = [];

  const add = (relativePath: string, type: ZiaResolvedEntrypoint["type"]) => {
    const absolutePath = path.join(addonPath, relativePath);
    resolved.push({ absolutePath, relativePath, type });
  };

  // Providers
  manifest.entrypoints.providers?.forEach(p =>
    add(p, "provider")
  );

  // Outputs
  manifest.entrypoints.outputs?.forEach(o =>
    add(o, "output")
  );

  // UI
  const ui = manifest.entrypoints.ui;
  if (ui) {
    if (ui.chat) add(ui.chat, "ui");
    if (ui.settings) add(ui.settings, "ui");
    if (ui.sidebarLeft) add(ui.sidebarLeft, "ui");
    if (ui.sidebarRight) add(ui.sidebarRight, "ui");
    if (ui.footer) add(ui.footer, "ui");
  }

  // Themes
  manifest.entrypoints.themes?.forEach(t =>
    add(t, "theme")
  );

  // Config
  manifest.entrypoints.config?.forEach(c =>
    add(c, "config")
  );

  return resolved;
}

async function registerEntrypoints(entrypoints: ZiaResolvedEntrypoint[]) {
  for (const ep of entrypoints) {
    switch (ep.type) {
      case "provider": {
        const mod = await import(ep.absolutePath);
        providerRegistry.register(mod.provider);
        break;
      }

      case "ui": {
        const mod = await import(ep.absolutePath);
        uiRegistry.register(mod.ui);
        break;
      }

      case "theme": {
        themeRegistry.register(ep.relativePath);
        break;
      }

      case "output": {
        const mod = await import(ep.absolutePath);
        outputRegistry.register(mod.output);
        break;
      }

      case "config": {
        const mod = await import(ep.absolutePath);
        configRegistry.register(mod.config);
        break;
      }
    }
  }
}