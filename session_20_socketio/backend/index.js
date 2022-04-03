const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
let onlineCount = 0;

const players = {
  player1: "",
  player2: "",
  queueingPlayers: [],
};

const gameState = {
  board: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  turn: "X",
  result: null,
}

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

io.on("connection", (socket) => {
  let socketUsername;
  console.log("A client connected");
  onlineCount++;
  io.emit("ONLINE_COUNT", onlineCount);

  socket.on("SET_USERNAME", (username) => {
    socketUsername = username;
    if (!players.player1) {
      players.player1 = username;
    } else if (!players.player2) {
      players.player2 = username;
    } else {
      players.queueingPlayers.push(username);
    }

    io.emit("PLAYERS_CHANGED", players);
  });

  socket.on("MOVE", (rowIdx, cellIdx) => {
    if(gameState.board[rowIdx][cellIdx]) {
      return
    }
    gameState.board[rowIdx][cellIdx] = gameState.turn;
    gameState.turn = gameState.turn === "X" ? "O" : "X"
    gameState.result = determineResult(gameState.board)
    io.emit("GAME_STATE_CHANGED", gameState)
    if (gameState.result){
      if(gameState.result === "X" ) {
        if(players.queueingPlayers.length) {
          const loser = players.player2
          players.player2 = players.queueingPlayers[0]
          players.queueingPlayers.splice(0, 1)
          players.queueingPlayers.push(loser)
        }
      }else if (gameState.result === "O"){
        if(players.queueingPlayers.length) {
          const loser = players.player1
          players.player1 = players.player2
          players.player2 = players.queueingPlayers[0]
          players.queueingPlayers.splice(0, 1)
          players.queueingPlayers.push(loser)
        }
      }else if (gameState.result === "draw"){
      }
      gameState.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]
      gameState.result = null;
      gameState.turn = "X";
      setTimeout(() => {
        io.emit("GAME_STATE_CHANGED", gameState)
        io.emit("PLAYERS_CHANGED", players)
      }, 3000)
    }
  });

  socket.on("disconnect", () => {
    onlineCount--;
    if (players.player1 === socketUsername) {
      players.player1 = "";
    }
    if (players.player2 === socketUsername) {
      players.player2 = "";
    }
    players.queueingPlayers = players.queueingPlayers.filter(
      (item) => item !== socketUsername
    );
    io.emit("PLAYERS_CHANGED", players)
    io.emit("ONLINE_COUNT", onlineCount);
  });
});

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

httpServer.listen(5002, () => {
  console.log("App is running at 5002");
});
