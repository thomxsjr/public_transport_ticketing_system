import React, { useState, useEffect } from "react";
import "../assets/stylesheets/Profile.css"
import axios from "axios";
import UploadPfpBox from "../components/UploadPfpBox";



export default function Profile() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pfp, setPfp] = useState("")

    const [pfpBox, setPfpBox] = useState(false)

    useEffect( () => {
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    },[])

    const axiosFetchData = async(processing) => {
        await axios.get('http://localhost:4000/getUser')
        .then(res => {
            if (processing) {
                setUsername(res.data.username)
                setEmail(res.data.email)
                setPfp(res.data.pfp)
            }
        })
        .catch(err => console.log(err))
    }


    return(
        <>
            { pfpBox ? <UploadPfpBox setPfpBox={setPfpBox}/> : null}
            <div className="pfpContainer">
                <img className="pfp-profile" src={pfp} alt="profile-pic" />
                <div className="overlay" >
                    <button className="button" onClick={()=>{setPfpBox(!pfpBox)}}>Edit</button>
                </div>
            </div>
            <h1>{username}</h1>
            <p>{email}</p>

        </>
        
    )
}
