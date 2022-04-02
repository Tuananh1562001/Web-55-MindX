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
