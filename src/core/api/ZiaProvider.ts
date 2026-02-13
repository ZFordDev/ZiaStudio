// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

// src/core/api/ZiaProvider.ts

export interface ZiaProvider {
  id: string;                       // unique provider ID
  name: string;                     // human-readable
  description?: string;

  // Capabilities
  supportsChat: boolean;
  supportsEmbedding?: boolean;
  supportsVision?: boolean;

  // Model listing
  listModels(): Promise<ZiaModel[]>;

  // Chat generation
  generate?(input: ZiaChatRequest): Promise<ZiaChatResponse>;

  // Embeddings
  embed?(input: ZiaEmbeddingRequest): Promise<ZiaEmbeddingResponse>;

  // Optional settings UI
  settingsSchema?: any;             // JSON schema for settings
}

export interface ZiaModel {
  id: string;
  name: string;
  contextLength?: number;
}

export interface ZiaChatRequest {
  model: string;
  messages: { role: "user" | "assistant" | "system"; content: string }[];
  temperature?: number;
  maxTokens?: number;
}

export interface ZiaChatResponse {
  text: string;
  raw?: any;                        // provider-specific
}

export interface ZiaEmbeddingRequest {
  model: string;
  input: string;
}

export interface ZiaEmbeddingResponse {
  vector: number[];
  raw?: any;
}