import React from 'react';
import './App.css'
import Routes from './pages/Routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'



function App() {

  
  return (
    <>
    { (localStorage.getItem("isLogin")) ?
    <Navbar />
    :
    null
    }

    <div className="body">
      <Routes />
    </div>
    <Footer />

    </>

    
  );
}

export default App;