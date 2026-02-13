// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ZiaOutput } from "../api/ZiaOutput";

class OutputRegistry {
  private outputs = new Map<string, ZiaOutput>();

  register(output: ZiaOutput) {
    if (!output.id) {
      throw new Error("[ZIA] Output module missing id");
    }
    this.outputs.set(output.id, output);
  }

  get(id: string): ZiaOutput | undefined {
    return this.outputs.get(id);
  }

  getAll(): ZiaOutput[] {
    return Array.from(this.outputs.values());
  }

  clear() {
    this.outputs.clear();
  }
}

export const outputRegistry = new OutputRegistry();