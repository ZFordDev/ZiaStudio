// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import * as fs from "fs";
import * as path from "path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { ZiaManifest, ZiaResolvedEntrypoint } from "../../core/api/ZiaManifest";

export interface ZiaBuilderResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  manifest: ZiaManifest | null;
  entrypoints: ZiaResolvedEntrypoint[];
}

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// -------------------------------
// Manifest Schema
// -------------------------------
const manifestSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    version: { type: "string" },
    author: { type: ["string", "object"] },
    apiVersion: { type: "number" },
    entrypoints: {
      type: "object",
      properties: {
        providers: { type: "array", items: { type: "string" } },
        outputs: { type: "array", items: { type: "string" } },
        themes: { type: "array", items: { type: "string" } },
        config: { type: "array", items: { type: "string" } },
        ui: {
          type: "object",
          properties: {
            chat: { type: ["string", "null"] },
            settings: { type: ["string", "null"] },
            sidebarLeft: { type: ["string", "null"] },
            sidebarRight: { type: ["string", "null"] },
            footer: { type: ["string", "null"] }
          },
          additionalProperties: false
        }
      },
      required: ["providers", "ui"]
    },
    permissions: { type: "object" },
    marketplace: { type: "object" }
  },
  required: ["id", "name", "version", "author", "apiVersion", "entrypoints"],
  additionalProperties: false
};

const validateManifest = ajv.compile(manifestSchema);

// -------------------------------
// Helpers
// -------------------------------
function fileExists(p: string) {
  return fs.existsSync(p) && fs.lstatSync(p).isFile();
}

// -------------------------------
// Entrypoint Validation
// -------------------------------
function resolveEntrypoints(base: string, manifest: ZiaManifest): ZiaResolvedEntrypoint[] {
  const resolved: ZiaResolvedEntrypoint[] = [];

  const add = (rel: string, type: ZiaResolvedEntrypoint["type"]) => {
    resolved.push({
      relativePath: rel,
      absolutePath: path.join(base, rel),
      type
    });
  };

  manifest.entrypoints.providers?.forEach(p => add(p, "provider"));
  manifest.entrypoints.outputs?.forEach(o => add(o, "output"));
  manifest.entrypoints.themes?.forEach(t => add(t, "theme"));
  manifest.entrypoints.config?.forEach(c => add(c, "config"));

  const ui = manifest.entrypoints.ui;
  if (ui) {
    if (ui.chat) add(ui.chat, "ui");
    if (ui.settings) add(ui.settings, "ui");
    if (ui.sidebarLeft) add(ui.sidebarLeft, "ui");
    if (ui.sidebarRight) add(ui.sidebarRight, "ui");
    if (ui.footer) add(ui.footer, "ui");
  }

  return resolved;
}

// -------------------------------
// API Version Validation
// -------------------------------
function validateAPIVersion(manifest: ZiaManifest) {
  const current = 1;
  const errors: string[] = [];
  const warnings: string[] = [];

  if (manifest.apiVersion < current) {
    errors.push(`❌ Addon requires API ${manifest.apiVersion} but runtime supports ${current}.`);
  } else if (manifest.apiVersion > current) {
    warnings.push(`⚠ Addon targets future API version ${manifest.apiVersion}.`);
  }

  return { errors, warnings };
}

// -------------------------------
// Permissions Validation
// -------------------------------
function validatePermissions(manifest: ZiaManifest) {
  const allowed = ["filesystem", "network", "clipboard"];
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!manifest.permissions) return { errors, warnings };

  for (const [key, val] of Object.entries(manifest.permissions)) {
    if (!allowed.includes(key)) {
      errors.push(`❌ Unknown permission: ${key}`);
    }
    if (typeof val !== "boolean") {
      errors.push(`❌ Permission ${key} must be boolean.`);
    }
    if (key === "filesystem") {
      warnings.push(`⚠ Filesystem permission requested.`);
    }
  }

  return { errors, warnings };
}

// -------------------------------
// Marketplace Validation
// -------------------------------
function validateMarketplace(manifest: ZiaManifest, base: string) {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!manifest.marketplace) return { errors, warnings };

  if (manifest.marketplace.icon) {
    const iconPath = path.join(base, manifest.marketplace.icon);
    if (!fileExists(iconPath)) {
      errors.push(`❌ Marketplace icon not found: ${manifest.marketplace.icon}`);
    }
  }

  return { errors, warnings };
}

// -------------------------------
// Main Validator
// -------------------------------
export function validate(basePath: string): ZiaBuilderResult {
  const manifestPath = path.join(basePath, "main.json");

  if (!fileExists(manifestPath)) {
    return {
      valid: false,
      errors: [`❌ main.json not found in addon root.`],
      warnings: [],
      manifest: null,
      entrypoints: []
    };
  }

  let manifest: ZiaManifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    return {
      valid: false,
      errors: [`❌ Invalid JSON in main.json`],
      warnings: [],
      manifest: null,
      entrypoints: []
    };
  }

  // Schema validation
  if (!validateManifest(manifest)) {
    const errs = validateManifest.errors?.map(e => `❌ ${e.instancePath} ${e.message}`) || [];
    return {
      valid: false,
      errors: errs,
      warnings: [],
      manifest: null,
      entrypoints: []
    };
  }

  // Entrypoints
  const entrypoints = resolveEntrypoints(basePath, manifest);
  const missing = entrypoints.filter(ep => !fileExists(ep.absolutePath));

  const entrypointErrors = missing.map(
    ep => `❌ Entrypoint not found: ${ep.relativePath}`
  );

  // API version
  const api = validateAPIVersion(manifest);

  // Permissions
  const perms = validatePermissions(manifest);

  // Marketplace
  const market = validateMarketplace(manifest, basePath);

  const errors = [...entrypointErrors, ...api.errors, ...perms.errors, ...market.errors];
  const warnings = [...api.warnings, ...perms.warnings, ...market.warnings];

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    manifest,
    entrypoints
  };
}