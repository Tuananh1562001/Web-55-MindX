import { useState } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  );

  const handleMove = (rowIdx, cellIdx) => {
    console.log(rowIdx, cellIdx)
    setBoard(prev => {
      
    })
  };

  return (
    <div className="App">
      <div className="games-area">
        <div>Player 1</div>
        <div className="game-board">
          {board.map((row, rowIdx) => {
            return (
              <div key={rowIdx} className="row">
                {row.map((cell, cellIdx) => {
                  return (
                    <div
                      key={cellIdx}
                      className="cell"
                      onClick={() => {
                        handleMove(rowIdx, cellIdx);
                      }}
                    >
                      {cell}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div>Player 2</div>
      </div>
      <div className="players-queue">Player Queue</div>
    </div>
  );
}

export default App;
