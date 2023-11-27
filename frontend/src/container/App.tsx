import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import RouteProps
import HomeContextContainer from "context-api/HomeContextContainer";
import TaxProgress from "components/TaxProgress";
import { ProtectedRoute } from "lib/ProtectedRoute";
import { ROUTES } from "constants/routes";
import Signin from "pages/signin/Signin";

const App = (): JSX.Element => {
  return (
    <div className="App">
      <HomeContextContainer>
        <Router>
          <Routes>
            <ProtectedRoute path={ROUTES.Index.path}>
              <TaxProgress />
            </ProtectedRoute>

            {/* Use the extended CustomRouteProps for the Route component */}
            <Route path={ROUTES.Auth.path}>
              <Signin />
            </Route>
          </Routes>
        </Router>
      </HomeContextContainer>
    </div>
  );
};

export default App;
