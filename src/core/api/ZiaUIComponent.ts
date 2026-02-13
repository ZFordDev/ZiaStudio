// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// src/core/api/ZiaUIComponent.ts

export interface ZiaUIComponent {
  id: string;
  slot: ZiaUISlot;
  render(container: HTMLElement, initialData?: any): void;
  destroy?(): void;
}

export type ZiaUISlot =
  | "chat"
  | "settings"
  | "sidebarLeft"
  | "sidebarRight"
  | "footer";