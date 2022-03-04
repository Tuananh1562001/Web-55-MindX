const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()

app.use(express.json())

app.post("/auth/login", (req, res) => {
    const username = req.body.username
    
    const token = jwt.sign(
    {
        username: username
    },
    "My_PRIVATE_KEY",
    {
        expiresIn: 3600,
    }
    )
    res.json({
        username: username,
        token: token,
    })
})

// Doesn't require login
app.get("/classes", (req, res) => {})
// Require login
app.get("/teachers", (req,res) => {})

app.listen(5003, () => {
    console.log("App is running at 5003")
})