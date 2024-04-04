import { useState } from "react";
import "../assets/stylesheets/AddBalance.css"
import axios from "axios";


export default function AddBalance({setBalanceBox, balance}) {

    const [error,setError] = useState();
    const [newBalance, setNewBalance] = useState();
    const [redirect, setRedirect] = useState(false)

    const axiosPostData = async() => {

        const postData = {
            'balance': Number(balance)+Number(newBalance)
        }
        console.log(postData)

        axios.post('http://localhost:4000/updateBalance', postData)
        .then(location.reload())

    }

    function handleSubmit(e){
        e.preventDefault();
        if(newBalance == null) return;

        setError('')
        axiosPostData()
    }

    return(
        <>
        <div className="balanceBoxOverlay">
        <div className="balanceBoxStyle">
            <h1>Wallet</h1>
            <p>current balance: {balance}</p>
            <h2>Add Balance: {newBalance}</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" onChange={(e)=>{setNewBalance(e.target.value)}} placeholder={1000}/>
                <button type="submit">Submit</button>
            </form>
            <p>{error}</p>
            <button onClick={()=>{setBalanceBox(false)}}>Close</button>
        </div>
        </div>
        </>
    )
}