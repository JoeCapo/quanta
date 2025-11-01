# 🌌 Quanta

> AI-Powered Stock Investment Advice

Quanta is a modern, progressive web application that provides personalized stock investment recommendations based on your budget and investment strategy. Built with React, TypeScript, and powered by AI.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### v1 (Current - MVP)

- 🔐 **User Authentication** - Secure signup/login with Firebase
- 📊 **Live Stock Ticker** - Real-time price updates
- 👀 **Watchlist** - Track up to 10 favorite stocks (free tier)
- 🤖 **AI-Powered Advice** - Get personalized investment recommendations
- 💰 **Budget Planning** - Input monthly investment budget
- 🎯 **Investment Strategies** - Choose from 4 proven strategies
- 📱 **PWA Support** - Install on any device
- 🌙 **Dark Theme** - Beautiful space-inspired UI

### v2 (Planned)

- 📈 Portfolio tracking with interactive charts
- 📉 Performance analytics
- 💎 Pro tier with unlimited features
- 🔔 Price alerts

### v3 (Future)

- 🚀 Advanced AI models
- 👥 Community features
- 💳 Premium tier
- 📱 React Native mobile app

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Stock Data**: Finnhub API
- **AI**: Hugging Face Inference API
- **Charts**: Recharts (v2+)

## 🚀 Quick Start

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/JoeCapo/quanta.git
   cd quanta
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env
   \`\`\`

   Then edit `.env` and add your API keys:
   - Firebase config (from Firebase Console)
   - Finnhub API key (from https://finnhub.io)
   - Hugging Face API key (from https://huggingface.co)

4. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open in browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

\`\`\`
quanta/
├── public/ # Static assets
├── src/
│ ├── components/ # React components
│ │ ├── common/ # Reusable components (Button, Input, etc.)
│ │ ├── layout/ # Layout components (Navbar, Footer, etc.)
│ │ ├── auth/ # Authentication components
│ │ ├── stock/ # Stock-related components
│ │ └── ai/ # AI chat components
│ ├── pages/ # Page components
│ ├── hooks/ # Custom React hooks
│ ├── contexts/ # React contexts (Auth, Theme, etc.)
│ ├── services/ # API services (Firebase, Finnhub, AI)
│ ├── types/ # TypeScript type definitions
│ ├── utils/ # Utility functions & constants
│ ├── styles/ # Global styles
│ └── assets/ # Images, icons, etc.
├── .env.example # Environment variables template
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── vite.config.ts # Vite configuration
\`\`\`

## 🔑 API Keys Setup

### Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Get your config from Project Settings

### Finnhub

1. Sign up at [Finnhub](https://finnhub.io/register)
2. Get your free API key (60 calls/minute)
3. Add to `.env`

### Hugging Face

1. Sign up at [Hugging Face](https://huggingface.co/)
2. Go to Settings > Access Tokens
3. Create a new token
4. Add to `.env`

## 🎨 Design Philosophy

Quanta's design is inspired by:

- **Quantum Physics** - Precision, data-driven approach
- **Space Exploration** - Dark theme with glowing accents
- **Modern Finance** - Clean, professional interface

### Color Scheme

- **Primary**: Indigo/Purple (Quantum glow)
- **Accent**: Cyan/Blue (Electric energy)
- **Success**: Green (Market gains)
- **Error**: Red (Market losses)
- **Background**: Deep space blacks with subtle patterns

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler

## 🧪 Testing (Coming Soon)

- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright

## 📦 Deployment

### Firebase Hosting

\`\`\`bash
npm run build
firebase deploy
\`\`\`

### Vercel

\`\`\`bash
vercel deploy
\`\`\`

## 🤝 Contributing

This is a portfolio project, but contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern fintech applications
- Icons from Lucide React
- Fonts from Google Fonts

## 📧 Contact

Joe Caporiccio - jrcaporiccio@gmail.com

Project Link: [https://github.com/JoeCapo/quanta](https://github.com/JoeCapo/quanta)

---

**Built with 💙 by a science and space enthusiast**
