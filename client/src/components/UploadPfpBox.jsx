import { useState } from "react";
import "../assets/stylesheets/UploadPfpBox.css"
import axios from 'axios';

var uploadedFile = null;

export default function UploadPfpBox({setPfpBox}){
    
    const [newPfp, setNewPfp] = useState({});
    const [pfpName, setPfpName] = useState("");
    const [error,setError] = useState();

    const axiosPostData = async() => {

        const postData = {
            'newPfp': uploadedFile,
            'pfpName': pfpName
        }
        console.log(postData)

        axios.post('http://localhost:4000/uploadnewpfp', postData)
        .then((res) => {
            if(res.status == 200 && res.data?.res) {
                if(res.data.auth) setError('<p>Upload Successfull</p>');
                else setError('<p>Upload Failed</p>');
            }

        })
    }

    function handlePfpSubmit(e){
        e.preventDefault();
        if(newPfp == null) return;

        setError('')
        axiosPostData()
    }

    function handlePfpOnChange(e){
        uploadedFile = e.target.files[0]
        // setNewPfp({uploadedFile})
        setPfpName(uploadedFile.name)
    }

    return(
        <>

        <div className="UploadPfpBoxStyle">
            <form onSubmit={handlePfpSubmit}>
                <label>Choose a profile picture</label> <br />
                {uploadedFile && <p>Selected file: {pfpName}</p>}
                <input type="file" name="newPfp" onChange={handlePfpOnChange}accept="image/png" />
                <button type="submit">Submit</button>
            </form><br />
            {error}
            <button onClick={()=>setPfpBox(false)}>Close</button>
        </div>
        </>
    )
}