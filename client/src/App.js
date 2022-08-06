import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Model from './Components/Model';
import Accuracy from './Components/Accuracy';
import About from './Components/About';
import Docs from './Components/Docs';

function App() {
  const [page, setPage] = useState('home');
  const Base_URL = "http://localhost:5000/";

  let renderPage = null;
  switch (page) {
    case 'home':
      renderPage = <Home Base_URL={Base_URL} />;
      break;
    case 'model':
      renderPage = <Model />;
      break;
    case 'accuracy':
      renderPage = <Accuracy />;
      break;
    case 'about':
      renderPage = <About />;
      break;
    case 'docs':
      renderPage = <Docs />;
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
