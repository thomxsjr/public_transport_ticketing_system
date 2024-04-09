const { loginQuery, signUpQuery, uploadPfp } = require("../utils");
const { auth, db } = require('../connections/firebase');
const { ref, get, set } = require('firebase/database');
const { signOut } =require('firebase/auth')
const { v4: uuidv4 } = require('uuid');



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
        
    } catch(err){
        console.error(err)
        return res.status(501).json({msg:"Something went wrong!"});
    }

})
router.post('/updatebuspass', async (req, res) => {
    const userID = auth.currentUser.uid;
    const passID = req.body.passID
    const passtype = req.body.passtype
    const validity = req.body.validity
    const exist = req.body.exist

    try {
        set(ref(db, 'users/'+userID+'/buspass/exist'), !exist)
        set(ref(db, 'users/' + userID + '/buspass/details'), 
        {'passID': passID, 'passtype': passtype, 'validity': validity});

        res.status(200).json({result:true})
        
    } catch(err){
        console.error(err)
        return res.status(501).json({result:false, msg:"Something went wrong!"});
    }
})

router.post('/driveronboard', async (req, res) => {
    const userID = auth.currentUser.uid;
    const name = req.body.name
    const licensenumber = req.body.licensenumber
    const vehiclemodel = req.body.vehiclemodel
    const vehicletype = req.body.vehicletype
    const numberplate = req.body.numberplate
    const rate = req.body.rate

    try {
        set(ref(db, 'users/'+userID+'/driverdetails'), 
        {'licensenumber': licensenumber, 'name': name, 'rate': rate, 'vehicledetails':{'numberplate': numberplate, 'vehiclemodel': vehiclemodel, 'vehicletype': vehicletype}})

        res.status(200).json({result:true, msg: 'Success'})
        
    } catch(err){
        console.error(err)
        return res.status(501).json({result:false, msg:"Something went wrong!"});
    }
})

router.get('/getDriver/:driverUid', async (req, res) => {
    try {
        const driverUserID = req.params.driverUid;
        const  dbRef = ref(db, `users/${driverUserID}`);
        const getDriverDetails = await get(dbRef);
        const driverDetails = getDriverDetails.val(); 
        res.json(driverDetails);
    } catch (e) {
        console.log("Error : ", e);
        return null
    }
})

router.post('/rideinit', async(req, res) => {
    const drivername = req.body.drivername
    const driveruid = req.body.driverUid
    const rate = req.body.rate
    const paymentMethod = req.body.paymentMethod
    const vehicletype = req.body.vehicletype
    const lat = req.body.lat
    const long = req.body.long
    const userID = auth.currentUser.uid
    const rideId = uuidv4();


    const d = new Date();
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const hour = String(d.getHours())
    const min = String(d.getMinutes())
    const sec = String(d.getSeconds())


    date = mm + '/' + dd + '/' + yyyy;
    time = hour+":"+min+":"+sec


    try{
        const  dbRef = ref(db, `users/${userID}/rideActive`);
        const getRideActive = await get(dbRef);
        const rideActive = getRideActive.val(); 
        
        if(rideActive){

        } else {
            set(ref(db, 'users/'+userID+'/rideActive'), !rideActive)
            set(ref(db, 'users/'+userID+'/rideDetails'), {'lat1':lat, 'long1':long, 'rideId': rideId})
            set(ref(db, 'users/'+userID+'/rideHistory/'+rideId), {'date':date, 'time': time, 'vehicletype': vehicletype, 'paymentMethod': paymentMethod, 'status': 'ongoing'})
            set(ref(db, 'users/'+driveruid+'/driverRideHistory/'+rideId), {'date':date, 'time': time, 'paymentMethod': paymentMethod, 'status': 'ongoing'})

        }



    } catch (e){
        console.log("Error : ", e);
    }

})

router.post('/signup',async (req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const userData = {
            username: req.body.username,
            isDriver: req.body.isDriver,
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

router.post('/logout', async(req, res) => {


    signOut(auth).then(() => {
        res.status(200).json({result:true})
    }).catch((error) => {
        console.error(error)
        res.status(501).json({result:false, msg: 'Something went wrong. Try again!'})
    });
})

router.post('/uploadnewpfp', async (req, res) => {
    try {

        const userID = auth.currentUser.uid;
        const fileItem = req.body.newPfp
        const fileName = req.body.pfpName

        const result = await uploadPfp(userID, fileItem, fileName)
        
    } catch(err){
        console.error(err)
        return res.status(501).json({msg:"Something went wrong!"});
    }
})




module.exports = router