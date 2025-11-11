# 🎲 Monopoly Dice Tracker

A beautiful, interactive web app for tracking player turns and dice rolls during Monopoly games. Features stunning 3D animated dice, automatic turn management, and comprehensive game statistics.

## ✨ Features

### Core Gameplay
- **3D Animated Dice**: Realistic dice rolling with Three.js physics
- **Player Turn Management**: Never forget whose turn it is
- **Automatic Turn Rotation**: Seamlessly moves between players
- **Monopoly Rules Support**: Handles doubles correctly - roll again when you get doubles!
- **Board Position Tracking**: Tracks each player's position on the 40-space Monopoly board

### Game Controls
- **Pause/Resume**: Pause the game at any time
- **Undo Last Roll**: Made a mistake? Undo the last dice roll
- **Add Players Mid-Game**: Add new players even after starting
- **Remove Players**: Remove players from an ongoing game
- **New Game**: Start fresh with a new game

### Statistics & History
- **Complete Roll History**: See every roll with timestamps
- **Game Statistics**: Track total rolls, doubles, averages, and more
- **Player Statistics**: Individual stats for each player including:
  - Total rolls
  - Total spaces moved
  - Doubles rolled
  - Current position

### Visual Design
- **Classic Monopoly Theme**: Beautiful gradient backgrounds with Monopoly colors
- **Player Colors**: Each player gets a unique color
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Polished UI with smooth transitions
- **Local Storage**: Game state persists even if you close the browser

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd monopoly-player-tracking
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎮 How to Use

### Setting Up a Game

1. **Add Players**: Enter player names one by one
   - Each player automatically gets a unique color
   - Turn order follows the order players are added
   - Minimum 2 players required

2. **Start Game**: Click "Start Game" when all players are added

### Playing the Game

1. **Roll Dice**: The current player clicks "Roll Dice"
   - Watch the beautiful 3D dice animation
   - Dice values are automatically recorded
   - Player position updates on the board

2. **Doubles**: If you roll doubles:
   - A special "DOUBLES!" notification appears
   - You automatically get another turn
   - Doubles streak is tracked

3. **Next Player**:
   - Turn automatically advances to the next player
   - Current player is highlighted in green
   - Next player is shown below the roll button

### Managing the Game

- **Pause**: Temporarily pause the game
- **Resume**: Continue from where you left off
- **Undo**: Remove the last dice roll and restore previous state
- **Add Player**: Add a new player to the game at any time
- **Remove Player**: Remove a player (must have at least 2 players)
- **New Game**: Start completely fresh (warns before clearing data)

### Viewing Statistics

The right sidebar shows:
- **Game Stats**: Overall game statistics
- **Roll History**: Chronological list of all rolls with:
  - Player name and color
  - Dice values
  - Roll total
  - Doubles indicator
  - Board position after roll
  - Timestamp

## 🛠️ Technology Stack

- **React 19**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Vite**: Lightning-fast build tool
- **Tailwind CSS 4**: Utility-first styling
- **Three.js**: 3D graphics
- **React Three Fiber**: React renderer for Three.js
- **React Three Drei**: Useful helpers for React Three Fiber

## 📁 Project Structure

```
src/
├── components/
│   ├── Dice3D.tsx          # 3D dice component
│   ├── GameScreen.tsx      # Main game interface
│   ├── GameStats.tsx       # Statistics display
│   ├── PlayerSetup.tsx     # Player setup screen
│   └── RollHistory.tsx     # Roll history panel
├── hooks/
│   └── useGameState.ts     # Game state management hook
├── types.ts                # TypeScript type definitions
├── App.tsx                 # Main app component
└── index.css              # Global styles and Tailwind imports
```

## 🎨 Customization

### Colors

The app uses classic Monopoly colors defined in `src/index.css` and `src/types.ts`:
- Red (#d93a2f)
- Green (#1fb25a)
- Blue (#1984d6)
- Yellow (#fed130)
- Orange (#f7941d)
- Pink (#d93a96)
- Light Blue (#aaddee)
- Brown (#955436)

### Board Spaces

The standard Monopoly board has 40 spaces. This is defined in `src/types.ts` as `BOARD_SPACES`.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📝 License

MIT License - feel free to use this project for your own Monopoly games!

## 🎯 Future Enhancements

Potential features for future versions:
- Sound effects for dice rolls
- Game timer
- Export game history
- Multiple game sessions
- Advanced statistics and graphs
- Mobile app version
- Multiplayer sync across devices

---

Enjoy tracking your Monopoly games! 🎲🏠
