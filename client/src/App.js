import React, { useState, useEffect } from "react";
import Home from "./Components/Home";
import Navigation from "./Components/Navigation";

function App() {
  return (
    <React.Fragment>
      <Navigation />
      <Home />
    </React.Fragment>
  );
}

export default App;
