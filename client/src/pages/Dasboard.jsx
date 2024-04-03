import { useState } from "react";
import "../assets/stylesheets/Dashboard.css"
import Header from '../components/Header'
import Destination from '../components/Destination'
import BusPass from "../components/BusPass";


export default function Dashboard() {

    const [busPassBox, setBusPassBox] = useState(false)


    return(
        <>
            { busPassBox ? <BusPass setBusPassBox={setBusPassBox} /> : null}
            <Header />
            < Destination />
            <div className="BusPassBox">
                <h1 className="BusPassText">Bus Pass</h1>
                <p className="BusPassText">valid till 20/4/24</p>
                <button className="BusPassButton" onClick={()=>{setBusPassBox(true)}}>View Detail</button>
            </div>
        </>
        
    )
}