import { useState, useEffect } from "react";
import { io } from "socket.io-client"
import "./App.css";

const determineResult = (board) => {
  // console.log(board)
  const combinations = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  for (let i = 0; i < combinations.length; i++) {
    const combination = combinations[i];
    const [cell1, cell2, cell3] = combination;
    const [x1, y1] = cell1;
    const [x2, y2] = cell2;
    const [x3, y3] = cell3;

    if (
      board[x1][y1] === "X" &&
      board[x2][y2] === "X" &&
      board[x3][y3] === "X"
    ) {
      return "X";
    }

    if (
      board[x1][y1] === "O" &&
      board[x2][y2] === "O" &&
      board[x3][y3] === "O"
    ) {
      return "O";
    }
  }
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === "") {
        return null;
      }
    }
  }
  return "draw";
};

function App() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState("X");
  const [username, setUsername] = useState("")
  const [onlineCount, setOnlineCount] = useState(0)

  const handleMove = (rowIdx, cellIdx) => {
    // console.log(rowIdx, cellIdx)
    if (board[rowIdx][cellIdx]) {
      return;
    }
    setBoard((prev) => {
      prev[rowIdx][cellIdx] = turn;
      return [...prev];
    });
    setTurn((pre) => (pre === "X" ? "O" : "X"));
  };

  const handleSubmit = (event) => {
    setUsername(document.getElementById('username').value)
  }

  const result = determineResult(board);

  useEffect(() => {
    const socket = io("http://localhost:5002")
    socket.on("ONLINE_COUNT", (onlineCount) => {
      setOnlineCount(onlineCount)
    })
  }, [])

  if(!username){
    return (
      <div>
        <p>Online count: {onlineCount}</p>
        <form onSubmit={() => handleSubmit()}>
            <input type="text" id="username" />
            <button type="submit">Join</button>
        </form>
      </div>
    )
  }

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
