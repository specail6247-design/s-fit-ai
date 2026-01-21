export type AIModelId = 'claude-3.5' | 'gpt-4o' | 'gemini-pro';
export type AIModelPricing = 'free' | 'premium';

export interface AIModel {
  id: AIModelId;
  name: string;
  provider: string;
  icon: string;
  speed: 'fast' | 'balanced' | 'deep';
  accuracy: number;
  pricing: AIModelPricing;
  description: string;
  capabilities: string[];
}

export const aiModels: AIModel[] = [
  {
    id: 'claude-3.5',
    name: 'Claude 3.5',
    provider: 'Anthropic',
    icon: '🧠',
    speed: 'fast',
    accuracy: 94,
    pricing: 'free',
    description: 'Style analysis and face matching specialist.',
    capabilities: ['Style match', 'Face analysis', 'Color harmony'],
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    icon: '🤖',
    speed: 'balanced',
    accuracy: 91,
    pricing: 'free',
    description: 'Multimodal reasoning with trend insights.',
    capabilities: ['Vision', 'Trend analysis', 'Recommendations'],
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    icon: '💎',
    speed: 'fast',
    accuracy: 89,
    pricing: 'free',
    description: 'Fast visual scoring with strong color sense.',
    capabilities: ['Fast scoring', 'Color sense', 'Smart sizing'],
  },
];

export const getAIModelById = (id: AIModelId) =>
  aiModels.find((model) => model.id === id);
