import React from "react";
import logo from "./govtlogo.png";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="text-info">Blood Bank Module</h2>
      </header>
      <footer>
        <div className="container-fliud text-center footer pt-2 mb-0 pb-0">
          <p>
            &copy; {new Date().getFullYear()} Copyright || All right reserved ||
            Powered By :{" "}
            <a className="text-center" href="https://ctechbd.com/">
              Crystal Technology Bangladesh Ltd.
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
