export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface Settings {
  apiKey: string
  model: string
  developerMessage: string
}
