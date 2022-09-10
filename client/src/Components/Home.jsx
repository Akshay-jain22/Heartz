import React, { useState, useEffect } from 'react'
import Illustration from '../assets/Illustration_Home.png'


const Home = ({ Base_URL }) => {
    const [file, setFile] = useState()
    const [languages, setLanguages] = useState()
    const [email, setEmail] = useState('')
    const [Session_ID, setSession_ID] = useState('');
    const [translation_lang, setTranslation_lang] = useState('english');
    const [chk_hyperlink, setChk_hyperlink] = useState(false);
    const [chk_summary, setChk_summary] = useState(false);
    const [chk_multiple_speaker, setChk_multiple_speaker] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        document.getElementById('form_2').hidden = true
        document.getElementById('form_1').hidden = false
        document.getElementById('upload_status').hidden = true
        document.getElementById('transcript').disabled = true
        
        fetch(Base_URL + 'getLanguages')
            .then(res => res.json())
            .then(data => setLanguages(data['languages']))
            .catch(err => console.log(err))
    }, [])

    const isValidYoutubeURL = (url) => {
        const regExp = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?/;
        return url.match(regExp);
    }


    const uploadFile = (e) => {
        e.preventDefault()
        console.log(isValidYoutubeURL(url))
        if (file || isValidYoutubeURL(url)) {
            const formData = new FormData()
            if(file) formData.append('file', file)
            else formData.append('url', url)
            document.getElementById('upload_status').hidden = false
            document.getElementById('upload').disabled = true

            fetch(Base_URL + 'uploadfile', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data['Session_ID'])
                if('Error' in data) {
                    alert(data['Error'])
                    document.getElementById('upload_status').hidden = true
                    document.getElementById('upload').disabled = false
                    return
                }

                setSession_ID(data['Session_ID'])

                document.getElementById('transcript').disabled = false
                document.getElementById('upload_status').hidden = true
                document.getElementById('upload').disabled = false

                alert('File uploaded successfully')
                document.getElementById('form_1').hidden = true
                document.getElementById('form_2').hidden = false
            }).catch(error => {
                document.getElementById('upload_status').hidden = true
                document.getElementById('upload').disabled = false
                alert(error.message)
            })
        }
        else
            alert('Please select a file or Enter a valid Youtube URL')
    }

    const resetState = () => {
        setFile(null)
        document.getElementById('form_2').hidden = true
        document.getElementById('form_1').hidden = false
        
        document.getElementById('transcript').disabled = true
    }

    const isEmailValid = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const startTranscript = (e) => {
        e.preventDefault()
        let Data = { 'Session_ID': Session_ID, 'translate_language' : translation_lang, 'chk_hyperlink' : chk_hyperlink, 'chk_summary' : chk_summary, 'chk_multiple_speaker' : chk_multiple_speaker }

        if (isEmailValid(email)) 
            Data.append('email', email.toLowerCase())
        else if(email !== '' && email !== null)
            alert('Please enter a valid email')
        
        fetch(Base_URL + 'transcript', {
            body: JSON.stringify(Data),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            if (response.ok) {
                document.getElementById('modalbtn').click()
                resetState()
            } else {
                throw new Error('Something went wrong')
            }
        })
        .then(() => resetState())
        .catch(error => {
            alert(error.message)
        })
    }

    return (
        <>
            <h1 className='title'><u>Heartz | Notes Maker</u></h1>
            <div className='row' style={{ height: "72vh" }}>
                <div className='col'>
                    <img src={Illustration} alt='Illustration' className='img-fluid' width="50%" />
                </div>

                <div className='col'>
                    <form className="mt-5" id='form_1'>
                        <label htmlFor="formFile" className="form-label">Upload Audio / Video File</label>
                        <input className="form-control" type="file" id="formFile" accept="audio/*,video/*" name="file" onChange={(e) => setFile(e.target.files[0])} />
                        <p align="right">.mp3, .aac, .wav, .m4a, .mp4, .mov, .avi, .mkv</p>
                        <p>OR</p>
                        <label htmlFor="formFile" className="form-label">Enter Youtube URL</label>
                        <input className="form-control" type="text" id="url" name="url" onChange={(e) => setUrl(e.target.value)} />
                        <button type="submit" className="btn btn-outline-dark mt-3" id='upload' onClick={uploadFile}>Upload File</button>
                    </form>

                    <form className='mt-3' id='form_2'>
                        <label htmlFor="lang" className="form-label">Choose Language to Translate Text</label>
                        <select value={translation_lang} onChange={(e) => setTranslation_lang(e.target.value)}  className="form-select" name='lang' id="language">
                            {languages && languages.map((lang, index) => {
                                return <option key={index} value={lang}>{lang}</option>
                            })}
                        </select>
                        
                        <div  className="d-flex justify-content-between mt-4">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="check_hyperlinks" onChange={(e) => setChk_hyperlink(e.target.value)}/>
                                <label className="form-check-label" htmlFor="check_hyperlinks">Hyperlinks</label>
                            </div>

                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="check_summary" onChange={(e) => setChk_summary(e.target.value)}/>
                                <label className="form-check-label" htmlFor="check_summary">Summary</label>
                            </div>
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" id="check_multiplespeakers" onChange={(e) => setChk_multiple_speaker(e.target.value)}/>
                                <label className="form-check-label" htmlFor="check_multiplespeakers">Multiple Speakers</label>
                            </div>
                        </div>
                        <hr />

                        <label htmlFor="email" className="form-label">Enter your Email ID (Optional)</label>
                        <input className="form-control" type="mail" id="email" name="email" onChange={(e) => setEmail(e.target.value)} />


                        <button type="button" id='transcript' className="btn btn-outline-success mt-5" onClick={startTranscript}> Start Transcription
                        </button>
                    </form>
                    <div id='upload_status'>
                        <br />
                        <h4>Uploading ...</h4>
                    </div>
                </div>
            </div>

            <button type="button" className="btn btn-primary" id='modalbtn' data-bs-toggle="modal" data-bs-target="#popupModal" hidden>
            Get Session ID
            </button>

            <div className="modal fade" id="popupModal" tabIndex="-1" aria-labelledby="popupModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="popupModalLabel">Transcription Started</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Save the Session ID to access the Notes</p>
                            <p>Session ID : {Session_ID}</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home