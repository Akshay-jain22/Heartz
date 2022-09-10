import React, { useState, useEffect } from 'react'
import Illustration from '../assets/Illustration_Accuracy.png'

const Accuracy = ({Base_URL}) => {
    const [notes_id, setNotes_id] = useState('')
    const [transcriptFile, setTranscriptFile] = useState()
    const [accuracies, setAccuracies] = useState([])

    useEffect(() => {
        document.getElementById('res').hidden = true
    }, [])

    const getAccuracy = () => {    
        const formdata = new FormData()
        formdata.append('Session_ID', notes_id)
        formdata.append('transcriptFile', transcriptFile)
        fetch(Base_URL + 'getAccuracy', {
            method: 'POST',
            body: formdata
        })
        .then(res => res.json())
        .then(data => {
            setAccuracies(data['accuracies'])
            document.getElementById('res').hidden = false
        })
        .catch(error => alert(error.message))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (notes_id !== '' && transcriptFile) {

            fetch(Base_URL + 'getStatus', {
                method: 'POST',
                body: JSON.stringify({ 'Session_ID': notes_id }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data['Status'] !== 'Completed'){
                    document.getElementById('res').innerHTML = 'Please wait for the transcription to complete'
                    document.getElementById('res').hidden = false
                }
                else{
                    getAccuracy()
                }
            }).catch(error => {
                alert(error.message)
            })
        }
        else
            alert('Please fill all the fields')
    }

    return (
        <>
            <h1 className='title'><u>Heartz | Calculate Accuracy</u></h1>
            <div className='row' style={{ height: "72vh" }}>
                <div className='col'>
                    <img src={Illustration} alt='Illustration' className='img-fluid' width="55%" />
                </div>

                <div className='col mt-2'>
                    <form className="mb-3" id='form_1'>
                        <label htmlFor="session_id" className="form-label">Enter Your Notes ID</label>
                        <input className="form-control" type="mail" id="session_id" name="session_id" onChange={(e) => setNotes_id(e.target.value)} />

                        <label htmlFor="formFile2" className="form-label mt-4">Upload Predicted Transcript (.txt)</label>
                        <input className="form-control" type="file" id="formFile2" accept=".txt" name="file2" onChange={(e) => setTranscriptFile(e.target.files[0])} />

                        <button type="submit" className="btn btn-outline-dark mt-3" onClick={onSubmit}>Calculate Accuracy</button>
                    </form>

                    <h5 id="res" className='p-2'>
                        <hr />
                        {accuracies.length > 0 ? accuracies.map((accuracy, index) => {
                            return (
                                <div key={index}>
                                    <p>{accuracy[0]} : {accuracy[1]}</p>
                                </div>
                            )
                        }): null}
                        <hr />
                    </h5>
                </div>
            </div>
        </>
    )
}

export default Accuracy