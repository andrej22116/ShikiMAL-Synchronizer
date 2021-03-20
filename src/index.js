import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import EventEmitter from "events";

(function(){
  if ( window.opener ) {
    window.opener.emitter.emit(`auth-${window.name}`, new URLSearchParams(window.location.search).get('code'));
    window.close();
    return;
  }

  window.emitter = new EventEmitter();
  /*window.emitter.on('auth-shikimori', params => {
    //alert(params.get('code'));
  });*/

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
})();



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
