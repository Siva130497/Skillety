const router = require("express").Router();
const {
  employeeAuth,
  employeeLogin,
  checkRole,
  employeeSignup,
  jwtauth,
} = require("../Controller/authFunctions");

// Client Registeration Route
router.post("/register-Client", (req, res) => {
  employeeSignup(req.body, "Client", res);
});

//Candidate Registration Route
router.post("/register-Candidate", async (req, res) => {
  await employeeSignup(req.body, "Candidate", res);
});

//Recruiter Registration route
router.post("/register-Recruiter", async (req, res) => {
  await employeeSignup(req.body, "Recruiter", res);
});

// Client Login Route
router.post("/login-Client", async (req, res) => {
  await employeeLogin(req.body, "Client", res);
});

// Recruiter Login Route
router.post("/login-Recruiter", async (req, res) => {
  await employeeLogin(req.body, "Recruiter", res);
});

// Candidate Login Route
router.post("/login-Candidate", async (req, res) => {
  await employeeLogin(req.body, "Candidate", res);
});

//Client protected route
router.get(
  "/Client-protected",
  employeeAuth,
  checkRole(["Client"]),
  async (req, res) => {
    return res.json(`welcome ${req.body.name}`);
  }
);

//Candidate protected route
router.get(
  "/Candidate-protected",
  employeeAuth,
  checkRole(["Candidate"]),
  async (req, res) => {
    return res.json(`welcome ${req.body.name}`);
  }
);

//Recruiter protected route
router.get(
  "/Recruiter-protected",
  employeeAuth,
  checkRole(["Recruiter"]),
  async (req, res) => {
    return res.json(`welcome ${req.body.name}`);
  }
);

router.post("/protected", jwtauth, (req, res) => {
  res.status(200).send("Here's the info you requested ");
});

module.exports = router;
