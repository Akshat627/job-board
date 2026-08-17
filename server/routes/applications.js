const express = require("express");
const multer = require("multer");
const path = require("path");

const Application =
  require("../models/Application");

const Job =
  require("../models/Job");

const {
  auth,
  candidateOnly,
  employerOnly
} = require("../middleware/auth");

const router = express.Router();


const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        "uploads/"
      );
    },

    filename: (
      req,
      file,
      cb
    ) => {

      const extension =
        path.extname(
          file.originalname
        );

      cb(
        null,
        `${Date.now()}-${req.user.id}${extension}`
      );
    }
  });


const upload =
  multer({
    storage,

    limits: {
      fileSize:
        5 * 1024 * 1024
    },

    fileFilter: (
      req,
      file,
      cb
    ) => {

      const allowed = [
        ".pdf",
        ".doc",
        ".docx"
      ];

      const extension =
        path.extname(
          file.originalname
        ).toLowerCase();

      if (
        allowed.includes(
          extension
        )
      ) {
        cb(null, true);
      } else {
        cb(
          new Error(
            "Only PDF, DOC and DOCX files are allowed"
          )
        );
      }
    }
  });


// Apply for job
router.post(
  "/",
  auth,
  candidateOnly,
  upload.single("resume"),
  async (req, res) => {

    try {

      const job =
        await Job.findById(
          req.body.jobId
        );

      if (!job) {
        return res.status(404).json({
          message: "Job not found"
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message:
            "Resume is required"
        });
      }

      const existing =
        await Application.findOne({
          job: job._id,
          candidate: req.user.id
        });

      if (existing) {
        return res.status(400).json({
          message:
            "You have already applied for this job"
        });
      }

      const application =
        await Application.create({

          job: job._id,

          candidate:
            req.user.id,

          name:
            req.body.name,

          email:
            req.body.email,

          phone:
            req.body.phone,

          coverLetter:
            req.body.coverLetter,

          resume:
            req.file.filename

        });

      res.status(201).json({
        message:
          "Application submitted successfully",
        application
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Could not submit application"
      });

    }
  }
);


// Candidate applications
router.get(
  "/candidate",
  auth,
  candidateOnly,
  async (req, res) => {

    try {

      const applications =
        await Application.find({
          candidate:
            req.user.id
        })
        .populate(
          "job",
          "title company location jobType"
        )
        .sort({
          createdAt: -1
        });

      res.json(
        applications
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Could not load applications"
      });

    }
  }
);


// Employer applications
router.get(
  "/employer",
  auth,
  employerOnly,
  async (req, res) => {

    try {

      const jobs =
        await Job.find({
          employer:
            req.user.id
        });

      const jobIds =
        jobs.map(
          job => job._id
        );

      const applications =
        await Application.find({
          job: {
            $in: jobIds
          }
        })
        .populate(
          "job",
          "title company"
        )
        .populate(
          "candidate",
          "name email"
        )
        .sort({
          createdAt: -1
        });

      res.json(
        applications
      );

    } catch (error) {

      res.status(500).json({
        message:
          "Could not load applications"
      });

    }
  }
);


// Update application status
router.patch(
  "/:id/status",
  auth,
  employerOnly,
  async (req, res) => {

    try {

      const application =
        await Application.findById(
          req.params.id
        ).populate("job");

      if (!application) {
        return res.status(404).json({
          message:
            "Application not found"
        });
      }

      if (
        String(
          application.job.employer
        ) !==
        String(req.user.id)
      ) {
        return res.status(403).json({
          message: "Access denied"
        });
      }

      application.status =
        req.body.status;

      await application.save();

      res.json({
        message:
          "Application status updated"
      });

    } catch (error) {

      res.status(500).json({
        message:
          "Could not update status"
      });

    }
  }
);

module.exports = router;
