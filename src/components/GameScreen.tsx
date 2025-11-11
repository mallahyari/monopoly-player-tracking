import { useState } from 'react';
import Confetti from 'react-confetti';
import { Dice3D } from './Dice3D';
import { RollHistory } from './RollHistory';
import { GameStats } from './GameStats';
import type { Player } from '../types';

interface GameScreenProps {
  players: Player[];
  currentPlayerIndex: number;
  rollHistory: any[];
  isPaused: boolean;
  doublesCount: number;
  onRollDice: () => { dice1: number; dice2: number; isDoubles: boolean };
  onUndoRoll: () => void;
  onTogglePause: () => void;
  onNewGame: () => void;
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: string) => void;
}

export const GameScreen = ({
  players,
  currentPlayerIndex,
  rollHistory,
  isPaused,
  doublesCount,
  onRollDice,
  onUndoRoll,
  onTogglePause,
  onNewGame,
  onAddPlayer,
  onRemovePlayer,
}: GameScreenProps) => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [showDoubles, setShowDoubles] = useState(false);
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const currentPlayer = players[currentPlayerIndex];
  const nextPlayer = players[(currentPlayerIndex + 1) % players.length];

  const handleRoll = () => {
    if (isPaused || isRolling) return;

    setIsRolling(true);
    setShowDoubles(false);

    // Simulate rolling animation
    const rollInterval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
    }, 100);

    setTimeout(() => {
      clearInterval(rollInterval);
      const result = onRollDice();
      setDice1(result.dice1);
      setDice2(result.dice2);
      setIsRolling(false);

      if (result.isDoubles) {
        setShowDoubles(true);
        setShowConfetti(true);
        setTimeout(() => {
          setShowDoubles(false);
          setShowConfetti(false);
        }, 5000);
      }
    }, 1500);
  };

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      onAddPlayer(newPlayerName.trim());
      setNewPlayerName('');
      setShowAddPlayer(false);
    }
  };

  const handleNewGame = () => {
    if (confirm('Are you sure you want to start a new game? All progress will be lost.')) {
      onNewGame();
    }
  };

  return (
    <div className="min-h-screen gradient-monopoly animate-gradient p-4 relative overflow-hidden">
      {/* Confetti for doubles! */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
          gravity={0.3}
        />
      )}

      {/* Floating background elements */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-white/10 rounded-full animate-float blur-xl"></div>
      <div className="absolute bottom-40 right-40 w-40 h-40 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-40 w-28 h-28 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '3s' }}></div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-6 animate-slideDown hover-lift">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-4xl font-black bg-gradient-to-r from-red-600 via-green-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
              🎲 MONOPOLY Dice Tracker
            </h1>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={onTogglePause}
                className={`px-5 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg btn-ripple ${
                  isPaused
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white'
                }`}
              >
                {isPaused ? '▶️ Resume' : '⏸️ Pause'}
              </button>

              <button
                onClick={() => setShowAddPlayer(!showAddPlayer)}
                className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg btn-ripple"
              >
                ➕ Add Player
              </button>

              <button
                onClick={onUndoRoll}
                disabled={rollHistory.length === 0}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg btn-ripple disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none"
              >
                ↩️ Undo
              </button>

              <button
                onClick={handleNewGame}
                className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg btn-ripple"
              >
                🔄 New Game
              </button>
            </div>
          </div>

          {/* Add Player Form */}
          {showAddPlayer && (
            <div className="mt-5 p-5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border-2 border-blue-300 animate-slideDown">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                  placeholder="Enter player name"
                  className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 text-lg transition-all"
                />
                <button
                  onClick={handleAddPlayer}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  ✓ Add
                </button>
                <button
                  onClick={() => setShowAddPlayer(false)}
                  className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl font-bold hover:from-gray-500 hover:to-gray-600 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  ✕ Cancel
                </button>
              </div>
            </div>
          )}

          {isPaused && (
            <div className="mt-5 p-4 bg-yellow-100 border-2 border-yellow-400 rounded-2xl text-center animate-pulse">
              <span className="text-yellow-800 font-bold text-lg">⏸️ Game Paused</span>
            </div>
          )}
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Panel - Current Player & Dice */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Player */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 animate-slideInLeft hover-lift">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-700 mb-4 flex items-center justify-center gap-2">
                  <span className="animate-pulse">👤</span>
                  Current Player
                </h2>
                <div className="flex items-center justify-center gap-4 animate-scaleIn">
                  <div
                    className="w-16 h-16 rounded-full border-4 border-white shadow-2xl animate-pulse ring-4 ring-offset-2 ring-opacity-40"
                    style={{
                      backgroundColor: currentPlayer.color,
                    }}
                  />
                  <div>
                    <div className="text-5xl font-black text-gray-900">
                      {currentPlayer.name}
                    </div>
                    <div className="text-lg text-gray-600 font-semibold mt-1">
                      📍 Space {currentPlayer.position}/40
                    </div>
                  </div>
                </div>

                {doublesCount > 0 && (
                  <div className="mt-4 inline-block px-5 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 rounded-full text-lg font-black shadow-lg animate-bounce">
                    🔥 Doubles Streak: {doublesCount}
                  </div>
                )}
              </div>

              {/* 3D Dice */}
              <div className="mb-6 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-inner border-4 border-white">
                <Dice3D dice1={dice1} dice2={dice2} isRolling={isRolling} />
              </div>

              {/* Roll Button */}
              <button
                onClick={handleRoll}
                disabled={isPaused || isRolling}
                className={`w-full py-6 rounded-2xl font-black text-3xl transition-all transform shadow-2xl ${
                  isPaused || isRolling
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white hover:from-green-600 hover:via-green-700 hover:to-green-800 hover:scale-105 active:scale-95 animate-gradient btn-ripple hover-glow'
                }`}
              >
                {isRolling ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="animate-spin">🎲</span>
                    Rolling...
                    <span className="animate-spin" style={{ animationDirection: 'reverse' }}>🎲</span>
                  </span>
                ) : isPaused ? (
                  '⏸️ Game Paused'
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <span className="animate-bounce">🎲</span>
                    ROLL DICE
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🎲</span>
                  </span>
                )}
              </button>

              {showDoubles && (
                <div className="mt-6 p-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 border-4 border-yellow-600 rounded-2xl text-center animate-scaleIn shadow-2xl">
                  <div className="text-4xl font-black text-white animate-bounce mb-2">
                    🎉 DOUBLES! 🎉
                  </div>
                  <div className="text-2xl font-bold text-yellow-900">
                    Roll Again!
                  </div>
                </div>
              )}

              {/* Next Player */}
              <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border-2 border-gray-300 shadow-lg hover-lift">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-bold text-lg flex items-center gap-2">
                    <span className="animate-bounce">⏭️</span>
                    Next Up:
                  </span>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full shadow-md ring-2 ring-white transform hover:scale-110 transition-transform"
                      style={{ backgroundColor: nextPlayer.color }}
                    />
                    <span className="font-black text-gray-900 text-xl">{nextPlayer.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Players List */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 animate-slideInLeft hover-lift" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-3xl font-black text-gray-800 mb-6 flex items-center gap-2">
                <span>🎮</span> Players
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className={`stagger-item player-card p-5 rounded-2xl border-3 transition-all transform hover-lift ${
                      player.id === currentPlayer.id
                        ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 ring-4 ring-green-300 animate-glow'
                        : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full shadow-lg ring-2 ring-white transform hover:scale-110 transition-transform"
                          style={{ backgroundColor: player.color }}
                        />
                        <span className="font-black text-gray-900 text-lg">
                          {player.name}
                        </span>
                      </div>
                      {players.length > 2 && (
                        <button
                          onClick={() => {
                            if (confirm(`Remove ${player.name} from the game?`)) {
                              onRemovePlayer(player.id);
                            }
                          }}
                          className="text-sm px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transform hover:scale-105 active:scale-95 shadow-md"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                    <div className="text-base text-gray-700 font-semibold">
                      📍 Space {player.position}/40
                    </div>
                    {player.id === currentPlayer.id && (
                      <div className="mt-2 text-sm font-black text-green-600 animate-pulse">
                        ▶️ CURRENT TURN
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - History & Stats */}
          <div className="space-y-6 animate-slideInRight">
            <div className="transform hover-lift">
              <GameStats rollHistory={rollHistory} players={players} />
            </div>
            <div className="transform hover-lift">
              <RollHistory rollHistory={rollHistory} players={players} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
