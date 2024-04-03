import { useState, useEffect } from "react";
import axios from "axios";
import '../assets/stylesheets/BusPassBox.css'

export default function BusPass({setBusPassBox}) {

    const [busPassExist, setBusPassExist] = useState()
    const [passID, setPassID] = useState()
    const [passType, setPassType] = useState()
    const [validity, setValidity] = useState()
    const [error, setError] = useState('')


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
                setPassID(res.data.buspass.details.passID)
                setPassType(res.data.buspass.details.passtype)
                setValidity(res.data.buspass.details.validity)
            }
        })
        .catch(err => console.log(err))
    }
    
    const axiosPostData = async() => {

        const postData = {
            'passID': passID,
            'passtype': passType,
            'validity': validity
        }
        console.log(postData)

        axios.post('http://localhost:4000/updatebusPass', postData)
        .then((res)=>{
            if(res.data.result){
                // location.reload()
                setError('success')
            } else {
                setError(res.data.msg)
            }
        })

    }

    function handleSubmit(e){
        e.preventDefault();

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
                    <h3>Details:</h3>
                    <p>Pass ID: {passID}</p>
                    <p>Pass Type: {passType}</p>
                    <p>Validity: {validity}</p>
                </div> : 
                <div>
                    <h2>Add Bus Pass:</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Pass ID:</label> <br />
                        <input type="text" name="passID"required maxLength={12} value={passID} onChange={(e) => setPassID(e.target.value)} /> <br />
                        <label>Pass Type:</label> <br />
                        <select name="passtype" required value={passType} onChange={(e) => {setPassType(e.options[e.selectedIndex].value)}}>
                            <option value="Basic">Basic</option>
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                        </select> <br /> 
                        <label>Validity Till:</label> <br />
                        <input type="date" required value={validity} onChange={(e) => setValidity(e.target.value)} /> <br />
                        <button type="submit">Submit</button>
                    </form>
                </div>} <br />
                {error}
                <button onClick={()=>{setBusPassBox(false)}}>Close</button>
            </div>
        </div>
        </>
    )
}

