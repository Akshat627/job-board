import {
  useEffect,
  useState
} from "react";

import API from "../api";


function EmployerDashboard() {

  const [jobs, setJobs] =
    useState([]);

  const [applications, setApplications] =
    useState([]);


  const [showForm, setShowForm] =
    useState(false);


  const [form, setForm] =
    useState({
      title: "",
      company: "",
      location: "",
      jobType: "Full Time",
      salary: "",
      category: "",
      description: "",
      requirements: ""
    });


  async function loadData() {

    const jobsResponse =
      await API.get(
        "/jobs/employer/my-jobs"
      );


    const applicationsResponse =
      await API.get(
        "/applications/employer"
      );


    setJobs(
      jobsResponse.data
    );


    setApplications(
      applicationsResponse.data
    );

  }


  useEffect(() => {

    loadData();

  }, []);


  function update(e) {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  }


  async function createJob(e) {

    e.preventDefault();


    await API.post(
      "/jobs",
      {
        ...form,

        requirements:
          form.requirements
            .split("\n")
            .filter(Boolean)
      }
    );


    setForm({
      title: "",
      company: "",
      location: "",
      jobType: "Full Time",
      salary: "",
      category: "",
      description: "",
      requirements: ""
    });


    setShowForm(false);

    loadData();

  }


  async function deleteJob(id) {

    if (
      !window.confirm(
        "Delete this job?"
      )
    ) {
      return;
    }


    await API.delete(
      `/jobs/${id}`
    );


    loadData();

  }


  async function updateStatus(
    id,
    status
  ) {

    await API.patch(
      `/applications/${id}/status`,
      {
        status
      }
    );


    loadData();

  }


  return (

    <main className="page-container">

      <div className="dashboard-header">

        <div>

          <span>
            EMPLOYER DASHBOARD
          </span>

          <h1>
            Manage your hiring
          </h1>

        </div>


        <button
          className="primary-button"
          onClick={() =>
            setShowForm(
              !showForm
            )
          }
        >
          + Post a Job
        </button>

      </div>


      {showForm && (

        <form
          className="job-form"
          onSubmit={createJob}
        >

          <h2>
            Create Job Opening
          </h2>


          <input
            name="title"
            placeholder="Job title"
            value={form.title}
            onChange={update}
            required
          />

          <input
            name="company"
            placeholder="Company name"
            value={form.company}
            onChange={update}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={update}
            required
          />


          <div className="form-row">

            <select
              name="jobType"
              value={form.jobType}
              onChange={update}
            >

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


            <input
              name="salary"
              placeholder="Salary"
              value={form.salary}
              onChange={update}
            />

          </div>


          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={update}
          />


          <textarea
            name="description"
            placeholder="Job description"
            rows="6"
            value={
              form.description
            }
            onChange={update}
            required
          />


          <textarea
            name="requirements"
            placeholder={
              "Requirements - one per line"
            }
            rows="5"
            value={
              form.requirements
            }
            onChange={update}
          />


          <button className="primary-button">
            Publish Job
          </button>

        </form>

      )}


      <section>

        <h2>
          Your Job Listings
        </h2>


        <div className="dashboard-list">

          {jobs.map(job => (

            <div
              className="application-card"
              key={job._id}
            >

              <div>

                <h3>
                  {job.title}
                </h3>

                <p>
                  {job.company} ·
                  {job.location}
                </p>

              </div>


              <button
                className="delete-button"
                onClick={() =>
                  deleteJob(
                    job._id
                  )
                }
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </section>


      <section>

        <h2>
          Candidates
        </h2>


        <div className="dashboard-list">

          {applications.map(
            application => (

              <div
                className="application-card"
                key={
                  application._id
                }
              >

                <div>

                  <h3>
                    {
                      application.candidate
                        ?.name
                    }
                  </h3>

                  <p>
                    {
                      application.candidate
                        ?.email
                    }
                  </p>

                  <small>
                    Applied for:
                    {" "}
                    {
                      application.job
                        ?.title
                    }
                  </small>

                </div>


                <select
                  value={
                    application.status
                  }
                  onChange={e =>
                    updateStatus(
                      application._id,
                      e.target.value
                    )
                  }
                >

                  <option>
                    Applied
                  </option>

                  <option>
                    Under Review
                  </option>

                  <option>
                    Shortlisted
                  </option>

                  <option>
                    Rejected
                  </option>

                </select>

              </div>

            )
          )}

        </div>

      </section>

    </main>

  );
}


export default EmployerDashboard;
