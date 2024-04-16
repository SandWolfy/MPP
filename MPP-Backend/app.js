const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")
const router = require("./routes/router")
const { Server } = require('socket.io');
const { addFakerItem } = require("./controller/MagicItemController");

const app = express();
const server = require("http").createServer(app)
const io = new Server(server);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const PORT = 3000;
app.use(cors())

app.use('/', router)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

const sendSignal = () => {
    addFakerItem()
    io.emit('entityAdded');
}

setInterval(sendSignal, 1000)