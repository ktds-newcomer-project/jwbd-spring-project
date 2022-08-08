import React from 'react';
import './App.css'
import Routes from './pages/Routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Navbar />
    <div className="body">
      <Routes />
    </div>
    <Footer />

    </>
      
    
  );
}

export default App;