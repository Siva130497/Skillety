const router = require("express").Router();
const {
  employeeLogin,
  checkRole,
  employeeSignup,
  jwtauth,
  clientRegister,
  getAllClientDetails,
  createClient,
  getAllClient,
  finalClientRegister,
  candidateReg,
  getAllCandidateDetail,
  jobPosting,
  getSkillMatchJobDetail,
  getOwnPostedjobs,
  applyingjob,
  getAppliedjobs,
  getAppliedOfPostedJobs,
} = require("../Controller/authFunctions");

// Client Registeration Route
router.post("/register-Client", clientRegister);

// recruiter route for client detail
router.get("/client-Detail", getAllClientDetails)

// Client Registeration Route
router.post("/tempPass-Client", createClient);

// recruiter route for client detail
router.get("/clientWithUrl-Detail", getAllClient);

// client register after setup new password
router.post("/finalRegister-Client", finalClientRegister);

// candidate register 
router.post("/candidate-reg", candidateReg);

// router.post("/register-Client", async(req, res) => {
//     clientRegister(req.body, res);
//   // employeeSignup(req.body, "Client", res);
// });

//Candidate Registration Route
router.post("/register-Candidate", async (req, res) => {
  await employeeSignup(req.body, "Candidate", res);
});

//get all candidate detail
router.get("/candidate-Detail", getAllCandidateDetail)

//post job detail 
router.post("/job-detail", jobPosting)

//get all job details
router.get('/skill-match-job-Detail/:candidateId', getSkillMatchJobDetail)

//get client posted job details
router.get('/my-posted-jobs/:clientId', getOwnPostedjobs)

//candidate applied for job
router.post('/job-applying', applyingjob)

//get applied jobs
router.get('/my-applied-jobs/:candidateId', getAppliedjobs)

//get applied of posted jobs
router.get('/applied-jobs-of-posted/:clientId', getAppliedOfPostedJobs)

//Recruiter Registration route
router.post("/register-Recruiter", async (req, res) => {
  await employeeSignup(req.body, "Recruiter", res);
});

// Client Login Route
router.post("/login-Client", async (req, res) => {
  await employeeLogin(req.body, "Client", res);
});

// Candidate Login Route
router.post("/login-Candidate", async (req, res) => {
  await employeeLogin(req.body, "Candidate", res);
});

// Recruiter Login Route
router.post("/login-Recruiter", async (req, res) => {
  await employeeLogin(req.body, "Recruiter", res);
});

// Candidate Login Route
router.post("/login-Candidate", async (req, res) => {
  await employeeLogin(req.body, "Candidate", res);
});

// //Client protected route
// router.get(
//   "/Client-protected",
//   employeeAuth,
//   checkRole(["Client"]),
//   async (req, res) => {
//     return res.json(`welcome ${req.body.name}`);
//   }
// );

// //Candidate protected route
// router.get(
//   "/Candidate-protected",
//   employeeAuth,
//   checkRole(["Candidate"]),
//   async (req, res) => {
//     return res.json(`welcome ${req.body.name}`);
//   }
// );

//Recruiter protected route
// router.get(
//   "/Recruiter-protected",
//   employeeAuth,
//   checkRole(["Recruiter"]),
//   async (req, res) => {
//     return res.json(`welcome ${req.body.name}`);
//   }
// );

router.post("/protected", jwtauth, (req, res) => {
  res.status(200).send("Here's the info you requested ");
});

module.exports = router;
