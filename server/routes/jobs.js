const express = require("express");

const Job = require("../models/Job");

const {
  auth,
  employerOnly
} = require("../middleware/auth");

const router = express.Router();


// Get all jobs + search
router.get("/", async (req, res) => {
  try {
    const {
      search,
      location,
      jobType
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i"
          }
        },
        {
          company: {
            $regex: search,
            $options: "i"
          }
        },
        {
          category: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: "i"
      };
    }

    if (jobType) {
      filter.jobType = jobType;
    }

    const jobs =
      await Job.find(filter)
        .populate(
          "employer",
          "name email"
        )
        .sort({
          createdAt: -1
        });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Could not load jobs"
    });
  }
});


// Get single job
router.get("/:id", async (req, res) => {
  try {
    const job =
      await Job.findById(
        req.params.id
      ).populate(
        "employer",
        "name email"
      );

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: "Could not load job"
    });
  }
});


// Employer creates job
router.post(
  "/",
  auth,
  employerOnly,
  async (req, res) => {
    try {
      const job =
        await Job.create({
          ...req.body,
          employer: req.user.id
        });

      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({
        message: "Could not create job"
      });
    }
  }
);


// Employer jobs
router.get(
  "/employer/my-jobs",
  auth,
  employerOnly,
  async (req, res) => {
    try {
      const jobs =
        await Job.find({
          employer: req.user.id
        }).sort({
          createdAt: -1
        });

      res.json(jobs);
    } catch (error) {
      res.status(500).json({
        message: "Could not load employer jobs"
      });
    }
  }
);


// Delete job
router.delete(
  "/:id",
  auth,
  employerOnly,
  async (req, res) => {
    try {
      const job =
        await Job.findOneAndDelete({
          _id: req.params.id,
          employer: req.user.id
        });

      if (!job) {
        return res.status(404).json({
          message: "Job not found"
        });
      }

      res.json({
        message: "Job deleted"
      });
    } catch (error) {
      res.status(500).json({
        message: "Could not delete job"
      });
    }
  }
);

module.exports = router;
