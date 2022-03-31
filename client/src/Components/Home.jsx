import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayPDF from './DisplayPDF'
import Illustration from '../assets/illustration.png'


const Home = ({ Base_URL }) => {
    const [file, setFile] = useState()
    const [url, setURL] = useState()
    const [languages, setLanguages] = useState()
    const [transcriptURL, setTranscriptURL] = useState()

    useEffect(() => {
        document.getElementById('transcript').disabled = true
        document.getElementById('form_1').hidden = false
        document.getElementById('form_2').hidden = true
        document.getElementById('scroll').hidden = true

        axios.get(Base_URL + 'getLanguages')
            .then(res => setLanguages(res.data.split(',')))
            .catch(err => console.log(err))
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if (file) {
            const formData = new FormData()
            formData.append('file', file)

            fetch(Base_URL + 'uploadfile', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (response.ok) {
                    document.getElementById('transcript').disabled = false
                    alert('File uploaded successfully')
                    document.getElementById('form_1').hidden = true
                    document.getElementById('form_2').hidden = false
                } else {
                    throw new Error('Something went wrong')
                }
            }).catch(error => {
                alert(error.message)
            })
        }
        else if (url) {
            fetch(Base_URL + 'uploadurl', {
                method: 'POST',
                body: JSON.stringify({ url: url }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    document.getElementById('transcript').disabled = false
                    document.getElementById('form_1').hidden = true
                    document.getElementById('form_2').hidden = false
                    alert('File uploaded successfully')
                } else {
                    throw new Error('Something went wrong')
                }
            }).catch(error => {
                alert(error.message)
            })
        }
        else
            alert('Please select a file')
    }

    const startTranscript = (e) => {
        e.preventDefault()
        alert('Transcription started...')

        fetch(Base_URL + 'transcript', {
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                document.getElementById('transcript').disabled = true
                loadFile()
                alert('Transcription completed\nScroll down to see the transcript')
            } else {
                throw new Error('Something went wrong')
            }
        }).catch(error => {
            alert(error.message)
        })
    }

    const loadFile = () => {
        fetch(Base_URL + 'getTranscript').then(response => {
            if (response.ok) {
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob)
                    setTranscriptURL(url)
                    document.getElementById('scroll').hidden = false
                })
            } else {
                throw new Error('Something went wrong')
            }
        }).catch(error => {
            alert(error.message)
        })
    }

    const downloadFile = () => {
        if (transcriptURL) {
            let transcript = document.createElement('a')
            transcript.href = transcriptURL
            transcript.download = 'transcript_' + Date.now() + '.pdf'
            transcript.click()
        }
        else
            alert('Transcript not available')
    }

    return (
        <>
            <h1 className='title'><u>Heartz | Transcriptor</u></h1>
            <div className='row' style={{ height: "72vh" }}>
                <div className='col'>
                    <img src={Illustration} alt='Illustration' className='img-fluid' width="50%" />
                </div>

                <div className='col'>
                    <form className="mb-3" id='form_1'>
                        <label htmlFor="formFile" className="form-label">Upload Audio / Video File</label>
                        <input className="form-control" type="file" id="formFile" accept="audio/*,video/*" name="file" onChange={(e) => setFile(e.target.files[0])} />
                        <p className='mt-3'>OR</p>
                        <input className="form-control" type="url" id="formFile" name="url" onChange={(e) => setURL(e.target.value)} placeholder="Enter URL for Audio / Video" />
                        <p align="right">.mp3, .aac, .wav, .m4a, .mp4, .mov, .avi, .mkv</p>
                        <button type="submit" className="btn btn-outline-dark mt-3" onClick={onSubmit}>Upload File</button>
                    </form>

                    <form className='mt-3' id='form_2'>
                        <label htmlFor="lang" className="form-label">Choose Language to Translate Text</label>
                        <select defaultValue={'english'} className="form-select" name='lang' id="inputGroupSelect02">
                            {languages && languages.map((lang, index) => {
                                return <option key={index} value={lang}>{lang}</option>
                            })}
                        </select>
                        {!languages && <p>Loading...</p>}

                        <button type="button" id='transcript' className="btn btn-outline-success mt-5" onClick={startTranscript}> Start Transcription
                        </button>
                    </form>
                </div>
            </div>

            <div id='scroll'>
                <div id="pdf">
                    <DisplayPDF file={transcriptURL} downloadFile={downloadFile} />
                </div>
            </div>
        </>
    )
}

export default Home