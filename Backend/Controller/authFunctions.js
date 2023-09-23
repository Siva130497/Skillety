const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require ('dotenv').config();
const client = require("../Database/client");
const nodemailer = require('nodemailer');
const TempClient = require("../Database/TempClient");
const finalClient = require("../Database/finalClient");
const candidate = require("../Database/candidate");
const allusers = require("../Database/allUsers");
const resume = require("../Database/resume");
const jobDetail = require("../Database/jobDetail");
const appliedJob = require("../Database/appliedJob");
const allUsers = require("../Database/allUsers");
const employee = require("../Database/employee");

// const hash = async() => {
//   const pass = 'newpassword'
//   const hash = await bcrypt.hash(pass, 12)
//   console.log(hash)
// }
// hash()

/* client register */
const clientRegister = async(req, res) => {
  try {
    console.log(req.body);
    const {email} = req.body;
    const clientAvailable = await client.findOne({email});
    if(clientAvailable){
      return res.status(404).json({message: "User already registered"});
    }
    const newClient = new client({
      ...req.body,
      role:"Client", 
    });
    await newClient.save();
    console.log(newClient);
    return res.status(201).json(newClient);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* recruiter checking client detail */
const getAllClientDetails = async(req, res) => {
  try{
    const clients = await client.find();
    return res.status(200).json(clients);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

//create client with temp password
const createClient = async (req, res) => {
  try {
    console.log(req.body);
    const newTempClient = new TempClient({
      ...req.body,
      role: "Client",
    });
    await newTempClient.save();
    console.log(newTempClient);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'demoemail1322@gmail.com',
        pass: 'znsdgrmwzskpatwz'
      }
    });

    const mailOptions = {
      from: 'demoemail1322@gmail.com',
      to: `${newTempClient.email}`,
      subject: 'Mail from SKILLITY!',
      text: 'Your temporary url and temporary password!',
      html: `<p>Temporary URL: ${newTempClient.url}</p><p>Temporary Password: ${newTempClient.tempPassword}</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message, newTempClient });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(201).json({ newTempClient, emailSent: true });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* fetch the client after uuid add */
const getAllClient = async(req, res) => {
  try{
    const tempClient = await TempClient.find();
    console.log(tempClient);
    return res.status(200).json(tempClient);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/* client register after setup new password */
const finalClientRegister = async(req, res) => {
  try {
    console.log(req.body);
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    console.log(hashPassword);
    const updatedClient = new finalClient({
      ...req.body,
      password: hashPassword, 
    });
    await updatedClient.save();
    console.log(updatedClient);
    const {name, email, role, id} = req.body;
    const updatedUser = new allUsers({
      id,   
      name,
      email,
      role,
      password:hashPassword,
    });
    await updatedUser.save();
    console.log(updatedUser);
    return res.status(201).json({updatedClient, updatedUser});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* candidate register */
const candidateReg = async(req, res) => {
  try {
    console.log(req.body);
    const {firstName, lastName, email, id, password} = req.body; 
    const candidateAvailable = await candidate.findOne({email});
    if(candidateAvailable){
      return res.status(404).json({message: "User already registered"});
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newCandidate = new candidate({
      ...req.body,
      role: "Candidate",
      password:hashPassword,
    });
    await newCandidate.save();
    console.log(newCandidate);
    const updatedUser = new allUsers({
      id,   
      name: firstName+" "+lastName,
      email,
      role: "Candidate",
      password:hashPassword,
    });
    await updatedUser.save();
    console.log(updatedUser);
    return res.status(201).json({newCandidate, updatedUser});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


/* get all candidate details*/
const getAllCandidateDetail = async (req, res) => {
  try {
    const allCandidates = await candidate.find();
    const allCandidatesResume = await resume.find();

    const resumeDict = {}; 
    allCandidatesResume.forEach(resume => {
      resumeDict[resume.id] = resume._doc;
    });

    const allCandidatesDetail = await Promise.all(allCandidates.map(async cand => {
      const matchingResume = resumeDict[cand.id];

      if (matchingResume) {
        if(cand.selectedDate.length > 1){
          // const selectedDateStr = cand.selectedDate;
        // const selectedDay = parseInt(selectedDateStr.split("/")[0], 10);
        // const dayDifference = currentDay - selectedDay;
          const dayDifference = 10;
          const candidateData = { ...cand._doc };
          const resumeData = { ...matchingResume };

          return { ...candidateData, ...resumeData, dayDifference };
        }
        else{
          const candidateData = { ...cand._doc };
          const resumeData = { ...matchingResume };

          return { ...candidateData, ...resumeData};
        }
      } else {
        return { ...cand._doc };
      }
    }));

    return res.status(200).json(allCandidatesDetail);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const jobPosting = async(req, res) => {
  try{
    console.log(req.body);
    const newJobDetail = new jobDetail({
      ...req.body,
    });
    await newJobDetail.save();
    console.log(newJobDetail);
    return res.status(201).json(newJobDetail);
  }catch(err){
    return res.status(500).json({ error: err.message })
  }
}

/* get all job details */
const getSkillMatchJobDetail = async(req, res) => {
  try {
    const id = req.params.candidateId;
    const candidateDetail = await candidate.findOne({id});
    const jobDetails = await jobDetail.find();

    const calculateMatchPercentage = (skills1, skills2) => {
      const matchingSkills = skills2.filter(skill => skills1.includes(skill));
      return (matchingSkills.length / skills1.length) * 100;
    }
    
    const comparisonResults = jobDetails.map(obj => {
      const percentage = calculateMatchPercentage(obj.skills, candidateDetail.skills);
      return {
        clientId:obj.clientId,
        jobId: obj.id,
        jobRole: obj.jobRole[0],
        jobMandatorySkills:obj.skills,
        jobAdditionalSkills: obj.additionalSkills,
        jobExperience:`${obj.year} years and ${obj.month} months`,
        jobCategory: obj.jobCategory,
        jobDescription: obj.jobDescription,
        percentage,
      };
    });
    
    res.status(200).json(comparisonResults);
  
  } catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* get all posted jobs */
const getPostedjobs = async(req, res) => {
  try{
    const postedJobs = await jobDetail.find();
    
    res.status(200).json(postedJobs); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* get own posted jobs  */
const getOwnPostedjobs = async(req, res) => {
  try{
    const id = req.params.postedPersonId;
    const postedJobsByClient = await jobDetail.find({clientId:id});
    const postedJobsByRecruiter = await jobDetail.find({recruiterId:id});
    if(postedJobsByClient.length > 0){
      res.status(200).json(postedJobsByClient);
    }
    if(postedJobsByRecruiter.length > 0){
      res.status(200).json(postedJobsByRecruiter);
    }
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* candidate applying job */
const applyingjob = async(req, res) => {
  try{
    console.log(req.body);
    const newAppliedJob = new appliedJob({
      ...req.body,
    });
    await newAppliedJob.save();
    return res.status(201).json(newAppliedJob);
  }catch(err){
    res.status(500).json({error: err.message});
  }
}

/* get applied jobs */
const getAppliedjobs = async(req, res) => {
  try{
    const id = req.params.candidateId;
    const appliedJobs = await appliedJob.find({candidateId:id});
    
    res.status(200).json(appliedJobs); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* get applied jobs from posted jobs  */
const getAppliedOfPostedJobs = async(req, res) => {
  try{
    const id = req.params.clientId;
    const appliedOfPostedJobs = await appliedJob.find({clientId:id});
    
    res.status(200).json(appliedOfPostedJobs); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* delete particular job */
const deleteAppliedJob = async(req, res) => {
  try{
    const candidateId = req.params.candidateId;
    const jobId = req.params.jobId;
    console.log(candidateId, jobId)
    const deleteAppliedJob = await appliedJob.deleteOne({candidateId:candidateId, jobId:jobId});
    
    res.status(204).json(deleteAppliedJob); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* creating new recruiter */
const createRecruiter = async(req, res) => {
  try {
    console.log(req.body);
    const {email, password, id, name, } = req.body; 
    const employeeAvailable = await employee.findOne({email});
    if(employeeAvailable){
      return res.status(404).json({message: "employee already registered"});
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newEmployee = new employee({
      ...req.body,
      role:"Recruiter",
      password:hashPassword,
    });
    await newEmployee.save();
    console.log(newEmployee);
    const updatedUser = new allUsers({
      id,
      name,
      email,
      role:"Recruiter",
      password:hashPassword,
    });
    await updatedUser.save();
    console.log(updatedUser);
    return res.status(201).json({newEmployee, updatedUser});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  } 
}

/* delete particular job */
const deleteRecruiter = async(req, res) => {
  try{
    const recruiterId = req.params.recruiterId;
    console.log(recruiterId)
    const deleteRecruiterFromEmployee = await employee.deleteOne({id:recruiterId});
    const deleteRecruiterFromAllUsers = await allUsers.deleteOne({id:recruiterId});
    res.status(204).json({deleteRecruiterFromEmployee, deleteRecruiterFromAllUsers}); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* get all recruiters  */
const getAllRecruiters = async(req, res) => {
  try{
    const allRecruiters = await employee.find({role:"Recruiter"});
    
    res.status(200).json(allRecruiters); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* get applied jobs from posted jobs  */
const getAnIndividualRecruiter = async(req, res) => {
  try{
    const id = req.params.recruiterId;
    const recruiter = await employee.findOne({id:id});
    
    res.status(200).json(recruiter); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/**
 * @DESC To register the employee
 */
const employeeSignup = async (req, role, res) => {
  try {
    // Validate the name
    let nameNotTaken = await validateEmployeename(req.name);
    if (!nameNotTaken) {
      return res.status(400).json({
        message: `Employee is already registered.`
      });
    }

    // validate the email
    let emailNotRegistered = await validateEmail(req.email);
    if (!emailNotRegistered) {
      return res.status(400).json({
        message: `Email is already registered.`
      });
    }

    // Get the hashed password
    const password = await bcrypt.hash(req.password, 12);
    // create a new user
    const newEmployee  = new Employee ({
      ...req,
      password,
      role
    });

    await newEmployee .save();
    return res.status(201).json({
      message: "Hurry! now you are successfully registred. Please nor login."
    });
  } catch (err) {
    // Implement logger function if any
    return res.status(500).json({
      message: `${err.message}`
    });
  }
};

/**
 * @DESC To Login the user 
 */
const userLogin = async (req, role, res) => {
  let { email, password } = req;
  console.log(role);
  console.log(email, password);
  // First Check if the name is in the database
  const user = await allUsers.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(404).json({
      message: "User is not found. Invalid login credentials.",
    });
  }
  // We will check the role
  if (user.role !== role) {
    return res.status(403).json({
      message: "Please make sure you are logging in from the right portal.",
    });
  }
  // That means user is existing and trying to signin fro the right portal
  // Now check for the password
  let isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    // Sign in the token and issue it to the user
    let token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email
      },
      process.env.APP_SECRET,
      { expiresIn: "3 days" }
    );

    let result = {
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
      expiresIn: 168
    };
    // const date = new Date();
    // date.setHours(date.getHours() + 5);
    // res.setHeader('set-Cookie', `jwt=${token}; Expires=${date}; HttpOnly`)
    // res.status(200).cookie('jwt', token, {
    //   expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    //   secure: false,
    //   httpOnly: true
    // });
    return res.json({
      ...result,
      accessToken:token,
      message: "You are now logged in."
    });
  } else {
    return res.status(403).json({
      message: "Incorrect password."
    });
  }
};

const validateEmployeename = async name => {
  let employee = await Employee.findOne({ name });
  return employee ? false : true;
};


// const employeeAuth =   (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   console.log(process.env.APP_SECRET);
//   if (!authHeader) return res.sendStatus(403);
//   console.log(authHeader); // Bearer token
//   const token = authHeader.split(' ')[1];
//   jwt.verify(
//       token,
//       process.env.APP_SECRET,
//       (err, decoded) => {
//           console.log('verifying');
//           if (err) return res.sendStatus(403); //invalid token     
//           console.log(decoded);
//           req.user = decoded;
//           next();
//     },
      
//   );
// }

/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => async (req, res, next) => {
  let { name } = req.body;
  const employee = await Employee.findOne({ name });
  console.log('in checkrole');
  !roles.includes(employee.role)
    ? res.status(401).json("Sorry you do not have access to this route")
    : next();
}
const validateEmail = async email => {
  let employee = await Employee.findOne({ email });
  return employee ? false : true;
};

const jwtauth = (req, res, next) => {
  const cookies = req.cookies
  console.log(cookies)
  const token = cookies.jwt;
  if (!token) {
  return res.status(401).json("token not found");
  }
  try {
    console.log("middleware is working");
    const user = jwt.verify(token, process.env.APP_SECRET);
    console.log(user)
    if(user){
      next();
    }
  } catch (error) {
    return res.status(401).json("invalid token");
  }
}

module.exports = {
   checkRole,
   userLogin,
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
};
