import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

const { myAPI } = window;

function App() {
  const [text, setText] = useState("not loaded");

  useEffect(() => {
    const f = async () => {
      setText("loading...");
      try {
        const dirs = await myAPI.readDir();
        myAPI.save("uni-uni");
        setText(`files are: ${dirs.join(", ")}`);
      } catch (e) {
        setText("loading was failed");
        alert(e);
      }
    };
    f();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          {text}
        </p>
      </header>
    </div>
  );
}

export default App;
