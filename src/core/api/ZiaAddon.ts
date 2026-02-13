// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// src/core/api/ZiaAddon.ts

import { ZiaProvider } from "./ZiaProvider";
import { ZiaUIComponent } from "./ZiaUIComponent";
import { ZiaOutput } from "./ZiaOutput";
import { ZiaConfigModule } from "./ZiaConfigModule";

export interface ZiaAddon {
  id: string;                     // must match manifest.id
  version: string;                // semver
  manifest: any;                  // raw manifest JSON (optional convenience)

  providers?: ZiaProvider[];
  ui?: ZiaUIComponent[];
  outputs?: ZiaOutput[];
  config?: ZiaConfigModule[];
  themes?: string[];              // CSS file paths
}