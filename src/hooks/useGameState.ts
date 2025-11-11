import { useState, useEffect, useCallback } from 'react';
import type { GameState, Player, DiceRoll } from '../types';
import { BOARD_SPACES, MONOPOLY_COLORS } from '../types';

const STORAGE_KEY = 'monopoly-game-state';

const initialGameState: GameState = {
  players: [],
  currentPlayerIndex: 0,
  rollHistory: [],
  isPaused: false,
  isGameStarted: false,
  doublesCount: 0,
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialGameState;
      }
    }
    return initialGameState;
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const addPlayer = useCallback((name: string) => {
    const newPlayer: Player = {
      id: `player-${Date.now()}-${Math.random()}`,
      name,
      color: MONOPOLY_COLORS[gameState.players.length % MONOPOLY_COLORS.length],
      position: 0,
      order: gameState.players.length,
    };

    setGameState(prev => ({
      ...prev,
      players: [...prev.players, newPlayer],
    }));
  }, [gameState.players.length]);

  const removePlayer = useCallback((playerId: string) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== playerId).map((p, idx) => ({
        ...p,
        order: idx,
      })),
      rollHistory: prev.rollHistory.filter(r => r.playerId !== playerId),
    }));
  }, []);

  const startGame = useCallback(() => {
    if (gameState.players.length < 2) {
      return false;
    }
    setGameState(prev => ({
      ...prev,
      isGameStarted: true,
      currentPlayerIndex: 0,
      doublesCount: 0,
    }));
    return true;
  }, [gameState.players.length]);

  const rollDice = useCallback(() => {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;
    const isDoubles = dice1 === dice2;

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const newPosition = (currentPlayer.position + total) % BOARD_SPACES;

    const roll: DiceRoll = {
      id: `roll-${Date.now()}`,
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      dice1,
      dice2,
      total,
      isDoubles,
      timestamp: Date.now(),
      position: newPosition,
    };

    setGameState(prev => {
      const updatedPlayers = prev.players.map(p =>
        p.id === currentPlayer.id ? { ...p, position: newPosition } : p
      );

      let nextPlayerIndex = prev.currentPlayerIndex;
      let newDoublesCount = isDoubles ? prev.doublesCount + 1 : 0;

      // Monopoly rule: If you roll doubles, you get another turn
      // But if you roll doubles 3 times in a row, you go to jail (not implemented here)
      // For simplicity, we'll just let them roll again
      if (!isDoubles) {
        nextPlayerIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      }

      return {
        ...prev,
        players: updatedPlayers,
        rollHistory: [roll, ...prev.rollHistory],
        currentPlayerIndex: nextPlayerIndex,
        doublesCount: newDoublesCount,
      };
    });

    return { dice1, dice2, isDoubles };
  }, [gameState.players, gameState.currentPlayerIndex]);

  const undoLastRoll = useCallback(() => {
    if (gameState.rollHistory.length === 0) return;

    const lastRoll = gameState.rollHistory[0];

    setGameState(prev => {
      // Find the player's position before the last roll
      const playerRolls = prev.rollHistory.filter(r => r.playerId === lastRoll.playerId);
      const previousPosition = playerRolls.length > 1
        ? playerRolls[1].position
        : 0;

      const updatedPlayers = prev.players.map(p =>
        p.id === lastRoll.playerId ? { ...p, position: previousPosition } : p
      );

      // Determine the previous player index
      let prevPlayerIndex = prev.currentPlayerIndex;
      if (!lastRoll.isDoubles) {
        prevPlayerIndex = (prev.currentPlayerIndex - 1 + prev.players.length) % prev.players.length;
      }

      return {
        ...prev,
        players: updatedPlayers,
        rollHistory: prev.rollHistory.slice(1),
        currentPlayerIndex: prevPlayerIndex,
        doublesCount: 0, // Reset doubles count
      };
    });
  }, [gameState.rollHistory]);

  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  }, []);

  const newGame = useCallback(() => {
    setGameState(initialGameState);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const reorderPlayers = useCallback((newOrder: Player[]) => {
    setGameState(prev => ({
      ...prev,
      players: newOrder.map((p, idx) => ({ ...p, order: idx })),
    }));
  }, []);

  return {
    gameState,
    addPlayer,
    removePlayer,
    startGame,
    rollDice,
    undoLastRoll,
    togglePause,
    newGame,
    reorderPlayers,
  };
};
