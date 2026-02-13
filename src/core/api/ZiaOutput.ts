// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// src/core/api/ZiaOutput.ts

export interface ZiaOutput {
  id: string;
  name: string;
  description?: string;

  send(message: ZiaOutputMessage): Promise<void>;
}

export interface ZiaOutputMessage {
  text: string;
  metadata?: any;
}