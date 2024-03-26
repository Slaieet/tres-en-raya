import Square from './components/Square';

import { useState } from "react";
import './App.css';

function App() {

  const TURNS = {
    X: "X",
    O: "O"
  }

  const [ board, setBoard ] = useState(Array(9).fill(null));
  const [ turn, setTurn ] = useState(TURNS.X);
  const [ winner, setWinner ] = useState(null);

  const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const checkWinner = (boardToCheck) => {
    for ( const combo of WINNER_COMBOS ) {
      const [ a, b, c ] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        alert("ganaste")
      }
    }
    return null
  }

  const updateBoard = (position) => {

    if (board[position]) return

    const newBoard = [...board];
    newBoard[position] = turn;
    setBoard(newBoard);        

    const newTurn = (turn === TURNS.X) ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  
    checkWinner(newBoard);

  }

  return (
    <main className='flex justify-center items-center h-screen flex-col gap-10'>
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
    </main>
  )
}

export default App
