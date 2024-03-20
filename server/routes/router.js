const { loginQuery, signUpQuery } = require("../utils");
const {auth} = require('../connections/firebase');

const express = require('express')
const router = express.Router()

router.get('/users', (req, res) => {
    const userData = "Nirmal"

    res.json(userData);
})

app.post('/signup',async (req,res)=>{
    try {
        const {username, email, password} = req.body;
        
        const result = await signUpQuery(email,password);
        if(result.auth) {
            console.log("True")
            res.redirect('/dashboard');
        } else {
            console.log("False")

            res.status(401).json({res:true,auth : false, msg:result.msg});
        }
    } catch(err) {
        return res.status(501).json({res:false,msg:"Something went wrong!"});
    } 
});

app.post('/login' ,async (req,res)=>{
    try {
        const {email,password} = req.body;
        const result = await loginQuery(email,password);
        if(result.auth) {
            res.redirect('/dashboard');
        } else {
            res.status(401).json({res:true,auth:false});
        }
    } catch(err) {
        console.error(err)
        return res.status(501).json({msg:"Something went wrong!"});
    }   
});





module.exports = router