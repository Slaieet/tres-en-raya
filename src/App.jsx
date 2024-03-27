import Square from './components/Square';
import EndGame from './modals/EndGame';
import confetti from "canvas-confetti";

import { useState } from "react";
import './App.css';

import { TURNS, WINNER_COMBOS } from "./constants.js";

function App() {

  const [ board, setBoard ] = useState(Array(9).fill(null));
  const [ turn, setTurn ] = useState(TURNS.X);
  const [ winner, setWinner ] = useState(null);

  const checkWinner = (boardToCheck) => {
    for ( const combo of WINNER_COMBOS ) {
      const [ a, b, c ] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null
  }

  const updateBoard = (position) => {

    if (board[position] || winner) return

    const newBoard = [...board];
    newBoard[position] = turn;
    setBoard(newBoard);

    const newTurn = (turn === TURNS.X) ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  
    // newWinner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner("Empate");
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every(square => square !== null)
  }

  const mainStyles = "flex justify-center items-center h-screen flex-col gap-10 min-h-[600px]";

  return (
    <main className={(winner) ? `${mainStyles} blur-sm` : mainStyles}>
      <h1 className='text-[2.5rem] font-bold'>Tic tac toe</h1>

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

      {winner && (
        <EndGame winner={winner} resetGame={resetGame} />
      )}

    </main>
  )
}

export default App
