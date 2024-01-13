const router = require("express").Router();
const {
  userLogin,
  checkRole,
  employeeSignup,
  jwtauth,
  clientRegister,
  getAllClientDetails,
  getAllRecruiterClientDetails,
  createClient,
  getAllClientUrlWithEmail,
  createClientStaff,
  getAllClient,
  getClient,
  getAllStaff,
  getAllClients,
  verifyTempPassword,
  finalClientRegister,
  candidateReg,
  getAllCandidateDetail,
  getAllRecruiterCandidateDetail,
  getARecruiterClientDetails,
  updateRecruiterClient,
  deletingRecruiterClient,
  getCandidateDetail,
  clientJobPosting,
  jobPosting,
  jobApproval,
  activateJob,
  deactivateJob,
  getJob,
  getAppliedJobByJobId,
  updateJob,
  getSkillMatchJobDetail,
  getActivejobs,
  getApprovedInActivejobs,
  getNonApprovaljobs,
  getOwnPostedjobs,
  getOwnActivejobs,
  applyingjob,
  updatingApplicationStatusForJob,
  getAllApplicationStatusForJobId,
  getAllApplicationStatusForCandId,
  getAppliedjobs,
  getAllAppliedjobs,
  getAppliedOfPostedJobs,
  deleteAppliedJob,
  deletingPostedJob,
  deletingActiveJob,
  deletingNonApprovalJob,
  createRecruiter,
  deleteRecruiter,
  getAllRecruiters,
  getAnIndividualRecruiter,
  getAllEmployee,
  getAllCSERecruiters,
  assigningCandidate,
  getAssignedCandidates,
  getLoginClientDetail,
  getAllClientStaffs,
  forgotPassword,
  newPassword,
  eventPosting,
  getAllEvents,
  getAllBlogs,
  getAllVideos,
  getAllPodcasts,
  getAllNews,
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
  deletingClientContactMsg,
  deletingCandidateContactMsg,
  deletingEnquiryForm,
  getEnquiryFormDetails,
  candidateChatRoomId,
  clientChatRoomId,
  getAllCandidateWantChat,
  getAllClientWantChat,
  roomIdChatDetailCreate,
  roomIdChatDetailCreateClient,
  getAllChatDetailOfRoomId,
  getAllChatDetailOfRoomIdClient,
  sendingMailToCSE,
  updatingClientEmail,
  updatingClientPhone,
  updatingClientPassword,
  updatingCompanyName,
   updatingCompanyIndustry,
   updatingCompanyLocation,
   updatingCompanyShortDescription,
   updatingCompanyLongDescription,
   updatingCompanyMission,
   updatingCompanyVision,
   updatingCompanyAwards,
   updatingCompanyBenefits,
   updatingCompanyWebsite,
  updatingCandidateEmail,
  updatingCandidatePhone,
  updatingCandidateFirstName,
  updatingCandidateLastName,
  updatingCandidateLocation,
  updatingCandidateSkill,
   updatingCandidateDays,
   updatingCandidateExperience,
   updatingCandidateEducation,
  updatingCandidateProfileHeadline,
  updatingCandidatePreferedLocation,
   updatingCandidateSalary,
  updatingCandidatePassword,
  searchResultSave,
  getAllRecentSearches,
  popularSearchSaving,
  getPopularSearches,
  saveCompanyDetail,
  getCompanyDetailByCompanyId,
  getAllCompanyDetails,
  candidateToClientNotificationCreate,
  getAllcandidateToClientNotification,
  candidateToRecruiterNotificationCreate,
  getAllcandidateToRecruiterNotification,
  getAllcandidateNotification,
  candidateNotificationCreate,
  deleteAllNotifications,
  createCandidate,
  finalCandRegister,
  getCandidate,
  updateCand,
  deletingCand,
  boostJob,
  getAllClientTableColumnData,
  allClientTableColumnData,
  getAllCandidateTableColumnData,
   allCandidateTableColumnData,
   allJobTableColumnData,
   getAllJobTableColumnData,
   getAllNonApprovalJobTableColumnData,
   allNonApprovalJobTableColumnData,
   allPostedJobTableColumnData,
   getAllPostedJobTableColumnData,

   //MOBILE APP API............

   candidateDashboardTopBar,
   searchJob,
   getACandidateDetail,
   getCandidateResumeUrl,
   updatingCandidateProfileHeadlineDetail,
   updatingCandidateEducationsDetail,
   updatingCandidateSkillsDetail,
   candidateUpdateDetail,

   //MOBILE APP API............

   //ATS............

   offlineClientRegister,
   getAnOfflineClientDetails,
   getAllOfflineClientDetails,
   updateOfflineClient,
   deletingOfflineClient,
   allOfflineClientTableColumnData,
   getAllOfflineClientTableColumnData,
   allATSJobsTableColumnData,
   getAllATSJobsTableColumnData,
   getOwnActivejobsInATS,
   getOwnInActivejobsInATS,
   

   //ATS...............
  
} = require("../Controller/authFunctions");
const employeeAuth = require("../middleware/employeeAuth");

// Client Registeration Route
router.post("/register-Client", clientRegister);

// recruiter route for client detail
router.get("/client-Detail", employeeAuth, getAllClientDetails)

router.get("/recruiter-client-Detail/:id", employeeAuth, getAllRecruiterClientDetails)

router.get("/recruiter-client/:id", getARecruiterClientDetails)

router.patch("/update-Client/:id", updateRecruiterClient)

router.delete("/del-recruiter-client/:id", deletingRecruiterClient)

// Client Registeration Route
router.post("/tempPass-Client/:id", employeeAuth, createClient);

//Client_staff create route
router.post("/tempPass-Client-staff/:id", employeeAuth, createClientStaff);

// recruiter route for client detail
router.get("/clientWithUrl-Detail/:id", getClient);

router.get("/clientWithUrl-Detail", getAllClient);

//get all client url having emails
router.get("/clientUrlWithEmail", employeeAuth, getAllClientUrlWithEmail);

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

router.get("/recruiter-candidate-Detail/:id", getAllRecruiterCandidateDetail);

//get a candidate 
router.get("/candidate/:id", getCandidateDetail);

//client-post job detail 
router.post("/client-job-detail", employeeAuth, clientJobPosting)

//post job detail 
router.post("/job-detail", employeeAuth, jobPosting)

//job approval 
router.post("/job-approval", jobApproval)

//job activate 
router.post("/job-activate", activateJob)

//job deactivate 
router.post("/job-deactivate", deactivateJob)


//get all job details
router.get('/skill-match-job-Detail/:candidateId',  getSkillMatchJobDetail)

//sending job alert to candidate
// router.post('/email-job-alert/:jobId',  sendingJobAlertMail)

//get all posted job details
router.get('/posted-jobs', getActivejobs)

router.get('/posted-approved-inactive-jobs', getApprovedInActivejobs)

//get client posted job details
router.get('/approval-jobs', getNonApprovaljobs)

//get a job detail
router.get('/job/:id', getJob)

router.get('/applied-job/:id', getAppliedJobByJobId)

//edit the job using id
router.patch("/job-detail/:id", employeeAuth, updateJob);

//boot the job
router.patch("/boost/:id", boostJob);

//get posted job details
router.get('/my-posted-jobs/:id', employeeAuth, getOwnPostedjobs)

//get active job details
router.get(':id', getOwnActivejobs)

//candidate applied for job
router.post('/job-applying',  applyingjob)

//updating the application status for job
router.patch('/update-application-status', employeeAuth, updatingApplicationStatusForJob);

//get all the application status document for that particular job id
router.get('/application-status/:id', getAllApplicationStatusForJobId);

//get all the application status document for that particular cand id
router.get('/application-status-cand/:id', getAllApplicationStatusForCandId);

//get applied jobs
router.get('/my-applied-jobs/:candidateId', employeeAuth, getAppliedjobs)

router.get('/applied-jobs',  getAllAppliedjobs)

//get applied of posted jobs
router.get('/applied-jobs-of-posted/:id', employeeAuth, getAppliedOfPostedJobs)

//delete particular job of candidate
router.delete('/delete-job/:candidateId/:jobId', employeeAuth, deleteAppliedJob)

//delete posted job 
router.delete('/delete-job/:jobId', employeeAuth, deletingPostedJob)

//delete active job 
router.delete('/delete-active-job/:jobId', employeeAuth, deletingActiveJob)

//delete non-approval job 
router.delete('/delete-non-approval-job/:jobId', employeeAuth, deletingNonApprovalJob)

//get an individual recruiter by id
router.get('/staff/:recruiterId',employeeAuth, getAnIndividualRecruiter);

router.get("/all-employee", getAllEmployee)

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

// router.get('/company-posted-job/:id', getOwnPostedjobs);

//get all client staff created by particular client
router.get('/all-client-staffs/:companyId', employeeAuth, getAllClientStaffs);

//request to temp password for forgot password
router.post("/forgotpassword", forgotPassword);

//use code verification end point
router.post("/verification", verifying);

//change the existing password with new password
router.patch("/newpassword/:id", newPassword);

//recruiter media posting endpoint
router.post("/media", employeeAuth, eventPosting);

//contact message sending end point
router.post("/contact",  contactMessage);

router.post("/contact-candidate",  contactMessageCandidate);

//get all event details of recruiters endpoint
router.get("/events", getAllEvents);

router.get("/blogs", getAllBlogs);
router.get("/videos", getAllVideos);
router.get("/podcasts", getAllPodcasts);
router.get("/news", getAllNews);

//deleting the created event endpoint for the recruiter
router.delete("/events/:id", employeeAuth, deleteEvent);

//get an event handling endpoint
router.get("/event/:id", employeeAuth, anEvent);

//change the event detail endpoint
router.patch("/event/:id", employeeAuth, changingEvent);

//get all contact details by recruiters endpoint
router.get("/contact", employeeAuth, getAllContactMessages);

router.get("/candidate-contact", employeeAuth, getAllCandidateContactMessages);

//delete contact msg
router.delete('/client-contact-msg/:id', employeeAuth, deletingClientContactMsg)

router.delete('/candidate-contact-msg/:id', employeeAuth, deletingCandidateContactMsg)


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

router.delete('/enquiry-form/:id', employeeAuth, deletingEnquiryForm)

//candidate join the chat 
router.post("/candidate-chat", employeeAuth, candidateChatRoomId);

router.post("/client-chat", employeeAuth, clientChatRoomId);

//get all candidates want chat
router.get("/candidate-chat", employeeAuth, getAllCandidateWantChat);

//get all candidates want chat
router.get("/client-chat", employeeAuth, getAllClientWantChat);

//save the detail of the partricular room id chat
router.post("/roomId-chat", employeeAuth, roomIdChatDetailCreate);

//save the detail of the partricular room id chat
router.post("/roomId-chat-client", employeeAuth, roomIdChatDetailCreateClient);

//get all the detail chat of the room id 
router.get("/roomId-chat/:id", employeeAuth, getAllChatDetailOfRoomId);

//get all the detail chat of the room id 
router.get("/roomId-chat-client/:id", employeeAuth, getAllChatDetailOfRoomIdClient);

//sending mail to cse endpoint
router.post("/enquiry-form/cse", sendingMailToCSE)

//updating client information
router.patch("/update-client-email", updatingClientEmail);

router.patch("/update-client-phone", updatingClientPhone);

router.patch("/update-client-password", updatingClientPassword);

router.patch("/update-company-name", updatingCompanyName);

router.patch("/update-company-industry", updatingCompanyIndustry);

router.patch("/update-company-location", updatingCompanyLocation);

router.patch("/update-company-short-description", updatingCompanyShortDescription);

router.patch("/update-company-long-description", updatingCompanyLongDescription);

router.patch("/update-company-mission", updatingCompanyMission);

router.patch("/update-company-vision", updatingCompanyVision);

router.patch("/update-company-awards", updatingCompanyAwards);

router.patch("/update-company-website", updatingCompanyWebsite);

router.patch("/company-benefits", updatingCompanyBenefits);

//updating candidate information
router.patch("/update-candidate-email", updatingCandidateEmail);

router.patch("/update-candidate-phone", updatingCandidatePhone);

router.patch("/update-candidate-first-name", updatingCandidateFirstName);

router.patch("/update-candidate-last-name", updatingCandidateLastName);

router.patch("/update-candidate-location", updatingCandidateLocation);

router.patch("/update-candidate-skill", updatingCandidateSkill);

router.patch("/update-candidate-days", updatingCandidateDays);

router.patch("/update-candidate-experience", updatingCandidateExperience);

router.patch("/update-candidate-education", updatingCandidateEducation);

router.patch("/update-candidate-salary", updatingCandidateSalary);

router.patch("/update-candidate-prefered-location", updatingCandidatePreferedLocation);

router.patch("/update-candidate-profileHeadline", updatingCandidateProfileHeadline);

router.patch("/update-candidate-password", updatingCandidatePassword);

//recent search saving
router.post("/recent-search", searchResultSave)

//get all recent searches
router.get("/recent-search", getAllRecentSearches)

//get popular searches limit to 7
router.get("/popular-search", getPopularSearches);

//popular search saving
router.post("/popular-search", popularSearchSaving);

// router.post("/company", saveCompanyDetail)

//get company detail for the given company id end-point
router.get("/company-detail/:id", getCompanyDetailByCompanyId)

//get all company details
router.get("/company-details", getAllCompanyDetails);

//creating new notification from candidate to client
router.post("/candidate-to-client-notification", candidateToClientNotificationCreate);

//get all candidate to client notifications
router.get("/candidate-to-client-notification", getAllcandidateToClientNotification);

//creating new notification from candidate to client
router.post("/candidate-to-recruiter-notification", candidateToRecruiterNotificationCreate);

//get all candidate to client notifications
router.get("/candidate-to-recruiter-notification", getAllcandidateToRecruiterNotification);

//creating new notification from candidate to client
router.post("/candidate-notification", candidateNotificationCreate);

//get all candidate to client notifications
router.get("/candidate-notification", getAllcandidateNotification);

//delete all notification
router.delete("/notifications/delete-all", deleteAllNotifications);

//create candidate by recruiter
router.post("/candidate-create", createCandidate);

//register candidate after setting password
router.post("/finalRegister-Candidate", finalCandRegister);

// recruiter route for client detail
router.get("/CandidateWithUrl-Detail/:id", getCandidate);

router.patch("/recruiter-cand-update/:id", updateCand);

router.delete("/del-recruiter-cand/:id", employeeAuth, deletingCand);

//create all client table column data
router.post("/all-clients-column", allClientTableColumnData);

router.get("/all-clients-column/:id", getAllClientTableColumnData);

router.post("/all-candidates-column", allCandidateTableColumnData);

router.get("/all-candidates-column/:id", getAllCandidateTableColumnData);

router.post("/all-jobs-column", allJobTableColumnData);

router.get("/all-jobs-column/:id", getAllJobTableColumnData);

router.post("/non-approval-jobs-column", allNonApprovalJobTableColumnData);

router.get("/non-approval-jobs-column/:id", getAllNonApprovalJobTableColumnData);

router.post("/posted-jobs-column", allPostedJobTableColumnData);

router.get("/posted-jobs-column/:id", getAllPostedJobTableColumnData);

//MOBILE APP API............

//fetching candidate dashboard topbar
router.get("/candidate-dashboard-topbar/:candidateId", employeeAuth, candidateDashboardTopBar);

//job search 
router.post("/job-search-candidate", employeeAuth, searchJob);

//find a candidate detail
router.get("/candidate-full-detail/:id", employeeAuth, getACandidateDetail);

//find the candidate cv 
router.get("/candidate-resume-find/:id", employeeAuth, getCandidateResumeUrl);

//update cand headline
router.patch("/update-cand-headline/:id", employeeAuth, updatingCandidateProfileHeadlineDetail);

//update candidate skills
router.patch("/update-cand-ex-skills/:id", employeeAuth, updatingCandidateSkillsDetail);

//update candidate educations
router.patch("/update-cand-ex-educations/:id", employeeAuth, updatingCandidateEducationsDetail);

//update cand particular detail
router.patch("/update-cand-particula-detail/:id", employeeAuth, candidateUpdateDetail);

//MOBILE APP API............

//ATS......................................

//login
router.post("/ats", async (req, res) => {
  await userLogin(req.body, ["Super-Admin", "Manager", "Recruiter-ATS"], res);
});

//offline client register
router.post("/offline-client-reg", employeeAuth, offlineClientRegister);

//find an offline client
router.get("/an-offline-client/:id", employeeAuth, getAnOfflineClientDetails);

//find all offline clients
router.get("/offline-client-Details", employeeAuth, getAllOfflineClientDetails);

//update the exiesting offline client details
router.patch("/update-exiesting-offline-client/:id", employeeAuth, updateOfflineClient);

//deleting exiesting offline client
router.delete("/delete-exiesting-offline-client/:id", employeeAuth, deletingOfflineClient);

//all offline client table column data create
router.post("/all-offline-clients-column", employeeAuth, allOfflineClientTableColumnData);

//get all offline client table column data
router.get("/all-offline-clients-column/:id", getAllOfflineClientTableColumnData);

//all offline client table column data create
router.post("/ats-jobs-column", employeeAuth, allATSJobsTableColumnData);

//get all offline client table column data
router.get("/ats-jobs-column/:id", getAllATSJobsTableColumnData);

//get all active jobs in ats
router.get("/ats-active-jobs/:id", employeeAuth, getOwnActivejobsInATS);

//get all in active jobs in ats
router.get("/ats-in-active-jobs/:id", employeeAuth, getOwnInActivejobsInATS);


//ATS..................

// Client, Client-staff Login Route
router.post("/login-Client", async (req, res) => {
  await userLogin(req.body, ["Client", "Client-staff"], res);
});

// Candidate Login Route
router.post("/login-Candidate", async (req, res) => {
  await userLogin(req.body, ["Candidate"], res);
});

// // Admin, Recruiter Login Route
// router.post("/admin", async (req, res) => {
//   await userLogin(req.body, ["Admin"], res);
// });

router.post("/staff", async (req, res) => {
  await userLogin(req.body, ["Recruiter", "Admin", "Manager"], res);
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
