import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function RideConfirmation({link}){

    const driverUid = link.split('/')[4]
    const [driverName, setdriverName] = useState()
    const [driverRate, setdriverRate] = useState()
    const [vehicalType, setvehicalType] = useState()
    const [numberPlate, setNumberPlate] = useState()
    const [paymentMethod, setPaymentMethod] = useState()
    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const [redirect, setRedirect] = useState(false)
    const [rideActive, setRideActive] = useState()


    useEffect( () => {
        getLocation()
        let processing = true
        axiosFetchData(processing)
        return () => {
            processing = false
        }
    },[])

    const axiosFetchData = async(processing) => {
        await axios.get(`https://public-transport-ticketing-system.onrender.com/getDriver/${driverUid}`)
        .then(res => {
            if (processing) {
                setdriverName(res.data.driverdetails.name)
                setdriverRate(res.data.driverdetails.rate)
                setvehicalType(res.data.driverdetails.vehicledetails.vehicletype)
                setNumberPlate(res.data.driverdetails.vehicledetails.numberplate)
                

            }
        })
        .catch(err => console.log(err))
        await axios.get(`https://public-transport-ticketing-system.onrender.com/getUser`)
        .then(res => {
            if (processing) {
                setRideActive(res.data.rideActive)
                

            }
        })
        .catch(err => console.log(err))
    }
    const axiosPostData = async() => {
        const postData = {
            drivername: driverName,
            driverUid: driverUid,
            rate: driverRate,
            vehicletype: vehicalType,
            paymentMethod: paymentMethod,
            lat: lat,
            long: long
        }

        axios.post('https://public-transport-ticketing-system.onrender.com/rideinit', postData)
        .then((res) => {
            if(res.data.result) {
                setRedirect(true)
            
            }
    
        })

        
    }
    function handleSubmit(e){
        e.preventDefault()

        axiosPostData()
    }
    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
      }
      
      function showPosition(position) {
        setLat(position.coords.latitude)
        setLong(position.coords.longitude)
      }


    return(
        <>
            { redirect && <Navigate to={'/dashboard'} />}
            <h1>Confirm Ride</h1>
            <h3>Details</h3>
            <h4>Driver Name:</h4>
            <p>{driverName}</p>        
            <h4>Rate:</h4>   
            <p>{driverRate}</p>
            <h4>Vehicle Type:</h4>   
            <p>{vehicalType}</p>
            <h4>Number Plate:</h4>   
            <p>{numberPlate}</p>

            <h4>Latitude:</h4>
            <p>{lat}</p>
            <h4>Logitude:</h4>
            <p>{long}</p>

            <form onSubmit={handleSubmit}> 
                
               
                <label>Payment Method</label><br />
                <select required name="paymentMethod" value={paymentMethod} onChange={(e)=>{setPaymentMethod(e.target.value)}}>
                    <option selected value="" disabled>Select an Option</option>
                    <option value="Wallet">Wallet</option>
                    {vehicalType=='Bus'?<option value="Bus Pass">Bus Pass</option>: <option disabled value="Bus Pass">Bus Pass</option>}
                </select><br />
                
                
                <button type="submit">Confirm</button>
            </form>
        </>
    )
}