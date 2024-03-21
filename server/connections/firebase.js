const { initializeApp } = require("firebase/app");
const {getAuth} = require("firebase/auth");
const {getDatabase} = require("firebase/database");
const { getStorage } =  require("firebase/storage");


const firebaseConfig = {
  apiKey: "AIzaSyCiwhByu_FKUPVqphRD1IbakYgsaM-UxF4",
  authDomain: "public-transport-ticketing-sys.firebaseapp.com",
  databaseURL: "https://public-transport-ticketing-sys-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "public-transport-ticketing-sys",
  storageBucket: "public-transport-ticketing-sys.appspot.com",
  messagingSenderId: "617479715053",
  appId: "1:617479715053:web:40f2d2a1c14afafabd74e4",
  storageBucket: "gs://medicine-box-project.appspot.com"
  };

const app = initializeApp(firebaseConfig);

// const storage = firebase.storage();

const db  = getDatabase(app);

const auth = getAuth(app);



module.exports = {app,db,auth};