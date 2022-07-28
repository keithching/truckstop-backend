import React from "react";

import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";

export default function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <p className="App-intro">
        To get started, edit <code>src/App.jsx</code> and save to reload.
      </p>
      <Map id="map" />
    </div>
  );
}
