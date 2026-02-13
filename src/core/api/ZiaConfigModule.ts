// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// src/core/api/ZiaConfigModule.ts

export interface ZiaConfigModule {
  id: string;
  description?: string;

  load(): Promise<any>;               // load config
  save(data: any): Promise<void>;     // save config

  migrate?(fromVersion: string): Promise<void>; // optional migrations
}