import React, { useState, useEffect } from 'react'
import Illustration from '../assets/Illustration_Model.png'

const Model = () => {
    const [files, setFiles] = useState()

    useEffect(() => {
        document.getElementById('download').hidden = true
        document.getElementById('upload').disabled = false
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if (files && files.length > 1) {
            const formData = new FormData()
            formData.append('files', files)
            alert('Files Uploaded Successfully')
            document.getElementById('upload').disabled = true
            document.getElementById('download').hidden = false
        }
        else if (files && files.length === 1)
            alert('Please Select More than 1 File')
        else
            alert('Please Select Files')
    }

    const download = () => {
        fetch('http://localhost:5000/getModel')
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = 'Model_' + Date.now() + '.h5'
                a.click()
            }
            )
    }

    return (
        <>
            <h1 className='title'><u>Heartz | Train Voice Model</u></h1>
            <div className='row' style={{ height: "72vh" }}>
                <div className='col'>
                    <img src={Illustration} alt='Illustration' className='img-fluid' width="60%" />
                </div>

                <div className='col mt-5'>
                    <form className="mb-3" id='form_1'>
                        <label htmlFor="formFiles" className="form-label">Upload Voice Samples of Different Speakers</label>
                        <input className="form-control" type="file" id="formFiles" accept="audio/*" name="files" onChange={(e) => setFiles(e.target.files)} multiple />

                        <button type="submit" id='upload' className="btn btn-outline-dark mt-3" onClick={onSubmit}>Train Voice Model</button>
                    </form>

                    <button type="button" id='download' className="btn btn-outline-success mt-3" onClick={download}>Download Voice Model</button>
                </div>
            </div>
        </>
    )
}

export default Model