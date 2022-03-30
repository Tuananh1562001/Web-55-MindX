const http = require("http")
const express = require("express")
const {Server} = require("socket.io")

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
})
let onlineCount = 0;


io.on('connection', (socket) => {
    console.log("A client connected")
    onlineCount++;
    socket.emit("ONLINE_COUNT", onlineCount)
})



app.get("/", (req, res) => {
    res.json({ hello: "world" })
})


httpServer.listen(5002, () => {
    console.log("App is running at 5002")
})

