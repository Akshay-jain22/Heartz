import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import ViewNotes from './Components/ViewNotes';
import LiveSpeech from './Components/LiveSpeech';
import Accuracy from './Components/Accuracy';
import About from './Components/About';


function App() {
  const [page, setPage] = useState('home');
  const Base_URL = "http://localhost:5000/";

  let renderPage = null;
  switch (page) {
    case 'home':
      renderPage = <Home Base_URL={Base_URL} />;
      break;
    case 'view_notes':
      renderPage = <ViewNotes Base_URL={Base_URL} />;
      break;
    case 'live_speech':
      renderPage = <LiveSpeech Base_URL={Base_URL} />;
      break;
    case 'accuracy':
      renderPage = <Accuracy Base_URL={Base_URL} />;
      break;
    case 'about':
      renderPage = <About />;
      break;
    default:
      renderPage = <Home Base_URL={Base_URL} />;
  }

  return (
    <div className="App">
      <Navbar setPage={setPage} />
      <div className="container main">
        {renderPage}
      </div>
    </div>
  );
}

export default App;
