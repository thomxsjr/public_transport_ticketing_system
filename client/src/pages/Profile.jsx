import React, { useState, useEffect } from "react";
import "../assets/stylesheets/Profile.css"
import axios from "axios";
import UploadPfpBox from "../components/UploadPfpBox";
import { Navigate } from "react-router-dom";



export default function Profile() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [pfp, setPfp] = useState("")
    const [error, setError] = useState('')
    const [pfpBox, setPfpBox] = useState(false)
    const [redirect, setRedirect] = useState(false)

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
    const axiosPostData = async() => {

        axios.post('http://localhost:4000/logout')
        .then((res)=>{
            if(res.data.result){
                setRedirect(true)
            }
            else{
                setError(res.data.msg)
            }
        })

    }


    return(
        <>
            { redirect && <Navigate to='/'/>}
            { pfpBox ? <UploadPfpBox setPfpBox={setPfpBox}/> : null}
            <div className="pfpContainer">
                <img className="pfp-profile" src={pfp} alt="profile-pic" />
                <div className="overlay" >
                    <button className="button" onClick={()=>{setPfpBox(!pfpBox)}}>Edit</button>
                </div>
            </div>
            <h1>{username}</h1>
            <p>{email}</p>

            <button onClick={(e)=>{
                e.preventDefault()
                setError('')
                axiosPostData()
            }}>Log Out</button> <br />
            {error}

        </>
        
    )
}
