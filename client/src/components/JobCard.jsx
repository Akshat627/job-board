import {
  Link
} from "react-router-dom";


function JobCard({ job }) {

  return (

    <div className="job-card">

      <div className="company-logo">
        {job.company
          ?.charAt(0)
          .toUpperCase()}
      </div>


      <div className="job-card-content">

        <span className="job-type">
          {job.jobType}
        </span>

        <h3>
          {job.title}
        </h3>

        <p className="company">
          {job.company}
        </p>

        <div className="job-meta">

          <span>
            📍 {job.location}
          </span>

          <span>
            💰 {job.salary}
          </span>

        </div>


        <Link
          to={`/jobs/${job._id}`}
          className="view-job"
        >
          View Job →
        </Link>

      </div>

    </div>

  );
}


export default JobCard;
