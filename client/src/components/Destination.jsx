import '../assets/stylesheets/Destination.css'


export default function Destination() {

    function handleSubmit(event) {
        event.preventDefault()
    }

    return(
        <>
        <div className='mainContainer'>
            <div className='box'>
                <form onSubmit={handleSubmit}>
                    <label className='labelStyle'>From</label> <br />
                    <input className='destinationInput' type="text" /> <br />
                    <label className='labelStyle'>To</label> <br />
                    <input className='destinationInput' type="text" /> <br /><br />
                    <button className="submitButton"type='submit'>Submit</button>
                </form>
            </div>
        </div>
        </>
    )
}