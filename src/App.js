import React from "react"

import './App.css';
import LeftMenu from "./components/LeftMenu/LeftMenu";
import AnimeList from "./components/AnimeLists/AnimeList";

function App() {

  return (
    <div className="App">
      <LeftMenu />
      <div className="app-anime-list-wrap">
        <AnimeList/>
      </div>
    </div>
  );
}

export default App;