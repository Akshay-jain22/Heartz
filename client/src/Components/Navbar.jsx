import React from 'react'
import SIHLogo from '../assets/SIH2022.png'

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark">
            <button onClick={() => props.setPage('home')} type="button" className="btn btn-dark navbtn p-1"> Heartz | Notes Maker
            </button>
            <button onClick={() => props.setPage('view_notes')} type="button" className="btn btn-dark navbtn"> View Notes
            </button>
            <button onClick={() => props.setPage('live_speech')} type="button" className="btn btn-dark navbtn"> Live Speech
            </button>
            <button onClick={() => props.setPage('accuracy')} type="button" className="btn btn-dark navbtn"> Calculate Accuracy
            </button>
            <button onClick={() => props.setPage('about')} type="button" className="btn btn-dark navbtn"> About
            </button>
            
            <img src={SIHLogo} style={{ height: '7vh', marginLeft: 'auto', marginRight: '20px' }}></img>
        </nav>
    );
}

export default Navbar