import React from "react"

import './App.css';
import MyAnimeListAuthBlock from "./components/Auth/MyAnimeListAuthBlock";
import ShikimoriAuthBlock from "./components/Auth/ShikimoriAuthBlock";

function App() {

  return (
    <div className="App">
      <ShikimoriAuthBlock/>
      <MyAnimeListAuthBlock/>
    </div>
  );
}

export default App;