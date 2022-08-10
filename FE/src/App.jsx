import React from 'react';
import './App.css'
import Routes from './pages/Routes'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useStore } from './states.js'


function App() {

  const { userToken } = useStore();
  
  return (
    <>
    { (userToken || localStorage.getItem("isLogin")) ?
    <>
      <Navbar />
      <div className="body">
        <Routes />
      </div>
    </>
    :
    <div>
      <Routes />
    </div>
    }

    <div style={{height: "100%"}}>
      <Footer />
    </div>

    </>

    
  );
}

export default App;