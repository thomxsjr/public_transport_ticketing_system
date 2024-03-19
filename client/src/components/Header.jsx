import React from 'react';
import '../assets/stylesheets/Header.css'


export default function Header(){
    return(
        <>
        <div className='container'>
            <div className="pfp">
                <img src="src/assets/images/itachi_pfp.jpeg" />
            </div>
            <div className='name'>
                <h1>Nirmal</h1>
            </div>
        </div>
        
        </>
    )
}