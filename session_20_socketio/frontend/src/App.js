import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./App.css";



function App() {
  const [board, setBoard] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [turn, setTurn] = useState("X");
  const [result, setResult] = useState(null)
  const [username, setUsername] = useState("");
  const [onlineCount, setOnlineCount] = useState(0);
  const [players, SetPlayers] = useState({
    player1: "",
    player2: "",
    queueingPlayers: [],
  });

  const socketRef = useRef(null);

  const handleMove = (rowIdx, cellIdx) => {
    // console.log(rowIdx, cellIdx)
    if(turn === "X" && players.player1 !== username){
      return
    }
    if(turn === "O" && players.player2 !== username){
      return
    }
    // console.log("Move")
    socketRef.current.emit("MOVE", rowIdx, cellIdx)
  };

  const handleSubmit = (event) => {
    const username = document.getElementById("username").value;
    setUsername(username);
    socketRef.current.emit("SET_USERNAME", username);
  };


  useEffect(() => {
    socketRef.current = io("http://localhost:5002");
    socketRef.current.on("ONLINE_COUNT", (onlineCount) => {
      setOnlineCount(onlineCount);
    });
    socketRef.current.on("PLAYERS_CHANGED", (players) => {
      SetPlayers(players);
    });
    socketRef.current.on("GAME_STATE_CHANGED", (gameState) => {
      setBoard(gameState.board)
      setTurn(gameState.turn)
      setResult(gameState.result)
    })
  }, []);

  if (!username) {
    return (
      <div>
        <p>Online count: {onlineCount}</p>
        <form onSubmit={handleSubmit}>
          <input type="text" id="username" />
          <button type="submit">Join</button>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="games-area">
        <div style={{backgroundColor: turn === "X" ? "yellow" : "white"}}>
          {players.player1 ? players.player1 : "<Not set>"}
          <span>{players.player1 === username ? "(me)" : ""}</span>
          <span>{result === "X" ? '(winnner)' : ""}</span>
        </div>
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
        <div style={{backgroundColor: turn === "O" ? "yellow" : "white"}}>
          {players.player2 ? players.player2 : "<Not set>"}
          <span>{players.player2 === username ? "(me)" : ""}</span>
          <span>{result === "O" ? '(winnner)' : ""}</span>
        </div>
      </div>
      <div className="players-queue">
        {players.queueingPlayers.map((name) => (
          <div key={name}>
            {name}
            <span>{name === username ? "(me)" : ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
