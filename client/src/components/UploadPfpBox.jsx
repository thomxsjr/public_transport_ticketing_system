import { useState } from "react";
import "../assets/stylesheets/UploadPfpBox.css"

export default function UploadPfpBox({setPfpBox}){
    
    const [newPfp, setNewPfp] = useState();
    const [error,setError] = useState();
    const [redirect, setRedirect] = useState(false);

    const axiosPostData = async() => {

        const postData = {
            newPfp: newPfp
        }

        axios.post('http://localhost:4000/uploadnewpfp', postData)
        .then((res) => {
            if(res.status == 200 && res.data?.res) {
                if(res.data.auth) 
                    setRedirect(true);
                else
                setError('Upload Failed');
            }

        })
    }

    function handlePfpSubmit(e){
        e.preventDefault();

        setError('')
        axiosPostData()
    }

    return(
        <>
        { redirect && <Navigate to='/dashboard'/>}
        <div className="UploadPfpBoxStyle">
            <form onSubmit={handlePfpSubmit}>
                <label>Choose a profile picture</label> <br />
                {newPfp}
                <input type="file" name="newPfp" value={newPfp} onChange={(e) => setNewPfp(e.target.files[0])} accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/webp"/>
                <button type="submit">Submit</button>
            </form><br />
            {error}
            <button onClick={()=>setPfpBox(false)}>Close</button>
        </div>
        </>
    )
}