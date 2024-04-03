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
        <div className="BusPassContainerOverlay">
            <div className="BusPassContainer">
                <h1>Bus Pass</h1>
                {busPassExist? 
                <div>
                    y
                </div> : 
                <div>
                    <h2>Add Bus Pass:</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Pass ID:</label> <br />
                        <input type="text" name="passID" /> <br />
                        <label>Pass Type:</label> <br />
                        <select name="passtype">
                            <option value="Basic">Basic</option>
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                        </select> <br /> 
                        <label>Validity Till:</label> <br />
                        <input type="date" /> <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>} <br />
                <button onClick={()=>{setBusPassBox(false)}}>Close</button>
            </div>
        </div>
        </>
    )
}

