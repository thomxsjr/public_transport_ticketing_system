import React from "react";
import "../assets/stylesheets/Home.css"

export default function SignUp(){


    return(
        <>
            <div className="container">
            <div className="title">
                <h1>Digital Ticketing System For Public Transport</h1>   
            </div>
            <div className="button">
                <a href="/signup"><button>Sign Up</button></a>
                <a href="/signin"><button>Sign In</button></a>
            </div>
            </div>
        </>
    )
}