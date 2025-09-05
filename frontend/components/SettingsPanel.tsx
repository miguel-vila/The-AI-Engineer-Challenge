import { Settings } from '../types/chat'

interface SettingsPanelProps {
  settings: Settings
  onSettingsChange: (settings: Settings) => void
  onClearMessages: () => void
}

export default function SettingsPanel({ settings, onSettingsChange, onClearMessages }: SettingsPanelProps) {
  const handleInputChange = (field: keyof Settings, value: string) => {
    onSettingsChange({
      ...settings,
      [field]: value
    })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
        
        {/* API Key Input */}
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI API Key *
          </label>
          <input
            type="password"
            id="apiKey"
            value={settings.apiKey}
            onChange={(e) => handleInputChange('apiKey', e.target.value)}
            placeholder="sk-..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>

        {/* Model Selection */}
        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <select
            id="model"
            value={settings.model}
            onChange={(e) => handleInputChange('model', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="gpt-4.1-mini">GPT-4.1 Mini</option>
            <option value="gpt-4">GPT-4</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>

        {/* Developer Message */}
        <div className="mb-6">
          <label htmlFor="developerMessage" className="block text-sm font-medium text-gray-700 mb-2">
            System Message
          </label>
          <textarea
            id="developerMessage"
            value={settings.developerMessage}
            onChange={(e) => handleInputChange('developerMessage', e.target.value)}
            placeholder="Enter the system message that defines the AI's behavior..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">
            This message sets the context and behavior for the AI assistant.
          </p>
        </div>

        {/* Clear Messages Button */}
        <button
          onClick={onClearMessages}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Clear Chat History
        </button>
      </div>

      {/* API Status */}
      <div className="pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">API Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Connected to API</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          API URL: {process.env.API_URL || '/api'}
        </p>
      </div>
    </div>
  )
}
