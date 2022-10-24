import { useState } from 'react';
import './App.css';
import Squares from './Comp/Squares';

function App() {

  const winnerSequence = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ]

  const [boardValue, setBoardValue] = useState([
    "", "", "",
    "", "", "",
    "", "", ""
  ])

  const [currentPlayer, setCurrentPlayer] = useState(true)
  let letter = currentPlayer ? "X" : "O"

  const [winner, setWinner] = useState(false)

  const updateValue = (i) => {
    let boardValueArray = boardValue

    if (winner) {
      return
    }

    if (boardValueArray[i] === "") {
      boardValueArray[i] = letter
      setBoardValue(boardValueArray)
      setCurrentPlayer(!currentPlayer)
    }
    let test = checkWinner()
    if (test != null) {
      setCurrentPlayer(test)
    }
  }

  const [score, setScore] = useState({
    x: 0,
    o: 0
  })

  function checkWinner() {
    for (let c = 0; c < winnerSequence.length; c++) {
      const [x, y, z] = winnerSequence[c]
      if (boardValue[x] && boardValue[x] === boardValue[y] && boardValue[x] === boardValue[z]) {
        setWinner(!winner)
        let winnerChar;
        if (boardValue[x] === "X") {
          setScore(prevScore => ({
            ...prevScore,
            x: prevScore.x + 1
          }))
          winnerChar = true
        } else {
          setScore(prevScore => ({
            ...prevScore,
            o: prevScore.o + 1
          }))
          winnerChar = false
        }
        return winnerChar
      }
    }
    return null
  }


  const restartGame = () => {
    setWinner(false)
    setBoardValue([
      "", "", "",
      "", "", "",
      "", "", ""
    ])
  }

  return (
    <div className="App">
      <h1>Score</h1>
      <p>X: {score.x} | O: {score.o}</p>
      <div className="row">

        <Squares
          value={boardValue[0]}
          handleClick={() => updateValue(0)}
        />

        <Squares
          value={boardValue[1]}
          handleClick={() => updateValue(1)}
        />

        <Squares
          value={boardValue[2]}
          handleClick={() => updateValue(2)}
        />

      </div>
      <div className="row">

        <Squares
          value={boardValue[3]}
          handleClick={() => updateValue(3)}
        />

        <Squares
          value={boardValue[4]}
          handleClick={() => updateValue(4)}
        />

        <Squares
          value={boardValue[5]}
          handleClick={() => updateValue(5)}
        />

      </div>
      <div className="row">

        <Squares
          value={boardValue[6]}
          handleClick={() => updateValue(6)}
        />

        <Squares
          value={boardValue[7]}
          handleClick={() => updateValue(7)}
        />

        <Squares
          value={boardValue[8]}
          handleClick={() => updateValue(8)}
        />

      </div>
      <p>{winner ? `${letter} is the winner` : `${letter} turn`}</p>
      <span onClick={restartGame}>Restart</span>
    </div>
  );
}

export default App;
