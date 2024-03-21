const { auth, db} = require('./connections/firebase');
const {signInWithEmailAndPassword, createUserWithEmailAndPassword} = require('firebase/auth');
const {ref,get,set, child} = require('firebase/database');
// const { v4: uuidv4 } = require('uuid');
const { getStorage, ref : storageRef } = require("firebase/storage");



exports.loginQuery = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth,email, password);
        console.log(result);
        if(result) {
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef,`${result.user.uid}`));
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

exports.signUpQuery = async (email,password, userData) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        console.log(result);
        if(result) {
            console.log(result);

            
            const dbRef = ref(db);
            await set(child(dbRef,`${result.user.uid}`),{...userData, email});

            return {auth : true, response : result}
        } else {
            return {auth : false}
        }
    } catch (err) {

        console.error("Error in Signin : ", err);
        return {auth : false}
    }
}

exports.uploadPfp = async(userID, fileItem) => {

    try {
        const storage = getStorage();
        const pfpRef = storageRef(storage, `images/${userID}/`+fileItem.name);
        const pfpUpload = pfpRef.put(fileItem)

        pfpUpload.on("state_changed", (error)=>{
            console.log("Error in upload", error);
            return false;
        })
        return true

    } catch(error){
        console.log(error)
    }
    


}