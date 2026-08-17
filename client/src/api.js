import axios from "axios";

const API_URL = "https://job-board-p3jc.onrender.com";

API.interceptors.request.use(
  config => {

    const token =
      localStorage.getItem(
        "job_token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;

    }

    return config;

  }
);


export default API;
