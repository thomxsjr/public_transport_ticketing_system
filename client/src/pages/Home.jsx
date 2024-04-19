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
                <p>This project aims to revolutionize public transportation ticketing by introducing a fully digital system. Passengers will use a mobile app to scan a QR code upon entering and exiting a vehicle (bus, tempo, or taxi). The app calculates the distance traveled and generates a price, which is deducted from the passenger's in-app wallet. This system eliminates the need for physical tickets, streamlines the ticketing process, and provides a convenient and cashless payment method for passengers.</p>
            </div>
        </>
    )
}