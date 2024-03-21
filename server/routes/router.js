const { loginQuery, signUpQuery } = require("../utils");
const { auth, db } = require('../connections/firebase');
const { ref, get } = require('firebase/database');


const express = require('express')
const router = express.Router()

router.get('/getUser', async (req, res) => {


    try {
        
        const userID = auth.currentUser.uid;
        const  dbRef = ref(db, `${userID}/username`);
        const getUsername = await get(dbRef);
        const username = getUsername.val();    
        res.json(username);
        } catch (e) {
            console.log("Error : ", e);
            return null
       }
    }
    
)

router.post('/signup',async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const userData = {
            username: req.body.username
        }

        
        const result = await signUpQuery(email,password, userData);
        if(result.auth) {
            res.status(200).json({res:true, auth : true});
        } else {
            console.log("False");

            res.status(401).json({res:true,auth : false, msg:result.msg, email: email});
        }
    } catch(err) {
        console.error("Error in SignUp : ", err);
        return res.status(501).json({res:false,msg:"Internal Server Error!", error: err});
    } 
});

router.post('/signin' ,async (req,res)=>{
    try {
        const {email,password} = req.body;
        const result = await loginQuery(email,password);
        if(result.auth) {
            res.status(200).json({res:true,auth:true})
        } else {
            res.status(401).json({res:true,auth:false});
        }
    } catch(err) {
        console.error(err)
        return res.status(501).json({msg:"Something went wrong!"});
    }   
});


router.get('/dashboard', (req, res)=>res.send('Hey'))


module.exports = router