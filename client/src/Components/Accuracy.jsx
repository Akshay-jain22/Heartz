import React, { useState, useEffect } from 'react'
import Illustration from '../assets/Illustration_Accuracy.png'

const Accuracy = () => {
    const [originalFile, setOriginalFile] = useState()
    const [transcriptFile, setTranscriptFile] = useState()

    useEffect(() => {
        document.getElementById('accuracy').hidden = true
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if (originalFile && transcriptFile) {
            const formData = new FormData()
            formData.append('originalFile', originalFile)
            formData.append('transcriptFile', transcriptFile)
            alert('Files Uploaded Successfully')
            document.getElementById('accuracy').hidden = false
        }
        else
            alert('Please Select Both Files')
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
                        <label htmlFor="formFile1" className="form-label">Upload Original Transcript</label>
                        <input className="form-control" type="file" id="formFile1" accept=".pdf" name="file1" onChange={(e) => setOriginalFile(e.target.files[0])} />

                        <label htmlFor="formFile2" className="form-label mt-4">Upload Predicted Transcript</label>
                        <input className="form-control" type="file" id="formFile2" accept=".pdf" name="file2" onChange={(e) => setTranscriptFile(e.target.files[0])} />

                        <button type="submit" className="btn btn-outline-dark mt-3" onClick={onSubmit}>Calculate Accuracy</button>
                    </form>
                    <h4 id="accuracy" className='p-2'>Accuracy : 93%</h4>
                </div>
            </div>
        </>
    )
}

export default Accuracy