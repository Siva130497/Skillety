const router = require("express").Router();
const {
  userLogin,
  checkRole,
  employeeSignup,
  jwtauth,
  clientRegister,
  getAllClientDetails,
  createClient,
  createClientStaff,
  getAllClient,
  getClient,
  getAllStaff,
  getAllClients,
  verifyTempPassword,
  finalClientRegister,
  candidateReg,
  getAllCandidateDetail,
  getCandidateDetail,
  jobPosting,
  getJob,
  updateJob,
  getSkillMatchJobDetail,
  getPostedjobs,
  getOwnPostedjobs,
  applyingjob,
  getAppliedjobs,
  getAppliedOfPostedJobs,
  deleteAppliedJob,
  deletingPostedJob,
  createRecruiter,
  deleteRecruiter,
  getAllRecruiters,
  getAnIndividualRecruiter,
  getAllCSERecruiters,
  assigningCandidate,
  getAssignedCandidates,
  getLoginClientDetail,
  getAllClientStaffs,
  forgotPassword,
  newPassword,
  eventPosting,
  getAllEvents,
  deleteEvent,
  anEvent,
  changingEvent,
  generateRandomPassword,
  contactMessage,
  getAllContactMessages,
  verifying,
  contactMessageCandidate,
  getAllCandidateContactMessages,
  clientPackageSelection,
  getClientChoosenPlan,
  createViewedCandidate,
  getViewedCandidates,
  postEnquiryFormDetail,
  getEnquiryFormDetails,
  candidateChatRoomId,
  getAllCandidateWantChat,
  roomIdChatDetailCreate,
  getAllChatDetailOfRoomId,
  sendingMailToCSE,
  updatingClientEmail,
  updatingClientPhone,
  updatingClientPassword,
  updatingCandidateEmail,
  updatingCandidatePhone,
  updatingCandidateFirstName,
  updatingCandidateLastName,
  updatingCandidateLocation,
  updatingCandidateProfileHeadline,
  updatingCandidatePassword,
} = require("../Controller/authFunctions");
const employeeAuth = require("../middleware/employeeAuth");

// Client Registeration Route
router.post("/register-Client", clientRegister);

// recruiter route for client detail
router.get("/client-Detail", employeeAuth, getAllClientDetails)

// Client Registeration Route
router.post("/tempPass-Client/:id", employeeAuth, createClient);

//Client_staff create route
router.post("/tempPass-Client-staff/:id", employeeAuth, createClientStaff);

// recruiter route for client detail
router.get("/clientWithUrl-Detail/:id", getClient);

router.get("/clientWithUrl-Detail", getAllClient);

//finding all staff detail from particular companyId
router.get("/all-staff/:id", employeeAuth, getAllStaff);

//find all client
router.get("/clients", getAllClients)

//verify the temp_pass endpoint
router.post("/verify-temp-password", verifyTempPassword);

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
router.get("/candidate-Detail", getAllCandidateDetail);

//get a candidate 
router.get("/candidate/:id", getCandidateDetail);

//post job detail 
router.post("/job-detail", employeeAuth, jobPosting)

//get all job details
router.get('/skill-match-job-Detail/:candidateId', employeeAuth, getSkillMatchJobDetail)

//get client posted job details
router.get('/posted-jobs', getPostedjobs)

//get a job detail
router.get('/job/:id', getJob)

//edit the job using id
router.patch("/job-detail/:id", employeeAuth, updateJob);

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

//delete posted job 
router.delete('/delete-job/:jobId', employeeAuth, deletingPostedJob)

//get an individual recruiter by id
router.get('/staff/:recruiterId',employeeAuth, getAnIndividualRecruiter);

//get all cse type recruiters endpoint
router.get('/staff-cse', getAllCSERecruiters);

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

//use code verification end point
router.post("/verification", verifying);

//change the existing password with new password
router.patch("/newpassword/:id", newPassword);

//recruiter event posting endpoint
router.post("/events", employeeAuth, eventPosting);

//contact message sending end point
router.post("/contact",  contactMessage);

router.post("/contact-candidate",  contactMessageCandidate);

//get all event details of recruiters endpoint
router.get("/events", getAllEvents);

//deleting the created event endpoint for the recruiter
router.delete("/events/:id", employeeAuth, deleteEvent);

//get an event handling endpoint
router.get("/event/:id", employeeAuth, anEvent);

//change the event detail endpoint
router.patch("/event/:id", employeeAuth, changingEvent);

//get all contact details by recruiters endpoint
router.get("/contact", employeeAuth, getAllContactMessages);

router.get("/candidate-contact", employeeAuth, getAllCandidateContactMessages);

//client package selection endpoint
router.post("/client-package-plan", clientPackageSelection);

//find the client's package plan endpoint
router.get("/client-package-plan/:id", getClientChoosenPlan);

//client viewed candidate create end point
router.post("/cv-views", employeeAuth, createViewedCandidate);

//all viewed candidate by client endpoint
router.get("/cv-views/:id", employeeAuth, getViewedCandidates);

//enquiry form sending end point
router.post("/enquiry-form",  postEnquiryFormDetail);

//get all enquiry_form details by recruiters endpoint
router.get("/enquiry-form", employeeAuth, getEnquiryFormDetails);

//candidate join the chat 
router.post("/candidate-chat", employeeAuth, candidateChatRoomId);

//get all candidates want chat
router.get("/candidate-chat", employeeAuth, getAllCandidateWantChat);

//save the detail of the partricular room id chat
router.post("/roomId-chat", employeeAuth, roomIdChatDetailCreate);

//get all the detail chat of the room id 
router.get("/roomId-chat/:id", employeeAuth, getAllChatDetailOfRoomId);

//sending mail to cse endpoint
router.post("/enquiry-form/cse", sendingMailToCSE)

//updating client information
router.patch("/update-client-email", updatingClientEmail);

router.patch("/update-client-phone", updatingClientPhone);

router.patch("/update-client-password", updatingClientPassword);

//updating candidate information
router.patch("/update-candidate-email", updatingCandidateEmail);

router.patch("/update-candidate-phone", updatingCandidatePhone);

router.patch("/update-candidate-first-name", updatingCandidateFirstName);

router.patch("/update-candidate-last-name", updatingCandidateLastName);

router.patch("/update-candidate-location", updatingCandidateLocation);

router.patch("/update-candidate-profileHeadline", updatingCandidateProfileHeadline);

router.patch("/update-candidate-password", updatingCandidatePassword);

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
