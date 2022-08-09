import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./index.css"
import {
  RecoilRoot
} from 'recoil';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />   
//     </BrowserRouter>
//   </React.StrictMode>
// );

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <App />   
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>, document.getElementById('root')
  );