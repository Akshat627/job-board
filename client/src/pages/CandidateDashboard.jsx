import {
  useEffect,
  useState
} from "react";

import API from "../api";


function CandidateDashboard() {

  const [applications, setApplications] =
    useState([]);


  useEffect(() => {

    API.get(
      "/applications/candidate"
    )
      .then(response => {

        setApplications(
          response.data
        );

      });

  }, []);


  return (

    <main className="page-container">

      <div className="page-title">

        <span>
          CANDIDATE DASHBOARD
        </span>

        <h1>
          My Applications
        </h1>

        <p>
          Track your job applications.
        </p>

      </div>


      <div className="dashboard-list">

        {applications.length === 0 ? (

          <div className="empty">

            <h2>
              No applications yet
            </h2>

            <p>
              Start applying for jobs
              to see them here.
            </p>

          </div>

        ) : (

          applications.map(application => (

            <div
              className="application-card"
              key={application._id}
            >

              <div>

                <h3>
                  {application.job.title}
                </h3>

                <p>
                  {application.job.company}
                </p>

                <small>
                  📍
                  {application.job.location}
                </small>

              </div>


              <span
                className={
                  `status ${application.status
                    .toLowerCase()
                    .replace(" ", "-")}`
                }
              >
                {application.status}
              </span>

            </div>

          ))

        )}

      </div>

    </main>

  );
}


export default CandidateDashboard;
