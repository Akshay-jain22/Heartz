import React, {useState} from 'react'
import Illustration from '../assets/Illustration_Livespeech.png'

const LiveSpeech = ({Base_URL}) => {
	const [flag, setFlag] = useState(false)
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	const recognition = new SpeechRecognition()
	recognition.continuous = true;
	recognition.interimResults = false
	let trans = ""
	let abort = false

	

	recognition.addEventListener('result', e => {
		const transcript = Array.from(e.results)
			.map(result => result[0])
			.map(result => result.transcript)
			.join('')

		document.getElementById("print").innerHTML = trans+" " +transcript;
		console.log(transcript);
		trans+=" " + transcript
	})


		

	const change = () =>{
    let elem = document.getElementById("live_speech");
	let elem1 = document.getElementById("status");
    if (elem.innerText ==="Start Live Transcription") 
	{
		recognition.start();
		elem.innerText  = "Stop Live Transcription"
		elem1.innerText  = "Listening..."
	}
    else 
	{
		recognition.abort()
		recognition.onspeechend = () => {
			recognition.stop()
	}
		elem.innerText  = "Start Live Transcription"
		elem1.innerText  = ""
	}
     }



	const handleLiveSpeech = () => {
		change()

	}


	return (
		<>
			<h1 className='title'><u>Live Speech Transcriber</u></h1>
			<div className='row' style={{ height: "72vh" }}>
				<div className='col'>
					<img src={Illustration} alt='Illustration' className='img-fluid' width="65%" />
				</div>

				<div className='col'>
					<div>
						<button type="button" className="btn btn-outline-dark mt-3" id='live_speech' onClick={() => handleLiveSpeech()}>Start Live Transcription</button>
					</div>
					<hr />
					<h4 id='status'></h4>
					<div class='words' contenteditable>
						<p id = "print"></p>
						<p id = "full_transcript"></p>
					</div>
				</div>
			</div>
		</>
	)
}

export default LiveSpeech