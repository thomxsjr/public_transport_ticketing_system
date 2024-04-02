const { loginQuery, signUpQuery, uploadPfp } = require("../utils");
const { auth, db } = require('../connections/firebase');
const { ref, get, set } = require('firebase/database');



const express = require('express')
const router = express.Router()

router.get('/getUser', async (req, res) => {


    try {
        const userID = auth.currentUser.uid;
        const  dbRef = ref(db, `users/${userID}`);
        const getUserDetails = await get(dbRef);
        const userDetails = getUserDetails.val();    
        res.json(userDetails);
        } catch (e) {
            console.log("Error : ", e);
            return null
       }
    }
    
)
router.post('/updateBalance', async(req, res)=>{

    const balance = req.body.balance
    const userID = auth.currentUser.uid;
    try {
        set(ref(db, 'users/' + userID + '/balance'), balance);
        if(result) {
            res.status(200).json({res:true,auth:true})

        } else {
            res.status(401).json({res:true,auth:false});
        }
    } catch(err){
        console.error(err)
        return res.status(501).json({msg:"Something went wrong!"});
    }

})

router.post('/signup',async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const userData = {
            username: req.body.username,
            pfp: 'https://firebasestorage.googleapis.com/v0/b/public-transport-ticketing-sys.appspot.com/o/images%2Fpfp%2Fdefault%2Fdefault_pfp.png?alt=media&token=1446ebd2-b1c4-4001-be71-e3eee9790ab3'
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

router.post('/uploadnewpfp', async (req, res) => {
    try {

        const userID = auth.currentUser.uid;
        const fileItem = req.body.newPfp
        const fileName = req.body.pfpName

        const result = await uploadPfp(userID, fileItem, fileName)
        if(result) {
            res.status(200).json({res:true,auth:true})

        } else {
            res.status(401).json({res:true,auth:false});
        }
    } catch(err){
        console.error(err)
        return res.status(501).json({msg:"Something went wrong!"});
    }
})




module.exports = router