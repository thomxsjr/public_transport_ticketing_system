const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const router = require('./routes/router')

const app = express()
PORT = 4000;

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCiwhByu_FKUPVqphRD1IbakYgsaM-UxF4",
  authDomain: "public-transport-ticketing-sys.firebaseapp.com",
  databaseURL: "https://public-transport-ticketing-sys-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "public-transport-ticketing-sys",
  storageBucket: "public-transport-ticketing-sys.appspot.com",
  messagingSenderId: "617479715053",
  appId: "1:617479715053:web:40f2d2a1c14afafabd74e4"
};

const fireapp = initializeApp(firebaseConfig);

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