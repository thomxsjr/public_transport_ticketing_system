import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/stylesheets/Dashboard.css"
import Header from '../components/Header'
import Destination from '../components/Destination'
import BusPass from "../components/BusPass";


export default function Dashboard() {

    const [busPassBox, setBusPassBox] = useState(false)
    const [busPassExist, setBusPassExist] = useState()
    const [validity, setValidity] = useState()
    const [driver, setDriver] = useState()
    const [name, setName] = useState()
    const [licenseNumber, setLicenseNumber] = useState()
    const [vehicleModel, setVehicleModel] = useState()
    const [vehicleType, setVehicleType] = useState()
    const [numberPlate, setNumberPlate] = useState()
    const [rate, setRate] = useState()

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
                setValidity(res.data.buspass.details.validity)
                setDriver(res.data.isDriver)
                // if(driver){
                    setName(res.data.driverdetails.name)
                    setLicenseNumber(res.data.driverdetails.licensenumber)
                    setRate(res.data.driverdetails.rate)
                    setNumberPlate(res.data.driverdetails.vehicledetails.numberplate)
                    setVehicleModel(res.data.driverdetails.vehicledetails.vehiclemodel)
                    setVehicleType(res.data.driverdetails.vehicledetails.vehicletype)
    
                // }

            }
        })
        .catch(err => console.log(err))
    }


    return(
        <>
            { busPassBox ? <BusPass setBusPassBox={setBusPassBox} /> : null}
            <Header />
            < Destination />
            {driver ? 
            <div className="DriverDetails">
                <h1>Driver Details</h1>
                <h3>Name:</h3>
                <p>{name}</p>
                <h3>Licence Number:</h3>
                <p>{licenseNumber}</p>
                <h3>Rate:</h3>
                <p>{rate}/km</p>
                <h3>Number Plate:</h3>
                <p>{numberPlate}</p>
                <h3>Vehicle Type:</h3>
                <p>{vehicleType}</p>
                <h3>Vehicle Model:</h3>
                <p>{vehicleModel}</p>
            </div> : null}
            <div className="BusPassBox">
                <h1 className="BusPassText">Bus Pass</h1>
                {busPassExist ? <p className="BusPassText">valid till {validity}</p>: <p className="BusPassText">No Active Bus Pass</p>}
                <button className="BusPassButton" onClick={()=>{setBusPassBox(true)}}>{busPassExist ? 'View Details' : 'Add Bus Pass'}</button>
            </div>
        </>
        
    )
}