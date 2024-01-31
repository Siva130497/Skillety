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
const clientChat = require("../Database/clientChat");
const roomIdChatDetailClient = require("../Database/roomIdChatDetailClient");
const nonApprovalJob = require("../Database/nonApprovalJob");
const activeJob = require("../Database/activeJob");
const searchResult = require("../Database/searchResult");
const popularSearch = require("../Database/popularSearch");
const companyDetail = require("../Database/companyDetail");
const clientUrlWithEmail = require("../Database/clientUrlWithEmail");
const applicationStatus = require("../Database/applicationStatus");
const candidateToClientNotification = require("../Database/candidateToClientNotificationData");
const candidateToRecruiterNotification = require("../Database/candidateToRecruiterNotificationData");
const candidateNotification = require("../Database/candidateNotificationData");
const candidateCreate = require("../Database/candidateCreate");
const allClientTable = require("../Database/allClientTable");
const allCandidateTable = require("../Database/allCandidateTable");
const allJobTable = require("../Database/allJobTable");
const nonApprovalJobTable = require("../Database/nonApprovalJobTable");
const postedJobTable = require("../Database/postedJobTable");
const recruiterClient = require("../Database/recruiterClient");


//MOBILE APP..........
const candidateProfile = require("../Database/candidateProfile");
const createNotification = require("../Database/createNotification");
const clientProfile = require("../Database/clientProfile");
//MOBILE APP........

//ATS..................................

const offlineClient = require("../Database/offlineClient");
const offlineClientDoc = require("../Database/offlineClientDoc");
const offlineClientLogo = require("../Database/offlineClientLogo");
const offlineClientTable = require("../Database/offlineClientTable");
const atsJobsTable = require("../Database/atsJobsTable");
const selectedCandidateForJob = require("../Database/selectedCandidateForJob");
const assignCandidateForJobDetail = require("../Database/assignCandidateForJobDetail");
const offlineCand = require("../Database/offlineCand");

//ATS...............................................



// const hash = async() => {
//   const pass = 'newpassword'
//   const hash = await bcrypt.hash(pass, 12)
//   console.log(hash)
// }
// hash()

/* client register */
const clientRegister = async(req, res) => {
  
  const {recruiterId, ...clientData} = req.body;
  try {
    console.log(req.body);
    const {email, name, phone} = clientData;
    const clientAvailable = await client.findOne({ $or: [{ email },  {phone}] });
    const allUserAvailable = await allUsers.findOne({ $or: [{ email },  { phone }] });

    if (clientAvailable || allUserAvailable) {
      return res.status(404).json({ message: "User already registered" });
    }
    const id = uuidv4();
    const newClient = new client({
      ...clientData,
      id,
      companyId:"none",
      role:"Client", 
    });
    await newClient.save();
    console.log(newClient);

    if (recruiterId) {
      const newRecruiterClient = new recruiterClient({
        ...req.body,
        id,
        companyId:"none",
        role:"Client",
      });

      await newRecruiterClient.save();

      console.log(newRecruiterClient);
    }
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

const getAllRecruiterClientDetails = async(req, res) => {
  const {id} = req.params;
  try{
    const clients = await recruiterClient.find({recruiterId:id});
    return res.status(200).json(clients);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

const getARecruiterClientDetails = async(req, res) => {
  const {id} = req.params;
  try{
    const client = await recruiterClient.findOne({id:id});
    return res.status(200).json(client);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

const updateRecruiterClient = async (req, res) => {
  const { id } = req.params;

  try {
    const clientToUpdate = await recruiterClient.findOne({ id });

    if (clientToUpdate) {
      const updatedClient = await recruiterClient.findOneAndUpdate(
        { id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            industry: req.body.industry,
            phone: req.body.phone,
            count: req.body.count,
            companyName: req.body.companyName,
            text: req.body.text,
          },
        },
        { new: true }
      );

      return res.status(200).json({ updatedClient });
    } else {
      return res.status(404).json({ error: 'Client not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletingRecruiterClient = async(req, res) => {
  try{
    const {id} = req.params;
    const deletedClient = await recruiterClient.deleteOne({id});
    
      res.status(204).json(deletedClient); 
    
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

//create client with temp password
const createClient = async (req, res) => {
  const {id} = req.params;
  
  try {
    const neededClient = await client.findOne({id:id});
    
    if (neededClient){
      const { _id, createdAt, updatedAt, __v, companyId, ...clientProperties } = neededClient._doc;
      console.log(clientProperties);

      const baseUrl = "https://skillety-frontend-wcth.onrender.com/verification/";
      const token = clientProperties.id;
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

/* get all clienturl emails */
const getAllClientUrlWithEmail = async(req, res) => {
  try{
    const allClientUrlWithEmail = await clientUrlWithEmail.find();
    return res.status(200).json(allClientUrlWithEmail);
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

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
        const baseUrl = "https://skillety-frontend-wcth.onrender.com/verification/";
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

    const initialClientDetail = await client.findOne({ id });

    if (initialClientDetail) {
      initialClientDetail.companyId = companyId;

      await initialClientDetail.save();
    }

    const RecruiterClientDetail = await recruiterClient.findOne({ id });

    if (RecruiterClientDetail) {
      RecruiterClientDetail.companyId = companyId;

      await RecruiterClientDetail.save();
    }

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
          initialClientDetail,
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
      currencyType: "dummy",
      minSalary: "dummy",
      maxSalary: "dummy",
      preferedlocations: ["dummy"],
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

const getAllRecruiterCandidateDetail = async (req, res) => {
  const {id} = req.params;
  try {
    const allCandidates = await candidateCreate.find({recruiterId:id});
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

      if (obj.recruiterId || obj.managerId) {
        obj.recruiterId && (result.recruiterId = obj.recruiterId);
        obj.managerId && (result.managerId = obj.managerId);
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

/* get all posted jobs */
const getActivejobs = async (req, res) => {
  try {
    // Use sort to order by updatedAt in descending order (-1)
    const avtiveJobs = await activeJob.find().sort({ updatedAt: -1 });
    
    res.status(200).json(avtiveJobs); 
  } catch (err) {
    res.status(500).json({ error: err.message });
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
    const activeJobToUpdate = await activeJob.findOne({ id });
    const inActiveJobToUpdate = await jobDetail.findOne({ id });
    const nonApprovalJobToUpdate = await nonApprovalJob.findOne({ id });

    if (activeJobToUpdate) {
      // Check if the update job has recruiterId
      if (activeJobToUpdate.recruiterId ||activeJobToUpdate.managerId) {
        const updatedActiveJob = await activeJob.findOneAndUpdate(
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
        return res.status(200).json({ updatedActiveJob });
      } else {
        const updatedActiveJob = await activeJob.findOneAndUpdate(
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
        // Move job to nonApprovalJob schema and delete from activeJob schema
        const newNonApprovalJob = new nonApprovalJob(updatedActiveJob.toObject());
        await newNonApprovalJob.save();
        await activeJob.deleteOne({ id });
        return res.status(200).json({ updatedActiveJob });
      }
    } else if (inActiveJobToUpdate) {
      // Check if the update job has recruiterId
      if (inActiveJobToUpdate.recruiterId || inActiveJobToUpdate.managerId) {
        const updatedInActiveJob = await jobDetail.findOneAndUpdate(
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
        return res.status(200).json({ updatedInActiveJob });
      } else {
        const updatedInActiveJob = await jobDetail.findOneAndUpdate(
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
        // Move job to nonApprovalJob schema and delete from jobDetail schema
        const newNonApprovalJob = new nonApprovalJob(updatedInActiveJob.toObject());
        await newNonApprovalJob.save();
        await jobDetail.deleteOne({ id });
        return res.status(200).json({ updatedInActiveJob });
      }
    } else if (nonApprovalJobToUpdate) {
      const updatedNonApprovalJob = await nonApprovalJob.findOneAndUpdate(
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
      return res.status(200).json({ updatedNonApprovalJob });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* boost a job  */
const boostJob = async (req, res) => {
  const { id } = req.params;

  try {
    const activeJobToUpdate = await activeJob.findOne({ id });
    
    if (activeJobToUpdate) {
      // Update the updatedAt field to the current date in MongoDB Atlas format
      activeJobToUpdate.updatedAt = new Date().toISOString();
      
      // Save the updated job
      const updatedJob = await activeJobToUpdate.save();
      
      // Return the updated job as a response
      res.status(200).json(updatedJob);
    } else {
      // If the job is not found, return a message
      res.status(404).json({ message: 'No such job found' });
    }
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
        { recruiterId: id },
        { managerId: id }
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
        { recruiterId: id },
        { managerId: id }
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
    const alreadyApplyJob = await appliedJob.findOne({ jobId: req.body.jobId, candidateId:req.body.candidateId});
    if (alreadyApplyJob) {
      return res.status(400).json({ error: "You have already applied for this job" });
    }

    const newAppliedJob = new appliedJob({
      ...req.body,
    });
    await newAppliedJob.save();

    const newApplicationStatusForJob = new applicationStatus({
      jobId:req.body.jobId,
      status:"Screening",
      candidateId:req.body.candidateId
    });
    await newApplicationStatusForJob.save();

    return res.status(201).json({newAppliedJob, newApplicationStatusForJob});
  }catch(err){
    res.status(500).json({error: err.message});
  }
}

const updatingApplicationStatusForJob = async (req, res) => {
  try {
    const { jobId, status, candidateIdArray } = req.body;

    if (!jobId || !status || !candidateIdArray || !Array.isArray(candidateIdArray)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    for (const candidateId of candidateIdArray) {
      const existingApplicationStatus = await applicationStatus.findOne({
        jobId: jobId,
        candidateId: candidateId,
      });

      if (existingApplicationStatus) {
       
        await applicationStatus.findOneAndUpdate(
          { jobId: jobId, candidateId: candidateId },
          { $set: { status: status } },
          { new: true } 
        );

        console.log(`Application status updated for jobId: ${jobId}, candidateId: ${candidateId}`);
      } else {
       
        const newApplicationStatus = new applicationStatus({
          jobId: jobId,
          candidateId: candidateId,
          status: status,
        });

        await newApplicationStatus.save();

        console.log(`New ApplicationStatus document created for jobId: ${jobId}, candidateId: ${candidateId}`);
      }
    }

    res.status(200).json({ message: 'Application status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllApplicationStatusForJobId = async (req, res) => {
  try {
    const {id} = req.params;

    const applicationStatusList = await applicationStatus.find({ jobId:id });

    res.status(200).json(applicationStatusList);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllApplicationStatusForCandId = async (req, res) => {
  try {
    const {id} = req.params;

    const applicationStatusList = await applicationStatus.find({ candidateId:id });

    res.status(200).json(applicationStatusList);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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

const getAllAppliedjobs = async(req, res) => {
  try{
    
    const allAppliedJobs = await appliedJob.find();
    
    res.status(200).json(allAppliedJobs); 
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
        { recruiterId: id },
        { managerId: id }
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
    const wantToDelete = await appliedJob.findOne({candidateId:candidateId, jobId:jobId});
    if(!wantToDelete){
      return res.status(404).json({error:"Not Found!"});
    }
    const deleteAppliedJob = await appliedJob.deleteOne({candidateId:candidateId, jobId:jobId});
    
    if (deleteAppliedJob.deletedCount === 1) {
      console.log("job deleted successfully")
      return res.status(200).json({ message: 'job deleted successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to delete job' });
    } 
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
    const {email, password, id, name, phone, role} = req.body; 
    const employeeAvailable = await employee.findOne(({ $or: [{ email },  {phone}] }));
    const allUserAvailable = await allUsers.findOne({ $or: [{ email },  { phone }] });

    if (employeeAvailable || allUserAvailable) {
      return res.status(404).json({ message: "User already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newEmployee = new employee({
      ...req.body,
      role,
      password:hashPassword,
    });
    await newEmployee.save();
    console.log(newEmployee);
    const updatedUser = new allUsers({
      id,
      name,
      email,
      phone,
      role,
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

const getAllEmployee = async(req, res) => {
  try{
    const allEmployees = await employee.find({
      role: { $in: ["Recruiter", "Admin"] }
    });
    
    res.status(200).json(allEmployees); 
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

const clientChatRoomId = async(req, res) => {
  console.log(req.body);
  const {roomId} = req.body;
  try {
    const alreadyClientWantChat = await clientChat.findOne({roomId});
    if(!alreadyClientWantChat){
      const newClientChat = new clientChat({
        ...req.body,
      });
      await newClientChat.save();
      console.log(newClientChat);
      return res.status(201).json(newClientChat);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* get all the candidate want chat */
// const getAllCandidateWantChat = async(req, res) => {
//   try {
//     const allCandidatesWantChat = await candidateChat.find();

//     const candidatesWithNewMessage = await Promise.all(allCandidatesWantChat.map(async (candidate) => {
//       const lastChatDetail = await roomIdChatDetail.findOne({ roomId: candidate.roomId }).sort({createdAt: -1});

//       if (lastChatDetail && lastChatDetail.userId === candidate.roomId) {
//         return { ...candidate.toObject(), newMessage: true };
//       } else {
//         return { ...candidate.toObject(), newMessage: false };
//       }
//     }));

//     const sortedCandidates = candidatesWithNewMessage.sort((a, b) => {
//       if (a.newMessage && !b.newMessage) return -1;
//       if (!a.newMessage && b.newMessage) return 1;
//       return 0;
//     });

//     console.log(sortedCandidates);

//     return res.status(200).json(sortedCandidates);
//   } catch(err) {
//     return res.status(500).json({ error: err.message });
//   }
// };

const getAllCandidateWantChat = async (req, res) => {
  try {
    const allCandidatesWantChat = await candidateChat.find();

    const candidatesWithNewMessage = await Promise.all(
      allCandidatesWantChat.map(async (candidate) => {
        const chatDetails = await roomIdChatDetail.find({
          roomId: candidate.roomId,
        }).sort({ createdAt: 'desc' }); // Sorting chatDetails in descending order of createdAt

        let newMessageCount = 0;
        let lastMessage = null;

        if (chatDetails.length > 0) {
          // Finding the last document where userId is not equal to candidate.roomId
          const lastNonCandidateMessage = chatDetails.find(
            (detail) => detail.userId !== candidate.roomId
          );

          if (lastNonCandidateMessage) {
            // Counting the number of documents created after the lastNonCandidateMessage
            newMessageCount = chatDetails.filter(
              (detail) => detail.createdAt > lastNonCandidateMessage.createdAt
            ).length;

            // Setting the message property based on the last created document
            lastMessage = chatDetails[0].message;
          } else {
            // If no document where userId is not equal to candidate.roomId
            newMessageCount = chatDetails.length;

            // Setting the message property based on the last document where userId is equal to candidate.roomId
            lastMessage = chatDetails.length > 0 ? chatDetails[0].message : '';
          }
        }

        return {
          ...candidate.toObject(),
          newMessageCount,
          lastMessage,
        };
      })
    );

    // Sorting candidates in descending order of newMessageCount
    const sortedCandidates = candidatesWithNewMessage.sort(
      (a, b) => b.newMessageCount - a.newMessageCount
    );

    res.json(sortedCandidates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllClientWantChat = async (req, res) => {
  try {
    const allClientsWantChat = await clientChat.find();

    const clientsWithNewMessage = await Promise.all(
      allClientsWantChat.map(async (client) => {
        const chatDetails = await roomIdChatDetailClient.find({
          roomId: client.roomId,
        }).sort({ createdAt: 'desc' }); // Sorting chatDetails in descending order of createdAt

        let newMessageCount = 0;
        let lastMessage = null;

        if (chatDetails.length > 0) {
          // Finding the last document where userId is not equal to candidate.roomId
          const lastNonClientMessage = chatDetails.find(
            (detail) => detail.userId !== client.roomId
          );

          if (lastNonClientMessage) {
            // Counting the number of documents created after the lastNonCandidateMessage
            newMessageCount = chatDetails.filter(
              (detail) => detail.createdAt > lastNonClientMessage.createdAt
            ).length;

            // Setting the message property based on the last created document
            lastMessage = chatDetails[0].message;
          } else {
            // If no document where userId is not equal to candidate.roomId
            newMessageCount = chatDetails.length;

            // Setting the message property based on the last document where userId is equal to candidate.roomId
            lastMessage = chatDetails.length > 0 ? chatDetails[0].message : '';
          }
        }

        return {
          ...client.toObject(),
          newMessageCount,
          lastMessage,
        };
      })
    );

    // Sorting candidates in descending order of newMessageCount
    const sortedClients = clientsWithNewMessage.sort(
      (a, b) => b.newMessageCount - a.newMessageCount
    );

    res.json(sortedClients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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

const roomIdChatDetailCreateClient = async(req, res) => {
  console.log(req.body);
  try {
      const newRoomIdChatDetail = new roomIdChatDetailClient({
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

const getAllChatDetailOfRoomIdClient = async(req, res) => {
  const {id} = req.params;
  try {
    const allChatDetailOfRoomId = await roomIdChatDetailClient.find({ roomId: id });
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
    const ClientDoc = await client.findOneAndUpdate(
      { id: id },
      { email: email },
      { new: true }
    );
    const recruiterClientDoc = await recruiterClient.findOne({ id: id });
    if(recruiterClientDoc){
      const updatedRecruiterClientDoc  = await recruiterClient.findOneAndUpdate(
        { id: id },
        { email: email },
        { new: true }
      );
      res.status(200).json({ allUsersDoc, finalClientDoc, ClientDoc, updatedRecruiterClientDoc });
    }else{
      res.status(200).json({ allUsersDoc, finalClientDoc, ClientDoc });
    }
    
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
    const ClientDoc = await client.findOneAndUpdate(
      { id: id },
      { phone: phone },
      { new: true }
    );
    const recruiterClientDoc = await recruiterClient.findOne({ id: id });
    if(recruiterClientDoc){
      const updatedRecruiterClientDoc  = await recruiterClient.findOneAndUpdate(
        { id: id },
        { phone: phone },
        { new: true }
      );
      res.status(200).json({ allUsersDoc, finalClientDoc, ClientDoc, updatedRecruiterClientDoc });
    }else{
      res.status(200).json({ allUsersDoc, finalClientDoc, ClientDoc });
    }
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
    const ClientDoc = await client.findOneAndUpdate(
      { companyId: id },
      { companyName: companyName },
      { new: true }
    );

    const companyDetailDoc = await companyDetail.findOneAndUpdate(
      { companyId: id },
      { companyName: companyName },
      { new: true }
    );

    const recruiterClientDoc = await recruiterClient.findOne({ companyId: id });
    if(recruiterClientDoc){
      const updatedRecruiterClientDoc  = await recruiterClient.findOneAndUpdate(
        { companyId: id },
        { companyName: companyName },
        { new: true }
      );
      res.status(200).json({ companyDetailDoc, finalClientDoc, ClientDoc, updatedRecruiterClientDoc });
    }else{
      res.status(200).json({ companyDetailDoc, finalClientDoc, ClientDoc });
    }
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
    const ClientDoc = await client.findOneAndUpdate(
      { companyId: id },
      { industry: industry },
      { new: true }
    );
    const recruiterClientDoc = await recruiterClient.findOne({ companyId: id });
    if(recruiterClientDoc){
      const updatedRecruiterClientDoc  = await recruiterClient.findOneAndUpdate(
        { companyId: id },
        { industry: industry },
        { new: true }
      );
      res.status(200).json({ companyDetailDoc, finalClientDoc, ClientDoc, updatedRecruiterClientDoc });
    }else{
      res.status(200).json({ companyDetailDoc, finalClientDoc, ClientDoc });
    }
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
    
    const offlineCandDoc = await offlineCand.findOne({ candId: id });
    if(offlineCandDoc){
      const updatedOfflineCandDoc  = await offlineCand.findOneAndUpdate(
        { candId: id },
        { emailId: email },
        { new: true }
      );
      res.status(200).json({ allUsersDoc, finalCandidateDoc, updatedOfflineCandDoc });
    }else{
      res.status(200).json({ allUsersDoc, finalCandidateDoc });
    }
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
    const offlineCandDoc = await offlineCand.findOne({ candId: id });
    if(offlineCandDoc){
      const updatedOfflineCandDoc  = await offlineCand.findOneAndUpdate(
        { candId: id },
        { mobileNumber: phone },
        { new: true }
      );
      res.status(200).json({ allUsersDoc, finalCandidateDoc, updatedOfflineCandDoc });
    }else{
      res.status(200).json({ allUsersDoc, finalCandidateDoc });
    }
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

    const offlineCandDoc = await offlineCand.findOne({ candId: id });
    if(offlineCandDoc){
      const updatedOfflineCandDoc  = await offlineCand.findOneAndUpdate(
        { candId: id },
        { firstName: firstName },
        { new: true }
      );
      res.status(200).json({ updatedAllUsersDoc, finalCandidateDoc, updatedOfflineCandDoc });
    }else{
      res.status(200).json({ updatedAllUsersDoc, finalCandidateDoc });
    }
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

    const offlineCandDoc = await offlineCand.findOne({ candId: id });
    if(offlineCandDoc){
      const updatedOfflineCandDoc  = await offlineCand.findOneAndUpdate(
        { candId: id },
        { lastName: lastName },
        { new: true }
      );
      res.status(200).json({ updatedAllUsersDoc, finalCandidateDoc, updatedOfflineCandDoc });
    }else{
      res.status(200).json({ updatedAllUsersDoc, finalCandidateDoc });
    }
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
    const recruiterCandDoc = await candidateCreate.findOne({ id: id });
    if(recruiterCandDoc){
      const updatedRecruiterCandDoc  = await candidateCreate.findOneAndUpdate(
        { id: id },
        { location: location },
        { new: true }
      );
      res.status(200).json({ finalCandidateDoc, updatedRecruiterCandDoc });
    }else{
      res.status(200).json({ finalCandidateDoc });
    }
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
    const recruiterCandDoc = await candidateCreate.findOne({ id: id });
    if(recruiterCandDoc){
      const updatedRecruiterCandDoc  = await candidateCreate.findOneAndUpdate(
        { id: id },
        { skills: skill },
        { new: true }
      );
      res.status(200).json({ finalCandidateDoc, updatedRecruiterCandDoc });
    }else{
      res.status(200).json({ finalCandidateDoc });
    }
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
    const recruiterCandDoc = await candidateCreate.findOne({ id: id });
    if(recruiterCandDoc){
      const updatedRecruiterCandDoc  = await candidateCreate.findOneAndUpdate(
        { id: id },
        { days: days },
        { new: true }
      );
      res.status(200).json({ finalCandidateDoc, updatedRecruiterCandDoc });
    }else{
      res.status(200).json({ finalCandidateDoc });
    }
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
    const recruiterCandDoc = await candidateCreate.findOne({ id: id });
    if(recruiterCandDoc){
      const updatedRecruiterCandDoc  = await candidateCreate.findOneAndUpdate(
        { id: id },
        { $set: { year: year, month: month } },
        { new: true }
      );
      res.status(200).json({ finalCandidateDoc, updatedRecruiterCandDoc });
    }else{
      res.status(200).json({ finalCandidateDoc });
    }
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
    const recruiterCandDoc = await candidateCreate.findOne({ id: id });
    if(recruiterCandDoc){
      const updatedRecruiterCandDoc  = await candidateCreate.findOneAndUpdate(
        { id: id },
        { education: education },
        { new: true }
      );
      res.status(200).json({ finalCandidateDoc, updatedRecruiterCandDoc });
    }else{
      res.status(200).json({ finalCandidateDoc });
    }
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
    const recruiterCandDoc = await candidateCreate.findOne({ id: id });
    if(recruiterCandDoc){
      const updatedRecruiterCandDoc  = await candidateCreate.findOneAndUpdate(
        { id: id },
        { profileHeadline: profileHeadline },
        { new: true }
      );
      res.status(200).json({ finalCandidateDoc, updatedRecruiterCandDoc });
    }else{
      res.status(200).json({ finalCandidateDoc });
    }
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

const candidateToClientNotificationCreate = async(req, res) => {
  try {
    console.log(req.body);
    const newNotification = new candidateToClientNotification({
      ...req.body,
    });
    await newNotification.save();
    console.log(newNotification);
    return res.status(201).json(newNotification);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const getAllcandidateToClientNotification = async(req, res) => {
  try{
    const allCandidateToClientNotification = await candidateToClientNotification.find();
    
    res.status(200).json(allCandidateToClientNotification); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

const candidateToRecruiterNotificationCreate = async(req, res) => {
  try {
    console.log(req.body);
    const newNotification = new candidateToRecruiterNotification({
      ...req.body,
    });
    await newNotification.save();
    console.log(newNotification);
    return res.status(201).json(newNotification);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const getAllcandidateToRecruiterNotification = async(req, res) => {
  try{
    const allCandidateToRecruiterNotification = await candidateToRecruiterNotification.find();
    
    res.status(200).json(allCandidateToRecruiterNotification); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

const candidateNotificationCreate = async(req, res) => {
  try {
    console.log(req.body);
    const newNotification = new candidateNotification({
      ...req.body,
    });
    await newNotification.save();
    console.log(newNotification);
    return res.status(201).json(newNotification);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

const getAllcandidateNotification = async(req, res) => {
  try{
    const allCandidateNotification = await candidateNotification.find();
    
    res.status(200).json(allCandidateNotification); 
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

const deleteAllNotifications = async (req, res) => {
  try {
    const deleteResult = await candidateToClientNotification.deleteMany({});

    if (deleteResult.deletedCount > 0) {
      return res.status(200).json({ message: 'All notifications deleted successfully.' });
    } else {
      return res.status(404).json({ message: 'No notifications found to delete.' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* recruiter creating candidate */
const createCandidate = async (req, res) => {
  
  const { email, id, phone } = req.body; 
    const candidateAvailable = await candidate.findOne({ $or: [{ email },  {phone}] });
    const allUserAvailable = await allUsers.findOne({ $or: [{ email },  { phone }] });

    if (candidateAvailable || allUserAvailable) {
      return res.status(404).json({ message: "User already registered" });
    }
  try {
  
      const baseUrl = "https://skillety-frontend-wcth.onrender.com/verification-cand/";
      const tempUrl = baseUrl + id;

      const newCreateCandidate = new candidateCreate({
        ...req.body,
        currencyType: "dummy",
        minSalary: "dummy",
        maxSalary: "dummy",
        preferedlocations: ["dummy"],
        role: "Candidate",   
        url: tempUrl 
      });

      await newCreateCandidate.save();
      console.log(newCreateCandidate);

      
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'demoemail1322@gmail.com',
          pass: 'znsdgrmwzskpatwz'
        }
      });

      const mailOptions = {
        from: 'demoemail1322@gmail.com',
        to: `${newCreateCandidate.email}`,
        subject: 'Mail from SKILLITY!',
        text: '',
        html: `<p>Temporary URL: ${newCreateCandidate.url}</p>`
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message, newCreateCandidate });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(201).json({ newCreateCandidate, emailSent: true });
        }
      });
    
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getCandidate = async(req, res) => {
  const {id} = req.params;
  try{
    const cand = await candidateCreate.findOne({id});
    console.log(cand);
    return res.status(200).json(cand);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/* register the candidate after setting new password */
const finalCandRegister = async (req, res) => {
  try {
    console.log(req.body);

    const { id, password } = req.body;
    const cand = await candidateCreate.findOne({ id });

    if (!cand) {
      return res.status(404).json({ message: 'User not found' });
    }

    const {
      _id,
      url,
      createdAt,
      updatedAt,
      __v,
      recruiterId,
      ...candidateProperties
    } = cand._doc;

    const hashPassword = await bcrypt.hash(password, 12);
    
      const newCandidate = new candidate({
        ...candidateProperties,
        password: hashPassword,
      });
    
    await newCandidate.save();
    console.log(newCandidate);

    const {
      email,
      phone,
      firstName,
      lastName,
      role
    } = candidateProperties;

    const updatedUser = new allUsers({
      id,   
      name: firstName+" "+lastName,
      email,
      phone,
      role,
      password:hashPassword,
    });

    await updatedUser.save();
    console.log(updatedUser);

    await candidateCreate.deleteOne({ id });

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
    })

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateCand = async (req, res) => {
  const { id } = req.params;

  try {
    const candToUpdate = await candidateCreate.findOne({ id });

    if (candToUpdate) {
      const updatedCand = await candidateCreate.findOneAndUpdate(
        { id },
        {
          $set: {
            days: req.body.days,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
            designation: req.body.designation,
            companyName: req.body.companyName,
            location: req.body.location,
            year: req.body.year,
            month: req.body.month,
            education: req.body.education,
            profileHeadline: req.body.profileHeadline,
            college: req.body.college,
            selectedDate: req.body.selectedDate,
            skills: req.body.skills,
            checkbox: req.body.checkbox,
          },
        },
        { new: true }
      );

      return res.status(200).json({ updatedCand });
    } else {
      return res.status(404).json({ error: 'Candidate not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletingCand = async(req, res) => {
  try{
    const {id} = req.params;
    const deletedCand = await candidateCreate.deleteOne({id});
    
      res.status(204).json(deletedCand); 
    
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* all client table column data create */
const allClientTableColumnData = async (req, res) => {
  try {
    const { id, column } = req.body;

    const existingDocument = await allClientTable.findOne({ id });

    if (existingDocument) {
      existingDocument.column = column;
      await existingDocument.save();
      res.status(200).json(existingDocument);
    } else {
      const newAllClientTableData = new allClientTable({
        id,
        column,
      });

      await newAllClientTableData.save();
      res.status(201).json(newAllClientTableData);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* get all client table column data */
const getAllClientTableColumnData = async(req, res) => {
  const {id} = req.params;
  try{
    const allClientTableColumnData = await allClientTable.findOne({id});
    console.log(allClientTableColumnData);
    return res.status(200).json(allClientTableColumnData);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/* all client table column data create */
const allCandidateTableColumnData = async (req, res) => {
  try {
    const { id, column } = req.body;

    const existingDocument = await allCandidateTable.findOne({ id });

    if (existingDocument) {
      existingDocument.column = column;
      await existingDocument.save();
      res.status(200).json(existingDocument);
    } else {
      const newAllCandidateTableData = new allCandidateTable({
        id,
        column,
      });

      await newAllCandidateTableData.save();
      res.status(201).json(newAllCandidateTableData);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* get all client table column data */
const getAllCandidateTableColumnData = async(req, res) => {
  const {id} = req.params;
  try{
    const allCandidateTableColumnData = await allCandidateTable.findOne({id});
    console.log(allCandidateTableColumnData);
    return res.status(200).json(allCandidateTableColumnData);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/* all client table column data create */
const allJobTableColumnData = async (req, res) => {
  try {
    const { id, column } = req.body;

    const existingDocument = await allJobTable.findOne({ id });

    if (existingDocument) {
      existingDocument.column = column;
      await existingDocument.save();
      res.status(200).json(existingDocument);
    } else {
      const newAllJobTableData = new allJobTable({
        id,
        column,
      });

      await newAllJobTableData.save();
      res.status(201).json(newAllJobTableData);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* get all client table column data */
const getAllJobTableColumnData = async(req, res) => {
  const {id} = req.params;
  try{
    const allJobTableColumnData = await allJobTable.findOne({id});
    console.log(allJobTableColumnData);
    return res.status(200).json(allJobTableColumnData);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/* all client table column data create */
const allNonApprovalJobTableColumnData = async (req, res) => {
  try {
    const { id, column } = req.body;

    const existingDocument = await nonApprovalJobTable.findOne({ id });

    if (existingDocument) {
      existingDocument.column = column;
      await existingDocument.save();
      res.status(200).json(existingDocument);
    } else {
      const newNonApprovalJobTableData = new nonApprovalJobTable({
        id,
        column,
      });

      await newNonApprovalJobTableData.save();
      res.status(201).json(newNonApprovalJobTableData);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* get all client table column data */
const getAllNonApprovalJobTableColumnData = async(req, res) => {
  const {id} = req.params;
  try{
    const allNonApprovalJobTableColumnData = await nonApprovalJobTable.findOne({id});
    console.log(allNonApprovalJobTableColumnData);
    return res.status(200).json(allNonApprovalJobTableColumnData);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/* all client table column data create */
const allPostedJobTableColumnData = async (req, res) => {
  try {
    const { id, column } = req.body;

    const existingDocument = await postedJobTable.findOne({ id });

    if (existingDocument) {
      existingDocument.column = column;
      await existingDocument.save();
      res.status(200).json(existingDocument);
    } else {
      const newPostedJobTableData = new postedJobTable({
        id,
        column,
      });

      await newPostedJobTableData.save();
      res.status(201).json(newPostedJobTableData);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* get all client table column data */
const getAllPostedJobTableColumnData = async(req, res) => {
  const {id} = req.params;
  try{
    const allPostedJobTableColumnData = await postedJobTable.findOne({id});
    console.log(allPostedJobTableColumnData);
    return res.status(200).json(allPostedJobTableColumnData);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

/*MOBILE APP TEAM NEW API */

//candidate dashboard topbar api
const candidateDashboardTopBar = async (req, res) => {
  try {
    const id = req.params.candidateId;

    // Function to calculate match percentage
    const calculateMatchPercentage = (skills1, skills2) => {
      const matchingSkills = skills2.filter(skill => skills1.includes(skill));
      return (matchingSkills.length / skills1.length) * 100;
    };

    // Function to filter skill match jobs with percentage > 0
    const filterSkillMatchJobs = (jobDetails, candidateSkills) => {
      return jobDetails
        .map(obj => {
          const percentage = calculateMatchPercentage(obj.skills, candidateSkills);

          return {
            jobId: obj.id,
            percentage: Math.round(percentage),
          };
        })
        .filter(job => job.percentage > 0);
    };

    // Get applied jobs
    const appliedJobs = await appliedJob.find({ candidateId: id });

    // Get candidate details
    const candidateDetail = await candidate.findOne({ id });

    // Get all active jobs
    const jobDetails = await activeJob.find();

    // Find all applied jobs for the candidate
    const numAppliedJobs = appliedJobs.length;

    // Find all skill match jobs for the candidate with percentage > 0
    const skillMatchJobs = filterSkillMatchJobs(jobDetails, candidateDetail.skills);
    const numSkillMatchJobs = skillMatchJobs.length;

    // Prepare the final response
    const finalResponse = {
      appliedJobs: numAppliedJobs,
      skillMatchJobs: numSkillMatchJobs,
      upcomingInterviews:0,
      newNotification:0
    };

    // Send the response as JSON
    res.status(200).json(finalResponse);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//job search
const searchJob = async(req, res) => {
  try{
    const { filterArray } = req.body;
    console.log(filterArray)

    const lowercasedFilterArray = filterArray.map((item) => item.toLowerCase());

    const query = {
      $or: [
        { jobRole: { $in: lowercasedFilterArray } },
        { skills: { $in: lowercasedFilterArray } },
      ],
    };

    // Convert jobRole and skills array elements to lowercase before filtering
    const result = await activeJob.find(query).lean();
    res.status(200).json(result);
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//search client
const searchClient = async (req, res) => {
  try {
    const { searchTerm } = req.body;
    console.log(searchTerm);

    const query = {
      $or: [
        { name: { $regex: new RegExp(searchTerm, 'i') } },
        { companyName: { $regex: new RegExp(searchTerm, 'i') } },
      ],
    };

    const result = await finalClient.find(query).lean();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//individual candidate detail
const getACandidateDetail = async (req, res) => {
  try {
    const {id} = req.params;

    const cand = await candidate.findOne({id});
    if (!cand) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const resumeData = await resume.findOne({id});
    
    const profile = await candidateProfile.findOne({id});
   
     
      const candidateDetail = { 
        ...cand._doc, 
        ...(resumeData && resumeData._doc),
        ...(profile && profile._doc),
       };

      const finalResponse = {
        candidateId: candidateDetail.id,
        lastProfileUpdateDate: new Date(cand.updatedAt).toISOString().split('T')[0],
        avatar: candidateDetail.image ? `https://skillety-n6r1.onrender.com/candidate_profile/${candidateDetail.image}` : null,
        joinPeriod: candidateDetail.days,
        lastDayWorked: candidateDetail.selectedDate,
        fName: candidateDetail.firstName,
        lName: candidateDetail.lastName,
        email: candidateDetail.email,
        phone: candidateDetail.phone,
        preferedLocations: candidateDetail.preferedlocations.join(", "),
        cv: candidateDetail.file ? `https://skillety-n6r1.onrender.com/files/${candidateDetail.file}` : null,
        currentDesignation: candidateDetail.designation[0],
        currentCompany: candidateDetail.companyName,
        currentLocation: candidateDetail.location,
        expYr: candidateDetail.year,
        expMonth: candidateDetail.month,
        skills: candidateDetail.skills,
        educations: candidateDetail.education,
        profileHeadline: candidateDetail.profileHeadline
      }
      return res.status(200).json(finalResponse);
    
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

//update candidate details
const candidateUpdateDetail = async (req, res) => {
  const { id } = req.params;
  const { fName, sName, email, phone, location, experience_years, experience_month, joinDaysPeriod } = req.body;

  try {
    const allUsersDoc = await allUsers.findOneAndUpdate(
      { id: id },
      {
        $set: {
          name: fName + " " + sName,
          email: email,
          phone: phone,
        },
      },
      { new: true }
    );

    if (!allUsersDoc) {
      return res.status(404).json({ error: 'User not found ' });
    }

    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      {
        $set: {
          firstName: fName,
          lastName: sName,
          email: email,
          phone: phone,
          location: location,
          year: experience_years,
          month: experience_month,
          days: joinDaysPeriod,
        },
      },
      { new: true }
    );

    if (!finalCandidateDoc) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ 
      message:"account update successful",
      user:{
        candidateId:allUsersDoc.id,
        lastProfileUpdateDate:new Date().toISOString().split('T')[0],
        joinPeriod:finalCandidateDoc.days,
        fName:finalCandidateDoc.firstName,
        lName:finalCandidateDoc.lastName,
        email:allUsersDoc.email,
        phone:allUsersDoc.phone,
        location:finalCandidateDoc.location,
        expYears:finalCandidateDoc.year,
        expMonths:finalCandidateDoc.month
      }
     });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

//update candidate skills
const updatingCandidateSkillsDetail = async (req, res) => {
  const { id } = req.params;
  const { skills: newSkills } = req.body;

  try {
    const existingCandidate = await candidate.findOne({ id });

    if (!existingCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const updatedSkills = newSkills.map((ns) => ns.skill);

    existingCandidate.skills = updatedSkills;
    const finalCandidateDoc = await existingCandidate.save();

    res.status(200).json({
      message: "Skills update successful",
      skills: finalCandidateDoc.skills.map((skill, index) => ({
        id: (index + 1).toString(),
        skill,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};



//update candidate education
const updatingCandidateEducationsDetail = async (req, res) => {
  const { id } = req.params;
  const { educations: newEducations } = req.body;

  try {
    const existingCandidate = await candidate.findOne({ id });

    if (!existingCandidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    const updatedEducations = newEducations.map((ns) => ns.education);

    existingCandidate.education = updatedEducations;
    const finalCandidateDoc = await existingCandidate.save();

    res.status(200).json({
      message: "education details update successful",
      educations: finalCandidateDoc.education.map((edu, index) => ({
        id: (index + 1).toString(),
        edu,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};



//update candidate profile headline
const updatingCandidateProfileHeadlineDetail = async (req, res) => {
  const {id} = req.params;
  const { headline } = req.body;

  try {
    const finalCandidateDoc = await candidate.findOneAndUpdate(
      { id: id },
      { profileHeadline: headline },
      { new: true }
    );
    
      res.status(200).json({ 
        message:"headline change successful",
        headline:finalCandidateDoc.profileHeadline
       });
    
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

//candidate resume 
const getCandidateResumeUrl = async (req, res) => {
  const {id} = req.params;

  try {
    const candidateResume = await resume.findOne({id})
    if(candidateResume){
      res.status(200).json({ 
        message:"candidate cv get successful",
        cv:`https://skillety-n6r1.onrender.com/files/${candidateResume.file}`
       });
    }else{
      res.status(404).json({ error: 'Cv not found' });
    }
      
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

/* Find company detail for the companyId */
const getUpdatedCompanyDetailByCompanyId = async(req, res) => {
  try{
    const {id} = req.params;
    const companyDetailForCompanyId = await companyDetail.findOne({companyId:id});
    if(companyDetailForCompanyId){
      const companyProfile = await clientProfile.findOne({id});
      return res.status(200).json({
        message: "Company details fetch successfully!",
        companyDetails: {
          ...companyDetailForCompanyId._doc,
          profile:companyProfile.image ? `https://skillety-n6r1.onrender.com/images/${companyProfile.image}` : null
        }
        })
    }else{
      return res.status(404).json({ error: 'Company detail not found!' });
    }
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* updated posted active jobs with cv number */
const getUpdatedOwnActivejobs = async (req, res) => {
  try {
    const id = req.params.id; 
    
    const activeJobs = await activeJob.find({companyId:id});

    if (activeJobs.length > 0) {
      const activeJobWithStatus = await Promise.all(
        activeJobs.map(async (job) => {
          const jobId = job.id;

          const receivedCvCount = await appliedJob.countDocuments({ jobId });

          return { ...job.toObject(), active: true, receivedCvCount };
        })
      );

      return res.status(200).json(activeJobWithStatus);
    }

      return res.status(404).json({ message: 'No active job found' });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//find all new applications
const getAllNewCandidateDetail = async (req, res) => {
  try {
    const { page, limit } = req.query; // Default to page 1 and limit 10 if not provided

    const skip = (page - 1) * limit;

    const cands = await candidate.find().sort({ updatedAt: -1 }).skip(skip).limit(parseInt(limit));
    
    if (cands.length === 0) {
      return res.status(404).json({ error: "Candidates not found" });
    }

    const newCandidateDetails = await Promise.all(
      cands.map(async (cand) => {
       
        const neededCv = await resume.findOne({ id: cand.id });
        const neededProfile = await candidateProfile.findOne({ id: cand.id });

        const candidateDetail = {
          ...cand._doc,
          ...(neededCv ? neededCv._doc : {}), 
          ...(neededProfile ? neededProfile._doc : {}), 
        };

        const finalResponse = {
          candidateId: candidateDetail.id,
          lastProfileUpdateDate: new Date(cand.updatedAt).toISOString().split('T')[0],
          avatar: candidateDetail.image ? `https://skillety-n6r1.onrender.com/candidate_profile/${candidateDetail.image}` : null,
          joinPeriod: candidateDetail.days,
          lastDayWorked: candidateDetail.selectedDate,
          fName: candidateDetail.firstName,
          lName: candidateDetail.lastName,
          email: candidateDetail.email,
          phone: candidateDetail.phone,
          preferedLocations: candidateDetail.preferedlocations ? candidateDetail.preferedlocations.join(", ") : null,
          cv: candidateDetail.file ? `https://skillety-n6r1.onrender.com/files/${candidateDetail.file}` : null,
          currentDesignation: candidateDetail.designation ? candidateDetail.designation[0] : null,
          currentCompany: candidateDetail.companyName,
          currentLocation: candidateDetail.location,
          expYr: candidateDetail.year,
          expMonth: candidateDetail.month,
          skills: candidateDetail.skills,
          educations: candidateDetail.education,
          profileHeadline: candidateDetail.profileHeadline,
        };

        return finalResponse;
      })
    );

    return res.status(200).json(newCandidateDetails);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* get applied jobs */
const getUpdatedAppliedjobs = async (req, res) => {
  try {
    const {id} = req.params;
    const appliedJobs = await appliedJob.find({ candidateId: id }).sort({ updatedAt: -1 });
    
    if (appliedJobs && appliedJobs.length > 0) { // Check if appliedJobs is not empty

      const updatedAppliedJob = await Promise.all(
        appliedJobs.map(async (job) => {
          // Use job.jobId instead of just jobId
          const applicationStatusForAppliedJob = await applicationStatus.findOne({ jobId: job.jobId, candidateId: id });
          const jobStatusActive = await activeJob.findOne({ id: job.jobId });
          const jobStatusInActive = await jobDetail.findOne({ id: job.jobId });
          const numOfApplicant = await appliedJob.countDocuments({jobId:job.jobId})
          if(job.companyId){
            const companyDetailForJob = await companyDetail.findOne({companyId:job.companyId});
            const companyProfileForJob = await clientProfile.findOne({id:job.companyId});
            return {
              ...job._doc,
              jobStatus: jobStatusActive ? "Active" : jobStatusInActive ? "In-Active" : null,
              applicationStatus: applicationStatusForAppliedJob ? applicationStatusForAppliedJob.status : null,
              companyName: companyDetailForJob ? companyDetailForJob.companyName : null,
              companyProfile: companyProfileForJob ? `https://skillety-n6r1.onrender.com/images/${companyProfileForJob.image}` : null,
              totalApplicants: numOfApplicant
            };
          }else{
            // Use job.id instead of job._doc.id
            return {
              ...job._doc,
              jobStatus: jobStatusActive ? "Active" : jobStatusInActive ? "In-Active" : null,
              applicationStatus: applicationStatusForAppliedJob ? applicationStatusForAppliedJob.status : null,
              totalApplicants: numOfApplicant
            };
          }
        })
      );

      res.status(200).json(updatedAppliedJob);
    } else {
      return res.status(404).json({ error: "No applied job found!" });
    }

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//client dashboard topbar api
const clientDashboardTopBar = async (req, res) => {
  try {
    const id = req.params.companyId;

    const postedActiveJobs = await activeJob.find({companyId:id});
    const postedInActiveJobs = await jobDetail.find({companyId:id});
    const appliedOfPostedJobs = await appliedJob.find({companyId:id});

    const finalResponse = {
        jobPosted: postedActiveJobs.length+postedInActiveJobs.length,
        appliedOfPostedJobs: appliedOfPostedJobs.length,
        upcomingInterviews:0,
        newNotification:0
    }

    res.status(200).json(finalResponse);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* create notification by candidate */
const creatingNewNotification = async(req, res) => {
  try {
    console.log(req.body);
    const newNotification = new createNotification({
      ...req.body,
      readStatus:false,
    });
    await newNotification.save();
    console.log(newNotification);
    return res.status(201).json(newNotification);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* get notification for receiverId */
const getNotificationForReceiverId = async (req, res) => {
  try {
    const { filter } = req.query;
    const { receiverId } = req.params;
    let notifications;

    if (filter === "read") {
      notifications = await createNotification.find({
        receiverId: { $in: [receiverId] },
        readStatus: true
      });
    } else if (filter === "unRead") {
      notifications = await createNotification.find({
        receiverId: { $in: [receiverId] },
        readStatus: false
      });
    } else if (filter === "all") {
      notifications = await createNotification.find({
        receiverId: { $in: [receiverId] },
      });
    } else {
      return res.status(400).json({ error: "Invalid filter" });
    }

    if (notifications.length === 0) {
      return res.status(404).json({
        message: 'No notifications found for the provided receiverId.',
      });
    }

    return res.status(200).json(notifications);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* read notification */
const readingNotifications = async (req, res) => {
  try {
    const { notificationIdArray } = req.body;

    if (!notificationIdArray || !Array.isArray(notificationIdArray)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const responseArray = [];

    for (const notificationId of notificationIdArray) {
      try {
        const existingNotification = await createNotification.findById(notificationId);

        if (existingNotification) {
          if (!existingNotification.readStatus) {
            await createNotification.findByIdAndUpdate(
              notificationId,
              { $set: { readStatus: true } },
              { new: true }
            );
            responseArray.push({
              notificationId,
              readStatus: true,
              message: `Notification status as read for notificationId:${notificationId}`
            });
          } else {
            responseArray.push({
              notificationId,
              readStatus: existingNotification.readStatus,
              message: `Notification already marked as read for notificationId:${notificationId}`
            });
          }
        } else {
          responseArray.push({
            notificationId,
            readStatus: false,
            message: `No notification found for notificationId:${notificationId}`
          });
        }
      } catch (err) {
        responseArray.push({
          notificationId,
          readStatus: false,
          error: `Error updating notificationId:${notificationId} - ${err.message}`
        });
      }
    }

    res.status(200).json({ notifications: responseArray });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* get all updated posted jobs */
const getUpdatedActiveJobs = async (req, res) => {
  try {
    // Use sort to order by createdAt in descending order (-1)
    const activeJobs = await activeJob.find().sort({ updatedAt: -1 });
    
    if(activeJobs.length > 0) {
      const updatedActiveJobs = await Promise.all(
        activeJobs.map(async (job) => {
          if(job.companyId){
            const companyDetailForJob = await companyDetail.findOne({ companyId: job.companyId });
            const companyProfileForJob = await clientProfile.findOne({ id: job.companyId });
            return {
              ...job.toObject(),
              companyName: (companyDetailForJob ? companyDetailForJob.companyName : null),
              companyProfile: (companyProfileForJob ? `https://skillety-n6r1.onrender.com/images/${companyProfileForJob.image}` : null)
            };
          }else{
            return {
              ...job.toObject()
            }
          }
          
        })
      );
      res.status(200).json(updatedActiveJobs);
    } else {
      return res.status(404).json({ error: "No jobs found!" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUpdatedSkillMatchJobDetail = async (req, res) => {
  try {
    const id = req.params.candidateId;
    const candidateDetail = await candidate.findOne({ id });
    const jobDetails = await activeJob.find().sort({ updatedAt: -1 });

    // Function to calculate match percentage
    const calculateMatchPercentage = (skills1, skills2) => {
      const matchingSkills = skills2.filter(skill => skills1.includes(skill));
      return (matchingSkills.length / skills1.length) * 100;
    };

    // Array to store the final comparison results
    const comparisonResults = [];

    // Loop through each job detail
    for (const obj of jobDetails) {
      // Calculate match percentage
      const percentage = calculateMatchPercentage(obj.skills, candidateDetail.skills);

      // Initialize result object
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

      // Check if job detail has companyId
      if (obj.companyId) {
        // Find company details by companyId
        const companyDetails = await companyDetail.findOne({ companyId: obj.companyId });

        // If company details found, add companyName and companyProfile
        if (companyDetails) {
          result.companyName = companyDetails.companyName;

          // Find client profile by companyId to get companyProfile
          const companyProfile = await clientProfile.findOne({ id: obj.companyId });
          if (companyProfile) {
            result.companyProfile = `https://skillety-n6r1.onrender.com/images/${companyProfile.image}`;
          }
        }
      }

      if (obj.recruiterId || obj.managerId) {
        obj.recruiterId && (result.recruiterId = obj.recruiterId);
        obj.managerId && (result.managerId = obj.managerId);
      } else if (obj.clientId) {
        result.clientId = obj.clientId;
        result.companyId = obj.companyId;
      } else if (obj.clientStaffId) {
        result.clientStaffId = obj.clientStaffId;
        result.companyId = obj.companyId;
      }

      // Find applicant count by jobId from appliedJob schema
      const applicantCount = await appliedJob.countDocuments({ jobId: obj.id });
      result.applicantCount = applicantCount;

      // Push result to comparisonResults array
      comparisonResults.push(result);
    }

    // Sort comparison results by percentage in descending order
    comparisonResults.sort((a, b) => b.percentage - a.percentage);

    // Send response with comparisonResults
    res.status(200).json(comparisonResults);
  } catch (err) {
    // Handle errors
    res.status(500).json({ error: err.message });
  }
};

/* get data for graph candidate */
const getDataForCandidateGraph = async (req, res) => {
  try {
    let filter;
    const { candidateId } = req.params;
    const currentDate = new Date();
    
    const requestParam = req.query.period || "invalidParam";

    if (requestParam === "invalidParam") {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (requestParam === "weekly") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);

      filter = {
        $gte: startOfWeek,
        $lt: endOfWeek,
      };
      
      const categories = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
      if (filter && filter.$gte instanceof Date && filter.$lt instanceof Date) {
        const thisWeekScreenedJobs = await applicationStatus.find({
          status:"screened",
          candidateId:candidateId,
          createdAt:filter
        });
        
        const thisWeekAppliedJobs = await appliedJob.find({
          candidateId:candidateId,
          createdAt: filter
        });
        
        if (
          thisWeekScreenedJobs.length >0 ||
          thisWeekAppliedJobs.length >0 
        ) {
          
          const appliedJobCounts = Array(7).fill(0);
          const screenedJobCounts = Array(7).fill(0);

          thisWeekAppliedJobs.forEach((job) => {
            const dayIndex = new Date(job.createdAt).getDay();
            appliedJobCounts[dayIndex]++;
          });

          thisWeekScreenedJobs.forEach((job) => {
            const dayIndex = new Date(job.createdAt).getDay();
            screenedJobCounts[dayIndex]++;
          });

          const response = {
            Id: candidateId,
            filterType: "weekly",
            categories: categories,
            series: [
              {
                name: "AppliedJobs",
                data: appliedJobCounts,
              },
              {
                name: "ScreenedJobs",
                data: screenedJobCounts,
              },
            ],
          };

          return res.status(200).json(response);
        } else {
          return res
            .status(404)
            .json({ error: `No report details found for ${requestParam}!` });
        }
  
      } else {
        return res.status(400).json({ error: "Invalid date filter" });
      }

    } else if (requestParam === "monthly") {
      const currentDate = new Date(); // Assuming currentDate is defined elsewhere
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1); // Start of the current year
      const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 0); // End of the current year
  
      const filter = {
          $gte: startOfYear,
          $lt: endOfYear, // End of the current year
      };
  
      const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
  
      const categories = months; // All months of the year
  
      const thisYearScreenedJobs = await applicationStatus.find({
          status: "screened",
          candidateId: candidateId,
          createdAt: filter
      });
  
      const thisYearAppliedJobs = await appliedJob.find({
          candidateId: candidateId,
          createdAt: filter
      });
  
      if (thisYearScreenedJobs.length > 0 || thisYearAppliedJobs.length > 0) {
          const appliedJobCounts = Array(categories.length).fill(0);
          const screenedJobCounts = Array(categories.length).fill(0);
  
          thisYearAppliedJobs.forEach((job) => {
              const monthIndex = new Date(job.createdAt).getMonth();
              appliedJobCounts[monthIndex]++;
          });
  
          thisYearScreenedJobs.forEach((job) => {
              const monthIndex = new Date(job.createdAt).getMonth();
              screenedJobCounts[monthIndex]++;
          });
  
          const response = {
              Id: candidateId,
              filterType: "monthly",
              categories: categories,
              series: [
                  {
                      name: "AppliedJobs",
                      data: appliedJobCounts,
                  },
                  {
                      name: "ScreenedJobs",
                      data: screenedJobCounts,
                  },
              ],
          };
  
          return res.status(200).json(response);
      } else {
          return res.status(404).json({ error: `No report details found for ${requestParam}!` });
      }
    } else if (requestParam === "yearly") {
      const startOfYear = new Date(currentDate.getFullYear() - 4, 0, 1);
      const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);
  
      filter = {
          $gte: startOfYear,
          $lt: endOfYear,
      };
  
      const categories = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 4 + i);
  
      const thisYearScreenedJobs = await applicationStatus.find({
          status: "screened",
          candidateId: candidateId,
          createdAt: filter
      });
  
      const thisYearAppliedJobs = await appliedJob.find({
          candidateId: candidateId,
          createdAt: filter
      });
  
      if (thisYearScreenedJobs.length > 0 || thisYearAppliedJobs.length > 0) {
          const appliedJobCounts = Array(categories.length).fill(0);
          const screenedJobCounts = Array(categories.length).fill(0);
  
          thisYearAppliedJobs.forEach((job) => {
              const jobYear = new Date(job.createdAt).getFullYear();
              const yearIndex = jobYear - (currentDate.getFullYear() - 4);
              appliedJobCounts[yearIndex]++;
          });
  
          thisYearScreenedJobs.forEach((job) => {
              const dayIndex = new Date(job.createdAt).getDate() - 1;
              screenedJobCounts[dayIndex]++;
          });
  
          const response = {
              Id: candidateId,
              filterType: "yearly",
              categories: categories,
              series: [
                  {
                      name: "AppliedJobs",
                      data: appliedJobCounts,
                  },
                  {
                      name: "ScreenedJobs",
                      data: screenedJobCounts,
                  },
              ],
          };
  
          return res.status(200).json(response);
      } else {
          return res.status(404).json({ error: `No report details found for ${requestParam}!` });
      }
  } else {
      return res.status(400).json({ error: "Invalid filter period" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* get data for graph client */
const getDataForClientGraph = async (req, res) => {
  try {
    let filter;
    const { companyId } = req.params;
    const currentDate = new Date();
    
    const requestParam = req.query.period || "invalidParam";

    if (requestParam === "invalidParam") {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (requestParam === "weekly") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 7);

      filter = {
        $gte: startOfWeek,
        $lt: endOfWeek,
      };
      
      const categories = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
      if (filter && filter.$gte instanceof Date && filter.$lt instanceof Date) {
        const thisWeekPostedActiveJobs = await activeJob.find({
          companyId:companyId,
          createdAt:filter
        });
        
        const thisWeekAppliedJobs = await appliedJob.find({
          companyId:companyId,
          createdAt: filter
        });
        
        if (
          thisWeekPostedActiveJobs.length >0 ||
          thisWeekAppliedJobs.length >0 
        ) {
          
          const appliedJobCounts = Array(7).fill(0);
          const activePostedJobCounts = Array(7).fill(0);

          thisWeekAppliedJobs.forEach((job) => {
            const dayIndex = new Date(job.createdAt).getDay();
            appliedJobCounts[dayIndex]++;
          });

          thisWeekPostedActiveJobs.forEach((job) => {
            const dayIndex = new Date(job.createdAt).getDay();
            activePostedJobCounts[dayIndex]++;
          });

          const response = {
            Id: companyId,
            filterType: "weekly",
            categories: categories,
            series: [
              {
                name: "PostedActiveJobs",
                data: activePostedJobCounts,
              },
              {
                name: "AppliedJobs",
                data: appliedJobCounts,
              },
            ],
          };

          return res.status(200).json(response);
        } else {
          return res
            .status(404)
            .json({ error: `No report details found for ${requestParam}!` });
        }
  
      } else {
        return res.status(400).json({ error: "Invalid date filter" });
      }

    } else if (requestParam === "monthly") {
      const currentDate = new Date(); // Assuming currentDate is defined elsewhere
      const startOfYear = new Date(currentDate.getFullYear(), 0, 1); // Start of the current year
      const endOfYear = new Date(currentDate.getFullYear() + 1, 0, 0); // End of the current year
  
      const filter = {
          $gte: startOfYear,
          $lt: endOfYear, // End of the current year
      };
  
      const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
  
      const categories = months; // All months of the year
  
      const thisYearPostedActiveJobs = await activeJob.find({
          companyId:companyId,
          createdAt: filter
      });
  
      const thisYearAppliedJobs = await appliedJob.find({
        companyId:companyId,
          createdAt: filter
      });
  
      if (thisYearPostedActiveJobs.length > 0 || thisYearAppliedJobs.length > 0) {
          const appliedJobCounts = Array(categories.length).fill(0);
          const postedActiveJobCounts = Array(categories.length).fill(0);
  
          thisYearAppliedJobs.forEach((job) => {
              const monthIndex = new Date(job.createdAt).getMonth();
              appliedJobCounts[monthIndex]++;
          });
  
          thisYearPostedActiveJobs.forEach((job) => {
              const monthIndex = new Date(job.createdAt).getMonth();
              postedActiveJobCounts[monthIndex]++;
          });
  
          const response = {
              Id: companyId,
              filterType: "monthly",
              categories: categories,
              series: [
                  {
                      name: "PostedActiveJobs",
                      data: postedActiveJobCounts,
                  },
                  {
                      name: "AppliedJobs",
                      data: appliedJobCounts,
                  },
              ],
          };
  
          return res.status(200).json(response);
      } else {
          return res.status(404).json({ error: `No report details found for ${requestParam}!` });
      }
    } else if (requestParam === "yearly") {
      const currentYear = currentDate.getFullYear();
      const startOfYear = new Date(currentYear - 4, 0, 1);
      const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);
  
      filter = {
          $gte: startOfYear,
          $lt: endOfYear,
      };
  
      const categories = Array.from({ length: 5 }, (_, i) => currentYear - 4 + i);
  
      const thisYearPostedActiveJobs = await activeJob.find({
          companyId: companyId,
          createdAt: filter
      });
  
      const thisYearAppliedJobs = await appliedJob.find({
          companyId: companyId,
          createdAt: filter
      });
  
      if (thisYearPostedActiveJobs.length > 0 || thisYearAppliedJobs.length > 0) {
          const postedActiveJobCounts = Array(5).fill(0);
          const appliedJobCounts = Array(5).fill(0);
  
          thisYearPostedActiveJobs.forEach((job) => {
              const jobYear = new Date(job.createdAt).getFullYear();
              const yearIndex = categories.indexOf(jobYear);
              if (yearIndex !== -1) {
                  postedActiveJobCounts[yearIndex]++;
              }
          });
  
          thisYearAppliedJobs.forEach((job) => {
              const jobYear = new Date(job.createdAt).getFullYear();
              const yearIndex = categories.indexOf(jobYear);
              if (yearIndex !== -1) {
                  appliedJobCounts[yearIndex]++;
              }
          });
  
          const response = {
              Id: companyId,
              filterType: "yearly",
              categories: categories,
              series: [
                  {
                      name: "PostedActiveJobs",
                      data: postedActiveJobCounts,
                  },
                  {
                      name: "AppliedJobs",
                      data: appliedJobCounts,
                  },
              ],
          };
  
          return res.status(200).json(response);
      } else {
          return res.status(404).json({ error: `No report details found for ${requestParam}!` });
      }    
  } else {
      return res.status(400).json({ error: "Invalid filter period" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* get updated applied jobs from posted jobs  */
const getUpdatedAppliedOfPostedJobs = async (req, res) => {
  try {
    const id = req.params.id;
    if(id){
        const appliedOfPostedJobs = await appliedJob.find({ companyId: id });

        if (appliedOfPostedJobs.length > 0) {
          const appliedJobsDetailOfPosted = await Promise.all(
            appliedOfPostedJobs.map(async (job) => {
              try {
                const appliedCand = await candidate.findOne({ id: job.candidateId });
                const resumeData = await resume.findOne({ id: job.candidateId });
                const profile = await candidateProfile.findOne({ id: job.candidateId });
                
                return {
                  jobId: job.jobId,
                  date: new Date(job.createdAt).toISOString().split('T')[0],
                  time: new Date(job.createdAt).toISOString().split('T')[1].split('.')[0],
                  job: {
                    jobRole: job.jobRole
                  },
                  client: {
                    clientId: job.clientId,
                    companyId: job.companyId
                  },
                  candidate: {
                    candidateId: job.candidateId,
                    lastProfileUpdateDate: new Date(appliedCand.updatedAt).toISOString().split('T')[0],
                    avatar: profile && profile.image ? `https://skillety-n6r1.onrender.com/candidate_profile/${profile.image}` : null,
                    joinPeriod: appliedCand.days,
                    lastDayWorked: appliedCand.selectedDate,
                    fName: appliedCand.firstName,
                    lName: appliedCand.lastName,
                    email: appliedCand.email,
                    phone: appliedCand.phone,
                    preferedLocations: appliedCand.preferedlocations ? appliedCand.preferedlocations.join(", ") : '',
                    cv: resumeData && resumeData.file ? `https://skillety-n6r1.onrender.com/files/${resumeData.file}` : null,
                    currentDesignation: appliedCand.designation ? appliedCand.designation[0] : '',
                    currentCompany: appliedCand.companyName,
                    currentLocation: appliedCand.location,
                    expYr: appliedCand.year,
                    expMonth: appliedCand.month,
                    skills: appliedCand.skills,
                    educations: appliedCand.education,
                    profileHeadline: appliedCand.profileHeadline
                  }
                };
              } catch (error) {
                console.error("Error in processing job:", error);
                return null; // or handle error as per your requirement
              }
            })
          );

          // Filter out null values if any errors occurred during processing
          const filteredJobsDetail = appliedJobsDetailOfPosted.filter(job => job !== null);

          return res.status(200).json(filteredJobsDetail);
        } else {
          return res.status(404).json({ message: 'No applied jobs found for your posted' });
        }
    }else{
      return res.status(400).json({error:"Null Id parameter"})
    }
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: err.message });
  }
};


/* MOBILE APP TEAM NEW API */

/* ATS.................. */

/* offline client register */
const offlineClientRegister = async (req, res) => {
  const { companyName, email, mobile } = req.body;

  try {
    
    const existingClient = await offlineClient.findOne({ companyName, email, mobile });

    if (existingClient) {
      return res.status(400).json({ error: 'Company already exists with the same combination of companyName, email, and mobile' });
    }

    const newOfflineClient = new offlineClient({
      ...req.body,
    });

    await newOfflineClient.save();

    res.status(201).json(newOfflineClient);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* find an offline client */
const getAnOfflineClientDetails = async(req, res) => {
  const {id} = req.params;
  try{
    const offlineClientDetails = await offlineClient.findOne({clientId:id});
    if(offlineClientDetails){
      return res.status(200).json(offlineClientDetails);
    }else{
      return res.status(404).json({ error: 'No such offline client found!' });
    }
    
  }catch(err){
    return res.status(500).json({ error: err.message });
  }
}

/* find all the offline clients */
const getAllOfflineClientDetails = async (req, res) => {
  try {
    const allOfflineClientDetails = await offlineClient.find();

    if (allOfflineClientDetails.length > 0) {
      
      const enhancedClientDetails = await Promise.all(
        allOfflineClientDetails.map(async (client) => {
          
          const clientDoc = await offlineClientDoc.findOne({
            clientId: client.clientId,
          });

         
          const clientLogo = await offlineClientLogo.findOne({
            clientId: client.clientId,
          });

         
          const enhancedClient = {
            ...client._doc,
            clientDoc: clientDoc ? clientDoc.doc : null, 
            clientLogo: clientLogo ? clientLogo.logo : null, 
          };

          return enhancedClient;
        })
      );

      return res.status(200).json(enhancedClientDetails);
    } else {
      return res.status(404).json({ error: 'No more offline clients!' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* update the exiesting offline client detail */
const updateOfflineClient = async (req, res) => {
  const { id } = req.params;

  try {
    const offlineClientToUpdate = await offlineClient.findOne({ clientId:id });

    if (offlineClientToUpdate) {
      const updatedOfflineClient = await offlineClient.findOneAndUpdate(
        { clientId:id },
        {
          $set: {
            companyName: req.body.companyName,
            address: req.body.address,
            companyWebsite: req.body.companyWebsite,
            contactPerson: req.body.contactPerson,
            email: req.body.email,
            mobile: req.body.mobile,
            industry: req.body.industry,
            headCount: req.body.headCount,
            aboutClient: req.body.aboutClient,
            GSTNumber: req.body.GSTNumber,
            CINNumber: req.body.CINNumber,
            paymentCategory: req.body.paymentCategory,
          },
        },
        { new: true }
      );

      return res.status(200).json({ updatedOfflineClient });
    } else {
      return res.status(404).json({ error: 'Offline Client not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* deleting exiesting offline client */
const deletingOfflineClient = async(req, res) => {
  try{
    const {id} = req.params;
    const offlineClientToDelete = await offlineClient.findOne({ clientId: id });

    if (!offlineClientToDelete) {
      return res.status(404).json({ error: 'Offline Client not found' });
    }

    const deletedOfflineClient = await offlineClient.deleteOne({ clientId: id });

    if (deletedOfflineClient.deletedCount === 1) {
      return res.status(204).json({ message: 'offline Client deleted successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to delete offline client' });
    } 
    
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

/* all offline client table column data create */
const allOfflineClientTableColumnData = async (req, res) => {
  try {
    const { id, column } = req.body;

    const existingDocument = await offlineClientTable.findOne({ id });

    if (existingDocument) {
      existingDocument.column = column;
      await existingDocument.save();
      res.status(200).json(existingDocument);
    } else {
      const newOfflineClientTableData = new offlineClientTable({
        id,
        column,
      });

      await newOfflineClientTableData.save();
      res.status(201).json(newOfflineClientTableData);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* get all offline client table column data */
const getAllOfflineClientTableColumnData = async(req, res) => {
  const {id} = req.params;
  try{
    const allOfflineClientTableColumnData = await offlineClientTable.findOne({id});
    console.log(allOfflineClientTableColumnData);
    return res.status(200).json(allOfflineClientTableColumnData);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}

//save column data for ATSJobs table
const allATSJobsTableColumnData = async (req, res) => {
  try {
    const { id, column } = req.body;

    const existingDocument = await atsJobsTable.findOne({ id });

    if (existingDocument) {
      existingDocument.column = column;
      await existingDocument.save();
      res.status(200).json(existingDocument);
    } else {
      const newATSJobsTableData = new atsJobsTable({
        id,
        column,
      });

      await newATSJobsTableData.save();
      res.status(201).json(newATSJobsTableData);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


/* get all ATSJobs table column data */
const getAllATSJobsTableColumnData = async(req, res) => {
  const {id} = req.params;
  try{
    const allATSJobsTableColumnData = await atsJobsTable.findOne({id});
    console.log(allATSJobsTableColumnData);
    return res.status(200).json(allATSJobsTableColumnData);
  }catch(err){
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
}


//find all active jobs in ats
const getOwnActivejobsInATS = async (req, res) => {
  try {
    const id = req.params.id; 
    
    const activeJobs = await activeJob.find({managerId: id});

    if (activeJobs.length > 0) {
      const activeJobWithStatus = activeJobs.map(job => ({ ...job.toObject(), active: true }));
      return res.status(200).json(activeJobWithStatus);
    }

      return res.status(404).json({ message: 'No active job found' });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//find all inactive jobs in ats
const getOwnInActivejobsInATS = async (req, res) => {
  try {
    const id = req.params.id; 
    
    const inActiveJobs = await jobDetail.find({managerId: id});

    if (inActiveJobs.length > 0) {
      return res.status(200).json(inActiveJobs);
    }

      return res.status(404).json({ message: 'No in-active job found' });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//create a document to create selected candidate 
const createSelectedCandidate = async (req, res) => {
  try {
    
    const newSelectedCandidate = new selectedCandidateForJob({
      ...req.body 
    });
    await newSelectedCandidate.save();
    
      return res.status(200).json(newSelectedCandidate);
    
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

//find the jobs selected for the candidateId
const getSelectedJobsForCandidateId = async (req, res) => {
  try {
    const id = req.params.id; 
    
    const selectedJobs = await selectedCandidateForJob.find({candidateId: id});

    if (selectedJobs.length > 0) {
      return res.status(200).json(selectedJobs);
    }

      return res.status(404).json({ message: 'Not selected for any job' });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//deselect the candidate for particular job
const deSelectCandidateForJobId = async(req, res) => {
  try{
    const candidateId = req.params.candidateId;
    const jobId = req.params.jobId;
    console.log(candidateId, jobId)
    const deslectedCandidateDetail = await selectedCandidateForJob.findOne({candidateId:candidateId, jobId:jobId});

    if (!deslectedCandidateDetail) {
      return res.status(404).json({ error: 'no such detail found!' });
    }
    const deSelectCandidate = await selectedCandidateForJob.deleteOne({candidateId:candidateId, jobId:jobId});

    if (deSelectCandidate.deletedCount === 1) {
      return res.status(204).json({ message: 'Candidate deselect for the job' });
    } else {
      return res.status(500).json({ error: 'Failed to deselect' });
    } 
    
  }catch(err) {
    res.status(500).json({error: err.message})
  }
}

//find all the selected candidates details
const getAllSelectedCandidateDetails = async (req, res) => {
  try {
    
    const selectedCandidateDetails = await selectedCandidateForJob.find();

    if (selectedCandidateDetails.length > 0) {
      return res.status(200).json(selectedCandidateDetails);
    }

      return res.status(404).json({ message: 'no more selected candidates found!' });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

//create document to assign the candidate to jobId
const createDocumentToAssignCandidateToJob = async (req, res) => {
  try {
    const { candidateId, jobIdArray } = req.body;

    if (!candidateId || !jobIdArray || !Array.isArray(jobIdArray)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    const createdDocuments = [];

    for (const jobId of jobIdArray) {
      const existingCandidateAssignDocumentForJobId = await assignCandidateForJobDetail.findOne({
        candidateId: candidateId,
        jobId: jobId,
      });

      if (existingCandidateAssignDocumentForJobId) {
        return res.status(400).json({ error: `Document already created for candidateId ${candidateId} and jobId ${jobId}` });
      } else {
        const newDocument = await assignCandidateForJobDetail.create({
          candidateId: candidateId,
          jobId: jobId,
        });
        createdDocuments.push(newDocument);
      }
    }

    res.status(200).json({ message: 'Documents created successfully', createdDocuments });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get all assign jobs for the candidate id
const getAllAssignedJobsForCandId = async (req, res) => {
  try {
    const {id} = req.params;

    const assignedJobs = await assignCandidateForJobDetail.find({ candidateId:id });
    if (assignedJobs.length > 0) {
      return res.status(200).json(assignedJobs);
    }

      return res.status(200).json({ message: 'no assigned jobs for the candidate' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//de assign the job from candidate
const deAssigningJobsForCand = async(req, res) => {
  try {
    const candidateId = req.params.candidateId;
    const jobId = req.params.jobId;
    console.log(candidateId, jobId)
    const deAssigningJobWithCandidateId = await assignCandidateForJobDetail.findOne({candidateId:candidateId, jobId:jobId});

    if (!deAssigningJobWithCandidateId) {
      return res.status(404).json({ error: 'no such detail found!' });
    }
    const deAssign = await assignCandidateForJobDetail.deleteOne({candidateId:candidateId, jobId:jobId});

    if (deAssign.deletedCount === 1) {
      return res.status(204).json({ message: 'Candidate deassign for the job' });
    } else {
      return res.status(500).json({ error: 'Failed to deassign' });
    } 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//find all the assigned candidates details
const getAllAssignedCandidateDetails = async (req, res) => {
  try {
    
    const assignedCandidateDetails = await assignCandidateForJobDetail.find();

    if (assignedCandidateDetails.length > 0) {
      return res.status(200).json(assignedCandidateDetails);
    }

      return res.status(404).json({ message: 'no more assigned candidates found!' });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* get all ats staff */
const getAllATSStaff = async (req, res) => {
  try {
    
    const allATSStaff = await employee.find({
      role: { $in: ["Super-Admin", "Manager", "Recruiter-ATS"] }
    });

    if (allATSStaff.length > 0) {
      return res.status(200).json(allATSStaff);
    }

    return res.status(200).json({ message: 'No employees found with the specified roles' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* offline client register */
const offlineCandRegister = async (req, res) => {
  const { firstName, lastName, emailId, mobileNumber } = req.body;

  try {
    
    const offlineCandAvailable = await offlineCand.findOne({ $or: [{ emailId },  { mobileNumber }] });
    const candidateAvailable = await candidate.findOne({ $or: [{ email:emailId },  {phone:mobileNumber}] });
    const allUserAvailable = await allUsers.findOne({ $or: [{ email:emailId },  {phone:mobileNumber}] });

    if (offlineCandAvailable || candidateAvailable || allUserAvailable) {
      return res.status(400).json({ error: 'Candidate already exists with the same email or mobile' });
    }

    const newOfflineCand = new offlineCand({
      ...req.body,
    });

    await newOfflineCand.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'demoemail1322@gmail.com',
        pass: 'znsdgrmwzskpatwz'
      }
    });

    const mailOptions = {
      from: 'demoemail1322@gmail.com',
      to: `${newOfflineCand.emailId}`,
      subject: 'Mail from SKILLITY!',
      text: 'Welcome to Skillety!, You are invited to create an account to search job....',
      html: `<p>First Name: ${newOfflineCand.firstName}</p>
                <p>Last Name: ${newOfflineCand.lastName}</p>
                <p>Email Id: ${newOfflineCand.emailId}</p>
                <p>Phone No: ${newOfflineCand.mobileNumber}</p>
                <p>Register Link: https://skillety-frontend-wcth.onrender.com/candiate-register</p>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error.message, newOfflineCand });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(201).json({ newOfflineCand, emailSent: true });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* update the exiesting offline cand detail */
const updateOfflineCand = async (req, res) => {
  const { id } = req.params;

  try {
    const offlineCandToUpdate = await offlineCand.findOne({ candId:id });

    if (offlineCandToUpdate) {
      const updatedOfflineCand = await offlineCand.findOneAndUpdate(
        { candId:id },
        {
          $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailId: req.body.emailId,
            mobileNumber: req.body.mobileNumber,
          },
        },
        { new: true }
      );

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'demoemail1322@gmail.com',
          pass: 'znsdgrmwzskpatwz'
        }
      });
  
      const mailOptions = {
        from: 'demoemail1322@gmail.com',
        to: `${updatedOfflineCand.emailId}`,
        subject: 'Mail from SKILLITY!',
        text: 'Welcome to Skillety!, You are invited to create an account with the updated detail to search job....',
        html: `<p>First Name: ${updatedOfflineCand.firstName}</p>
                  <p>Last Name: ${updatedOfflineCand.lastName}</p>
                  <p>Email Id: ${updatedOfflineCand.emailId}</p>
                  <p>Phone No: ${updatedOfflineCand.mobileNumber}</p>
                  <p>Register Link: https://skillety-frontend-wcth.onrender.com/candiate-register</p>`
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: error.message, updatedOfflineCand });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({ updatedOfflineCand, emailSent: true });
        }
      });

    } else {
      return res.status(404).json({ error: 'Offline Candidate not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* find all the offline candidates */
const getAllOfflineCandDetails = async (req, res) => {
  try {
    const allOfflineCandDetails = await offlineCand.find();

    if (allOfflineCandDetails.length > 0) {
      return res.status(200).json(allOfflineCandDetails);
    } else {
      return res.status(404).json({ error: 'No more offline candidates!' });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/* deleting exiesting offline cand */
const deletingOfflineCandidate = async(req, res) => {
  try{
    const {id} = req.params;
    const offlineCandidateToDelete = await offlineCand.findOne({ candId: id });

    if (!offlineCandidateToDelete) {
      return res.status(404).json({ error: 'Offline Candidate not found' });
    }

    const deletedOfflineCandidate = await offlineCand.deleteOne({ candId: id });

    if (deletedOfflineCandidate.deletedCount === 1) {
      return res.status(204).json({ message: 'offline Candidate deleted successfully' });
    } else {
      return res.status(500).json({ error: 'Failed to delete offline candidate' });
    } 
    
  }catch(err) {
    res.status(500).json({error: err.message})
  }
};

/* get data for report this week */
const getDataForReport = async (req, res) => {
  try {
    let filter;

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const endOfLastMonth = new Date(startOfMonth);
    endOfLastMonth.setDate(startOfMonth.getDate() - 1); // Move to the last day of the previous month

    const startOfLastMonth = new Date(endOfLastMonth.getFullYear(), endOfLastMonth.getMonth(), 1);

    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);

    const startOfLastYear = new Date(currentDate.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(currentDate.getFullYear(), 0, 0);

    const requestParam = req.query.period || "invalidParam";

    if (requestParam === "invalidParam") {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (requestParam === "thisWeek" || requestParam === "thisMonth" || requestParam === "thisYear" || 
        requestParam === "lastWeek" || requestParam === "lastMonth" || requestParam === "lastYear") {
        switch (requestParam) {
          case "thisWeek":
            filter = {
              $gte: startOfWeek,
              $lt: endOfWeek,
            };
            break;
          case "thisMonth":
            filter = {
              $gte: startOfMonth,
              $lt: endOfMonth,
            };
            break;
          case "thisYear":
            filter = {
              $gte: startOfYear,
              $lt: endOfYear,
            };
            break;
          case "lastWeek":
            filter = {
              $gte: new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000), // Start of the previous week
              $lt: startOfWeek, // End of the current week
          }
            break;
          case "lastMonth":
            filter = {
              $gte: startOfLastMonth,
              $lt: startOfMonth,
          }
            break;
          case "lastYear":
            filter = {
              $gte: startOfLastYear,
              $lt: endOfLastYear,
          };
            break;
          default:
            
            break;
        }
      } else if (requestParam.match(/^\d{4}-\d{2}-\d{2}to\d{4}-\d{2}-\d{2}$/)) {
        // Custom date format (ISO 8601)
        const [startDateString, endDateString] = requestParam.split("to");
        const customStartDate = new Date(startDateString);
        const customEndDate = new Date(endDateString);
  
        if (isNaN(customStartDate.getTime()) || isNaN(customEndDate.getTime())) {
          return res.status(400).json({ error: "Invalid date format in custom period" });
        }
  
        filter = {
          $gte: customStartDate,
          $lt: customEndDate,
        };
      } else {
        return res.status(400).json({ error: "Invalid filter period" });
      }

  if (filter && filter.$gte instanceof Date && filter.$lt instanceof Date) {
    // Find documents that match the filter
    const thisWeekOfflineClients = await offlineClient.find({createdAt:filter});
    const thisWeekOfflineCandidates = await offlineCand.find({createdAt:filter});
    const thisWeekAssignedCandidates = await assignCandidateForJobDetail.find({createdAt:filter});
    const thisWeekSelectedCandidates = await selectedCandidateForJob.find({createdAt:filter});
    const thisWeekScreenedCandidates = await applicationStatus.find({
      status:"screened",
      createdAt:filter
    });
    const thisWeekInterviewCandidates = await applicationStatus.find({
      status:"interviews",
      createdAt:filter
    });
    const thisWeekOfferedCandidates = await applicationStatus.find({
      status:"offered",
      createdAt:filter
    });
    const thisWeekrejectedCandidates = await applicationStatus.find({
      status:"rejected",
      createdAt:filter
    });
    const thisWeekJoinedCandidates = await applicationStatus.find({
      status:"joined",
      createdAt:filter
    });
    const thisWeekAbscondCandidates = await applicationStatus.find({
      status:"absconded",
      createdAt:filter
    });
    const thisWeekActiveJobs = await activeJob.find({
      createdAt: filter,
      managerId: { $exists: true, $ne: null }
    });
    const thisWeekInActiveJobs = await jobDetail.find({
      createdAt: filter,
      managerId: { $exists: true, $ne: null }
    });


    if (
      thisWeekOfflineClients.length > 0 ||
      thisWeekOfflineCandidates.length > 0 ||
      thisWeekAssignedCandidates.length > 0 ||
      thisWeekSelectedCandidates.length > 0 ||
      thisWeekActiveJobs.length >0 ||
      thisWeekInActiveJobs.length >0 
    ) {

      const allEmployee = await employee.find({
        role: { $in: ["Super-Admin", "Manager", "Recruiter-ATS"] }
      });

      const employeeData = await Promise.all(
        allEmployee.map(async (empl) => {
          const createdClientsByThisEmployee = thisWeekOfflineClients.filter(
            (cli) => cli.managerId === empl.id
          );
          const createdCandidatesByThisEmployee = thisWeekOfflineCandidates.filter(
            (cand) => cand.managerId === empl.id
          );

          const employeeActiveJobs = await activeJob.find({ managerId: empl.id });
          const employeeInActiveJobs = await jobDetail.find({ managerId: empl.id });
          const activeJobsInCMS = await activeJob.find({ recruiterId: empl.id });
          const inActiveJobsInCMS = await jobDetail.find({ recruiterId: empl.id });
          const employeeActiveJobsForThisWeek = await activeJob.find({ 
            managerId: empl.id,
            createdAt: filter 
          });
          const employeeInActiveJobsForThisWeek = await jobDetail.find({ 
            managerId: empl.id,
            createdAt: filter 
          });

          let updatedAssignedCandidate = [];
          let createdAssignedCandidatesByThisEmployee = [];
          if (employeeActiveJobs.length > 0) {
            createdAssignedCandidatesByThisEmployee = thisWeekAssignedCandidates.filter(
              (assCand) =>
                employeeActiveJobs.some((job) => job.id === assCand.jobId)
            );
            updatedAssignedCandidate = await Promise.all(
              createdAssignedCandidatesByThisEmployee.map(async (assCand) => {
                const assignedCand = await candidate.findOne({
                  id: assCand.candidateId,
                });
                const assignedJob = await activeJob.findOne({
                  id: assCand.jobId,
                });
                return {
                  name: assignedCand.firstName + " " + assignedCand.lastName,
                  jobRole: assignedJob.jobRole[0], 
                  createdDate: new Date(assCand.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  ),
                };
              })
            );
          }

          let updatedSelectedCandidate = [];
          if (activeJobsInCMS.length > 0) {
            const selectedCandidatesByThisEmployee = thisWeekSelectedCandidates.filter(
              (selCand) =>
              activeJobsInCMS.some((job) => job.id === selCand.jobId)
            );
            updatedSelectedCandidate = await Promise.all(
              selectedCandidatesByThisEmployee.map(async (selCand) => {
                const thisEmployeeAssignedCandIds = createdAssignedCandidatesByThisEmployee.map(cand=>cand.candidateId);
                if(!thisEmployeeAssignedCandIds.includes(selCand.candidateId)){
                  const selectedCand = await candidate.findOne({
                    id: selCand.candidateId,
                  });
                  const selectedJob = await activeJob.findOne({
                    id: selCand.jobId,
                  });
                  return {
                    name: selectedCand.firstName + " " + selectedCand.lastName,
                    jobRole: selectedJob.jobRole[0], 
                    createdDate: new Date(selCand.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    ),
                  };
                }
              })
            );
          }

          let updatedCreatedActiveJobs = [];
          if (employeeActiveJobsForThisWeek.length > 0) {
            
            updatedCreatedActiveJobs = await Promise.all(
              employeeActiveJobsForThisWeek.map(async (job) => {
                const clientForThisJob = await offlineClient.findOne({
                  clientId: job.clientId,
                });
                return {
                  name: clientForThisJob?.companyName,
                  jobRole: job.jobRole[0], 
                  createdDate: new Date(job.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  ),
                };
              })
            );
          }

          let updatedCreatedInActiveJobs = [];
          if (employeeInActiveJobsForThisWeek.length > 0) {
            
            updatedCreatedInActiveJobs = await Promise.all(
              employeeInActiveJobsForThisWeek.map(async (job) => {
                const clientForThisJob = await offlineClient.findOne({
                  clientId: job.clientId,
                });
                return {
                  name: clientForThisJob?.companyName,
                  jobRole: job.jobRole[0], 
                  createdDate: new Date(job.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  ),
                };
              })
            );
          }

          let updatedScreenedCandidate = [];
          if (activeJobsInCMS.length > 0 || inActiveJobsInCMS.length > 0 || employeeActiveJobs.length > 0 || employeeInActiveJobs.length > 0) {
            const screenedCandidatesByThisEmployee = thisWeekScreenedCandidates.filter(
              (scrCand) =>
              activeJobsInCMS.some((job) => job.id === scrCand.jobId) || inActiveJobsInCMS.some((job) => job.id === scrCand.jobId) || employeeActiveJobs.some((job) => job.id === scrCand.jobId) || employeeInActiveJobs.some((job) => job.id === scrCand.jobId)
            );
            updatedScreenedCandidate = await Promise.all(
              screenedCandidatesByThisEmployee.map(async (scrCand) => {
                  const screenedCand = await candidate.findOne({
                    id: scrCand.candidateId,
                  });
                  const screenedJob =( await activeJob.findOne({
                    id: scrCand.jobId,
                  }) || await jobDetail.findOne({
                    id: scrCand.jobId,
                  }));
                  return {
                    name: screenedCand.firstName + " " + screenedCand.lastName,
                    jobRole: screenedJob.jobRole[0], 
                    createdDate: new Date(scrCand.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    ),
                  };
                
              })
            );
          }

          let updatedInterviewCandidate = [];
          if (activeJobsInCMS.length > 0 || inActiveJobsInCMS.length > 0 || employeeActiveJobs.length > 0 || employeeInActiveJobs.length > 0) {
            const interviewCandidatesByThisEmployee = thisWeekInterviewCandidates.filter(
              (intCand) =>
              activeJobsInCMS.some((job) => job.id === intCand.jobId) || inActiveJobsInCMS.some((job) => job.id === intCand.jobId) || employeeActiveJobs.some((job) => job.id === intCand.jobId) || employeeInActiveJobs.some((job) => job.id === intCand.jobId)
            );
            updatedInterviewCandidate = await Promise.all(
              interviewCandidatesByThisEmployee.map(async (intCand) => {
                  const interviewCand = await candidate.findOne({
                    id: intCand.candidateId,
                  });
                  const interviewJob =( await activeJob.findOne({
                    id: intCand.jobId,
                  }) || await jobDetail.findOne({
                    id: intCand.jobId,
                  }));
                  return {
                    name: interviewCand.firstName + " " + interviewCand.lastName,
                    jobRole: interviewJob.jobRole[0], 
                    createdDate: new Date(intCand.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    ),
                  };
                
              })
            );
          }

          let updatedOfferedCandidate = [];
          if (activeJobsInCMS.length > 0 || inActiveJobsInCMS.length > 0 || employeeActiveJobs.length > 0 || employeeInActiveJobs.length > 0) {
            const offeredCandidatesByThisEmployee = thisWeekOfferedCandidates.filter(
              (offeredCand) =>
              activeJobsInCMS.some((job) => job.id === offeredCand.jobId) || inActiveJobsInCMS.some((job) => job.id === offeredCand.jobId) || employeeActiveJobs.some((job) => job.id === offeredCand.jobId) || employeeInActiveJobs.some((job) => job.id === offeredCand.jobId)
            );
            updatedOfferedCandidate = await Promise.all(
              offeredCandidatesByThisEmployee.map(async (offCand) => {
                  const offeredCand = await candidate.findOne({
                    id: offCand.candidateId,
                  });
                  const offeredJob =( await activeJob.findOne({
                    id: offCand.jobId,
                  }) || await jobDetail.findOne({
                    id: offCand.jobId,
                  }));
                  return {
                    name: offeredCand.firstName + " " + offeredCand.lastName,
                    jobRole: offeredJob.jobRole[0], 
                    createdDate: new Date(offCand.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    ),
                  };
                
              })
            );
          }

          let updatedRejectedCandidate = [];
          if (activeJobsInCMS.length > 0 || inActiveJobsInCMS.length > 0 || employeeActiveJobs.length > 0 || employeeInActiveJobs.length > 0) {
            const rejectedCandidatesByThisEmployee = thisWeekrejectedCandidates.filter(
              (rejCand) =>
              activeJobsInCMS.some((job) => job.id === rejCand.jobId) || inActiveJobsInCMS.some((job) => job.id === rejCand.jobId) || employeeActiveJobs.some((job) => job.id === rejCand.jobId) || employeeInActiveJobs.some((job) => job.id === rejCand.jobId)
            );
            updatedRejectedCandidate = await Promise.all(
              rejectedCandidatesByThisEmployee.map(async (rejCand) => {
                  const rejectedCand = await candidate.findOne({
                    id: rejCand.candidateId,
                  });
                  const rejectedJob =( await activeJob.findOne({
                    id: rejCand.jobId,
                  }) || await jobDetail.findOne({
                    id: rejCand.jobId,
                  }));
                  return {
                    name: rejectedCand.firstName + " " + rejectedCand.lastName,
                    jobRole: rejectedJob.jobRole[0], 
                    createdDate: new Date(rejCand.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    ),
                  };
                
              })
            );
          }

          let updatedJoinedCandidate = [];
          if (activeJobsInCMS.length > 0 || inActiveJobsInCMS.length > 0 || employeeActiveJobs.length > 0 || employeeInActiveJobs.length > 0) {
            const joinedCandidatesByThisEmployee = thisWeekJoinedCandidates.filter(
              (joinCand) =>
              activeJobsInCMS.some((job) => job.id === joinCand.jobId) || inActiveJobsInCMS.some((job) => job.id === joinCand.jobId) || employeeActiveJobs.some((job) => job.id === joinCand.jobId) || employeeInActiveJobs.some((job) => job.id === joinCand.jobId)
            );
            updatedJoinedCandidate = await Promise.all(
              joinedCandidatesByThisEmployee.map(async (joinCand) => {
                  const joinedCand = await candidate.findOne({
                    id: joinCand.candidateId,
                  });
                  const joinedJob =( await activeJob.findOne({
                    id: joinCand.jobId,
                  }) || await jobDetail.findOne({
                    id: joinCand.jobId,
                  }));
                  return {
                    name: joinedCand.firstName + " " + joinedCand.lastName,
                    jobRole: joinedJob.jobRole[0], 
                    createdDate: new Date(joinCand.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    ),
                  };
                
              })
            );
          }

          let updatedAbscondCandidate = [];
          if (activeJobsInCMS.length > 0 || inActiveJobsInCMS.length > 0 || employeeActiveJobs.length > 0 || employeeInActiveJobs.length > 0) {
            const abscondCandidatesByThisEmployee = thisWeekAbscondCandidates.filter(
              (absCand) =>
              activeJobsInCMS.some((job) => job.id === absCand.jobId) || inActiveJobsInCMS.some((job) => job.id === absCand.jobId) || employeeActiveJobs.some((job) => job.id === absCand.jobId) || employeeInActiveJobs.some((job) => job.id === absCand.jobId)
            );
            updatedAbscondCandidate = await Promise.all(
              abscondCandidatesByThisEmployee.map(async (absCand) => {
                  const abscondCand = await candidate.findOne({
                    id: absCand.candidateId,
                  });
                  const abscondJob =( await activeJob.findOne({
                    id: absCand.jobId,
                  }) || await jobDetail.findOne({
                    id: absCand.jobId,
                  }));
                  return {
                    name: abscondCand.firstName + " " + abscondCand.lastName,
                    jobRole: abscondJob.jobRole[0], 
                    createdDate: new Date(absCand.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    ),
                  };
                
              })
            );
          }

          const employeeReport = {
            name: empl.name,
            role: empl.role,
            createdClients: createdClientsByThisEmployee.map((client) => ({
              name: client.companyName,
              createdDate: new Date(client.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              ),
            })),
            createdCandidates: createdCandidatesByThisEmployee.map((cand) => ({
              name: cand.firstName + " " + cand.lastName,
              createdDate: new Date(cand.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              ),
            })),
            assignedCands: [...updatedAssignedCandidate, ...updatedSelectedCandidate],
            createdActiveJobs: updatedCreatedActiveJobs,
            createdInActiveJobs: updatedCreatedInActiveJobs,
            screenedCandidates: updatedScreenedCandidate,
            interviewCandidates: updatedInterviewCandidate,
            offeredCandidates: updatedOfferedCandidate,
            rejectedCandidates: updatedRejectedCandidate,
            joinedCandidates: updatedJoinedCandidate,
            abscondedCandidates: updatedAbscondCandidate,
          };
          return employeeReport;
        })
      );

      res.status(200).json(employeeData);
    } else {
      return res
        .status(404)
        .json({ error: `No report details found for ${requestParam}!` });
    }
  } else {
    return res.status(400).json({ error: "Invalid date filter" });
  }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDailySubmissionReportData = async (req, res) => {
  try {
    let filter;

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const endOfLastMonth = new Date(startOfMonth);
    endOfLastMonth.setDate(startOfMonth.getDate() - 1); // Move to the last day of the previous month

    const startOfLastMonth = new Date(endOfLastMonth.getFullYear(), endOfLastMonth.getMonth(), 1);

    const requestParam = req.query.period || "invalidParam";

    if (requestParam === "invalidParam") {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (requestParam === "thisWeek" || requestParam === "thisMonth" ||  
        requestParam === "lastWeek" || requestParam === "lastMonth" ) {
        switch (requestParam) {
          case "thisWeek":
            filter = {
              $gte: startOfWeek,
              $lt: endOfWeek,
            };
            break;
          case "thisMonth":
            filter = {
              $gte: startOfMonth,
              $lt: endOfMonth,
            };
            break;
          
          case "lastWeek":
            filter = {
              $gte: new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000), // Start of the previous week
              $lt: startOfWeek, // End of the current week
          }
            break;
          case "lastMonth":
            filter = {
              $gte: startOfLastMonth,
              $lt: startOfMonth,
          }
            break;
          
          default:
            
            break;
        }
      } else if (requestParam.match(/^\d{4}-\d{2}-\d{2}to\d{4}-\d{2}-\d{2}$/)) {
        // Custom date format (ISO 8601)
        const [startDateString, endDateString] = requestParam.split("to");
        const customStartDate = new Date(startDateString);
        const customEndDate = new Date(endDateString);
  
        if (isNaN(customStartDate.getTime()) || isNaN(customEndDate.getTime())) {
          return res.status(400).json({ error: "Invalid date format in custom period" });
        }
  
        filter = {
          $gte: customStartDate,
          $lt: customEndDate,
        };
      } else {
        return res.status(400).json({ error: "Invalid filter period" });
      }

  if (filter && filter.$gte instanceof Date && filter.$lt instanceof Date) {
    // Find documents that match the filter
    
    const thisWeekJoinedCandidates = await applicationStatus.find({
      status:"joined",
      createdAt:filter
    });
    
    const thisWeekActiveJobs = await activeJob.find({
      createdAt: filter,
      managerId: { $exists: true, $ne: null }
    });
    const thisWeekInActiveJobs = await jobDetail.find({
      createdAt: filter,
      managerId: { $exists: true, $ne: null }
    });

    if (
      thisWeekActiveJobs.length >0 ||
      thisWeekInActiveJobs.length >0 
    ) {
      console.log(thisWeekJoinedCandidates, thisWeekActiveJobs, thisWeekInActiveJobs)
      const allEmployee = await employee.find({
        role: { $in: ["Super-Admin", "Manager", "Recruiter-ATS"] }
      });

      const employeeData = await Promise.all(
        allEmployee.map(async (empl) => {
          const createdJobsByThisEmployee = [...thisWeekActiveJobs, ...thisWeekInActiveJobs].filter(job => job.managerId === empl.id);
          console.log(createdJobsByThisEmployee)
          const IndividualJobDetail = await Promise.all(createdJobsByThisEmployee.map(async (job) => {
            const clientForThisJob = await offlineClient.findOne({ clientId: job.clientId });
            const joinedCandForThisJob = thisWeekJoinedCandidates.filter(cand => cand.jobId === job.id);
            console.log(joinedCandForThisJob)
            // Group joined candidates by date
            const joinedCandsByDate = {};
            joinedCandForThisJob.forEach((cand) => {
              const createdAtDate = new Date(cand.createdAt);
              const formattedDate = `${createdAtDate.getFullYear()}-${(createdAtDate.getMonth() + 1).toString().padStart(2, '0')}-${createdAtDate.getDate().toString().padStart(2, '0')}`;
              joinedCandsByDate[formattedDate] = (joinedCandsByDate[formattedDate] || 0) + 1;
            });
      
            // Create an array of objects for each day in the current week
            let getDateFunction;
            if (requestParam === "thisWeek" || requestParam === "thisMonth" ||  
                requestParam === "lastWeek" || requestParam === "lastMonth" ) {
                  switch (requestParam) {
                    case "thisWeek":
                      getDateFunction = getDatesForCurrentWeek(new Date());
                      break;
                    case "thisMonth":
                      getDateFunction = getDatesForCurrentMonth(new Date());
                      break;
                    case "lastWeek":
                      getDateFunction = getLastWeek(new Date());
                      break;
                    case "lastMonth":
                      getDateFunction = getLastMonth(new Date());
                      break;
                    default:
                      // Handle other cases if needed
                      break;
                  }   
            }else if (requestParam.match(/^\d{4}-\d{2}-\d{2}to\d{4}-\d{2}-\d{2}$/)) {
              // Custom date format (ISO 8601)
              const [startDateString, endDateString] = requestParam.split("to");
              const customStartDate = new Date(startDateString);
              const customEndDate = new Date(endDateString);
          
              if (isNaN(customStartDate.getTime()) || isNaN(customEndDate.getTime())) {
                  return res.status(400).json({ error: "Invalid date format in custom period" });
              }
          
              getDateFunction = getCustomDates(customStartDate, customEndDate);
              
            } else {
                return res.status(400).json({ error: "Invalid filter period" });
            }
            const currentWeekDates = getDateFunction; // Implement getDatesForCurrentWeek function
            const joinedCandsThisWeek = currentWeekDates.map(date => ({
              date,
              numOfJoinCandidates: joinedCandsByDate[date] || 0,
            }));
      
            const jobDetail = {
              name: job.jobRole[0],
              clientName: clientForThisJob?.companyName,
              joinedCands: joinedCandsThisWeek,
            };
      
            return jobDetail;
          }));
      
          const employeeReport = {
            name: empl.name,
            role: empl.role,
            createdJobs: IndividualJobDetail,
          };
          return employeeReport;
        })
      );
      
      // Function to get dates for the current week
      function getDatesForCurrentWeek(today) {
        const currentDate = today || new Date();
        const dayOfWeek = currentDate.getDay();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Adjust to the first day of the week
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // Adjust to the last day of the week

        const dateArray = [];
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            if (currentDate <= new Date()) {
                dateArray.push(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`);
            }
        }

        return dateArray;
      }

      // Function to get dates for the current month
      function getDatesForCurrentMonth(today) {
        const currentDate = today || new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const startDate = new Date(year, month, 1); // Set to the first day of the month
        const endDate = new Date(year, month + 1, 0); // Set to the last day of the month

        const dateArray = [];
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            if (currentDate <= new Date()) {
                dateArray.push(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`);
            }
        }

        return dateArray;
      }

      // Function to get dates for the last week
      function getLastWeek(today) {
        const currentDate = today || new Date();
        const dayOfWeek = currentDate.getDay();
        const startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - dayOfWeek - 6); // Adjust to the first day of the last week
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // Adjust to the last day of the last week

        const dateArray = [];
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            dateArray.push(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`);
        }

        return dateArray;
      }

      // Function to get dates for the last month
      function getLastMonth(today) {
        const currentDate = today || new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() - 1;
        const startDate = new Date(year, month, 1); // Set to the first day of the last month
        const endDate = new Date(year, month + 1, 0); // Set to the last day of the last month

        const dateArray = [];
        for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
            dateArray.push(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`);
        }

        return dateArray;
      }
      //function to get dates for custom date
      function getCustomDates(startDate, endDate) {
        const dateArray = [];
        const currentDate = new Date(startDate);
    
        while (currentDate <= new Date(endDate)) {
            dateArray.push(`${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return dateArray;
      }
      
      res.status(200).json(employeeData);
    } else {
      return res
        .status(404)
        .json({ error: `No report details found for ${requestParam}!` });
    }
  } else {
    return res.status(400).json({ error: "Invalid date filter" });
  }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTurnAroundReport = async (req, res) => {
  try {
    let filter;

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const endOfLastMonth = new Date(startOfMonth);
    endOfLastMonth.setDate(startOfMonth.getDate() - 1); // Move to the last day of the previous month

    const startOfLastMonth = new Date(endOfLastMonth.getFullYear(), endOfLastMonth.getMonth(), 1);

    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);

    const startOfLastYear = new Date(currentDate.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(currentDate.getFullYear(), 0, 0);

    const requestParam = req.query.period || "invalidParam";

    if (requestParam === "invalidParam") {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (requestParam === "thisWeek" || requestParam === "thisMonth" || requestParam === "thisYear" || 
        requestParam === "lastWeek" || requestParam === "lastMonth" || requestParam === "lastYear") {
        switch (requestParam) {
          case "thisWeek":
            filter = {
              $gte: startOfWeek,
              $lt: endOfWeek,
            };
            break;
          case "thisMonth":
            filter = {
              $gte: startOfMonth,
              $lt: endOfMonth,
            };
            break;
          case "thisYear":
            filter = {
              $gte: startOfYear,
              $lt: endOfYear,
            };
            break;
          case "lastWeek":
            filter = {
              $gte: new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000), // Start of the previous week
              $lt: startOfWeek, // End of the current week
          }
            break;
          case "lastMonth":
            filter = {
              $gte: startOfLastMonth,
              $lt: startOfMonth,
          }
            break;
          case "lastYear":
            filter = {
              $gte: startOfLastYear,
              $lt: endOfLastYear,
          };
            break;
          default:
            
            break;
        }
      } else if (requestParam.match(/^\d{4}-\d{2}-\d{2}to\d{4}-\d{2}-\d{2}$/)) {
        // Custom date format (ISO 8601)
        const [startDateString, endDateString] = requestParam.split("to");
        const customStartDate = new Date(startDateString);
        const customEndDate = new Date(endDateString);
  
        if (isNaN(customStartDate.getTime()) || isNaN(customEndDate.getTime())) {
          return res.status(400).json({ error: "Invalid date format in custom period" });
        }
  
        filter = {
          $gte: customStartDate,
          $lt: customEndDate,
        };
      } else {
        return res.status(400).json({ error: "Invalid filter period" });
      }

  if (filter && filter.$gte instanceof Date && filter.$lt instanceof Date) {
    const query = {
      createdAt: filter,
      managerId: { $exists: true, $ne: null }
    };
    
    let thisWeekActiveJobsForSearchTerm;
    let thisWeekInActiveJobsForSearchTerm;
    const {jobRole} = req.query;
    
    if (jobRole) {
      query.jobRole = { $in: [jobRole] };
    } 
      
    thisWeekActiveJobsForSearchTerm = await activeJob.find(query);
    thisWeekInActiveJobsForSearchTerm = await jobDetail.find(query);
    
    if (
      thisWeekActiveJobsForSearchTerm.length >0 ||
      thisWeekInActiveJobsForSearchTerm.length >0 
    ) {

      const allJobs = [...thisWeekActiveJobsForSearchTerm, ...thisWeekInActiveJobsForSearchTerm]

      const employeeData = await Promise.all(
        allJobs.map(async (job) => {
          
          const client = await offlineClient.findOne({ clientId: job.clientId });
          const assignedCands = await assignCandidateForJobDetail.countDocuments({ jobId: job.id });
          const selectedCands = await selectedCandidateForJob.countDocuments({ jobId: job.id });
          
          const employeeReport = {
            jobName: job.jobRole[0],
            clientName: client ? client.companyName : null,
            createdDate: new Date(job.updatedAt).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            ),
            asiignedCands: assignedCands + selectedCands
          };
          return employeeReport;
        })
      );

      res.status(200).json(employeeData);
    } else {
      return res
        .status(404)
        .json({ error: `No report details found for ${requestParam}!` });
    }
  } else {
    return res.status(400).json({ error: "Invalid date filter" });
  }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCandidateSourceReport = async (req, res) => {
  try {
    let filter;

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const endOfLastMonth = new Date(startOfMonth);
    endOfLastMonth.setDate(startOfMonth.getDate() - 1); // Move to the last day of the previous month

    const startOfLastMonth = new Date(endOfLastMonth.getFullYear(), endOfLastMonth.getMonth(), 1);

    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const endOfYear = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 999);

    const startOfLastYear = new Date(currentDate.getFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(currentDate.getFullYear(), 0, 0);

    const requestParam = req.query.period || "invalidParam";

    if (requestParam === "invalidParam") {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (requestParam === "thisWeek" || requestParam === "thisMonth" || 
        requestParam === "lastWeek" || requestParam === "lastMonth" ) {
        switch (requestParam) {
          case "thisWeek":
            filter = {
              $gte: startOfWeek,
              $lt: endOfWeek,
            };
            break;
          case "thisMonth":
            filter = {
              $gte: startOfMonth,
              $lt: endOfMonth,
            };
            break;
          case "lastWeek":
            filter = {
              $gte: new Date(startOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000), // Start of the previous week
              $lt: startOfWeek, // End of the current week
          }
            break;
          case "lastMonth":
            filter = {
              $gte: startOfLastMonth,
              $lt: startOfMonth,
          }
            break;
          default:
            
            break;
        }
      } else if (requestParam.match(/^\d{4}-\d{2}-\d{2}to\d{4}-\d{2}-\d{2}$/)) {
        // Custom date format (ISO 8601)
        const [startDateString, endDateString] = requestParam.split("to");
        const customStartDate = new Date(startDateString);
        const customEndDate = new Date(endDateString);
  
        if (isNaN(customStartDate.getTime()) || isNaN(customEndDate.getTime())) {
          return res.status(400).json({ error: "Invalid date format in custom period" });
        }
  
        filter = {
          $gte: customStartDate,
          $lt: customEndDate,
        };
      } else {
        return res.status(400).json({ error: "Invalid filter period" });
      }

  if (filter && filter.$gte instanceof Date && filter.$lt instanceof Date) {
    const query = {
      createdAt: filter
    };
    const thisWeekCandidateCreate = await offlineCand.find(query);
    const thisWeekAssignedCand = await assignCandidateForJobDetail.find(query);
    const thisWeekSelectedCand = await selectedCandidateForJob.find(query);
      
    if (
        thisWeekCandidateCreate.length >0 ||
        thisWeekAssignedCand.length >0 ||
        thisWeekSelectedCand.length >0 
    ) {
      const { type } = req.query;
      const getFormattedDate = date => {
        const formattedDate = new Date(date);
        return `${formattedDate.getDate().toString().padStart(2, '0')}-${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedDate.getFullYear()}`;
      };

      const findOrCreateResultObject = (date, array) => {
          const formattedDate = getFormattedDate(date);
          let resultObj = array.find(obj => obj.date === formattedDate);
          if (!resultObj) {
              resultObj = { date: formattedDate, createdCands: 0, assignedCands: 0 };
              array.push(resultObj);
          }
          return resultObj;
      };
      if(type === "summary"){
        const employeeData = {
          candidateAssigned: thisWeekAssignedCand.length + thisWeekSelectedCand.length,
          candidateCreated: thisWeekCandidateCreate.length
        }
    
        res.status(200).json(employeeData);
        
      }else if(type === "userWise"){
  
      //   const allEmployee = await employee.find({
      //     role: { $in: ["Super-Admin", "Manager", "Recruiter-ATS"] }
      //   });
  
      //   const employeeData = await Promise.all(
      //     allEmployee.map(async (empl) => {
      //         const thisEmployeeCreatedCands = thisWeekCandidateCreate.filter(cand => cand.managerId === empl.id);
              
      //         const assignedCandsFiltered = await Promise.all(thisWeekAssignedCand.filter(async (cand) => {
      //           const correspondingJob = await activeJob.findOne({ id: cand.jobId }) || await jobDetail.findOne({ id: cand.jobId });
      //           return correspondingJob && (correspondingJob.managerId === empl.id || correspondingJob.recruiterId === empl.id);
      //       }));
            
      //       const selectedCandsFiltered = await Promise.all(thisWeekSelectedCand.filter(async (cand) => {
      //           const correspondingJob = await activeJob.findOne({ id: cand.jobId }) || await jobDetail.findOne({ id: cand.jobId });
      //           return correspondingJob && (correspondingJob.managerId === empl.id || correspondingJob.recruiterId === empl.id);
      //       }));
            
      //       // Combine the filtered arrays and remove duplicates based on candidateId
      //       const uniqueCandidates = [...new Map([...assignedCandsFiltered, ...selectedCandsFiltered].map(candidate => [`${candidate.candidateId}-${candidate.jobId}`, candidate])).values()];

    
      //         const result = [];
              
      //         // Function to get the formatted date
      //         const getFormattedDate = date => {
      //             const formattedDate = new Date(date);
      //             return `${formattedDate.getDate().toString().padStart(2, '0')}-${(formattedDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedDate.getFullYear()}`;
      //         };
              
      //         // Function to find or create a result object for a given date
      //         const findOrCreateResultObject = (date, array) => {
      //             const formattedDate = getFormattedDate(date);
      //             let resultObj = array.find(obj => obj.date === formattedDate);
      //             if (!resultObj) {
      //                 resultObj = { date: formattedDate, createdCands: 0, assignedCands: 0 };
      //                 array.push(resultObj);
      //             }
      //             return resultObj;
      //         };
              
      //         // Process created candidates
      //         thisEmployeeCreatedCands.forEach(candidate => {
      //             const resultObj = findOrCreateResultObject(candidate.createdAt, result);
      //             resultObj.createdCands++;
      //         });
              
      //         // Process assigned and selected candidates
      //         uniqueCandidates.forEach(candidate => {
      //             const resultObj = findOrCreateResultObject(candidate.createdAt, result);
      //             resultObj.assignedCands++;
      //         });
              
      //         return {
      //             name: empl.name,
      //             createdCands: thisEmployeeCreatedCands.length,
      //             assignedCands: uniqueCandidates.length,
      //             dateWiseResult: result
      //         };
      //     })
      // );
      
      // res.status(200).json(employeeData);
      
      const allEmployee = await employee.find({
        role: { $in: ["Super-Admin", "Manager", "Recruiter-ATS"] }
    });

    const uniqueCandidates = [...new Map([...thisWeekAssignedCand, ...thisWeekSelectedCand].map(candidate => [`${candidate.candidateId}-${candidate.jobId}`, candidate])).values()];
    
    const employeeData = await Promise.all(
        allEmployee.map(async (empl) => {
            const thisEmployeeCreatedCands = thisWeekCandidateCreate.filter(cand => cand.managerId === empl.id);
            
            const assignedCandsFiltered = await Promise.all(uniqueCandidates.map(async (cand) => {
                const correspondingJob = await activeJob.findOne({ id: cand.jobId }) || await jobDetail.findOne({ id: cand.jobId });
                return correspondingJob && (correspondingJob.managerId === empl.id || correspondingJob.recruiterId === empl.id);
            }));
    
            // const selectedCandsFiltered = await Promise.all(thisWeekSelectedCand.map(async (cand) => {
            //     const correspondingJob = await activeJob.findOne({ id: cand.jobId }) || await jobDetail.findOne({ id: cand.jobId });
            //     return correspondingJob && (correspondingJob.managerId === empl.id || correspondingJob.recruiterId === empl.id);
            // }));
    
            // const assignedCandidates = assignedCandsFiltered.filter(candidate => candidate);
            // const selectedCandidates = selectedCandsFiltered.filter(candidate => candidate);
            
    
            const result = [];
    
            thisEmployeeCreatedCands.forEach(candidate => {
                const resultObj = findOrCreateResultObject(candidate.createdAt, result);
                resultObj.createdCands++;
            });
    
            assignedCandsFiltered.forEach(candidate => {
                const resultObj = findOrCreateResultObject(candidate.createdAt, result);
                resultObj.assignedCands++;
            });
    
            return {
                name: empl.name,
                createdCands: thisEmployeeCreatedCands.length,
                assignedCands: assignedCandsFiltered.length,
                dateWiseResult: result
            };
        })
    );
    
    res.status(200).json(employeeData);
    
  
      }else if(type === "dateWise"){
  
      }else {
        return res.status(400).json({ error: "Invalid type" });
      }
    } else {
        return res
          .status(404)
          .json({ error: `No report details found for ${requestParam}!` });
    }
  } else {
    return res.status(400).json({ error: "Invalid date filter" });
  }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* find client report */
const getClientReport = async (req, res) => {
  try {
    let filter;

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setUTCHours(0, 0, 0, 0);
    startOfWeek.setUTCDate(currentDate.getUTCDate() - currentDate.getUTCDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 7);

    const startOfMonth = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1);
    const endOfMonth = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 0);

    const endOfLastMonth = new Date(startOfMonth);
    endOfLastMonth.setUTCDate(startOfMonth.getUTCDate() - 1); // Move to the last day of the previous month

    const startOfLastMonth = new Date(endOfLastMonth.getUTCFullYear(), endOfLastMonth.getUTCMonth(), 1);

    const startOfYear = new Date(currentDate.getUTCFullYear(), 0, 1);
    const endOfYear = new Date(currentDate.getUTCFullYear(), 11, 31, 23, 59, 59, 999);

    const startOfLastYear = new Date(currentDate.getUTCFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(currentDate.getUTCFullYear(), 0, 0);

    const requestParam = req.query.period || "invalidParam";

    if (requestParam === "invalidParam") {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (["thisWeek", "thisMonth", "thisYear", "lastWeek", "lastMonth", "lastYear"].includes(requestParam)) {
      switch (requestParam) {
        case "thisWeek":
          filter = {
            $gte: startOfWeek,
            $lt: endOfWeek,
          };
          break;
        case "thisMonth":
          filter = {
            $gte: startOfMonth,
            $lt: endOfMonth,
          };
          break;
        case "thisYear":
          filter = {
            $gte: startOfYear,
            $lt: endOfYear,
          };
          break;
        case "lastWeek":
          const prevWeekStart = new Date(startOfWeek);
          prevWeekStart.setUTCDate(startOfWeek.getUTCDate() - 7);
          filter = {
            $gte: prevWeekStart,
            $lt: startOfWeek,
          };
          break;
        case "lastMonth":
          filter = {
            $gte: startOfLastMonth,
            $lt: startOfMonth,
          };
          break;
        case "lastYear":
          filter = {
            $gte: startOfLastYear,
            $lt: endOfLastYear,
          };
          break;
        default:
          break;
      }
    } else if (requestParam.match(/^\d{4}-\d{2}-\d{2}to\d{4}-\d{2}-\d{2}$/)) {
      const [startDateString, endDateString] = requestParam.split("to");
      const customStartDate = new Date(startDateString);
      const customEndDate = new Date(endDateString);

      if (isNaN(customStartDate.getTime()) || isNaN(customEndDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format in custom period" });
      }

      filter = {
        $gte: customStartDate,
        $lt: customEndDate,
      };
    } else {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (filter && filter.$gte instanceof Date && filter.$lt instanceof Date) {
      const query = {
        createdAt: filter,
      };

      const { companyName } = req.query;

      if (companyName) {
        query.companyName = companyName;
      }

      const thisWeekCreatedClients = await offlineClient.find(query);

      if (thisWeekCreatedClients.length > 0) {
        const employeeData = await Promise.all(
          thisWeekCreatedClients.map(async (client) => {
            const createdJobsActive = await activeJob.find({ clientId: client.clientId });
            const createdJobsInActive = await jobDetail.find({ clientId: client.clientId });

            const jobDetails = [];

            const fetchActiveJobsDetails = async () => {
              for (const job of createdJobsActive) {
                const assignedCand = await assignCandidateForJobDetail.find({ jobId: job.id });
                const selectedCand = await selectedCandidateForJob.find({ jobId: job.id });
                const uniqueCandidates = [...new Map([...assignedCand, ...selectedCand].map(candidate => [`${candidate.candidateId}-${candidate.jobId}`, candidate])).values()];
                const jobDetailObj = {
                  jobName: job.jobRole[0],
                  createdDate: new Date(job.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  ),
                  status: "Active",
                  assignedCandidates: uniqueCandidates.length,
                };
                jobDetails.push(jobDetailObj);
              }
            };

            const fetchInactiveJobsDetails = async () => {
              for (const job of createdJobsInActive) {
                const assignedCand = await assignCandidateForJobDetail.find({ jobId: job.id });
                const selectedCand = await selectedCandidateForJob.find({ jobId: job.id });
                const uniqueCandidates = [...new Map([...assignedCand, ...selectedCand].map(candidate => [`${candidate.candidateId}-${candidate.jobId}`, candidate])).values()];
                const jobDetailObj = {
                  jobName: job.jobRole[0],
                  createdDate: new Date(job.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  ),
                  status: "In-Active",
                  assignedCandidates: uniqueCandidates,
                };
                jobDetails.push(jobDetailObj);
              }
            };

            await Promise.all([fetchActiveJobsDetails(), fetchInactiveJobsDetails()]);

            const employeeReport = {
              clientName: client.companyName,
              createdDate: new Date(client.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              ),
              numOfJobs: createdJobsActive.length + createdJobsInActive.length,
              jobDetails,
            };
            return employeeReport;
          })
        );

        res.status(200).json(employeeData);
      } else {
        return res.status(404).json({ error: `No report details found for ${requestParam}!` });
      }
    } else {
      return res.status(400).json({ error: "Invalid date filter" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* find all ats clients */
const allAtsClients = async(req, res) => {
  try{
    const clients = await offlineClient.find({}, 'companyName'); 
    
    const companyNames = clients.map(client => client.companyName); 
    res.status(200).json({ companyNames });
  }catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/* find job success report */
const getJobSuccessReport = async (req, res) => {
  try {
    let filter;

    const currentDate = new Date();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setUTCHours(0, 0, 0, 0);
    startOfWeek.setUTCDate(currentDate.getUTCDate() - currentDate.getUTCDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 7);

    const startOfMonth = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), 1);
    const endOfMonth = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 1, 0);

    const endOfLastMonth = new Date(startOfMonth);
    endOfLastMonth.setUTCDate(startOfMonth.getUTCDate() - 1); // Move to the last day of the previous month

    const startOfLastMonth = new Date(endOfLastMonth.getUTCFullYear(), endOfLastMonth.getUTCMonth(), 1);

    const startOfYear = new Date(currentDate.getUTCFullYear(), 0, 1);
    const endOfYear = new Date(currentDate.getUTCFullYear(), 11, 31, 23, 59, 59, 999);

    const startOfLastYear = new Date(currentDate.getUTCFullYear() - 1, 0, 1);
    const endOfLastYear = new Date(currentDate.getUTCFullYear(), 0, 0);

    const requestParam = req.query.period || "invalidParam";

    if (requestParam === "invalidParam") {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (["thisWeek", "thisMonth", "thisYear", "lastWeek", "lastMonth", "lastYear"].includes(requestParam)) {
      switch (requestParam) {
        case "thisWeek":
          filter = {
            $gte: startOfWeek,
            $lt: endOfWeek,
          };
          break;
        case "thisMonth":
          filter = {
            $gte: startOfMonth,
            $lt: endOfMonth,
          };
          break;
        case "thisYear":
          filter = {
            $gte: startOfYear,
            $lt: endOfYear,
          };
          break;
        case "lastWeek":
          const prevWeekStart = new Date(startOfWeek);
          prevWeekStart.setUTCDate(startOfWeek.getUTCDate() - 7);
          filter = {
            $gte: prevWeekStart,
            $lt: startOfWeek,
          };
          break;
        case "lastMonth":
          filter = {
            $gte: startOfLastMonth,
            $lt: startOfMonth,
          };
          break;
        case "lastYear":
          filter = {
            $gte: startOfLastYear,
            $lt: endOfLastYear,
          };
          break;
        default:
          break;
      }
    } else if (requestParam.match(/^\d{4}-\d{2}-\d{2}to\d{4}-\d{2}-\d{2}$/)) {
      const [startDateString, endDateString] = requestParam.split("to");
      const customStartDate = new Date(startDateString);
      const customEndDate = new Date(endDateString);

      if (isNaN(customStartDate.getTime()) || isNaN(customEndDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format in custom period" });
      }

      filter = {
        $gte: customStartDate,
        $lt: customEndDate,
      };
    } else {
      return res.status(400).json({ error: "Invalid filter period" });
    }

    if (filter && filter.$gte instanceof Date && filter.$lt instanceof Date) {
      const query = {
        createdAt: filter,
      };

      const {jobRole} = req.query;
    
      if (jobRole) {
        query.jobRole = { $in: [jobRole] };
      } 

      const thisWeekCreatedJobsActive = await activeJob.find(query);
      const thisWeekCreatedJobsInActive = await jobDetail.find(query);

      if (thisWeekCreatedJobsActive.length > 0 || thisWeekCreatedJobsInActive) {
        const employeeData = await Promise.all(
          thisWeekCreatedJobsActive.map(async (job) => {
            const client = await activeJob.find({ clientId: client.clientId });
            const createdJobsInActive = await jobDetail.find({ clientId: client.clientId });

            const jobDetails = [];

            const fetchActiveJobsDetails = async () => {
              for (const job of createdJobsActive) {
                const assignedCand = await assignCandidateForJobDetail.find({ jobId: job.id });
                const selectedCand = await selectedCandidateForJob.find({ jobId: job.id });
                const uniqueCandidates = [...new Map([...assignedCand, ...selectedCand].map(candidate => [`${candidate.candidateId}-${candidate.jobId}`, candidate])).values()];
                const jobDetailObj = {
                  jobName: job.jobRole[0],
                  createdDate: new Date(job.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  ),
                  status: "Active",
                  assignedCandidates: uniqueCandidates.length,
                };
                jobDetails.push(jobDetailObj);
              }
            };

            const fetchInactiveJobsDetails = async () => {
              for (const job of createdJobsInActive) {
                const assignedCand = await assignCandidateForJobDetail.find({ jobId: job.id });
                const selectedCand = await selectedCandidateForJob.find({ jobId: job.id });
                const uniqueCandidates = [...new Map([...assignedCand, ...selectedCand].map(candidate => [`${candidate.candidateId}-${candidate.jobId}`, candidate])).values()];
                const jobDetailObj = {
                  jobName: job.jobRole[0],
                  createdDate: new Date(job.createdAt).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }
                  ),
                  status: "In-Active",
                  assignedCandidates: uniqueCandidates,
                };
                jobDetails.push(jobDetailObj);
              }
            };

            await Promise.all([fetchActiveJobsDetails(), fetchInactiveJobsDetails()]);

            const employeeReport = {
              clientName: client.companyName,
              createdDate: new Date(client.createdAt).toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              ),
              numOfJobs: createdJobsActive.length + createdJobsInActive.length,
              jobDetails,
            };
            return employeeReport;
          })
        );

        res.status(200).json(employeeData);
      } else {
        return res.status(404).json({ error: `No report details found for ${requestParam}!` });
      }
    } else {
      return res.status(400).json({ error: "Invalid date filter" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*  */

/*ATS................... */

/* random password generate */
const generateRandomPassword = (req, res) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
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

    if (!userId || !password) {
            return res.status(400).json({
              message: "Invalid input. Please provide both userId and password.",
            });
    }

    let user;
    user = await allUsers.findOne({email:userId});
    if(!user){
      const userIdByNumber = Number(userId);
      if(isNaN(userIdByNumber)){
        return res.status(404).json({
          message: "User is not found. Invalid login credentials.",
        });
      }else{
        user = await allUsers.findOne({phone:userId});
        if(!user){
          return res.status(404).json({
            message: "User is not found. Invalid login credentials.",
          });
        }
      }
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


// const userLogin = async (req, role, res) => {
//   try {
//     const { userId, password } = req;

//     // Input validation
//     if (!userId || !password) {
//       return res.status(400).json({
//         message: "Invalid input. Please provide both userId and password.",
//       });
//     }

//     console.log(role);
//     console.log(userId, password);

//     // Combine email and phone in a single query
//     const user = await allUsers.findOne({
//       $or: [
//         { email: userId },
//         { phone: isNaN(userId) ? null : Number(userId) }, // Convert userId to number if it's a valid number
//       ],
//     });
    

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found. Invalid login credentials.",
//       });
//     }
//     console.log(user);
//     // Check the role
//     if (!role.includes(user.role)) {
//       return res.status(403).json({
//         message: "Incorrect role. Please log in from the correct portal.",
//       });
//     }

//     // Check the password
//     if (!bcrypt.compareSync(password, user.password)) {
//       return res.status(403).json({
//         message: "Incorrect password.",
//       });
//     }

//     // Generate and sign the token
//     const payload = {
//       id: user.id,
//       role: user.role,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//     };

//     const token = jwt.sign(payload, process.env.APP_SECRET, { expiresIn: "3 days" });

//     const result = {
//       id: user.id,
//       role: user.role,
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//       expiresIn: 168,
//     };

//     // Set the token in a cookie and return the response
//     return res
//       .cookie('jwt', token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json({
//         ...result,
//         accessToken: token,
//         message: "You are now logged in.",
//       });

//   } catch (err) {
//     console.error(err); // Log the error for debugging
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };



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

// const hashPswrd = (req, res) => {
//   const charset = 'newpassword';
//   let password = '';
//   for (let i = 0; i < 12; i++) {
//     const randomIndex = Math.floor(Math.random() * charset.length);
//     password += charset[randomIndex];
//   }
//   return res.status(200).json(password);
// }

module.exports = {
   checkRole,
   userLogin,
   employeeSignup,
   jwtauth,
   clientRegister,
   getAllClientDetails,
   getAllRecruiterClientDetails,
   getARecruiterClientDetails,
   updateRecruiterClient,
   deletingRecruiterClient,
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
   getAllCSERecruiters,
   getAllEmployee,
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
   candidateNotificationCreate,
   getAllcandidateNotification,
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
   getUpdatedSkillMatchJobDetail,
   getUpdatedAppliedOfPostedJobs,

   //MOBILE APP API............

   candidateDashboardTopBar,
   searchJob,
   getACandidateDetail,
   getCandidateResumeUrl,
   updatingCandidateProfileHeadlineDetail,
   updatingCandidateEducationsDetail,
   updatingCandidateSkillsDetail,
   candidateUpdateDetail,
   getUpdatedCompanyDetailByCompanyId,
   getUpdatedOwnActivejobs,
   getAllNewCandidateDetail,
   searchClient,
   getUpdatedAppliedjobs,
   clientDashboardTopBar,
   creatingNewNotification,
   getNotificationForReceiverId,
   readingNotifications,
   getUpdatedActiveJobs,
   getDataForCandidateGraph,
   getDataForClientGraph,
   
  
   //MOBILE APP API............

   //ATS...............

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
   createSelectedCandidate,
   getSelectedJobsForCandidateId,
   deSelectCandidateForJobId,
   getAllSelectedCandidateDetails,
   createDocumentToAssignCandidateToJob,
   getAllAssignedJobsForCandId,
   deAssigningJobsForCand,
   getAllAssignedCandidateDetails,
   getAllATSStaff,
   offlineCandRegister,
   updateOfflineCand,
   getAllOfflineCandDetails,
   deletingOfflineCandidate,
   getDataForReport,
   getDailySubmissionReportData,
   getTurnAroundReport,
   getCandidateSourceReport,
   getClientReport,
   allAtsClients,
  //ATS...........
};
