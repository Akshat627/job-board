import {
  useEffect,
  useState
} from "react";

import API from "../api";

import JobCard
  from "../components/JobCard";


function Jobs() {

  const [jobs, setJobs] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [jobType, setJobType] =
    useState("");


  async function loadJobs() {

    try {

      const response =
        await API.get(
          "/jobs",
          {
            params: {
              search,
              location,
              jobType
            }
          }
        );

      setJobs(
        response.data
      );

    } catch (error) {

      console.error(error);

    }
  }


  useEffect(() => {

    loadJobs();

  }, []);


  return (

    <main className="page-container">

      <div className="page-title">

        <span>
          OPPORTUNITIES
        </span>

        <h1>
          Find your next job
        </h1>

        <p>
          Search through available
          opportunities.
        </p>

      </div>


      <div className="search-box">

        <input
          placeholder="🔎 Job title, company or skill"
          value={search}
          onChange={e =>
            setSearch(
              e.target.value
            )
          }
        />

        <input
          placeholder="📍 Location"
          value={location}
          onChange={e =>
            setLocation(
              e.target.value
            )
          }
        />

        <select
          value={jobType}
          onChange={e =>
            setJobType(
              e.target.value
            )
          }
        >

          <option value="">
            All Job Types
          </option>

          <option>
            Full Time
          </option>

          <option>
            Part Time
          </option>

          <option>
            Internship
          </option>

          <option>
            Contract
          </option>

          <option>
            Remote
          </option>

        </select>


        <button
          className="primary-button"
          onClick={loadJobs}
        >
          Search
        </button>

      </div>


      <div className="jobs-grid">

        {jobs.length > 0 ? (

          jobs.map(job => (

            <JobCard
              key={job._id}
              job={job}
            />

          ))

        ) : (

          <div className="empty">

            <h2>
              No jobs found
            </h2>

            <p>
              Try another search.
            </p>

          </div>

        )}

      </div>

    </main>

  );
}


export default Jobs;
