const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")
const router = require("./routes/router")
// const { Server } = require('socket.io');

const app = express();
const fs = require('fs');
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };
const server = require("https").createServer(options, app)
// const io = new Server(server);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const PORT = 3000;
app.use(cors())

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     next();
// })

app.use('/', router)

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

// const sendSignal = () => {
//     addFakerItem()
//     io.emit('entityAdded');
// }

// setInterval(sendSignal, 5000)