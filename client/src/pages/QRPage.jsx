import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

export default function QRPage(){

    const [scanResult, setScanResult] = useState(null)

    useEffect(()=>{

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250
            },
            fps: 5
        })

        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result)
        }

        function error(err) {
            console.warn(err)
        }
    },[]);

    return(
        <>
            <div>
                <h1>QR Code Scanner</h1>
                {scanResult
                ?<div>Success: <a href={"https://"+scanResult}>{scanResult}</a></div>
                :<div id='reader'></div>
                }
                
            </div>
        </>
    )
}