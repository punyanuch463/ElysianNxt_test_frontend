import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shortener from "./components/Shortener";
import History from "./components/History";
import RedirectPage from "./components/RedirectPage";
import { AppContainer } from "./styles/App.styles";

const App: React.FC = () => {
  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Shortener />
                <History />
              </>
            }
          />
          <Route path="/:id" element={<RedirectPage />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
