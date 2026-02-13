// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import { ZiaUIComponent } from "../../core/api/ZiaUIComponent";

type LayoutSlots = {
  chat: HTMLElement | null;
  settings: HTMLElement | null;
  sidebarLeft: HTMLElement | null;
  sidebarRight: HTMLElement | null;
  footer: HTMLElement | null;
};

interface Layout {
  slots: LayoutSlots;
  mount(
    slot: keyof LayoutSlots,
    component: ZiaUIComponent & { initialData?: any }
  ): void;
}

export const layout: Layout = {
  slots: {
    chat: document.getElementById("layout-main"),
    settings: document.getElementById("layout-main"),
    sidebarLeft: document.getElementById("layout-left"),
    sidebarRight: document.getElementById("layout-right"),
    footer: document.getElementById("layout-bottom")
  },

  mount(slot, component) {
    const container = this.slots[slot];
    if (!container) return;

    container.innerHTML = "";
    component.render(container, component.initialData);
  }
};