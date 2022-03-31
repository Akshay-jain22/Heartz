import './App.css';
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Model from './Components/Model';
import Accuracy from './Components/Accuracy';
import About from './Components/About';

function App() {
  const [page, setPage] = useState('home');

  let renderPage = null;
  switch (page) {
    case 'home':
      renderPage = <Home />;
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
    default:
      renderPage = <Home />;
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
