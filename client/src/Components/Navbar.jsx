import React from 'react'

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark">
            <button onClick={() => props.setPage('home')} type="button" className="btn btn-dark navbtn"> Heartz | Transcriptor
            </button>
            <button onClick={() => props.setPage('model')} type="button" className="btn btn-dark navbtn"> Train Voice Model
            </button>
            <button onClick={() => props.setPage('accuracy')} type="button" className="btn btn-dark navbtn"> Compare Accuracy
            </button>
            <button onClick={() => props.setPage('about')} type="button" className="btn btn-dark navbtn"> About
            </button>
        </nav>
    );
}

export default Navbar