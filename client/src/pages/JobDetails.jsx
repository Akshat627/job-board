import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  Link
} from "react-router-dom";

import API from "../api";


function JobDetails() {

  const { id } =
    useParams();

  const [job, setJob] =
    useState(null);


  const [form, setForm] =
    useState({
      name: "",
      email: "",
      phone: "",
      coverLetter: ""
    });


  const [resume, setResume] =
    useState(null);


  const [message, setMessage] =
    useState("");


  useEffect(() => {

    API.get(
      `/jobs/${id}`
    )
      .then(response => {

        setJob(
          response.data
        );

      });

  }, [id]);


  function updateForm(e) {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  }


  async function apply(e) {

    e.preventDefault();


    if (!resume) {

      setMessage(
        "Please select a resume."
      );

      return;
    }


    const token =
      localStorage.getItem(
        "job_token"
      );


    if (!token) {

      setMessage(
        "Please login before applying."
      );

      return;
    }


    const data =
      new FormData();


    data.append(
      "jobId",
      id
    );

    data.append(
      "name",
      form.name
    );

    data.append(
      "email",
      form.email
    );

    data.append(
      "phone",
      form.phone
    );

    data.append(
      "coverLetter",
      form.coverLetter
    );

    data.append(
      "resume",
      resume
    );


    try {

      const response =
        await API.post(
          "/applications",
          data
        );


      setMessage(
        response.data.message
      );

    } catch (error) {

      setMessage(
        error.response?.data?.message ||
        "Application failed"
      );

    }

  }


  if (!job) {

    return (
      <main className="page-container">
        <p>Loading job...</p>
      </main>
    );

  }


  return (

    <main className="page-container">

      <div className="job-detail">

        <div className="job-detail-main">

          <span className="job-type">
            {job.jobType}
          </span>

          <h1>
            {job.title}
          </h1>

          <h3>
            {job.company}
          </h3>

          <div className="detail-meta">

            <span>
              📍 {job.location}
            </span>

            <span>
              💰 {job.salary}
            </span>

            <span>
              🗂️ {job.category}
            </span>

          </div>


          <section>

            <h2>
              About the Job
            </h2>

            <p>
              {job.description}
            </p>

          </section>


          <section>

            <h2>
              Requirements
            </h2>

            <ul>

              {job.requirements?.map(
                (item, index) => (

                  <li key={index}>
                    {item}
                  </li>

                )
              )}

            </ul>

          </section>

        </div>


        <aside className="apply-card">

          <h2>
            Apply for this job
          </h2>


          <form onSubmit={apply}>

            <input
              name="name"
              placeholder="Full name"
              required
              value={form.name}
              onChange={updateForm}
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={updateForm}
            />

            <input
              name="phone"
              placeholder="Phone number"
              required
              value={form.phone}
              onChange={updateForm}
            />

            <textarea
              name="coverLetter"
              placeholder="Cover letter"
              rows="5"
              value={
                form.coverLetter
              }
              onChange={updateForm}
            />

            <label className="file-input">

              Resume

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={e =>
                  setResume(
                    e.target.files[0]
                  )
                }
                required
              />

            </label>


            <button
              className="primary-button"
              type="submit"
            >
              Submit Application
            </button>


            {message && (

              <div className="message">
                {message}
              </div>

            )}

          </form>

        </aside>

      </div>

    </main>

  );
}


export default JobDetails;
