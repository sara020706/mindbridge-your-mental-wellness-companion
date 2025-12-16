# 🧠 MindBridge - Your Mental Wellness Companion

<div align="center">

![MindBridge Banner](https://img.shields.io/badge/MindBridge-Mental%20Wellness-8B5CF6?style=for-the-badge)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.19-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

**A comprehensive mental wellness platform powered by AI, designed to support your emotional well-being 24/7**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [AI Integration](#-ai-integration) • [Project Structure](#-project-structure) • [Deployment](#-deployment)

</div>

---

## 📋 Overview

MindBridge is a modern mental wellness application that combines AI-powered emotional support with practical mental health tools. Built with a calm obsidian color palette, the app provides a soothing environment for users to track their mood, practice meditation, journal their thoughts, and engage with an empathetic AI assistant.

### 🎯 Key Highlights

- **24/7 AI Support**: Powered by Google Gemini 2.5 Flash for compassionate, real-time conversations
- **Mood Tracking**: Visual analytics to understand your emotional patterns
- **Guided Meditation**: Curated breathing exercises and meditation sessions
- **Digital Journal**: AI-assisted journaling with personalized prompts
- **Goal Setting**: Track and achieve your mental wellness objectives
- **Community Support**: Connect with others on their wellness journey
- **Analytics Dashboard**: Comprehensive insights into your mental health journey

---

## ✨ Features

### 🤖 AI Wellness Assistant
- Real-time streaming chat powered by Google Gemini 2.5 Flash
- Empathetic responses with emotional validation
- Crisis detection and professional help referrals (988 Lifeline)
- Therapeutic techniques: CBT, mindfulness, breathing exercises
- Conversation history and context awareness
- Quick prompt suggestions for easy engagement

### 📊 Dashboard & Analytics
- Interactive mood charts and visualizations
- Weekly activity tracking
- Meditation streak monitoring
- Journal entry statistics
- Personalized wellness insights
- Goal progress tracking

### 🧘 Meditation & Mindfulness
- Guided meditation sessions (5-20 minutes)
- Real-time breathing exercises (4-7-8 technique)
- Categories: Sleep, Stress Relief, Focus, Calming
- Visual breathing animation with phase indicators
- Timer and progress tracking

### 📝 AI-Assisted Journal
- Smart writing prompts powered by AI
- Grammar and writing suggestions
- Daily reflection prompts
- Draft saving functionality
- Calendar-based entry organization
- Emotional journey tracking

### 🎯 Goals & Progress
- Set and track mental wellness goals
- Progress visualization
- Milestone celebrations
- Habit building support
- Customizable goal categories

### 📈 Mood Tracker
- Daily mood logging with emoji indicators
- Activity correlation tracking
- Mood pattern analysis
- Export and sharing capabilities
- Historical trend visualization

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3.1 with TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19 for lightning-fast development
- **Styling**: 
  - Tailwind CSS 3.4.17 (Calm Obsidian theme)
  - shadcn/ui component library
  - Radix UI primitives
- **Routing**: React Router DOM 6.30.1
- **State Management**: React hooks + TanStack Query 5.83.0
- **Forms**: React Hook Form 7.61.1 + Zod validation
- **Icons**: Lucide React 0.462.0
- **Charts**: Recharts 2.15.4
- **Notifications**: Sonner 1.7.4

### Backend & AI
- **Backend**: Supabase (Edge Functions)
- **AI Model**: Google Gemini 2.5 Flash
- **AI Gateway**: Lovable AI Gateway
- **Database**: Supabase PostgreSQL
- **Authentication**: Supabase Auth

### Development Tools
- **Linting**: ESLint 9.32.0 with TypeScript support
- **Package Manager**: npm/bun
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **bun** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sara020706/mindbridge-your-mental-wellness-companion.git
cd mindbridge-your-mental-wellness-companion
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

4. **Configure Supabase Edge Function**

In your Supabase project settings, add:
```env
LOVABLE_API_KEY=your_lovable_api_key
```

5. **Start the development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🤖 AI Integration

### Architecture

MindBridge uses a sophisticated AI architecture:

```
User Input → React Frontend → Supabase Edge Function → Lovable AI Gateway → Google Gemini 2.5 Flash
```

### AI Features

**Model**: Google Gemini 2.5 Flash
- Fast response times (<2 seconds)
- Streaming responses for real-time interaction
- Context-aware conversations

**System Prompt**: "MindBridge" personality
- Empathy-first communication style
- Evidence-based therapeutic techniques
- Safety protocols for crisis situations
- Non-judgmental and validating responses

**Capabilities**:
- Mood tracking support and emotional check-ins
- Guided breathing and grounding exercises
- Cognitive behavioral therapy (CBT) techniques
- Stress management strategies
- Sleep hygiene recommendations
- Mindfulness and meditation guidance
- Journaling prompts and reflection

### Edge Function Code

Located at: `supabase/functions/mental-health-chat/index.ts`

Key features:
- ✅ CORS-enabled for web access
- ✅ Streaming SSE responses
- ✅ Error handling (rate limits, API failures)
- ✅ Crisis detection and referrals
- ✅ Message history management

---

## 📁 Project Structure

```
mindbridge-your-mental-wellness-companion/
├── public/
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── dashboard/          # Dashboard widgets
│   │   │   ├── MoodChart.tsx
│   │   │   ├── NotificationsCard.tsx
│   │   │   ├── StatsCard.tsx
│   │   │   └── WelcomeCard.tsx
│   │   ├── layout/             # App layout components
│   │   │   ├── AppLayout.tsx
│   │   │   └── AppSidebar.tsx
│   │   ├── ui/                 # shadcn/ui components
│   │   └── NavLink.tsx
│   ├── hooks/
│   │   ├── useAIChat.ts        # AI chat logic
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/
│   │   └── supabase/           # Supabase client & types
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   ├── pages/
│   │   ├── AIAssistant.tsx     # AI chat interface
│   │   ├── Analytics.tsx       # Analytics dashboard
│   │   ├── Community.tsx       # Community features
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── Goals.tsx           # Goal tracking
│   │   ├── Journal.tsx         # AI-assisted journal
│   │   ├── Meditation.tsx      # Meditation & breathing
│   │   ├── MoodTracker.tsx     # Mood logging
│   │   ├── NotFound.tsx        # 404 page
│   │   └── Settings.tsx        # App settings
│   ├── App.tsx                 # Main app component
│   ├── index.css               # Global styles & theme
│   ├── main.tsx                # App entry point
│   └── vite-env.d.ts
├── supabase/
│   ├── functions/
│   │   └── mental-health-chat/ # AI edge function
│   └── config.toml
├── components.json             # shadcn config
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.ts          # Tailwind theme
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🎨 Design System

### Color Palette - Calm Obsidian Theme

The app uses a carefully crafted obsidian color palette for a calming, professional appearance:

```css
/* Light Mode (Default) */
--background: 230 16% 10%;      /* Deep charcoal */
--foreground: 220 8% 94%;       /* Soft off-white */
--primary: 255 24% 64%;         /* Muted indigo */
--secondary: 270 22% 56%;       /* Soft violet */
--accent: 180 18% 60%;          /* Calm teal */
--muted: 230 12% 18%;           /* Subtle surface */
--card: 230 14% 14%;            /* Card background */
--border: 230 12% 20%;          /* Border color */
```

All colors support both light and dark modes for accessibility.

### Typography
- **Sans**: DM Sans (headings, body text)
- **Serif**: Crimson Pro (decorative)
- **Mono**: SF Mono (code)

---

## 🌐 Deployment

### Lovable Platform (Recommended)

1. Visit your [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID)
2. Click **Share → Publish**
3. Your app will be live instantly

### Custom Deployment Options

**Vercel**
```bash
npm run build
vercel --prod
```

**Netlify**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Supabase Hosting**
```bash
npm run build
supabase deploy
```

### Custom Domain

1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow DNS configuration steps

[Read more about custom domains](https://docs.lovable.dev/features/custom-domain#custom-domain)

---

## 🔐 Environment Variables

Required environment variables:

| Variable | Description | Location |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Frontend `.env` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key | Frontend `.env` |
| `LOVABLE_API_KEY` | Lovable AI Gateway key | Supabase Edge Function |

---

## 🧪 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Code Style

- TypeScript strict mode enabled
- ESLint with React & TypeScript rules
- Prettier for code formatting
- Conventional commit messages recommended

---

## 📱 Features Roadmap

- [ ] Mobile app (React Native)
- [ ] Voice interaction with AI
- [ ] Wearable device integration
- [ ] Therapist directory integration
- [ ] Group therapy sessions
- [ ] Advanced analytics with ML insights
- [ ] Multi-language support
- [ ] Offline mode support
- [ ] Social sharing features
- [ ] Gamification & achievements

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

**MindBridge is not a substitute for professional mental health care.** This application provides emotional support and wellness guidance but should not replace therapy or medical treatment. 

**If you're in crisis:**
- 🇺🇸 Call **988** (Suicide & Crisis Lifeline)
- 🌍 Contact your local emergency services
- 💬 Text "HELLO" to 741741 (Crisis Text Line)

---

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Lovable** for the AI gateway and development platform
- **Google** for Gemini AI model
- **Supabase** for backend infrastructure
- **Radix UI** for accessible primitives
- All contributors and mental health advocates

---

## 📞 Support

- **Documentation**: [Lovable Docs](https://docs.lovable.dev)
- **Issues**: [GitHub Issues](https://github.com/sara020706/mindbridge-your-mental-wellness-companion/issues)
- **Project URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

---

<div align="center">

**Built with 💜 for mental wellness**

Made with [Lovable](https://lovable.dev) • [React](https://reactjs.org/) • [TypeScript](https://www.typescriptlang.org/) • [Supabase](https://supabase.com)

</div>
