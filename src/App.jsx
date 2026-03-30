import ExitPage from "./components/ExitPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import ResultLock from "./components/ResultLock";
import TestPage from "./components/TestPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import ResultPage from "./components/ResultPage";
import ResultAnalysis from "./components/ResultAnalysis";
import LoginConfirmation from "./components/LoginConfirmation";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/main"
            element={
              // <ProtectedRoutes>
              <MainPage />
              // </ProtectedRoutes>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoutes>
                <TestPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/result-page"
            element={
              <ProtectedRoutes>
                <ResultPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/exit"
            element={
              <ProtectedRoutes>
                <ExitPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/result-lock"
            element={
              <ProtectedRoutes>
                <ResultLock />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoutes>
                <ResultAnalysis />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/confirmation"
            element={
              // <ProtectedRoutes>
              <LoginConfirmation />
              // </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
