import React from "react";
import HomeContextContainer from "context-api/HomeContextContainer";
import ProgressSteps from "components/Progresssteps";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <HomeContextContainer>
        <ProgressSteps />
      </HomeContextContainer>
    </div>
  );
};

export default App;
