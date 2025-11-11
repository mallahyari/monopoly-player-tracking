import { useState } from 'react';
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
        setTimeout(() => setShowDoubles(false), 3000);
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
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-green-600 to-blue-600 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">MONOPOLY Dice Tracker</h1>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={onTogglePause}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  isPaused
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                }`}
              >
                {isPaused ? 'Resume' : 'Pause'}
              </button>

              <button
                onClick={() => setShowAddPlayer(!showAddPlayer)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Add Player
              </button>

              <button
                onClick={onUndoRoll}
                disabled={rollHistory.length === 0}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Undo
              </button>

              <button
                onClick={handleNewGame}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                New Game
              </button>
            </div>
          </div>

          {/* Add Player Form */}
          {showAddPlayer && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddPlayer()}
                  placeholder="Enter player name"
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleAddPlayer}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddPlayer(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {isPaused && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg text-center">
              <span className="text-yellow-800 font-semibold">Game Paused</span>
            </div>
          )}
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left Panel - Current Player & Dice */}
          <div className="lg:col-span-2 space-y-4">
            {/* Current Player */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">Current Player</h2>
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full border-4 border-white shadow-lg"
                    style={{ backgroundColor: currentPlayer.color }}
                  />
                  <div>
                    <div className="text-4xl font-bold text-gray-800">
                      {currentPlayer.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Position: Space {currentPlayer.position}
                    </div>
                  </div>
                </div>

                {doublesCount > 0 && (
                  <div className="mt-2 inline-block px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold">
                    Doubles Streak: {doublesCount}
                  </div>
                )}
              </div>

              {/* 3D Dice */}
              <div className="mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                <Dice3D dice1={dice1} dice2={dice2} isRolling={isRolling} />
              </div>

              {/* Roll Button */}
              <button
                onClick={handleRoll}
                disabled={isPaused || isRolling}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold text-2xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
              >
                {isRolling ? 'Rolling...' : isPaused ? 'Game Paused' : 'Roll Dice'}
              </button>

              {showDoubles && (
                <div className="mt-4 p-4 bg-yellow-400 border-4 border-yellow-500 rounded-xl text-center animate-pulse">
                  <span className="text-2xl font-bold text-yellow-900">
                    🎲 DOUBLES! Roll Again! 🎲
                  </span>
                </div>
              )}

              {/* Next Player */}
              <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-semibold">Next Up:</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: nextPlayer.color }}
                    />
                    <span className="font-bold text-gray-800">{nextPlayer.name}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Players List */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Players</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      player.id === currentPlayer.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: player.color }}
                        />
                        <span className="font-semibold text-gray-800">
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
                          className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">
                      Space {player.position}
                    </div>
                    {player.id === currentPlayer.id && (
                      <div className="mt-1 text-xs font-bold text-green-600">
                        ▶ Current Turn
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - History & Stats */}
          <div className="space-y-4">
            <GameStats rollHistory={rollHistory} players={players} />
            <RollHistory rollHistory={rollHistory} players={players} />
          </div>
        </div>
      </div>
    </div>
  );
};
