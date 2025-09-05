import { useState } from 'react'
import ChatInterface from '../components/ChatInterface'
import SettingsPanel from '../components/SettingsPanel'
import { ChatMessage, Settings } from '../types/chat'

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [settings, setSettings] = useState<Settings>({
    apiKey: '',
    model: 'gpt-4.1-mini',
    developerMessage: 'You are a helpful AI assistant.'
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (userMessage: string) => {
    if (!settings.apiKey.trim()) {
      alert('Please enter your OpenAI API key in the settings panel.')
      return
    }

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newMessage])
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.API_URL || 'http://localhost:8000'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: settings.developerMessage,
          user_message: userMessage,
          model: settings.model,
          api_key: settings.apiKey
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone

        if (value) {
          const chunk = decoder.decode(value)
          setMessages(prev => 
            prev.map(msg => 
              msg.id === assistantMessage.id 
                ? { ...msg, content: msg.content + chunk }
                : msg
            )
          )
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearMessages = () => {
    setMessages([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">OpenAI Chat Interface</h1>
            <p className="text-gray-600 mt-1">Chat with AI using your OpenAI API key</p>
          </div>
          
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/4 border-r border-gray-200">
              <SettingsPanel 
                settings={settings} 
                onSettingsChange={setSettings}
                onClearMessages={handleClearMessages}
              />
            </div>
            
            <div className="lg:w-3/4">
              <ChatInterface 
                messages={messages}
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
