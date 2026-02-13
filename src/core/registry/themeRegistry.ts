// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

class ThemeRegistry {
  private themes: string[] = [];

  register(cssPath: string) {
    this.themes.push(cssPath);
  }

  getAll(): string[] {
    return this.themes;
  }

  clear() {
    this.themes = [];
  }
}

export const themeRegistry = new ThemeRegistry();