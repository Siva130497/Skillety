const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require ('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const client = require("../Database/client");
const nodemailer = require('nodemailer');
const TempClient = require("../Database/TempClient");
const finalClient = require("../Database/finalClient");
const candidate = require("../Database/candidate");
const resume = require("../Database/resume");
const jobDetail = require("../Database/jobDetail");
const appliedJob = require("../Database/appliedJob");
const allUsers = require("../Database/allUsers");
const employee = require("../Database/employee");
const assignedCandidate = require("../Database/assignedCandidate");
const clientStaff = require("../Database/clientStaffs");
const forgotPasswordUser = require("../Database/forgotPasswordUsers");
const eventDetail = require("../Database/eventDetail");

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
    const {email, name} = req.body;
    const clientAvailable = await client.findOne({ $or: [{ email }, { name }] });
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
    const {tempPassword} = req.body;
    const hashPassword = await bcrypt.hash(tempPassword, 12);
    const newTempClient = new TempClient({
      ...req.body,
      tempPassword:hashPassword,
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
      html: `<p>Temporary URL: ${newTempClient.url}</p><p>Temporary Password: ${tempPassword}</p>`
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
  const {id} = req.params;
  try{
    const tempClient = await TempClient.find({id});
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
    const {tempPassword, userEnterTempPassword, ...rest} = req.body;
    const isMatch = await bcrypt.compare(userEnterTempPassword, tempPassword);
    if(isMatch){
      const hashPassword = await bcrypt.hash(req.body.password, 12);
      console.log(hashPassword);
      const updatedClient = new finalClient({
        ...rest,
        companyId:uuidv4(),
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
    }else{
      return res.status(403).json({
        message: "Incorrect temporary password."
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* client staff register */
const clientStaffReg = async(req, res) => {
  try {
    console.log(req.body);
    const numOfAccountsCanBeCreated = 2;
    let {companyId,name} = req.body;
    const createdAccounts = await finalClient.find({companyId});
    if(createdAccounts.length < numOfAccountsCanBeCreated){
      const clientCreatedStaffAvailable = await finalClient.findOne({name});
      if(clientCreatedStaffAvailable){
        return res.status(404).json({message: "staff already registered"});
      }
      const hashPassword = await bcrypt.hash(req.body.password, 12);
      console.log(hashPassword);
      const newClientStaff = new finalClient({
        ...req.body,
        password: hashPassword, 
      });
      await newClientStaff.save();
      console.log(newClientStaff);
      const {role, id} = req.body;
      const updatedUser = new allUsers({
        id,   
        name,
        role,
        password:hashPassword,
      });
      await updatedUser.save();
      console.log(updatedUser);
      return res.status(201).json({newClientStaff, updatedUser});
    }else{
      return res.status(200).json({message:"you reached the limit of creating accounts"});
    }
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
const getSkillMatchJobDetail = async (req, res) => {
  try {
    const id = req.params.candidateId;
    const candidateDetail = await candidate.findOne({ id });
    const jobDetails = await jobDetail.find();

    const calculateMatchPercentage = (skills1, skills2) => {
      const matchingSkills = skills2.filter(skill => skills1.includes(skill));
      return (matchingSkills.length / skills1.length) * 100;
    }

    const comparisonResults = jobDetails.map(obj => {
      const percentage = calculateMatchPercentage(obj.skills, candidateDetail.skills);
      const result = {
        jobId: obj.id,
        jobRole: obj.jobRole[0],
        jobMandatorySkills: obj.skills,
        jobAdditionalSkills: obj.additionalSkills,
        jobExperience: `${obj.year} years and ${obj.month} months`,
        jobCategory: obj.jobCategory,
        jobDescription: obj.jobDescription,
        percentage: Math.round(percentage), 
      };

      if (obj.recruiterId) {
        result.recruiterId = obj.recruiterId;
      } else if (obj.clientId) {
        result.clientId = obj.clientId;
        result.companyId = obj.companyId;
      } else if (obj.clientStaffId) {
        result.clientStaffId = obj.clientStaffId;
        result.companyId = obj.companyId;
      }

      return result;
    });

    comparisonResults.sort((a, b) => b.percentage - a.percentage);

    res.status(200).json(comparisonResults);

  } catch (err) {
    res.status(500).json({ error: err.message })
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
const getOwnPostedjobs = async (req, res) => {
  try {
    const id = req.params.id; 
    
    const postedJobs = await jobDetail.find({
      $or: [
        { companyId: id },
        { recruiterId: id }
      ]
    });

    if (postedJobs.length > 0) {
      res.status(200).json(postedJobs);
    } else {
      res.status(404).json({ message: 'No posted job found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
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
const getAppliedOfPostedJobs = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const appliedOfPostedJobs = await appliedJob.find({
      $or: [
        { companyId: id },
        { recruiterId: id }
      ]
    });

    if (appliedOfPostedJobs.length > 0) {
      res.status(200).json(appliedOfPostedJobs);
    } else {
      res.status(404).json({ message: 'No applied job found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
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

/* get individual recruiter  */
const getAnIndividualRecruiter = async(req, res) => {
  try{
    const id = req.params.recruiterId;
    console.log(id);
    const recruiter = await employee.findOne({id:id});
    
    res.status(200).json(recruiter); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* assign the candidate to a particular job */
const assigningCandidate = async(req, res) => {
  try{
    console.log(req.body);
    const newAssignedCandidate = new assignedCandidate({
      ...req.body,
    });
    await newAssignedCandidate.save();
    return res.status(201).json(newAssignedCandidate);
  }catch(err){
    res.status(500).json({error: err.message});
  }
}

/* get assigned candidates by recruiter */
const getAssignedCandidates = async(req, res) => {
  try{
    const assignedCandidates = await assignedCandidate.find();
    res.status(200).json(assignedCandidates); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* get applied jobs from posted jobs  */
const getLoginClientDetail = async(req, res) => {
  try{
    const id = req.params.clientId;
    const client = await finalClient.findOne({id:id});
    
    res.status(200).json(client); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* get all client staffs  */
const getAllClientStaffs = async(req, res) => {
  try{
    const id = req.params.companyId;
    const allClientStaffs = await finalClient.find({companyId:id, role:"Client-staff"});
    
    res.status(200).json(allClientStaffs); 
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

/* forgot password handling*/
const forgotPassword = async(req, res) => {
  console.log(req.body);
  const {email, role} = req.body;
  try{
    await forgotPasswordUser.deleteOne({email:email, role:role});
    const userAlreadyCreated = await allUsers.findOne({email:email, role:role});
    if(userAlreadyCreated){
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
      let password = '';
      for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
          password += charset[randomIndex];
      }
      console.log(password);
      const hashPassword = await bcrypt.hash(password, 12);
      const userWithTempPass = new forgotPasswordUser({
        id:userAlreadyCreated.id,
        name:userAlreadyCreated.name,
        email:userAlreadyCreated.email,
        role:userAlreadyCreated.role,
        tempPassword:hashPassword,
      });
      await userWithTempPass.save();
      console.log(userWithTempPass);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'demoemail1322@gmail.com',
          pass: 'znsdgrmwzskpatwz'
        }
      });

      const mailOptions = {
        from: 'demoemail1322@gmail.com',
        to: `${userWithTempPass.email}`,
        subject: 'Mail from SKILLITY!',
        text: 'Your temporary password!',
        html: `<p>Temporary Password: ${password}</p>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message, userWithTempPass });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ userWithTempPass, emailSent: true });
        }
      });
    }else{
      return res.status(404).json({
        message: "user not found!",
      });
    }
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* change the exiting password with new password */
const newPassword = async(req, res) => {
  const {id} = req.params;
  console.log(id);
  const {tempPassword, password, role} = req.body;
  console.log(tempPassword, password);
  try{
    const user = await forgotPasswordUser.findOne({id:id});
    if(user){
      const isMatch = await bcrypt.compare(tempPassword, user.tempPassword);
      if(isMatch){
        const hashPassword = await bcrypt.hash(password, 12);
        console.log(hashPassword);
        const updatedUser = await allUsers.findOneAndUpdate(
          { id },
          { $set: { password: hashPassword } },
          { new: true }
        );
        if (updatedUser) {
          if(role === "Admin"){
            const updatedEmployee = await employee.findOneAndUpdate(
              { id },
              { $set: { password: hashPassword } },
              { new: true }
            );
            console.log(updatedEmployee);
          }
          if(role === "Client"){
            const updatedClient = await finalClient.findOneAndUpdate(
              { id },
              { $set: { password: hashPassword } },
              { new: true }
            );
            console.log(updatedClient);
          }
          if(role === "Candidate"){
            const updatedCandidate = await candidate.findOneAndUpdate(
              { id },
              { $set: { password: hashPassword } },
              { new: true }
            );
            console.log(updatedCandidate);
          }
          return res.status(200).json({ message: 'Password updated successfully' });
        }else{
          return res.status(404).json({ message: 'User not found' });
        }
        
      }else{
        return res.status(403).json({
          message: "Incorrect temporary password!"
        });
      }
    }else{
      return res.status(404).json({
        message: "user not found!"
      });
    }
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* recruiter event posting */
const eventPosting = async(req, res) => {
  console.log(req.body);
  try {
    const newEvent = new eventDetail({
      ...req.body,
    });
    await newEvent.save();
    console.log(newEvent);
    return res.status(201).json(newEvent);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* get all posted events of recruiters */
const getAllEvents = async(req, res) => {
  try{
    const allEventDetails = await eventDetail.find();
    console.log(allEventDetails);
    return res.status(200).json(allEventDetails);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

/* random password generate */
const generateRandomPassword = (req, res) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return res.status(200).json(password);
}

/**
 * @DESC To Login the user 
 */
const userLogin = async (req, role, res) => {
  let { userId, password } = req;
  console.log(role);
  console.log(userId, password);
  try {
    let user = await allUsers.findOne({ name: userId });
    if (!user) {
      user = await allUsers.findOne({ email: userId });
    }
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User is not found. Invalid login credentials.",
      });
    }
    // We will check the role
    if (!role.includes(user.role)) {
      return res.status(403).json({
        message: "Please make sure you are logging in from the right portal.",
      });
    }
    // That means user is existing and trying to sign in from the right portal
    // Now check for the password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // Sign in the token and issue it to the user
      let payload = {
        id: user.id,
        role: user.role,
        name: user.name,
      };

      let result = {
        id: user.id,
        name: user.name,
        role: user.role,
        expiresIn: 168
      };

      if (role === 'Client-staff') {
        // No need to include email for Client-staff
      } else {
        payload.email = user.email;
        result.email = user.email;
      }

      let token = jwt.sign(
        payload,
        process.env.APP_SECRET,
        { expiresIn: "3 days" }
      );

      return res
        .cookie('jwt', token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          ...result,
          accessToken: token,
          message: "You are now logged in."
        });
    } else {
      return res.status(403).json({
        message: "Incorrect password."
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
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
};
