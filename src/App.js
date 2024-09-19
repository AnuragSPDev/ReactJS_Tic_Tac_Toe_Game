import React, { useState } from 'react';
import Square from './components/Square';

export default function App() {
  const [nextMove, setNextMove] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentValues = history[currentMove];

  const handlePlay = (nextValues) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextValues];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setNextMove(!nextMove);
  }

  const jumpTo = (requiredMove) => {
    console.log(`Inside jumpTo, requiredMove: ${requiredMove}`);
    setCurrentMove(requiredMove);
    setNextMove(requiredMove % 2 === 0);
  }

  const moves = history.map((square, move) => {
    console.log(`Move: ${move}`);
    let description;
    if (move > 0) {
      description = `Go To Move: ${move}`;
    } else {
      description = 'Go To Start of The Game';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  }

  );

  return (
    <div className="container">
      <div className="board">
        <Board nextMove={nextMove} handlePlay={handlePlay} currentValues={currentValues} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board(props) {
  const handleClick = (idx) => {
    console.log('clicked square');
    if (props.currentValues[idx] || calculateWinner(props.currentValues)) {
      return;
    }
    const nextValue = props.currentValues.slice();
    if (props.nextMove) {
      nextValue[idx] = 'X';
    } else {
      nextValue[idx] = 'O';
    }
    props.handlePlay(nextValue);
  }

  const calculateWinner = (values) => {
    let lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if (values[a] && values[a] === values[b] && values[a] === values[c]) {
        return values[a];
      }
    }
    return null;
  }

  let winner = calculateWinner(props.currentValues);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next Move: Player ${props.nextMove ? 'X' : 'O'}`
  }

  return (
    <>
      <div className="container">
        <div className="container">
          <h2>{status}</h2>
        </div>
        <div className='gameDiv'>
          <Square value={props.currentValues[0]} handleClick={() => handleClick(0)} />
          <Square value={props.currentValues[1]} handleClick={() => handleClick(1)} />
          <Square value={props.currentValues[2]} handleClick={() => handleClick(2)} />
        </div>
        <div className='gameDiv'>
          <Square value={props.currentValues[3]} handleClick={() => handleClick(3)} />
          <Square value={props.currentValues[4]} handleClick={() => handleClick(4)} />
          <Square value={props.currentValues[5]} handleClick={() => handleClick(5)} />
        </div>
        <div className='gameDiv'>
          <Square value={props.currentValues[6]} handleClick={() => handleClick(6)} />
          <Square value={props.currentValues[7]} handleClick={() => handleClick(7)} />
          <Square value={props.currentValues[8]} handleClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  )
}
