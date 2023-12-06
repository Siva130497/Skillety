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
const forgotPasswordUser = require("../Database/forgotPasswordUsers");
const mediaDetail = require("../Database/mediaDetail");
const contactDetail = require("../Database/contact");
const contactCandidateDetail = require("../Database/contactCandidate");
const clientPackage = require("../Database/clientPackage");
const viewedCandidate = require("../Database/viewedCandidate");
const enquiryFormDetail = require("../Database/enquiryFormDetail");
const candidateChat = require("../Database/candidateChat");
const roomIdChatDetail = require("../Database/roomIdChatDetail");
const nonApprovalJob = require("../Database/nonApprovalJob");
const activeJob = require("../Database/activeJob");
const searchResult = require("../Database/searchResult");
const popularSearch = require("../Database/popularSearch");
const companyDetail = require("../Database/companyDetail");
const clientUrlWithEmail = require("../Database/clientUrlWithEmail");

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
    const {email, name, phone} = req.body;
    const clientAvailable = await client.findOne({ $or: [{ email },  {phone}] });
    const allUserAvailable = await allUsers.findOne({ $or: [{ email },  { phone }] });

    if (clientAvailable || allUserAvailable) {
      return res.status(404).json({ message: "User already registered" });
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
  const {id} = req.params;
  
  try {
    const neededClient = await client.findById(id);
    
    if (neededClient){
      const { _id, createdAt, updatedAt, __v, ...clientProperties } = neededClient._doc;
      console.log(clientProperties);

      const baseUrl = "https://skillety-frontend.onrender.com/verification/";
      const token = uuidv4();
      const tempUrl = baseUrl + token;

      // const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
      // let password = '';
          
      // for (let i = 0; i < 12; i++) {
      //     const randomIndex = Math.floor(Math.random() * charset.length);
      //     password += charset[randomIndex];
      // }

      console.log(tempUrl);
      // console.log(password);

      // const hashPassword = await bcrypt.hash(password, 12);

      const newTempClient = new TempClient({
        ...clientProperties, 
        id: token, 
        // tempPassword: hashPassword, 
        url: tempUrl 
      });

      await newTempClient.save();
      console.log(newTempClient);

      const existingClientUrlWithEmail = await clientUrlWithEmail.findOne({ email: newTempClient.email });

      if (existingClientUrlWithEmail) {
        existingClientUrlWithEmail.url.push(newTempClient.url);
        await existingClientUrlWithEmail.save();
        console.log(existingClientUrlWithEmail);
      } else {
        const newClientUrlWithEmail = new clientUrlWithEmail({
          email: newTempClient.email,
          url: [newTempClient.url],
        });

        await newClientUrlWithEmail.save();
        console.log(newClientUrlWithEmail);
      }

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
        text: 'Your details have been verified successfully. Please use the temporary URL to create your account.',
        html: `<p>Temporary URL: ${newTempClient.url}</p>`
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
    }else{
      return res.status(404).json({message: "no client found with the matching id"});
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* client_staff create */
const createClientStaff = async (req, res) => {
  const {id} = req.params;
  
  try {
    const {email, name, phone} = req.body; 
    const userAvailable = await finalClient.findOne(({ $or: [{ email }, {phone}] }));
    const allUserAvailable = await allUsers.findOne({ $or: [{ email },  { phone }] });

    if (userAvailable || allUserAvailable) {
      return res.status(404).json({ message: "User already registered" });
    }

    const neededClient = await finalClient.findOne({id});
    
    if (neededClient){

      const { companyName, companyId} = neededClient._doc;
      const packageDetailForCompanyId = await clientPackage.findOne({id:companyId});
      const createdAccounts = await finalClient.find({companyId});
      
      if(createdAccounts.length < packageDetailForCompanyId.logins){
        const baseUrl = "https://skillety-frontend.onrender.com/verification/";
        const token = uuidv4();
        const tempUrl = baseUrl + token;

        // const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        // let password = '';
            
        // for (let i = 0; i < 12; i++) {
        //     const randomIndex = Math.floor(Math.random() * charset.length);
        //     password += charset[randomIndex];
        // }

        console.log(tempUrl);
        // console.log(password);

        // const hashPassword = await bcrypt.hash(password, 12);

        const newTempClient = new TempClient({
          ...req.body,
          companyName,
          companyId,
          id: token, 
          // tempPassword: hashPassword, 
          url: tempUrl,
          role:"Client-staff"
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
          subject: `Mail from ${companyName}!`,
          text: 'These are your account detail, use the temporary url and temporary password to create your account',
          html: `<p>Temporary URL: ${newTempClient.url}</p>
                <p>User Name: ${req.body.name}</p>
                <p>Phone No: ${req.body.phone}</p>`
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
      }else{
        return res.status(200).json({message:"you reached the limit of creating accounts"});
      }
    }else{
      return res.status(404).json({message: "no client found with the matching id"});
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* fetch the client after uuid add */
const getAllClient = async(req, res) => {
  
  try{
    const tempClients = await TempClient.find();
    return res.status(200).json(tempClients);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

const getClient = async(req, res) => {
  const {id} = req.params;
  try{
    const tempClient = await TempClient.findOne({id});
    console.log(tempClient);
    return res.status(200).json(tempClient);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/* verify the client temp_pass with db temp_pass */
const verifyTempPassword = async(req, res) => {
  const {tempPassword, id} = req.body;
  console.log(tempPassword, id);
  try{
    const user = await TempClient.findOne({id});
    if(user){
      const isMatch = await bcrypt.compare(tempPassword, user.tempPassword);
      if(isMatch){
        return res.status(200).json({ message: 'temporary password match' });
      }else{
        return res.status(404).json({ message: 'temporary password failed!' });
      }
    }else{
      return res.status(404).json({ message: 'User not found' });
    }
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* client register after setup new password */
const finalClientRegister = async (req, res) => {
  try {
    console.log(req.body);

    const { id, password } = req.body;
    const tempClient = await TempClient.findOne({ id });

    if (!tempClient) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      _id,
      url,
      createdAt,
      updatedAt,
      __v,
      ...tempClientProperties
    } = tempClient._doc;

    const hashPassword = await bcrypt.hash(password, 12);

    let updatedClient;
    let newCompanyDetail;
    const companyId = tempClientProperties.companyId || uuidv4();
    const {
      email,
      industry,
      phone,
      count,
      companyName,
      name,
      role,
    } = tempClientProperties;

    if (!tempClientProperties.companyId) {
      updatedClient = new finalClient({
        ...tempClientProperties,
        companyId,
        password: hashPassword,
      });

      newCompanyDetail = new companyDetail({
        email,
        industry,
        phone,
        count,
        companyName,
        companyId,
        location: '',
        shortDescription: '',
        longDescription: '',
        mission: '',
        vision: '',
        benefits: [],
        awards: '',
        website: '',
      });

      await newCompanyDetail.save();
      console.log('New Company Detail:', newCompanyDetail);
    } else {
      updatedClient = new finalClient({
        ...tempClientProperties,
        password: hashPassword,
      });
    }

    await updatedClient.save();
    console.log('Updated Client:', updatedClient);

    const updatedUser = new allUsers({
      id,
      name,
      email,
      phone,
      role,
      password: hashPassword,
    });

    await updatedUser.save();
    console.log('Updated User:', updatedUser);

    await TempClient.deleteOne({ id });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'demoemail1322@gmail.com',
        pass: 'znsdgrmwzskpatwz'
      }
    });

    const mailOptions = {
      from: 'demoemail1322@gmail.com',
      to: updatedUser.email,
      subject: 'Mail from SKILLITY!',
      text: 'Welcome to Skillety!',
      html: `<p>Congratulations!</p><p>We are happy to have you with us. Please find your Login details below:</p>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Email sending error:', error);
        return res
          .status(500)
          .json({ error: 'Failed to send email', details: error.message });
      } else {
        console.log('Email sent:', info.response);

        // Exclude companyDetail if it doesn't exist
        const responseData = {
          updatedClient,
          updatedUser,
          emailSent: true,
        };

        if (newCompanyDetail) {
          responseData.newCompanyDetail = newCompanyDetail;
        }

        res.status(201).json(responseData);
      }
    });
  } catch (err) {
    console.error('Internal server error:', err);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: err.message });
  }
};


const saveCompanyDetail = async(req, res) =>{
  try{
    const newComDetail = new companyDetail({
      ...req.body,
    });
    await newComDetail.save();
    console.log(newComDetail);
    return res.status(201).json(newComDetail);
  }catch{
    return res.status(500).json({ error: err.message });
  }
}

/* get all staff from companyId */
const getAllStaff = async(req, res) => {
  const {id} = req.params;
  try{
    const allStaff = await finalClient.find({companyId:id});
    console.log(allStaff);
    return res.status(200).json(allStaff);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/* get all client */
const getAllClients = async(req, res) => {
  
  try{
    const allClient = await finalClient.find();
    console.log(allClient);
    return res.status(200).json(allClient);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/* candidate register */
const candidateReg = async(req, res) => {
  try {
    console.log(req.body);
    const {firstName, lastName, email, id, password, phone} = req.body; 
    const candidateAvailable = await candidate.findOne({ $or: [{ email },  {phone}] });
    const allUserAvailable = await allUsers.findOne({ $or: [{ email },  { phone }] });

    if (candidateAvailable || allUserAvailable) {
      return res.status(404).json({ message: "User already registered" });
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
      phone,
      role: "Candidate",
      password:hashPassword,
    });
    await updatedUser.save();
    console.log(updatedUser);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'demoemail1322@gmail.com',
        pass: 'znsdgrmwzskpatwz'
      }
    });

    const mailOptions = {
      from: 'demoemail1322@gmail.com',
      to: `${updatedUser.email}`,
      subject: 'Mail from SKILLITY!',
      text: 'Welcome to Skillety!',
      html: `<p>Congratulations! </p><p>We are happy to have you with us. Please find your Login details below :</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message, newCandidate, updatedUser });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(201).json({ newCandidate, updatedUser, emailSent: true });
      }
    });

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

/* get a candidate details*/
const getCandidateDetail = async (req, res) => {
  try {
    const {id} = req.params;

    const cand = await candidate.findOne({id});
    if (!cand) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const resumeData = await resume.findOne({id});

    if (resumeData) {
      const dayDifference = 10; 
      const candidateDetail = { ...cand._doc, ...resumeData._doc, dayDifference };
      return res.status(200).json(candidateDetail);
    } else {
      return res.status(200).json(cand._doc);
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const clientJobPosting = async(req, res) => {
  try{
    console.log(req.body);
    const newNonApprovalJob = new nonApprovalJob({
      ...req.body,
    });
    await newNonApprovalJob.save();
    console.log(newNonApprovalJob);
    return res.status(201).json(newNonApprovalJob);
  }catch(err){
    return res.status(500).json({ error: err.message })
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

const jobApproval = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const nonApprovedJob = await nonApprovalJob.findOne({ id });

    console.log(nonApprovedJob);

    if (nonApprovedJob) {
  
      const nonApprovedJobObj = nonApprovedJob.toObject();

      const newJobDetail = new jobDetail({
        ...nonApprovedJobObj,
      });

      await newJobDetail.save();
      console.log(newJobDetail);

      await nonApprovedJob.deleteOne({ id });

      return res.status(200).json(newJobDetail);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const activateJob = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    // Find the job by id
    const job = await jobDetail.findOne({ id });

    console.log(job);

    if (job) {
      // Move job to the activeJob schema
      const jobObj = job.toObject();
      const newActiveJob = new activeJob({
        ...jobObj,
      });

      await newActiveJob.save();
      console.log(newActiveJob);

      // Delete the job from jobDetail schema
      await jobDetail.deleteOne({ id });

      // Fetch all candidates
      const candidateDetails = await candidate.find();

      const calculateMatchPercentage = (skills1, skills2) => {
        const matchingSkills = skills2.filter(skill => skills1.includes(skill));
        return (matchingSkills.length / skills2.length) * 100;
      };

      // Filter candidates based on skill match
      const matchingCandidates = candidateDetails.filter(candidate => {
        const percentage = calculateMatchPercentage(candidate.skills, job.skills);
        return percentage > 50;
      });

      const candidateEmails = matchingCandidates.map(candidate => candidate.email);
      console.log(candidateEmails);

      if (candidateEmails.length > 0) {
        // Send email alerts to matching candidates
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'demoemail1322@gmail.com',
            pass: 'znsdgrmwzskpatwz'
          }
        });

        for (const candidateEmail of candidateEmails) {
          const mailOptions = {
            from: 'demoemail1322@gmail.com',
            to: candidateEmail,
            subject: 'Mail from SKILLITY!',
            text: `Welcome to Skillety! Your skill match found`,
            html: `<p>Your skill match found for the job with role ${newActiveJob.jobRole[0]}</p>`
          };

          await transporter.sendMail(mailOptions);
          console.log('Email sent to ' + candidateEmail);
        }

        res.status(200).json({ message: 'Job alerts sent successfully!', newActiveJob });
      } else {
        res.status(200).json({ message: 'No candidates with matching skill percentage found.', newActiveJob });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


const deactivateJob = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);

    const job = await activeJob.findOne({ id });

    console.log(job);

    if (job) {
  
      const jobObj = job.toObject();

      const newJob = new jobDetail({
        ...jobObj,
      });

      await newJob.save();
      console.log(newJob);

      await activeJob.deleteOne({ id });

      return res.status(200).json(newJob);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* get all job details */
const getSkillMatchJobDetail = async (req, res) => {
  try {
    const id = req.params.candidateId;
    const candidateDetail = await candidate.findOne({ id });
    const jobDetails = await activeJob.find();

    const calculateMatchPercentage = (skills1, skills2) => {
      const matchingSkills = skills2.filter(skill => skills1.includes(skill));
      return (matchingSkills.length / skills1.length) * 100;
    }

    const comparisonResults = jobDetails.map(obj => {
      const percentage = calculateMatchPercentage(obj.skills, candidateDetail.skills);
      const result = {
        jobId: obj.id,
        jobRole: obj.jobRole,
        jobMandatorySkills: obj.skills,
        jobLocation: obj.location,
        jobDepartment: obj.department,
        role: obj.role,
        jobExperience: `${obj.minExperience} - ${obj.maxExperience} years experience`,
        jobCategory: obj.jobCategory,
        jobDescription: obj.jobDescription,
        salary: `${obj.currencyType}${obj.minSalary} - ${obj.currencyType}${obj.maxSalary} `,
        industry: obj.industry,
        education: obj.education,
        workMode: obj.workMode,
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
    res.status(500).json({ error: err.message });
  }
}

/* sending email alert to candidate */
// const sendingJobAlertMail = async (req, res) => {
//   try {
//     const { id } = req.body;
//     console.log(id)
    
    
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };




/* get all posted jobs */
const getActivejobs = async(req, res) => {
  try{
    const avtiveJobs = await activeJob.find();
    
    res.status(200).json(avtiveJobs); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* get all posted jobs */
const getApprovedInActivejobs = async(req, res) => {
  try{
    const approvedInActivejobs = await jobDetail.find();
    
    res.status(200).json(approvedInActivejobs); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* get all non approval jobs */
const getNonApprovaljobs = async(req, res) => {
  try {
    const nonApprovalJobs = await nonApprovalJob.find();

    const nonApprovalJobsWithPending = nonApprovalJobs.map(job => ({ ...job.toObject(), pending: true }));

    res.status(200).json(nonApprovalJobsWithPending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* get a job  */
const getJob = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {

    const jobActive = await activeJob.findOne({ id });

    if (jobActive) {
      return res.status(200).json(jobActive);
    }
   
    const jobInDetail = await jobDetail.findOne({ id });

    if (jobInDetail) {
      return res.status(200).json(jobInDetail);
    }

    const jobInNonApproval = await nonApprovalJob.findOne({ id });

    if (jobInNonApproval) {
      return res.status(200).json(jobInNonApproval);
    }

    return res.status(404).json({ error: 'Job not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAppliedJobByJobId = async (req, res) => {
  const {id} = req.params;
  console.log(id)
  try {
    const jobs = await appliedJob.find({ jobId:id });
    if (jobs) {
      return res.status(200).json(jobs);
    } else {
      return res.status(404).json({ error: 'Jobs not found' });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* update a job */
const updateJob = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the job in activeJob schema
    let jobToUpdate = await activeJob.findOne({ id });

    // Find the job in jobDetail schema if not found in activeJob
    if (!jobToUpdate) {
      jobToUpdate = await jobDetail.findOne({ id });
    }

    // Find the job in nonApprovalJob schema if not found in activeJob or jobDetail
    if (!jobToUpdate) {
      jobToUpdate = await nonApprovalJob.findOne({ id });
    }

    // Check if the found job has a recruiterId
    const hasRecruiterId = jobToUpdate.recruiterId;

    // Update the job
    const updatedJob = await jobToUpdate.findOneAndUpdate(
      { id },
      {
        $set: {
          jobRole: req.body.jobRole,
          skills: req.body.skills,
          location: req.body.location,
          department: req.body.department,
          role: req.body.role,
          minExperience: req.body.minExperience,
          maxExperience: req.body.maxExperience,
          jobCategory: req.body.jobCategory,
          jobDescription: req.body.jobDescription,
          currencyType: req.body.currencyType,
          minSalary: req.body.minSalary,
          maxSalary: req.body.maxSalary,
          industry: req.body.industry,
          education: req.body.education,
        },
      },
      { new: true }
    );

    // If the found job has recruiterId or it's in nonApprovalJob schema, update only and return
    if (hasRecruiterId || jobToUpdate === nonApprovalJob) {
      return res.status(200).json(updatedJob);
    }

    // Add the updated job to nonApprovalJob schema
    const updatedNonApprovalJob = await nonApprovalJob.create(updatedJob);

    // Delete the job from the previous schema
    await jobToUpdate.deleteOne({ id });

    return res.status(200).json(updatedNonApprovalJob);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


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
      return res.status(200).json(postedJobs);
    }

      return res.status(404).json({ message: 'No posted job found' });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* get own active jobs  */
const getOwnActivejobs = async (req, res) => {
  try {
    const id = req.params.id; 
    
    const activeJobs = await activeJob.find({
      $or: [
        { companyId: id },
        { recruiterId: id }
      ]
    });

    if (activeJobs.length > 0) {
      const activeJobWithStatus = activeJobs.map(job => ({ ...job.toObject(), active: true }));
      return res.status(200).json(activeJobWithStatus);
    }

      return res.status(404).json({ message: 'No active job found' });
    
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

/* delete active job */
const deletingActiveJob = async(req, res) => {
  try{
    const jobId = req.params.jobId;
    const deletedActiveJob = await activeJob.deleteOne({id:jobId});
    const deleteAppliedJob = await appliedJob.deleteOne({jobId:jobId});
    if(!deleteAppliedJob){
      res.status(204).json({deletedActiveJob}); 
    }else{
      res.status(204).json({deletedActiveJob, deleteAppliedJob}); 
    }
    
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* delete non-approval-job */
const deletingNonApprovalJob = async(req, res) => {
  try{
    const jobId = req.params.jobId;
    const deletedNonApprovalJob = await nonApprovalJob.deleteOne({id:jobId});
    
      res.status(204).json(deletedNonApprovalJob); 
    
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* delete posted-job */
const deletingPostedJob = async(req, res) => {
  try{
    const jobId = req.params.jobId;
    const deletedPostedJob = await jobDetail.deleteOne({id:jobId});
    
      res.status(204).json(deletedPostedJob); 
    
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* creating new recruiter */
const createRecruiter = async(req, res) => {
  try {
    console.log(req.body);
    const {email, password, id, name, phone} = req.body; 
    const employeeAvailable = await employee.findOne(({ $or: [{ email },  {phone}] }));
    const allUserAvailable = await allUsers.findOne({ $or: [{ email },  { phone }] });

    if (employeeAvailable || allUserAvailable) {
      return res.status(404).json({ message: "User already registered" });
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
      phone,
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

/* get all cse recruiters */
const getAllCSERecruiters = async(req, res) => {
  try{
    const allCSERecruiters = await employee.find({companyStaff:"CSE"});
    console.log(allCSERecruiters);
    res.status(200).json(allCSERecruiters);
  }catch(err){
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
  const {email} = req.body;
  try{
    await forgotPasswordUser.deleteOne({email:email});
    const userAlreadyCreated = await allUsers.findOne({email:email});
    if(userAlreadyCreated){
      const charset = '0123456789';
      let verificationCode = '';
      for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        verificationCode += charset[randomIndex];
      }
      console.log(verificationCode);
      const hashVerificationCode = await bcrypt.hash(verificationCode, 12);
      const userWithTempPass = new forgotPasswordUser({
        id:userAlreadyCreated.id,
        name:userAlreadyCreated.name,
        email:userAlreadyCreated.email,
        phone:userAlreadyCreated.phone,
        role:userAlreadyCreated.role,
        verificationCode:hashVerificationCode,
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
        html: `<p>Verification Code: ${verificationCode}</p>`
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

/* verify the user code with db code */
const verifying = async(req, res) => {
  const {verificationCode, id} = req.body;
  console.log(verificationCode, id);
  try{
    const user = await forgotPasswordUser.findOne({id});
    if(user){
      const isMatch = await bcrypt.compare(verificationCode, user.verificationCode);
      if(isMatch){
        return res.status(200).json({ message: 'verification code match' });
      }else{
        return res.status(404).json({ message: 'verification code failed!' });
      }
    }else{
      return res.status(404).json({ message: 'User not found' });
    }
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* change the exiting password with new password */
const newPassword = async(req, res) => {
  const {id} = req.params;
  console.log(id);
  const {password, role} = req.body;
  console.log(password);
  try{
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
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* recruiter event posting */
const eventPosting = async(req, res) => {
  console.log(req.body);
  try {
      const newMedia = new mediaDetail({
        ...req.body,
      });
      await newMedia.save();
      console.log(newMedia);
      return res.status(201).json(newMedia);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* get all posted events of recruiters */
const getAllEvents = async(req, res) => {
  try{
    const allEventDetails = await mediaDetail.find({type:"event"});
    console.log(allEventDetails);
    return res.status(200).json(allEventDetails);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

const getAllBlogs = async(req, res) => {
  try{
    const allBlogDetails = await mediaDetail.find({type:"blog"});
    console.log(allBlogDetails);
    return res.status(200).json(allBlogDetails);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

const getAllVideos = async(req, res) => {
  try{
    const allVdoDetails = await mediaDetail.find({type:"video"});
    console.log(allVdoDetails);
    return res.status(200).json(allVdoDetails);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

const getAllPodcasts = async(req, res) => {
  try{
    const allPodcastDetails = await mediaDetail.find({type:"podcast"});
    console.log(allPodcastDetails);
    return res.status(200).json(allPodcastDetails);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

const getAllNews = async(req, res) => {
  try{
    const allNewsDetails = await mediaDetail.find({type:"news"});
    console.log(allNewsDetails);
    return res.status(200).json(allNewsDetails);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

/* delete the event by recruiter */
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await mediaDetail.deleteOne({ id }); 
    if (deletedEvent.deletedCount === 0) {
      return res.status(404).json({ error: 'media not found' });
    }
    return res.status(200).json({ message: 'media deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* get an individual event */
const anEvent = async(req, res) => {
  const {id} = req.params;
  console.log(id);
  try{
    const event = await mediaDetail.findOne({id});
    if(event){
      console.log(event);
      return res.status(200).json(event);
    }else{
      return res.status(404).json({ error: 'media not found' });
    }
  }catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* change the event detail */
const changingEvent = async (req, res) => {
  const { id } = req.params;
  const eventData = req.body; 

  try {
    const updatedEvent = await mediaDetail.findOneAndUpdate(
      { id: id }, 
      eventData,
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: 'media not found' });
    }

    return res.status(200).json({ updatedEvent });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* contact detail posting */
const contactMessage = async(req, res) => {
  console.log(req.body);
  try {
    const newContactMessage = new contactDetail({
      ...req.body,
    });
    await newContactMessage.save();
    console.log(newContactMessage);
    return res.status(201).json(newContactMessage);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


const contactMessageCandidate = async(req, res) => {
  console.log(req.body);
  try {
    const newContactMessage = new contactCandidateDetail({
      ...req.body,
    });
    await newContactMessage.save();
    console.log(newContactMessage);
    return res.status(201).json(newContactMessage);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* get all contact messagess by recruiters */
const getAllContactMessages = async(req, res) => {
  try{
    const allContactMessages = await contactDetail.find();
    console.log(allContactMessages);
    return res.status(200).json(allContactMessages);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
};

const getAllCandidateContactMessages = async(req, res) => {
  try{
    const allContactMessages = await contactCandidateDetail.find();
    console.log(allContactMessages);
    return res.status(200).json(allContactMessages);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

const deletingCandidateContactMsg = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClientContactMsg = await contactCandidateDetail.deleteOne({ _id: id });

    if (deletedClientContactMsg.deletedCount > 0) {
      res.status(204).json({ message: 'Contact message deleted successfully' });
    } else {
      res.status(404).json({ error: 'Contact message not found' });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const deletingClientContactMsg = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedClientContactMsg = await contactDetail.deleteOne({ _id: id });

    if (deletedClientContactMsg.deletedCount > 0) {
      res.status(204).json({ message: 'Contact message deleted successfully' });
    } else {
      res.status(404).json({ error: 'Contact message not found' });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


/* client_package choosing */
const clientPackageSelection = async(req, res) => {
  console.log(req.body);
  const {id} = req.body;
  try{
    await clientPackage.deleteOne({id});
    const newClientPackage = new clientPackage({
      ...req.body,
    });
    await newClientPackage.save();
    console.log(newClientPackage);
    return res.status(201).json(newClientPackage);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

/* get client with their package plan */
const getClientChoosenPlan = async(req, res) => {
  const {id} = req.params;
  try{
    const clientWithPackagePlan = await clientPackage.findOne({id});
    if(clientWithPackagePlan){
      console.log(clientWithPackagePlan);
      return res.status(200).json(clientWithPackagePlan);
    }else{
      return res.status(404).json({ message: 'no package plan for client' });
    }
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

/* create client viewed candidate */
const createViewedCandidate = async(req, res) => {
  console.log(req.body);
  try{
    const clientViewedCandidate = new viewedCandidate({
      ...req.body,
    });
    await clientViewedCandidate.save();
    console.log(clientViewedCandidate);
    return res.status(201).json(clientViewedCandidate);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

/* get viewed candidates by client */
const getViewedCandidates = async(req, res) => {
  const {id} = req.params;
  try{
    const clientViewedCandidate = await viewedCandidate.find({companyId:id});
    if(clientViewedCandidate){
      console.log(clientViewedCandidate);
      return res.status(200).json(clientViewedCandidate);
    }else{
      return res.status(404).json({ message: 'no candidates cv still not viewed' });
    }
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

/* enquiry form detail posting */
const postEnquiryFormDetail = async(req, res) => {
  console.log(req.body);
  try {
    const newEnquiryFormDetail = new enquiryFormDetail({
      ...req.body,
    });
    await newEnquiryFormDetail.save();
    console.log(newEnquiryFormDetail);
    return res.status(201).json(newEnquiryFormDetail);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* get all enquiry form details by recruiters */
const getEnquiryFormDetails = async(req, res) => {
  try{
    const allEnquiryFormDetails = await enquiryFormDetail.find();
    console.log(allEnquiryFormDetails);
    return res.status(200).json(allEnquiryFormDetails);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
};

const deletingEnquiryForm = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedEnquiry = await enquiryFormDetail.deleteOne({ _id: id });

    if (deletedEnquiry.deletedCount > 0) {
      res.status(204).json({ message: 'enquiry deleted successfully' });
    } else {
      res.status(404).json({ error: 'enquiry not found' });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* create a schema for candidate join chat*/
const candidateChatRoomId = async(req, res) => {
  console.log(req.body);
  const {roomId} = req.body;
  try {
    const alreadyCandidateWantChat = await candidateChat.findOne({roomId});
    if(!alreadyCandidateWantChat){
      const newCandidateChat = new candidateChat({
        ...req.body,
      });
      await newCandidateChat.save();
      console.log(newCandidateChat);
      return res.status(201).json(newCandidateChat);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* get all the candidate want chat */
const getAllCandidateWantChat = async(req, res) => {
  try {
    const allCandidatesWantChat = await candidateChat.find();

    const candidatesWithNewMessage = await Promise.all(allCandidatesWantChat.map(async (candidate) => {
      const lastChatDetail = await roomIdChatDetail.findOne({ roomId: candidate.roomId }).sort({createdAt: -1});

      if (lastChatDetail && lastChatDetail.userId === candidate.roomId) {
        return { ...candidate.toObject(), newMessage: true };
      } else {
        return { ...candidate.toObject(), newMessage: false };
      }
    }));

    const sortedCandidates = candidatesWithNewMessage.sort((a, b) => {
      if (a.newMessage && !b.newMessage) return -1;
      if (!a.newMessage && b.newMessage) return 1;
      return 0;
    });

    console.log(sortedCandidates);

    return res.status(200).json(sortedCandidates);
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
};

/* messages of the particular chat room id*/
const roomIdChatDetailCreate = async(req, res) => {
  console.log(req.body);
  try {
      const newRoomIdChatDetail = new roomIdChatDetail({
        ...req.body,
      });
      await newRoomIdChatDetail.save();
      console.log(newRoomIdChatDetail);
      return res.status(201).json(newRoomIdChatDetail);
    
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* get all the chat detail for the room id */
const getAllChatDetailOfRoomId = async(req, res) => {
  const {id} = req.params;
  try {
    const allChatDetailOfRoomId = await roomIdChatDetail.find({ roomId: id });
    const nonMatchingUserId = allChatDetailOfRoomId.filter(obj => obj.userId !== id);
    console.log(allChatDetailOfRoomId, nonMatchingUserId);
    return res.status(200).json({ allChatDetailOfRoomId, nonMatchingUserId });
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
};

/* send mail to particular cse with enquiry detail */
const sendingMailToCSE = async(req, res) => {
  const {email, enquiryDetail} = req.body;
  try{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'demoemail1322@gmail.com',
          pass: 'znsdgrmwzskpatwz'
        }
      });

      const mailOptions = {
        from: 'demoemail1322@gmail.com',
        to: `${email}`,
        subject: 'Mail from SKILLITY!',
        text: 'Enquiry form detail',
        html: `<h4>Enquiry form detail</h4>
        <p>Full Name: ${enquiryDetail.fullName}</p>
        <p>Mobile Number: ${enquiryDetail.phoneNo}</p>
        <p>Email ID: ${enquiryDetail.email}</p>
        <p>Company Name: ${enquiryDetail.companyName}</p>
        <p>Designation: ${enquiryDetail.designation}</p>
        <p>Location: ${enquiryDetail.location}</p>
        <p>Which RPO model do you want to opt for?: ${enquiryDetail.rpoModel}</p>
        <p>How many positions are open to be outsourced?: ${enquiryDetail.positionCount}</p>
        <p>Tentative deadline to close these positions ?: ${enquiryDetail.deadline}</p>
        <p>Would you like our dedicated Account Manager to work from your premises or our premises?: ${enquiryDetail.premisesType}</p>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ emailSent: true });
        }
      });
  } catch(err) {
    return res.status(500).json({ error: err.message });
  }
}

/* update the client information */
const updatingClientEmail = async (req, res) => {
  const { id, email } = req.body;

  try {
    const allUsersDoc = await allUsers.findOneAndUpdate(
      { id: id },
      { email: email },
      { new: true }
    );
    const finalClientDoc = await finalClient.findOneAndUpdate(
      { id: id },
      { email: email },
      { new: true }
    );
    res.status(200).json({ allUsersDoc, finalClientDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingClientPhone = async (req, res) => {
  const { id, phone } = req.body;

  try {
    const allUsersDoc = await allUsers.findOneAndUpdate(
      { id: id },
      { phone: phone },
      { new: true }
    );
    const finalClientDoc = await finalClient.findOneAndUpdate(
      { id: id },
      { phone: phone },
      { new: true }
    );
    res.status(200).json({ allUsersDoc, finalClientDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingClientPassword = async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  try {
    const user = await allUsers.findOne({ id: id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const hashPassword = await bcrypt.hash(newPassword, 12);
    const allUsersDoc = await allUsers.findOneAndUpdate(
      { id: id },
      { password: hashPassword },
      { new: true }
    );
    const finalClientDoc = await finalClient.findOneAndUpdate(
      { id: id },
      { password: hashPassword },
      { new: true }
    );
    res.status(200).json({ allUsersDoc, finalClientDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyName = async (req, res) => {
  const { id, companyName } = req.body;

  try {
    const finalClientDoc = await finalClient.findOneAndUpdate(
      { companyId: id },
      { companyName: companyName },
      { new: true }
    );

    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { companyName: companyName },
      { new: true }
    );
    res.status(200).json({ finalClientDoc, companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyIndustry = async (req, res) => {
  const { id, industry } = req.body;

  try {
    const finalClientDoc = await finalClient.findOneAndUpdate(
      { companyId: id },
      { industry: industry },
      { new: true }
    );

    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { industry: industry },
      { new: true }
    );
    res.status(200).json({ finalClientDoc, companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyLocation = async (req, res) => {
  const { id, location } = req.body;

  try {
    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { location: location },
      { new: true }
    );
    res.status(200).json({ companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyShortDescription = async (req, res) => {
  const { id, shortDescription } = req.body;

  try {
    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { shortDescription: shortDescription },
      { new: true }
    );
    res.status(200).json({ companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyLongDescription = async (req, res) => {
  const { id, longDescription } = req.body;

  try {
    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { longDescription: longDescription },
      { new: true }
    );
    res.status(200).json({ companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyMission = async (req, res) => {
  const { id, mission } = req.body;

  try {
    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { mission: mission },
      { new: true }
    );
    res.status(200).json({ companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyVision = async (req, res) => {
  const { id, vision } = req.body;

  try {
    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { vision: vision },
      { new: true }
    );
    res.status(200).json({ companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyAwards = async (req, res) => {
  const { id, awards } = req.body;

  try {
    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { awards: awards },
      { new: true }
    );
    res.status(200).json({ companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyBenefits = async (req, res) => {
  const { id, benefits } = req.body;

  try {
    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { benefits: benefits },
      { new: true }
    );
    res.status(200).json({ companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCompanyWebsite = async (req, res) => {
  const { id, website } = req.body;

  try {
    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { website: website },
      { new: true }
    );
    res.status(200).json({ companyDetailDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

/* update the candidate information */
const updatingCandidateEmail = async (req, res) => {
  const { id, email } = req.body;

  try {
    const allUsersDoc = await allUsers.findOneAndUpdate(
      { id: id },
      { email: email },
      { new: true }
    );
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { email: email },
      { new: true }
    );
    res.status(200).json({ allUsersDoc, finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidatePhone = async (req, res) => {
  const { id, phone } = req.body;

  try {
    const allUsersDoc = await allUsers.findOneAndUpdate(
      { id: id },
      { phone: phone },
      { new: true }
    );
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { phone: phone },
      { new: true }
    );
    res.status(200).json({ allUsersDoc, finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidateFirstName = async (req, res) => {
  const { id, firstName } = req.body;

  try {
    const allUsersDoc = await allUsers.findOne({ id: id });

    if (!allUsersDoc) {
      return res.status(404).send({ error: 'User not found' });
    }

    const [currentFirstName, currentLastName] = allUsersDoc.name.split(' ');

    const updatedFirstName = firstName;

    const updatedName = `${updatedFirstName} ${currentLastName}`;

    const updatedAllUsersDoc = await allUsers.findOneAndUpdate(
      { id: id },
      { name: updatedName },
      { new: true }
    );

    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { firstName: firstName },
      { new: true }
    );

    res.status(200).json({ updatedAllUsersDoc, finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidateLastName = async (req, res) => {
  const { id, lastName } = req.body;

  try {
    const allUsersDoc = await allUsers.findOne({ id: id });

    if (!allUsersDoc) {
      return res.status(404).send({ error: 'User not found' });
    }

    const [currentFirstName, currentLastName] = allUsersDoc.name.split(' ');

    const updatedLastName = lastName;

    const updatedName = `${currentFirstName} ${updatedLastName}`;

    const updatedAllUsersDoc = await allUsers.findOneAndUpdate(
      { id: id },
      { name: updatedName },
      { new: true }
    );

    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { lastName: lastName },
      { new: true }
    );

    res.status(200).json({ updatedAllUsersDoc, finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidateLocation = async (req, res) => {
  const { id, location } = req.body;

  try {
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { location: location },
      { new: true }
    );
    res.status(200).json({ finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidateSkill = async (req, res) => {
  const { id, skill } = req.body;

  try {
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { skills: skill },
      { new: true }
    );
    res.status(200).json({ finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidatePreferedLocation = async (req, res) => {
  const { id, preferedLocations } = req.body;

  try {
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { preferedlocations: preferedLocations },
      { new: true }
    );
    res.status(200).json({ finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidateDays = async (req, res) => {
  const { id, days } = req.body;

  try {
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { days: days },
      { new: true }
    );
    res.status(200).json({ finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidateExperience = async (req, res) => {
  const { id, year, month } = req.body;

  try {
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { $set: { year: year, month: month } }, 
      { new: true }
    );
    res.status(200).json({ finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidateSalary = async (req, res) => {
  const { id, currencyType, minSalary, maxSalary } = req.body;

  try {
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { $set: { currencyType: currencyType, minSalary: minSalary, maxSalary: maxSalary } }, 
      { new: true }
    );
    res.status(200).json({ finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidateEducation = async (req, res) => {
  const { id, education } = req.body;

  try {
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { education: education },
      { new: true }
    );
    res.status(200).json({ finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidateProfileHeadline = async (req, res) => {
  const { id, profileHeadline } = req.body;

  try {
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { profileHeadline: profileHeadline },
      { new: true }
    );
    res.status(200).json({ finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

const updatingCandidatePassword = async (req, res) => {
  const { id, currentPassword, newPassword } = req.body;
  try {
    const user = await allUsers.findOne({ id: id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password does not match' });
    }
    const hashPassword = await bcrypt.hash(newPassword, 12);
    const allUsersDoc = await allUsers.findOneAndUpdate(
      { id: id },
      { password: hashPassword },
      { new: true }
    );
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { password: hashPassword },
      { new: true }
    );
    res.status(200).json({ allUsersDoc, finalCandidateDoc });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};


/* search result of job save */
const searchResultSave = async(req, res) => {
  try {
    console.log(req.body);
    const newRecentSearch = new searchResult({
      ...req.body,
    });
    await newRecentSearch.save();
    console.log(newRecentSearch);
    return res.status(201).json(newRecentSearch);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* get all recent searches */
const getAllRecentSearches = async(req, res) => {
  try{
    const allRecentSearches = await searchResult.find();
    console.log(allRecentSearches);
    return res.status(200).json(allRecentSearches);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
};

const popularSearchSaving = async (req, res) => {
  const popularSearchArray = req.body;
  
  try {
      const savedPopularSearches = await Promise.all(popularSearchArray.map(async (popularSearchString) => {
        
          const existingPopularSearch  = await popularSearch.findOne({ keyword: popularSearchString });

          if (existingPopularSearch ) {
            existingPopularSearch.times += 1;
            return await existingPopularSearch.save();
          }

          const postPopularSearch = new popularSearch({
            keyword: popularSearchString,
            times: 1,
          });
          return await postPopularSearch.save();
      }));
    
      res.status(200).json(savedPopularSearches);
  } catch (err) {
      res.status(500).json(err)
  }
}

const getPopularSearches = async (req, res) => {
  try {
   
    const popularSearches = await popularSearch.find()
      .sort({ times: -1 }) 
      .limit(7); 

    res.status(200).json(popularSearches);
  } catch (err) {
    res.status(500).json(err);
  }
};

/* get particular company detail  */
const getCompanyDetailByCompanyId = async(req, res) => {
  try{
    const {id} = req.params;
    const companyDetailForCompanyId = await companyDetail.findOne({companyId:id});
    
    res.status(200).json(companyDetailForCompanyId); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* grt all company detail */
const getAllCompanyDetails = async(req, res) => {
  try{
    const allCompanyDetails = await companyDetail.find();
    
    res.status(200).json(allCompanyDetails); 
  }catch(err) {
    res.status(500).json({error: err.message})
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
    // let user = await allUsers.findOne({ name: userId });
    
    let user = await allUsers.findOne({ email: userId });
    
    if (!user) {
      user = await allUsers.findOne({ phone: userId });
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
        email:user.email,
        phone:user.phone
      };

      let result = {
        id: user.id,
        role: user.role,
        name: user.name,
        email:user.email,
        phone:user.phone,
        expiresIn: 168
      };

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
   getOwnActivejobs,
   getOwnPostedjobs,
   applyingjob,
   getAppliedjobs,
   getAppliedOfPostedJobs,
   deleteAppliedJob,
   deletingPostedJob,
   deletingActiveJob,
   deletingNonApprovalJob,
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
   deletingClientContactMsg,
  deletingCandidateContactMsg,
  deletingEnquiryForm,
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
};
