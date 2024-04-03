import { useState } from "react";
import '../assets/stylesheets/BusPassBox.css'

export default function BusPass({setBusPassBox}) {

    const [busPassExist, setBusPassExist] = useState(true)

    const isExistSection=()=>{

        return(
            <p>Yes</p>
        )
        
    }
    const isNotExistSection=()=>{
    
        return(
            <p>No</p>
        )
    }
    

    return(
        <>
        <div className="BusPassContainerOverlay">
            <div className="BusPassContainer">
                <h1>Buss Pass</h1>
                {busPassExist? 
                <div>

                </div> : 
                <div
                
                ></div>}
                <button onClick={()=>{setBusPassBox(false)}}>Close</button>
            </div>
        </div>
        </>
    )
}

