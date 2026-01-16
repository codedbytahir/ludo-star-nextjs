# 🎲 Ludo Star 2.0 - Next.js Edition

A beautiful, modern Ludo board game built with **Next.js 14**, **Framer Motion**, **Tailwind CSS**, and **TypeScript**. Play instantly with no signup required!

![Ludo Star 2.0](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎮 Game Features
- **Anonymous Play** - No signup/signin required, instant play!
- **Auto-generated Usernames** - Cool names like "SwiftKing_7834"
- **4-Player Ludo** - Classic board game rules
- **AI Opponents** - Play against smart AI with 3 difficulty levels
- **Multiple Game Modes**:
  - ⚡ Quick Play (vs AI)
  - 🤖 Offline Mode (vs AI)
  - 👥 Local Play (Pass & Play)
  - 🌐 Online Multiplayer (Coming Soon!)

### 🎨 UI/UX Features
- **Stunning Animations** - Powered by Framer Motion
- **Particle Effects** - Floating particles background
- **Smooth Transitions** - 60 FPS animations
- **Responsive Design** - Works on mobile, tablet, desktop
- **Dark Theme** - Beautiful gradient backgrounds
- **Toast Notifications** - React Hot Toast for feedback
- **Confetti Celebrations** - Winner celebrations with confetti

### 🛠️ Technical Features
- **Next.js 14** - Latest App Router
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Advanced animations
- **Zustand** - State management (ready to use)
- **LocalStorage** - Persistent user data and stats
- **PWA Ready** - Can be installed as app

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn or pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/codedbytahir/ludo-star-nextjs.git
cd ludo-star-nextjs
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
ludo-star-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── MainMenu.tsx         # Main menu screen
│   │   ├── GameBoard.tsx        # Game board component
│   │   ├── Board.tsx            # Ludo board grid
│   │   ├── Dice.tsx             # Dice component
│   │   ├── Token.tsx            # Game token
│   │   ├── PlayerInfo.tsx       # Player cards
│   │   ├── GameOverModal.tsx    # Winner modal
│   │   └── ParticleBackground.tsx
│   ├── lib/
│   │   ├── gameLogic.ts         # Core game logic
│   │   ├── aiLogic.ts           # AI algorithms
│   │   └── userUtils.ts         # User utilities
│   └── types/
│       └── game.ts              # TypeScript types
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies
```

## 🎯 Game Rules

1. **Starting**: Roll a 6 to move tokens out of home base
2. **Movement**: Move tokens clockwise around the board
3. **Capturing**: Land on opponent's token to send it back home
4. **Safe Squares**: Tokens on ⭐ squares can't be captured
5. **Extra Turn**: Rolling a 6 gives you an extra turn
6. **Winning**: First player to get all 4 tokens home wins!

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: { ... },  // Gold color
  accent: {
    green: '#06FFA5',
    red: '#E63946',
    // Add your colors
  }
}
```

### Modify AI Difficulty
Edit `src/lib/aiLogic.ts`:
```typescript
export const getAIDifficulty = () => {
  return 'hard' // easy, medium, hard
}
```

### Add Sound Effects
Install Howler.js (already in package.json):
```typescript
import { Howl } from 'howler'

const diceSound = new Howl({
  src: ['/sounds/dice-roll.mp3']
})
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub** (already done!)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import `codedbytahir/ludo-star-nextjs`
   - Click "Deploy"

3. **Done!** Your app will be live at `your-project.vercel.app`

### Deploy to Netlify

```bash
npm run build
# Upload .next folder to Netlify
```

### Deploy to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

## 📱 Build for Production

```bash
npm run build
npm run start
```

## 🎮 Upcoming Features

- [ ] Online Multiplayer with WebSockets
- [ ] Voice Chat
- [ ] Tournaments
- [ ] Leaderboards
- [ ] Custom Themes
- [ ] Sound Effects & Music
- [ ] Achievements System
- [ ] Friend System
- [ ] Chat Emojis
- [ ] Replay System

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Hot Toast | Notifications |
| Lucide React | Icons |
| Zustand | State management |
| Canvas Confetti | Celebrations |

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💬 Support

If you have any questions or need help, please open an issue on GitHub.

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Built with ❤️ using Next.js 14**

🎲 **Play Now:** [Deploy your own instance!]
