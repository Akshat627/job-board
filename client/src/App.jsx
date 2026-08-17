import {
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

import EmployerDashboard
  from "./pages/EmployerDashboard";

import CandidateDashboard
  from "./pages/CandidateDashboard";


function App() {

  return (

    <>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/employer"
          element={
            <EmployerDashboard />
          }
        />

        <Route
          path="/candidate"
          element={
            <CandidateDashboard />
          }
        />

      </Routes>

      <footer>

        <strong>
          JobNest
        </strong>

        <p>
          Find opportunities. Build careers.
        </p>

        <small>
          CODSOFT Internship Project © 2026
        </small>

      </footer>

    </>

  );
}

export default App;
