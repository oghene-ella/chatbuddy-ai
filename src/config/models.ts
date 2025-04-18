export interface ModelConfig {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  temperature: number;
}

export const MODELS = {
  PRIMARY: {
    id: 'gpt-4o',
    name: 'Primary Model',
    description: 'Our most advanced model for complex tasks',
    maxTokens: 8192,
    temperature: 0.7,
  },
  SECONDARY: {
    id: 'gpt-3.5-turbo',
    name: 'Secondary Model',
    description: 'Fast and efficient model for general tasks',
    maxTokens: 4096,
    temperature: 0.7,
  },
} as const;

export type ModelKey = keyof typeof MODELS;

export const getModelConfig = (modelKey: ModelKey): ModelConfig => {
  return MODELS[modelKey];
}; 