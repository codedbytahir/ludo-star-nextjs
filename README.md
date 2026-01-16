# 🎲 Ludo Star 2.0 - Professional Next.js Edition

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-ff0055?style=for-the-badge&logo=framer)

**A beautiful, modern Ludo board game built with cutting-edge web technologies**

[🎮 Play Demo](#) • [📖 Documentation](QUICK_START.md) • [🚀 Deploy](DEPLOYMENT.md) • [🐛 Report Bug](https://github.com/codedbytahir/ludo-star-nextjs/issues)

</div>

---

## ✨ Features

### 🎮 Game Features
- ✅ **Anonymous Play** - No signup/signin required, instant play!
- ✅ **Auto-generated Usernames** - Cool names like "SwiftKing_7834", "BraveLegend_2341"
- ✅ **4-Player Ludo** - Classic board game with authentic rules
- ✅ **Smart AI Opponents** - 3 difficulty levels (Easy, Medium, Hard)
- ✅ **Multiple Game Modes**:
  - ⚡ Quick Play (vs AI)
  - 🤖 Offline Mode (vs AI)
  - 👥 Local Play (Pass & Play)
  - 🌐 Online Multiplayer (Coming Soon!)

### 🎨 UI/UX Features
- ✅ **Stunning Animations** - Powered by Framer Motion
- ✅ **Particle Effects** - Floating particles background
- ✅ **Smooth Transitions** - 60 FPS animations
- ✅ **Responsive Design** - Perfect on mobile, tablet, desktop
- ✅ **Dark Theme** - Beautiful gradient backgrounds
- ✅ **Toast Notifications** - React Hot Toast for instant feedback
- ✅ **Confetti Celebrations** - Epic winner celebrations
- ✅ **Glass Morphism** - Modern glassmorphic UI elements

### 🛠️ Technical Features
- ✅ **Next.js 14** - Latest App Router with Server Components
- ✅ **TypeScript** - Full type safety throughout
- ✅ **Tailwind CSS** - Utility-first styling with custom theme
- ✅ **Framer Motion** - Advanced animations and gestures
- ✅ **Zustand** - Lightweight state management (ready to use)
- ✅ **LocalStorage** - Persistent user data and stats
- ✅ **PWA Ready** - Can be installed as native app
- ✅ **SEO Optimized** - Meta tags and Open Graph

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/codedbytahir/ludo-star-nextjs.git
cd ludo-star-nextjs

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**That's it! 🎉**

For detailed setup instructions, see [QUICK_START.md](QUICK_START.md)

---

## 📦 Project Structure

```
ludo-star-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts & metadata
│   │   ├── page.tsx             # Home page component
│   │   └── globals.css          # Global styles & Tailwind
│   ├── components/
│   │   ├── MainMenu.tsx         # Main menu screen
│   │   ├── GameBoard.tsx        # Game board container
│   │   ├── Board.tsx            # Ludo board grid
│   │   ├── Dice.tsx             # Animated dice component
│   │   ├── Token.tsx            # Game token with animations
│   │   ├── PlayerInfo.tsx       # Player info cards
│   │   ├── GameOverModal.tsx    # Winner celebration modal
│   │   └── ParticleBackground.tsx # Floating particles
│   ├── lib/
│   │   ├── gameLogic.ts         # Core game logic & rules
│   │   ├── aiLogic.ts           # AI algorithms (3 levels)
│   │   └── userUtils.ts         # User utilities & stats
│   └── types/
│       └── game.ts              # TypeScript type definitions
├── public/                      # Static assets
├── tailwind.config.ts           # Tailwind configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies
```

---

## 🎯 Game Rules

1. **Starting**: Roll a 6 to move tokens out of home base
2. **Movement**: Move tokens clockwise around the board
3. **Capturing**: Land on opponent's token to send it back home
4. **Safe Squares**: Tokens on ⭐ squares can't be captured
5. **Extra Turn**: Rolling a 6 gives you an extra turn
6. **Winning**: First player to get all 4 tokens home wins!

---

## 🎨 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 14.2.0 | React framework with App Router |
| **TypeScript** | 5.x | Type safety and better DX |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **Framer Motion** | 11.x | Advanced animations |
| **React Hot Toast** | 2.4 | Toast notifications |
| **Lucide React** | 0.344 | Beautiful icons |
| **Canvas Confetti** | 1.9 | Celebration effects |
| **Zustand** | 4.5 | State management |

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/codedbytahir/ludo-star-nextjs)

**Or manually:**

1. Push to GitHub (already done!)
2. Go to [vercel.com](https://vercel.com)
3. Import `codedbytahir/ludo-star-nextjs`
4. Click Deploy

**Your app will be live in 2 minutes!**

For other platforms (Netlify, Railway, GitHub Pages), see [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#FFD700', // Gold
  },
  accent: {
    green: '#06FFA5',
    red: '#E63946',
    blue: '#3A86FF',
    yellow: '#FFD700',
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

```bash
npm install howler
```

```typescript
import { Howl } from 'howler'

const diceSound = new Howl({
  src: ['/sounds/dice-roll.mp3']
})
```

---

## 📱 Screenshots

### Main Menu
Beautiful gradient background with particle effects, user stats, and game mode selection.

### Game Board
Classic Ludo board with smooth token animations, dice rolling, and player indicators.

### Winner Celebration
Epic confetti celebration with rankings and replay options.

---

## 🎮 Upcoming Features

- [ ] **Online Multiplayer** - WebSocket-based real-time gameplay
- [ ] **Voice Chat** - In-game voice communication
- [ ] **Tournaments** - Competitive tournament system
- [ ] **Leaderboards** - Global rankings
- [ ] **Custom Themes** - Multiple board themes
- [ ] **Sound Effects** - Dice roll, token move, capture sounds
- [ ] **Background Music** - Ambient game music
- [ ] **Achievements** - Unlock achievements and badges
- [ ] **Friend System** - Add friends and invite to games
- [ ] **Chat System** - In-game text chat with emojis
- [ ] **Replay System** - Watch game replays
- [ ] **Mobile App** - React Native version

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

MIT License - feel free to use this project for learning or commercial purposes!

---

## 💬 Support

- **Documentation**: [QUICK_START.md](QUICK_START.md)
- **Deployment Guide**: [DEPLOYMENT.md](DEPLOYMENT.md)
- **Issues**: [GitHub Issues](https://github.com/codedbytahir/ludo-star-nextjs/issues)
- **Discussions**: [GitHub Discussions](https://github.com/codedbytahir/ludo-star-nextjs/discussions)

---

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

## 🙏 Acknowledgments

- Inspired by the classic Ludo Star game
- Built with modern web technologies
- Community feedback and contributions

---

<div align="center">

**🎲 Built with ❤️ using Next.js 14**

[⬆ Back to Top](#-ludo-star-20---professional-nextjs-edition)

</div>
