import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import API from "../api";

import JobCard
  from "../components/JobCard";


function Home() {

  const [jobs, setJobs] =
    useState([]);


  useEffect(() => {

    API.get("/jobs")
      .then(response => {

        setJobs(
          response.data.slice(
            0,
            6
          )
        );

      })
      .catch(() => {});

  }, []);


  return (

    <main>

      <section className="hero">

        <div>

          <span className="hero-label">
            🚀 Find your next opportunity
          </span>

          <h1>
            Find a job you
            <span> love.</span>
          </h1>

          <p>
            Search thousands of job opportunities
            and connect with companies looking for
            talented people.
          </p>


          <div className="hero-buttons">

            <Link
              to="/jobs"
              className="primary-button"
            >
              Explore Jobs
            </Link>

            <Link
              to="/register"
              className="secondary-button"
            >
              Post a Job
            </Link>

          </div>

        </div>


        <div className="hero-visual">

          <div className="floating-card">
            💼
          </div>

          <div className="hero-stat">

            <strong>
              10,000+
            </strong>

            <span>
              Job Opportunities
            </span>

          </div>

        </div>

      </section>


      <section className="features-section">

        <h2>
          Everything you need
          to build your career
        </h2>


        <div className="features-grid">

          <div className="feature">
            🔎
            <h3>
              Smart Search
            </h3>
            <p>
              Find jobs by title,
              company and location.
            </p>
          </div>

          <div className="feature">
            📄
            <h3>
              Easy Apply
            </h3>
            <p>
              Apply with your resume
              in just a few clicks.
            </p>
          </div>

          <div className="feature">
            🔔
            <h3>
              Application Updates
            </h3>
            <p>
              Track your applications
              and their status.
            </p>
          </div>

          <div className="feature">
            🏢
            <h3>
              For Employers
            </h3>
            <p>
              Post openings and
              manage candidates.
            </p>
          </div>

        </div>

      </section>


      <section className="jobs-section">

        <div className="section-heading">

          <div>

            <span>
              OPPORTUNITIES
            </span>

            <h2>
              Featured Jobs
            </h2>

          </div>

          <Link to="/jobs">
            View all →
          </Link>

        </div>


        <div className="jobs-grid">

          {jobs.map(job => (

            <JobCard
              key={job._id}
              job={job}
            />

          ))}

        </div>

      </section>

    </main>

  );
}


export default Home;
