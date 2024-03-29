import '../assets/stylesheets/Header.css'
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Header(){

    const [username, setUsername] = useState("")
    const [pfp, setPfp] = useState("")

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
                setPfp(res.data.pfp)
            }
        })
        .catch(err => console.log(err))
    }

    return(
        <>
            <div className='maincontainer'>
                <a href="/profile"><img className="pfp" src={pfp} /></a>
                <div className='name'>
                    <h1>{ username }</h1>
                </div>
                <div className='menu'>
                    <img src="src/assets/images/bars-solid.svg" />
                </div>
            </div>
            
        </>
    )
}
