import { useState, useEffect } from "react";
import axios from "axios";
import '../assets/stylesheets/BusPassBox.css'

export default function BusPass({setBusPassBox}) {

    const [busPassExist, setBusPassExist] = useState()
    const [passID, setpassID] = useState()
    const [passType, setPassType] = useState()
    const [validity, setValidity] = useState()


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
                setBusPassExist(res.data.buspass.exist)
                setpassID(res.data.buspass.details.passID)
                setPassType(res.data.buspass.details.passtype)
                setValidity(res.data.buspass.details.validity)
            }
        })
        .catch(err => console.log(err))
    }
    

    return(
        <>
        <div className="BusPassContainerOverlay">
            <div className="BusPassContainer">
                <h1>Bus Pass</h1>
                {busPassExist? 
                <div>
                    y
                </div> : 
                <div>
                    n
                </div>}
                <button onClick={()=>{setBusPassBox(false)}}>Close</button>
            </div>
        </div>
        </>
    )
}

