import React from "react";
import "../assets/stylesheets/UploadPfpBox.css"
import { usePfpBox } from "../hooks/Hooks"

export default function UploadPfpBox(){
    

    return(
        <div className="UploadPfpBoxStyle">
            <p>Hello</p>
            <button onClick={()=>usePfpBox(false)}>Close</button>
        </div>
    )
}