import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/stylesheets/Dashboard.css"
import Header from '../components/Header'
import Destination from '../components/Destination'
import BusPass from "../components/BusPass";
import { Navigate } from "react-router-dom";
import QRCode from 'qrcode'


export default function Dashboard() {

    const [busPassBox, setBusPassBox] = useState(false)
    const [QRPage, setQRPage] = useState(false)
    const [busPassExist, setBusPassExist] = useState()
    const [validity, setValidity] = useState()
    const [driver, setDriver] = useState()
    const [name, setName] = useState()
    const [licenseNumber, setLicenseNumber] = useState()
    const [vehicleModel, setVehicleModel] = useState()
    const [vehicleType, setVehicleType] = useState()
    const [numberPlate, setNumberPlate] = useState()
    const [rate, setRate] = useState()
    const [driverRideHistory, setDriverRideHistory] = useState()
    const [rideHistory, setRideHistory] = useState()
    const [uid, setuid] = useState()

    const [url, setUrl] = useState()
    const [qrcode, setQrcode] = useState()


    const GenerateQRCode = ()=>{
        QRCode.toDataURL(url,{
            width: 800,
            margin: 2
        }, (err, url)=>{
            if (err) return console.error(err)

            console.log(url)
            setQrcode(url)
        })
    }

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
                setuid(res.data.uid)
                setBusPassExist(res.data.buspass.exist)
                setValidity(res.data.buspass.details.validity)
                setDriver(res.data.isDriver)
                setRideHistory(res.data.rideHistory)

                // if(driver){
                    setName(res.data.driverdetails.name)
                    setLicenseNumber(res.data.driverdetails.licensenumber)
                    setRate(res.data.driverdetails.rate)
                    setNumberPlate(res.data.driverdetails.vehicledetails.numberplate)
                    setVehicleModel(res.data.driverdetails.vehicledetails.vehiclemodel)
                    setVehicleType(res.data.driverdetails.vehicledetails.vehicletype)
                    setDriverRideHistory(res.data.driverRideHistory)
                    console.log(driverRideHistory)
                    // DriverRideHistoryList = Object.keys(driverRideHistory).map(key => {
                    //     return <p>{key.date}</p>
                    // });
    
                // }

            }
        })
        .catch(err => console.log(err))
    }


    return(
        <>
            { busPassBox ? <BusPass setBusPassBox={setBusPassBox} /> : null}
            { QRPage && <Navigate to={'/qrpage'} />}
            <Header />
            < Destination />
            
                
            {rideHistory==null ? null : 
                <div className="HistoryBox">
                    <h1>Ride History</h1>
                    { Object.keys(rideHistory).map(key => 
                    <>
                        
                        <h3>{rideHistory[key].date}</h3>
                        <p>Cost: {rideHistory[key].rideCost}</p>
                        <p>Payment Method: {rideHistory[key].paymentMethod}</p>
                        <p>Time: {rideHistory[key].time}</p>
                        <p>Status: {rideHistory[key].status}</p>
                        <p>Vehicle: {rideHistory[key].vehicletype}</p>

                    </>
                ) }  
                </div>
            }
                 
            {driver ? 
            <div>
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
            </div> 
            <div className="qrcodegen">
                <h1>QR Code Generator</h1>
                <button onClick={()=>
                {setUrl(`http://localhost:4000/rideinit/${uid}`)
                console.log(url)
                GenerateQRCode()}
                }>Generate QR Code</button>
                {qrcode && 
                <>
                    <img src={qrcode} />
                    <a href={qrcode} download="qrcode.png"><button>Download</button></a>
                </>
                }
            </div>
            <div className="HistoryBox">
                <h1>Driver Ride History</h1>
                { Object.keys(driverRideHistory).map(key => 
                <>
                    <h3>{driverRideHistory[key].date}</h3>
                    <p>Cost: {driverRideHistory[key].rideCost}</p>
                    <p>Payment Method: {driverRideHistory[key].paymentMethod}</p>
                    <p>Time: {driverRideHistory[key].time}</p>
                    <p>Status: {driverRideHistory[key].status}</p>
                </>
                ) }          
            
            </div>
            </div>
            : null}
            
            <div className="BusPassBox">
                <h1 className="BusPassText">Bus Pass</h1>
                {busPassExist ? <p className="BusPassText">valid till {validity}</p>: <p className="BusPassText">No Active Bus Pass</p>}
                <button className="BusPassButton" onClick={()=>{setBusPassBox(true)}}>{busPassExist ? 'View Details' : 'Add Bus Pass'}</button>
            </div>
            <div onClick={()=>setQRPage(true)} className="qr-scanner">
                <h2>Scan</h2>
            </div>
            <br /><br /><br /><br /><br /><br />
        </>
        
    )
}