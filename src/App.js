import React, {useEffect} from "react"
import GlobalStore from "./store/GlobalStore";
//import axios from "axios";

import './App.css';
import OauthWindow from "./api/OauthWindow";
import ShikimoriAuthBlock from "./components/Auth/ShikimoriAuthBlock";

function App() {

  useEffect(() => {
    /*if ( window.location.search.length > 0) { return; }
    axios.get(`https://shikimal.000webhostapp.com/oauth2.php?redirect=${'https://localhost:3000'}`)
    .then(request => {
      console.log(request.data.redirect);
      return decodeURIComponent(request.data.uri)
    })
    .then(url => {
      test = window.open(url,'shikimori', 'height=670,width=1400,toolbar=no,menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no');
      console.log(test);
    })
    .catch(err => console.error(err));*/
    
    /*axios.get(`https://shikimal.000webhostapp.com/oauth2.php?redirect=${encodeURIComponent(window.location.host)}`, {
      responseType: 'json'
    })
    .then(request => decodeURIComponent(request.data.uri))
    .then(url => window.location.href = url)
    .catch(err => console.log('Err: ', err));*/
    /*const shikiAuth = new OuathClient('shikimori');
    shikiAuth.authorize();*/

    //let test = new OauthWindow("test", "https://localhost:3000");
    
    /*window.emitter.on('auth-shikimori', code => {
      //shikimoriOauthClient.token(code);
    });*/
    //shikimoriOauthClient.token();
    /*shikimoriOauthClient.token().then( token => {
      if ( !token ) {
        shikimoriOauthClient.authorize();
      }
      else {
        console.log(token);
      }
    });*/
    
    console.log(`${window.location.protocol}//${window.location.host}`);
  })

  return (
    <div className="App">
      <ShikimoriAuthBlock/>
    </div>
  );
}

export default App;

/* https://shikimori.one/oauth/authorize?state=3416097311d304155bbe3027b062434c&response_type=code&approval_prompt=auto&redirect_uri=https://shikimal.000webhostapp.com/index.php */
/* https://shikimori.one/oauth/authorize?state=6c748e1cc8ffc182ee43143fae2fcfbf&response_type=code&approval_prompt=auto&redirect_uri=https://andrej22116.byethost5.com/oauth2.php */