const express = require("express");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");
const routes = require('./routes');
const bodyParser = require("body-parser");

dotenv.config()

const app = express()
const port = process.env.PORT || 3001

//Test in Brower
app.get('/', (req, res) => {
    return res.send('Hello Worad')
})

// bodyParser before routes(app)
app.use(bodyParser.json())

routes(app);

// Connnect MONGO_DB
mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log("Connect DB success!")
    })
    .catch((err) => {
        console.log(err)
    })
    
// Console log when npm start
app.listen(port, () => {
    console.log('Server is running in port: ' + port);
})