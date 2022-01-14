import React, { useEffect, useState } from 'react';
import Login from "./components/login/Login";
import { BrowserRouter as Router } from "react-router-dom";

const userLoggedIn = React.createContext(false);


function App() {



  return (
    <Router>
    <div className="App">
      <Login />
    </div>
    </Router>
  );
}

export default App;
