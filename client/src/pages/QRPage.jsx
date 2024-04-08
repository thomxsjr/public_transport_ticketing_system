import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

export default function QRPage(){

    const [scanResult, setScanResult] = useState(false)
    const [confirmPageRedirect, setConfirmPageRedirect] = useState(false)

    useEffect(()=>{

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 450,
                height: 450
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
                ?
                <div>
                    {/* Success: <a target='blank' href={scanResult}>{scanResult}</a> */}
                    { confirmPageRedirect && <Navigate to={'/rideconfirmation'} />}
                </div>
                :<div id='reader'></div>
                }
                
            </div>
        </>
    )
}