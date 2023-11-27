// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeContextContainer from "context-api/HomeContextContainer";
import TaxProgress from "components/TaxProgress";
import PrivateRoutes from "lib/ProtectedRoute";
import { ROUTES } from "constants/routes";
import Signin from "pages/signin/Signin";

const App: React.FC = () => {
  return (
    <div className="App">
      <HomeContextContainer>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path={ROUTES.Index.path} element={<TaxProgress />} />
            </Route>

            {/* Use the extended CustomRouteProps for the Route element */}
            <Route path={ROUTES.Auth.path} element={<Signin />} />
          </Routes>
        </Router>
      </HomeContextContainer>
    </div>
  );
};

export default App;
