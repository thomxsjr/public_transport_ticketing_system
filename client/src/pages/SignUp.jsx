import { useState } from "react";
import axios from 'axios'
import { Navigate } from 'react-router-dom'


export default function SignUp(){

    

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [redirect, setRedirect] = useState(false);
    const [driverRedirect, setDriverRedirect] = useState(false);
    const [driver, setDriver] = useState(false)

    const axiosPostData = async() => {
        const postData = {
            username: username,
            email: email,
            isDriver: driver,
            password: password
        }

        axios.post('http://localhost:4000/signup', postData)
        .then((res) => {
            if(res.status == 200 && res.data?.res) {
                if(res.data.auth)
                    if(driver) {
                        setDriverRedirect(true)
                    } else {
                        setRedirect(true)
                    }
                else
                setError('Signup Failed');
            }
    
        })

        
    }

    function handleSubmit(e){
        e.preventDefault();

        setError('')
        axiosPostData()
    }

    return(
        <>
            <h1>Sign Up</h1>
            { redirect && <Navigate to='/dashboard'/> }
            { driverRedirect && <Navigate to='/driveronboard' /> }
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label> Are You A Driver</label>
                <input type="checkbox" name="isDriver" value={driver} onChange={(e) => setDriver(!driver)}  />
                <br />
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                {error}
                <button type="submit">Submit</button>
            </form>
        </>
    )

}