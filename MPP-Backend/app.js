const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser")
const router = require("./routes/router");

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const PORT = 4000;
app.use(cors())

app.use('/', router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})