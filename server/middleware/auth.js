const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required"
    });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
}

function employerOnly(req, res, next) {
  if (req.user.role !== "employer") {
    return res.status(403).json({
      message: "Employer access required"
    });
  }

  next();
}

function candidateOnly(req, res, next) {
  if (req.user.role !== "candidate") {
    return res.status(403).json({
      message: "Candidate access required"
    });
  }

  next();
}

module.exports = {
  auth,
  employerOnly,
  candidateOnly
};
