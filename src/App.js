import React from "react";
import PathFinder from "./components/PathFinder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithubSquare } from "@fortawesome/free-brands-svg-icons";
import "./App.css";

function App() {
  return (
    <div className="App">
      <PathFinder />
      <footer>
        <a href="http://linkedin.com/in/johnsonphan95">
          <FontAwesomeIcon id="icon" icon={faLinkedin}></FontAwesomeIcon>
        </a>
        <a href="http://github.com/johnsonphan95">
          <FontAwesomeIcon id="icon" icon={faGithubSquare}></FontAwesomeIcon>
        </a>
        <div>
          TO ADD WALLS OR WEIGHTED NODES JUST LEFT CLICK AND DRAG
          <br />
          <br />
          TO MOVE THE START OR END NODE JUST LEFT CLICK AND MOVE
        </div>
      </footer>
    </div>
  );
}

export default App;
