import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';
import RideConfirmation from './RideConfirmation';

export default function QRPage(){

    const [scanResult, setScanResult] = useState(false)
    const [rideConfirmBox, setRideConfirmBox] = useState(false)

    useEffect(()=>{

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 450,
                height: 450
            },
            fps: 20,
        })

        scanner.render(success, error);

        function success(result) {
            setScanResult(result)
            setRideConfirmBox(true)
            scanner.clear();
            
        }

        function error(err) {
            console.warn(err)
        }
    },[]);
    
    return(
    
            <div>
                <h1>QR Code Scanner</h1>
                {rideConfirmBox
                ?
                <div>
                    <RideConfirmation link = {scanResult} />
                </div>
                :<div id='reader'></div>
                }
                
            </div>
        
    )
}