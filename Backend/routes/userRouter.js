const router = require("express").Router();
const {
  userLogin,
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
  getPostedjobs,
  getOwnPostedjobs,
  applyingjob,
  getAppliedjobs,
  getAppliedOfPostedJobs,
  deleteAppliedJob,
  createRecruiter,
  deleteRecruiter,
  getAllRecruiters,
  getAnIndividualRecruiter,
  assigningCandidate,
  getAssignedCandidates,
  clientStaffReg,
  getLoginClientDetail,
  getAllClientStaffs,
  forgotPassword,
  newPassword,
  eventPosting,
  getAllEvents,
  generateRandomPassword,
} = require("../Controller/authFunctions");
const employeeAuth = require("../middleware/employeeAuth");

// Client Registeration Route
router.post("/register-Client", clientRegister);

// recruiter route for client detail
router.get("/client-Detail", employeeAuth, getAllClientDetails)

// Client Registeration Route
router.post("/tempPass-Client", employeeAuth, createClient);

// recruiter route for client detail
router.get("/clientWithUrl-Detail/:id", getAllClient);

// client register after setup new password
router.post("/finalRegister-Client", finalClientRegister);

//register client-staff
router.post("/client-staff-register", employeeAuth, clientStaffReg)

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
router.get("/candidate-Detail", employeeAuth, getAllCandidateDetail)

//post job detail 
router.post("/job-detail", employeeAuth, jobPosting)

//get all job details
router.get('/skill-match-job-Detail/:candidateId', employeeAuth, getSkillMatchJobDetail)

//get client posted job details
router.get('/posted-jobs', employeeAuth, getPostedjobs)

//get posted job details
router.get('/my-posted-jobs/:id', employeeAuth, getOwnPostedjobs)

//candidate applied for job
router.post('/job-applying', employeeAuth, applyingjob)

//get applied jobs
router.get('/my-applied-jobs/:candidateId', employeeAuth, getAppliedjobs)

//get applied of posted jobs
router.get('/applied-jobs-of-posted/:id', employeeAuth, getAppliedOfPostedJobs)

//delete particular job of candidate
router.delete('/delete-job/:candidateId/:jobId', employeeAuth, deleteAppliedJob)

//get an individual recruiter by id
router.get('/staff/:recruiterId',employeeAuth, getAnIndividualRecruiter);

//recruiter create route
router.post('/recruiter-create', employeeAuth, createRecruiter);

//delete particular recruiter route
router.delete('/delete-recruiter/:recruiterId', employeeAuth, deleteRecruiter);

//get all recruiters details
router.get('/all-recruiters', employeeAuth, getAllRecruiters);

//assign the candidate to job
router.post("/candidate-assigning", employeeAuth, assigningCandidate);

//get assigned candidates by recruiter
router.get("/assigned-candidates", employeeAuth, getAssignedCandidates);

//get particular client
router.get('/client/:clientId',employeeAuth, getLoginClientDetail);

//get all client staff created by particular client
router.get('/all-client-staffs/:companyId', employeeAuth, getAllClientStaffs);

//request to temp password for forgot password
router.post("/forgotpassword", forgotPassword);

//change the existing password with new password
router.patch("/newpassword/:id", newPassword);

//recruiter event posting endpoint
router.post("/events", employeeAuth, eventPosting);

//get all event details of recruiters endpoint
router.get("/events", getAllEvents);

// Client, Client-staff Login Route
router.post("/login-Client", async (req, res) => {
  await userLogin(req.body, ["Client", "Client-staff"], res);
});

// Candidate Login Route
router.post("/login-Candidate", async (req, res) => {
  await userLogin(req.body, ["Candidate"], res);
});

// Admin, Recruiter Login Route
router.post("/admin", async (req, res) => {
  await userLogin(req.body, ["Admin"], res);
});

router.post("/staff", async (req, res) => {
  await userLogin(req.body, ["Recruiter"], res);
});

//protected route
router.get("/protected", employeeAuth, (req, res) => {
  return res.json(req.user);
})

//generate rondom password
router.get("/random-password", generateRandomPassword);

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
