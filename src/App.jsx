// components
import Square from './components/Square';
import ResetButton from './components/ResetButton.jsx';
import EndGame from './modals/EndGame';

// dependencies
import confetti from "canvas-confetti";

// react and css
import { useState } from "react";
import './App.css';

// logic and more
import { TURNS } from "./constants.js";
import { checkWinner, checkEndGame } from "./logic/board.js";
import { saveOnStorage, removeOnStorage } from "./logic/localStorage.js";

function App() {

  const [ board, setBoard ] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return (boardFromStorage) ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [ turn, setTurn ] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ?? TURNS.X;
  });
  const [ winner, setWinner ] = useState(null);

  const updateBoard = (position) => {

    if (board[position] || winner) return

    const newBoard = [...board];
    newBoard[position] = turn;
    setBoard(newBoard);

    const newTurn = (turn === TURNS.X) ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  
    // save on localStorage
    saveOnStorage({
      board: newBoard,
      turn: newTurn
    });

    // newWinner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
      removeOnStorage();
    } else if (checkEndGame(newBoard)) {
      setWinner("Empate");
      removeOnStorage();
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    removeOnStorage();
  }

  const mainStyles = "flex justify-center items-center h-screen flex-col gap-5 min-h-[600px]";

  return (
    <main className={(winner) ? `${mainStyles} blur-sm` : mainStyles}>
      <h1 className='text-[2.5rem] font-bold'>Tres en raya</h1>

      <ResetButton resetGame={resetGame}>Reiniciar</ResetButton>

      <section className='game'>
        {board.map((pos, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {pos}
            </Square>
          )
        })}
      </section>

      <section className='turns flex gap-5'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <EndGame winner={winner} resetGame={resetGame} />

    </main>
  )
}

export default App
