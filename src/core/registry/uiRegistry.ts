// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ZiaUIComponent } from "../api/ZiaUIComponent";

class UIRegistry {
  private components = new Map<string, ZiaUIComponent>();

  register(component: ZiaUIComponent) {
    if (!component.id) {
      throw new Error("[ZIA] UI component missing id");
    }
    this.components.set(component.id, component);
  }

  get(id: string): ZiaUIComponent | undefined {
    return this.components.get(id);
  }

  getAll(): ZiaUIComponent[] {
    return Array.from(this.components.values());
  }

  clear() {
    this.components.clear();
  }
}

export const uiRegistry = new UIRegistry();