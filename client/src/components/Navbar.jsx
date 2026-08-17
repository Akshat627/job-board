import {
  Link,
  useNavigate
} from "react-router-dom";


function Navbar() {

  const navigate =
    useNavigate();


  const token =
    localStorage.getItem(
      "job_token"
    );


  const user =
    JSON.parse(
      localStorage.getItem(
        "job_user"
      ) || "null"
    );


  function logout() {

    localStorage.removeItem(
      "job_token"
    );

    localStorage.removeItem(
      "job_user"
    );

    navigate("/");

    window.location.reload();
  }


  return (

    <nav className="navbar">

      <Link
        to="/"
        className="brand"
      >
        💼 <span>JobNest</span>
      </Link>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/jobs">
          Find Jobs
        </Link>


        {token &&
          user?.role ===
          "employer" && (

          <Link to="/employer">
            Employer Dashboard
          </Link>

        )}


        {token &&
          user?.role ===
          "candidate" && (

          <Link to="/candidate">
            My Dashboard
          </Link>

        )}


        {!token && (

          <>

            <Link to="/login">
              Login
            </Link>

            <Link
              to="/register"
              className="nav-button"
            >
              Get Started
            </Link>

          </>

        )}


        {token && (

          <button
            className="logout"
            onClick={logout}
          >
            Logout
          </button>

        )}

      </div>

    </nav>

  );
}


export default Navbar;
