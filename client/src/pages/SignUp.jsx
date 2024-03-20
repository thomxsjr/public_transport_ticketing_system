import { useState, useEffect } from "react";
import axios from 'axios'


export default function SignUp(){

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const axiosPostData = async(processing) => {
        const postData = {
            username: username,
            email: email,
            password: password
        }

        await axios.post('http://localhost:4000/signup, postData')
        .then(res => setError(<p>{res.data}</p>))
    }

    function handleSubmit(){
        e.preventDefault()

        setError('')
        axiosPostData()
    }

    return(
        <>
            <form>
                <h1>Sign Up</h1>
                <label>Username</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <label>Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>Password</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                {error}
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )

}