// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ZiaProvider } from "../api/ZiaProvider";

class ProviderRegistry {
  private providers = new Map<string, ZiaProvider>();

  register(provider: ZiaProvider) {
    if (!provider.id) {
      throw new Error("[ZIA] Provider missing id");
    }
    this.providers.set(provider.id, provider);
  }

  get(id: string): ZiaProvider | undefined {
    return this.providers.get(id);
  }

  getAll(): ZiaProvider[] {
    return Array.from(this.providers.values());
  }

  clear() {
    this.providers.clear();
  }
}

export const providerRegistry = new ProviderRegistry();