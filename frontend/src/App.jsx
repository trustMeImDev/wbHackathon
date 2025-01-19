  import { Route, Routes } from "react-router";
  import { Login } from "./pages/Login";
  import { LandingPage } from "./pages/LandingPage";
  import FileSummary from "./pages/FileSummary";
  import { Authenticated } from "./pages/Authenticated";
  import ProtectedRoute from "./components/protected-route";
  import { Home } from "./pages/Home";
  import Directory from "./pages/Directory";

  function App() {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/directory" element={<Directory />}>
      </Route>

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/authenticated" element={<Authenticated />} />
      </Routes>
    );
  }

  export default App;
