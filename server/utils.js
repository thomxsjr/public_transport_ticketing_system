const {app,auth, db} = require('./connections/firebase');
const {signInWithEmailAndPassword, createUserWithEmailAndPassword} = require('firebase/auth');
const {ref,get,set, child} = require('firebase/database');
const { v4: uuidv4 } = require('uuid');


exports.loginQuery = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth,email, password);
        console.log(result);
        if(result) {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef,`teachers/${result.user.uid}`));
            if(snapshot.exists()) {
                return {auth : true, response : snapshot.val()}
            } else {
                return {auth : false}
            }
           
        } else {
            return {auth : false}
        }
    } catch (err) {

        console.error("Error in Signin : ", err);
        return {auth : false}
    }
}

exports.signUpQuery = async (email,password) => {
    try {
        const result = await createUserWithEmailAndPassword(auth,email, password);
        console.log(result);
        if(result) {
            console.log(result);
            const dbRef = ref(db);
            await set(child(dbRef,`teachers/${result.user.uid}`),{...email});

            return {auth : true, response : result}
        } else {
            return {auth : false}
        }
    } catch (err) {

        console.error("Error in Signin : ", err);
        return {auth : false}
    }
}