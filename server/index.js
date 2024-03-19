const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const router = require('./routes/router')

const app = express()
PORT = 4000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const corsOptions = {
    orgin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use('/', router)



const server = app.listen(PORT, ()=>{
    console.log(`Server listening to ${PORT}`)
})