import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import API from "../api";


function Login() {

  const navigate =
    useNavigate();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  async function login(e) {

    e.preventDefault();

    setError("");


    try {

      const response =
        await API.post(
          "/auth/login",
          {
            email,
            password
          }
        );


      localStorage.setItem(
        "job_token",
        response.data.token
      );


      localStorage.setItem(
        "job_user",
        JSON.stringify(
          response.data.user
        )
      );


      if (
        response.data.user.role ===
        "employer"
      ) {

        navigate(
          "/employer"
        );

      } else {

        navigate(
          "/candidate"
        );

      }
} catch (error) {

  console.error("LOGIN ERROR:", error);
  console.error("STATUS:", error.response?.status);
  console.error("DATA:", error.response?.data);

  setError(
    error.response?.data?.message ||
    error.message ||
    "Login failed"
  );

    }


  return (

    <main className="auth-page">

      <div className="auth-card">

        <div className="auth-icon">
          🔐
        </div>

        <h1>
          Welcome back
        </h1>

        <p>
          Login to continue to JobNest.
        </p>


        <form onSubmit={login}>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={e =>
              setEmail(
                e.target.value
              )
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e =>
              setPassword(
                e.target.value
              )
            }
            required
          />


          {error && (
            <div className="error">
              {error}
            </div>
          )}


          <button
            className="primary-button"
          >
            Login
          </button>

        </form>


        <p className="auth-footer">

          Don't have an account?

          <Link to="/register">
            Create one
          </Link>

        </p>

      </div>

    </main>

  );
}


export default Login;
