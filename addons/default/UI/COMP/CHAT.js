// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

export const ui = {
  id: "default-chat",
  slot: "chat",

  render(container, { providers, settings, history }) {
    container.innerHTML = `
      <div class="chat-container">
        <h2>Chat</h2>

        <select id="provider-select"></select>
        <select id="model-select"></select>

        <textarea id="chat-input" placeholder="Say something..."></textarea>
        <button id="send-btn">Send</button>

        <div id="chat-output"></div>
      </div>
    `;

    const providerSelect = container.querySelector("#provider-select");
    const modelSelect = container.querySelector("#model-select");
    const input = container.querySelector("#chat-input");
    const output = container.querySelector("#chat-output");

    // Populate providers
    providers.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.id;
      opt.textContent = p.name;
      providerSelect.appendChild(opt);
    });

    // Load models when provider changes
    providerSelect.addEventListener("change", async () => {
      const providerId = providerSelect.value;
      const models = await window.zia.listModels(providerId);

      modelSelect.innerHTML = "";
      models.forEach(m => {
        const opt = document.createElement("option");
        opt.value = m.id;
        opt.textContent = m.name;
        modelSelect.appendChild(opt);
      });
    });

    // Trigger initial model load
    providerSelect.dispatchEvent(new Event("change"));

    // Send message
    container.querySelector("#send-btn").addEventListener("click", async () => {
      const providerId = providerSelect.value;
      const modelId = modelSelect.value;
      const text = input.value;

      const res = await window.zia.generate(providerId, {
        model: modelId,
        messages: [{ role: "user", content: text }]
      });

      const div = document.createElement("div");
      div.textContent = res.text;
      output.appendChild(div);

      input.value = "";
    });
  }
};