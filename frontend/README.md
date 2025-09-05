# OpenAI Chat Frontend

A modern, responsive React/Next.js frontend for the OpenAI Chat API. This application provides a clean interface for chatting with AI models using your OpenAI API key.

## Features

- 🤖 **Real-time Chat Interface**: Stream responses from OpenAI models
- 🔐 **Secure API Key Input**: Password-style input for sensitive information
- ⚙️ **Configurable Settings**: Choose models and customize system messages
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Clean, accessible interface with good contrast
- ⚡ **Fast & Lightweight**: Built with Next.js for optimal performance

## Prerequisites

- Node.js 18+
- npm or yarn
- Running OpenAI Chat API backend (see `/api` folder)

## Setup

1. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Configuration

The frontend automatically detects the environment:
- **Development**: Connects to `http://localhost:8000/api` (local API server)
- **Production**: Connects to `/api` (same domain, Vercel routing)

You can override the API URL by setting the `API_URL` environment variable:

```bash
API_URL=http://your-custom-api-url npm run dev
```

## Usage

1. **Enter your OpenAI API Key** in the settings panel (left sidebar)
2. **Choose a model** (GPT-4.1 Mini, GPT-4, or GPT-3.5 Turbo)
3. **Customize the system message** to define the AI's behavior
4. **Start chatting** by typing in the message input

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This frontend is designed to work with Vercel:

1. **Connect your repository** to Vercel
2. **Deploy** - Vercel will automatically build and deploy both frontend and API
3. **No additional configuration needed** - The frontend will automatically use `/api` for API calls

## Security Notes

- Your API key is stored locally in the browser and never sent to our servers
- The frontend communicates directly with your OpenAI API through the backend
- All sensitive inputs use password-style fields for better security

## Troubleshooting

- **API Connection Issues**: Ensure the backend API is running on the correct port
- **CORS Errors**: Check that the API has CORS enabled for your domain
- **Build Errors**: Make sure all dependencies are installed with `npm install`
