import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/stylesheets/Dashboard.css"
import Header from '../components/Header'
import Destination from '../components/Destination'
import BusPass from "../components/BusPass";


export default function Dashboard() {

    const [busPassBox, setBusPassBox] = useState(false)
    const [busPassExist, setBusPassExist] = useState()
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
                setValidity(res.data.buspass.details.validity)

            }
        })
        .catch(err => console.log(err))
    }


    return(
        <>
            { busPassBox ? <BusPass setBusPassBox={setBusPassBox} /> : null}
            <Header />
            < Destination />
            <div className="BusPassBox">
                <h1 className="BusPassText">Bus Pass</h1>
                {busPassExist ? <p className="BusPassText">valid till {validity}</p>: <p className="BusPassText">No Active Bus Pass</p>}
                <button className="BusPassButton" onClick={()=>{setBusPassBox(true)}}>{busPassExist ? 'View Details' : 'Add Bus Pass'}</button>
            </div>
        </>
        
    )
}