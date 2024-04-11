import React from "react";
import "../assets/stylesheets/Home.css"
import bg from "../assets/images/public-transport-bg.jpg"

export default function SignUp(){


    return(
        <>
            <div className="container">
                <div className="title">
                    <h1>Digital Ticketing System For Public Transport</h1>   
                </div>
                <div>
                    <img className="mainImg" src={bg} alt="bg" />
                </div> <br />
                <div className="signingbutton">
                    <a href="/signup"><button>Sign Up</button></a>
                    <a href="/signin"><button>Sign In</button></a>
                </div>
            </div>
        </>
    )
}