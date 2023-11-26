import React from "react";
import "./App.css";
import HomeContextContainer from "context-api/HomeContextContainer";
import ProgressSteps from "components/Progresssteps";

function App() {
  return (
    <div className="App">
      <HomeContextContainer>
        <ProgressSteps />
      </HomeContextContainer>
    </div>
  );
}

export default App;
