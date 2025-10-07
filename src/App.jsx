import { useState, useMemo, useEffect, useRef } from 'react';
import './index.css';


function Square({ value, onSquareClick, isWinning, disabled }) {
  return (
    <button
      onClick={onSquareClick}
      disabled={disabled}
      className={`
        w-20 h-20 sm:w-24 sm:h-24
        border-2 border-gray-300
        text-3xl sm:text-4xl font-bold
        transition-all duration-200 ease-in-out
        ${!disabled && !value ? 'hover:bg-gray-100 hover:scale-105 cursor-pointer' : ''}
        ${disabled && !value ? 'cursor-not-allowed' : ''}
        ${isWinning ? 'bg-green-200 animate-pulse' : 'bg-white'}
        ${value === 'X' ? 'text-player-x' : ''}
        ${value === 'O' ? 'text-player-o' : ''}
        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
        disabled:opacity-100
        animate-scale-in
      `}
      aria-label={value || 'Empty square'}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, winningSquares }) {
  // Game logic: handle square clicks
  const handleClick = (i) => {
    // Prevent moves if game is won or square is already filled
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, i);
  };

  const winnerInfo = calculateWinner(squares);
  const isDraw = !winnerInfo && squares.every(square => square !== null);
  const gameOver = winnerInfo || isDraw;

  // Generate board rows using loops (requirement: no hardcoding)
  const boardRows = useMemo(() => {
    const rows = [];
    for (let row = 0; row < 3; row++) {
      const squaresInRow = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        squaresInRow.push(
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            isWinning={winningSquares?.includes(index)}
            disabled={gameOver || squares[index]}
          />
        );
      }
      rows.push(
        <div key={row} className="flex">
          {squaresInRow}
        </div>
      );
    }
    return rows;
  }, [squares, winningSquares, gameOver]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Status Display with color-coded players */}
      <div className="text-center animate-fade-in">
        {winnerInfo ? (
          <div className="text-2xl font-bold text-green-600 animate-scale-in">
            Winner: <span className={winnerInfo.winner === 'X' ? 'text-player-x' : 'text-player-o'}>
              {winnerInfo.winner}
            </span>
          </div>
        ) : isDraw ? (
          <div className="text-2xl font-bold text-gray-600 animate-scale-in">
            Draw: No winner!
          </div>
        ) : (
          <div className="text-xl font-semibold text-gray-700">
            Next Player: <span className={xIsNext ? 'text-player-x' : 'text-player-o'}>
              {xIsNext ? 'X' : 'O'}
            </span>
          </div>
        )}
      </div>

      {/* Game Board Grid */}
      <div className="inline-block border-4 border-gray-400 rounded-lg overflow-hidden shadow-lg bg-white">
        {boardRows}
      </div>
    </div>
  );
}

function MoveHistory({ history, currentMove, onJumpTo, isAscending }) {
  const scrollContainerRef = useRef(null);

  // Auto-scroll to end when ascending and history changes
  useEffect(() => {
    if (isAscending && scrollContainerRef.current) {
      // Scroll to bottom smoothly when in ascending mode
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history.length, isAscending]);

  const moves = history.map((step, move) => {
    const isCurrentMove = move === currentMove;

    // Generate move description with location
    let description;
    if (move > 0) {
      const row = Math.floor(step.move / 3);
      const col = step.move % 3;
      description = `Move #${move} (${row}, ${col})`;
    } else {
      description = 'Game start';
    }

    // Current move: show as text instead of button
    if (isCurrentMove) {
      return (
        <li
          key={move}
          className="py-2 px-4 bg-blue-100 border-l-4 border-blue-500 text-blue-800 font-semibold rounded animate-slide-up"
        >
          You are at {move === 0 ? 'game start' : `move #${move}`}
          {move > 0 && ` (${Math.floor(step.move / 3)}, ${step.move % 3})`}
        </li>
      );
    }

    // Other moves: show as clickable buttons
    return (
      <li key={move} className="animate-slide-up">
        <button
          onClick={() => onJumpTo(move)}
          className="w-full text-left py-2 px-4 hover:bg-gray-100 transition-colors duration-150 rounded text-gray-700 hover:text-gray-900 border-l-4 border-transparent hover:border-gray-300"
        >
          {description}
        </button>
      </li>
    );
  });

  // Sort moves based on toggle
  const sortedMoves = isAscending ? moves : [...moves].reverse();

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Move History</h3>
      <ol
        ref={scrollContainerRef}
        className="space-y-1 h-96 overflow-y-auto bg-gray-50 rounded-lg p-2 border border-gray-200 scroll-smooth"
      >
        {sortedMoves}
      </ol>
    </div>
  );
}

export default function Game() {
  // State management using hooks
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), move: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  // Derived state (declarative approach)
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const winnerInfo = useMemo(() => calculateWinner(currentSquares), [currentSquares]);

  // Event handlers
  const handlePlay = (nextSquares, squareIndex) => {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, move: squareIndex }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const toggleSortOrder = () => {
    setIsAscending(prev => !prev);
  };

  const resetGame = () => {
    setHistory([{ squares: Array(9).fill(null), move: null }]);
    setCurrentMove(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8 text-gray-800 animate-fade-in">
          Tic-Tac-Toe
        </h1>

        {/* Main Game Layout - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* Board Card (takes 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 animate-scale-in">
              <Board
                xIsNext={xIsNext}
                squares={currentSquares}
                onPlay={handlePlay}
                winningSquares={winnerInfo?.line}
              />

              {/* Reset Game Button - Below Board */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={resetGame}
                  className="py-3 px-8 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 shadow-md"
                  aria-label="Reset game"
                >
                  Reset Game
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Card (history and controls) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-scale-in">

              {/* Sort Toggle Button */}
              <button
                onClick={toggleSortOrder}
                className="w-full mb-4 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 shadow-md"
                aria-label={`Sort order: ${isAscending ? 'Ascending' : 'Descending'}`}
              >
                Sort: {isAscending ? '↓ Ascending' : '↑ Descending'}
              </button>

              {/* Move History */}
              <MoveHistory
                history={history}
                currentMove={currentMove}
                onJumpTo={jumpTo}
                isAscending={isAscending}
              />
            </div>
          </div>
        </div>

        {/* Footer with color legend */}
        <div className="mt-8 text-center text-sm text-gray-600 animate-fade-in">
          <div className="flex justify-center gap-6">
            <span className="flex items-center gap-2">
              <span className="text-2xl font-bold text-player-x">X</span>
              <span>Blue Player</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="text-2xl font-bold text-player-o">O</span>
              <span>Red Player</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}
