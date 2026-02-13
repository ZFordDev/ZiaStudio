// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

export const provider = {
  id: "ollama",
  name: "Ollama (Local)",
  supportsChat: true,

  async listModels() {
    return [
      { id: "llama2", name: "LLaMA 2" },
      { id: "mistral", name: "Mistral 7B" }
    ];
  },

  async generate({ model, messages }) {
    return {
      text: `[Ollama:${model}] → ${messages[messages.length - 1].content}`
    };
  }
};