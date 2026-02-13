// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// ZiaStudio Addon Manifest Specification
// --------------------------------------
// This file defines the canonical TypeScript interfaces that every `.zia`
// addon must comply with. The ZIA Builder validates against these types,
// and the runtime trusts them as the source of truth.
//

// --------------------------------------
// Basic Types
// --------------------------------------

export type SemVer = string; // Must follow semver (validated by builder)

export interface ZiaAuthor {
  name: string;
  email?: string;
  url?: string;
}

export interface ZiaMarketplaceMeta {
  tags?: string[];
  icon?: string;        // path inside the .zia package
  homepage?: string;    // external URL
}

// --------------------------------------
// Entrypoints
// --------------------------------------

export interface ZiaUIEntrypoints {
  chat?: string | null;         // UI/COMP/CHAT.js
  settings?: string | null;     // UI/COMP/SETTINGS.js
  sidebarLeft?: string | null;
  sidebarRight?: string | null;
  footer?: string | null;
}

export interface ZiaEntrypoints {
  providers?: string[];         // AI_IN/.../*.js
  outputs?: string[];           // AI_OUT/.../*.js
  ui?: ZiaUIEntrypoints;        // UI components
  themes?: string[];            // UI/THEME/*.css
  config?: string[];            // CONFIG/*.js
}

// --------------------------------------
// Permissions
// --------------------------------------

export interface ZiaPermissions {
  filesystem?: boolean;
  network?: boolean;
  clipboard?: boolean;
  [key: string]: boolean | undefined; // future-proof
}

// --------------------------------------
// Main Manifest Interface
// --------------------------------------

export interface ZiaManifest {
  id: string;                   // unique addon ID
  name: string;                 // human-readable name
  version: SemVer;              // semver
  description?: string;
  author: string | ZiaAuthor;   // simple or detailed
  license?: string;             // addon license (not runtime license)

  apiVersion: number;           // required Zia API version

  entrypoints: ZiaEntrypoints;  // providers, UI, themes, config, outputs

  permissions?: ZiaPermissions; // optional permissions block

  marketplace?: ZiaMarketplaceMeta; // optional metadata for store/index
}

// --------------------------------------
// Internal Types for Builder & Runtime
// --------------------------------------

export interface ZiaResolvedEntrypoint {
  absolutePath: string;         // resolved by builder/runtime
  relativePath: string;         // as declared in manifest
  type: "provider" | "output" | "ui" | "theme" | "config";
}

export interface ZiaValidatedManifest {
  manifest: ZiaManifest;
  entrypoints: ZiaResolvedEntrypoint[];
  errors: string[];             // builder fills this
  warnings: string[];           // builder fills this
}