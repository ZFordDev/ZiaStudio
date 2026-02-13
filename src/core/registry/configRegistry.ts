// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ZiaConfigModule } from "../api/ZiaConfigModule";

class ConfigRegistry {
  private configs = new Map<string, ZiaConfigModule>();

  register(config: ZiaConfigModule) {
    if (!config.id) {
      throw new Error("[ZIA] Config module missing id");
    }
    this.configs.set(config.id, config);
  }

  get(id: string): ZiaConfigModule | undefined {
    return this.configs.get(id);
  }

  getAll(): ZiaConfigModule[] {
    return Array.from(this.configs.values());
  }

  clear() {
    this.configs.clear();
  }
}

export const configRegistry = new ConfigRegistry();