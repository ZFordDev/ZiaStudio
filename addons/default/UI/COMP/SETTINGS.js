// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

export const ui = {
  id: "default-settings",
  slot: "settings",

  render(container, { settings }) {
    container.innerHTML = `
      <div class="settings-container">
        <h2>Settings</h2>

        <label>Theme</label>
        <select id="theme-select">
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>

        <button id="save-btn">Save</button>
      </div>
    `;

    const themeSelect = container.querySelector("#theme-select");
    themeSelect.value = settings.theme;

    container.querySelector("#save-btn").addEventListener("click", async () => {
      await window.zia.saveConfig("default-settings", {
        theme: themeSelect.value
      });

      alert("Settings saved");
    });
  }
};