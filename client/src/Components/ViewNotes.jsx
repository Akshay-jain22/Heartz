import React, { useState, useEffect } from 'react'
import Illustration from '../assets/Illustration_Model.png'

const ViewNotes = ({Base_URL}) => {
    const [status, setStatus] = useState('');
    const [notes_id, setNotes_id] = useState('')
    const [notes_url, setNotes_url] = useState()
    const [Confidence, setConfidence] = useState('')

    useEffect(() => {
        document.getElementById('download').hidden = true
        document.getElementById('check_status').disabled = false
        document.getElementById('status').hidden = true
        document.getElementById('rerun').hidden = true
    }, [])


    const onSubmit = (e) => {
        e.preventDefault()
        if (notes_id !== '') {
            let data = { 'Session_ID' : notes_id }
            console.log(data)
            document.getElementById('check_status').disabled = true
            document.getElementById('rerun').hidden = true
            fetch(Base_URL + 'getStatus', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then(res => res.json())
            .then(data => {
                setStatus(data['Status'])
                document.getElementById('status').hidden = false   
                if(data['Status'] === 'Completed') getNotesUrl()
                if(data['Status'] === 'Something went wrong') document.getElementById('rerun').hidden = false
                document.getElementById('check_status').disabled = false
            }).catch(error => {
                document.getElementById('check_status').disabled = false
                alert(error.message)
            })
        }
        else
            alert('Please Enter Your Notes ID')
    }

    const getNotesUrl = () => {
        console.log(notes_id)
        let data = { 'Session_ID': notes_id }
        fetch(Base_URL + 'getTranscript', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(response => response.json())
            .then(data => {
                if('Error' in data){
                    alert(data['Error'])
                    return
                }

                setNotes_url(data['Link'])
                setConfidence(data['Confidence'])
                document.getElementById('download').hidden = false
                document.getElementById('check_status').disabled = false
            }).catch(error => alert(error.message))
    }

    const reRun = () => {
        if(notes_id !== ''){
            let data = { 'Session_ID': notes_id }
            fetch(Base_URL + 'rerun', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(response => {
                    console.log(response)
                    document.getElementById('check_status').disabled = false
                    document.getElementById('rerun').hidden = true
                })
                .catch(error => alert(error.message))
        }
        else
            alert('Please Enter Your Notes ID')
    }

    return (
        <>
            <h1 className='title'><u>Heartz | View Notes</u></h1>
            <div className='row' style={{ height: "72vh" }}>
                <div className='col'>
                    <img src={Illustration} alt='Illustration' className='img-fluid' width="60%" />
                </div>

                <div className='col mt-5'>
                    <form className="mb-3" id='form_1'>
                        <label htmlFor="session_id" className="form-label">Enter Your Notes ID</label>
                        <input className="form-control" type="mail" id="session_id" name="session_id" onChange={(e) => setNotes_id(e.target.value)} />

                        <button type="submit" id='check_status' className="btn btn-outline-dark mt-3" onClick={onSubmit}>Check Status</button>
                    </form>

                    <div className='mt-3' id='status'> 
                        <h5>Status: {status}</h5>
                    </div>


                    <div id="download">
                        <a href={notes_url} target='_blank' className="btn btn-outline-success mt-3" rel='noreferrer'>View Notes</a>
                        <br />
                        <br />
                        <h5>Confidence: {Confidence}</h5>
                        <hr />
                    </div>

                    <div id="rerun">
                        <button type="submit" id='rerun_btn' className="btn btn-outline-danger mt-3" onClick={reRun}>Run Again</button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default ViewNotes