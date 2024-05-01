import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";


export default function DriverOnboard(){

    const [error, setError] = useState('')
    const [name, setName] = useState()
    const [licenseNumber, setLicenseNumber] = useState()
    const [vehicleModel, setVehicleModel] = useState()
    const [vehicleType, setVehicleType] = useState()
    const [numberPlate, setNumberPlate] = useState()
    const [rate, setRate] = useState()
    const [redirect, setRedirect] = useState(false);

    const axiosPostData = async() => {
        const postData = {
            name: name,
            licensenumber: licenseNumber,
            rate: rate,
            numberplate: numberPlate,
            vehiclemodel: vehicleModel,
            vehicletype: vehicleType
        }

        axios.post('https://public-transport-ticketing-system.onrender.com/driveronboard', postData)
        .then((res) => {
            if(res.data.result){
                setRedirect(true)
            } else {
                setError(res.data.msg)
            }
    
        })

        
    }


    function handleSubmit(e){
        e.preventDefault()
        setError('')
        axiosPostData()
    }

    return(
        <>
            { redirect && <Navigate to='/dashboard'/> }
            <h1>Driver Onboarding</h1>
            <form onSubmit={handleSubmit}>
                <label>Name:</label> <br />
                <input type="text" name="name" required onChange={(e)=>setName(e.target.value)} /> <br />
                <label>License Number</label> <br />
                <input type="text" name="licensenumber" required onChange={(e)=>setLicenseNumber(e.target.value)} /> <br />
                <label>Vehicle Model</label> <br />
                <input type="text" name="vehiclemodel" required onChange={(e)=>setVehicleModel(e.target.value)} /> <br />
                <label>Vehicle Type</label> <br />
                <select name="vehicletype" required onChange={(e)=>setVehicleType(e.target.value)}>
                    <option disabled value="">Select an Option</option>
                    <option value="Bus">Bus</option>
                    <option value="Tempo">Tempo</option>
                    <option value="Auto">Auto</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                </select> <br />
                <label>Number Plate</label> <br />
                <input type="text" name="numberplate" required onChange={(e)=>setNumberPlate(e.target.value)} /> <br />
                <label>Rate Per Kilometer</label> <br />
                <input type="text" name="rate" required onChange={(e)=>setRate(e.target.value)} /> <br />
                <button type="submit">Submit</button> <br />
                {error}

            </form>
        </>
    )
}