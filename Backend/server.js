const express = require('express');
const bp = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const conversationRouter = require('./routes/conversation');
const messageRouter = require('./routes/messages');
const skillsRouter = require('./routes/skills');
const designationsRouter = require('./routes/designations');
const departmentRouter = require('./routes/departments');
const locationRouter = require('./routes/location');
const roleRouter = require('./routes/role');
const industryRouter = require('./routes/industry');
const educationRouter = require('./routes/education');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const resume = require('./Database/resume');
const image = require('./Database/image');
const candidateProfile = require("./Database/candidateProfile");
const clientProfile = require("./Database/clientProfile");
const validateToken = require('./middleware/employeeAuth');
const jwt = require("jsonwebtoken");
// const file = require('./Database/file');
// const cv = require('./Database/cv');
//converting base64 to pdf
// const fs = require('fs');
// const path = require('path');
// const mammoth = require('mammoth'); // For handling Word documents
const http = require('http');
const employeeAuth = require('./middleware/employeeAuth');
const {Server} = require('socket.io');
const axios = require("axios");
const sampleImg = require("./Database/sampleImg");
// const jimp = require("jimp");

//ATS.............

const offlineClientDoc = require("./Database/offlineClientDoc");
const offlineClientLogo = require("./Database/offlineClientLogo");
//ATS................


const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://skillety-dashboard-tk2y.onrender.com', 'https://skillety-frontend-wcth.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials']
};


app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(bp.json());
app.use(express.static('public'))
app.use(cookieParser());
app.use(bp.urlencoded({extended: true}))
app.use('', userRouter);
app.use('', conversationRouter);
app.use('', messageRouter);
app.use('', skillsRouter);
app.use('', designationsRouter);
app.use('', departmentRouter);
app.use('', locationRouter);
app.use('', roleRouter);
app.use('', industryRouter);
app.use('', educationRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://skillety-dashboard-tk2y.onrender.com', 'https://skillety-frontend-wcth.onrender.com'],
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

const SITE_SECRET = process.env.SITE_SECRET;

// Connecting our database
mongoose.connect(process.env.DB_CONNECT)
  .then(() => {
    console.log('MongoDB connected...');
  })


  app.post("/verify", async (request, response) => {
    const { captchaValue } = request.body;
    const { data } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`
    );
    response.send(data);
  });

  app.post('/proxyRequestToThirdPartyAPI', async (req, res) => {
    try {
        // Extract user data from the request body
        const userData = req.body;
       
        // Basic authentication credentials for the third-party API
        const username = 'adminBgvFactsuite';
        const password = 'AdminFSuite123';
        const authString = `${username}:${password}`;
        const base64AuthString = btoa(authString);

        // Make a POST request to the third-party API with user data
        const response = await axios.post(
            `http://3.108.132.101:8080/BgvApi/bgv/requestCandidateVerification?unique_id=${userData.unique_id}&client_id=${userData.client_id}`,
            userData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${base64AuthString}`,
                },
            }
        );

        // Forward the response from the third-party API to the client
        res.json(response.data);
    } catch (error) {
        // Handle errors
        // console.log(error);
        res.status(error.response.status).json({ error: error.response.data.error });
    }
});
  
let onlineUsers = [];

const addNewUser = (userName, socketId) => {
  // !onlineUsers.some((user)=>user.userName === userName) && 
    onlineUsers.push({userName, socketId});
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userName) => {
  return onlineUsers.filter((user)=>user.userName === userName);
};

io.on('connection', (socket) => {

  console.log(`user connected: ${socket.id}`);
  
  socket.on("newUser", (userName) => {
    console.log(userName);
    addNewUser(userName, socket.id);
  });

  socket.on("sendNotification", ({ senderId, senderName, receiverId, receiverName, content, time, date, redirect, id }) => {
    console.log({ senderId, senderName, receiverId, receiverName, content, time, date, redirect, id });
  
    if (Array.isArray(receiverName)) {
      // If receiverName is an array, iterate through each name
      receiverName.forEach((name) => {
        const receivers = getUser(name);
        if (receivers.length>0) {
          receivers.forEach((receiver)=>{
            io.to(receiver?.socketId).emit("getNotification", {
              senderId,
              senderName,
              receiverId,
              receiverName,
              content,
              time,
              date,
              redirect,
              id
            });
          })
        }else{
          console.log(`Your Notification receiver(${name}) not be in online`)
        }
      });
    } else {
      // If receiverName is not an array
      console.log("Receiver name not an array")
    }
  });

  socket.on("sendWebChatNotification", ({ senderId, senderName, receiverId, receiverName, content, time, date}) => {
    console.log({ senderId, senderName, receiverId, receiverName, content, time, date });
  
    if (Array.isArray(receiverName)) {
      // If receiverName is an array, iterate through each name
      receiverName.forEach((name) => {
        const receivers = getUser(name);
        if (receivers.length>0) {
          receivers.forEach((receiver)=>{
            io.to(receiver?.socketId).emit("getWebChatNotification", {
              senderId,
              senderName,
              receiverId,
              receiverName,
              content,
              time,
              date
            });
          })
        }else{
          console.log(`Your Notification receiver(${name}) not be in online`)
        }
      });
    } else {
      // If receiverName is not an array
      console.log("Receiver name not an array")
    }
  });

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`user with id: ${socket.id} joined room: ${data}`)
  });

  socket.on('send_message', (data) => {
    console.log(data);
    socket.to(data.roomId).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log("user disconnect", socket.id);
    removeUser(socket.id);
  });

});



// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "./public/files")
//   },
//   filename: function(req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })

// const upload = multer({storage});
// app.post('/upload', upload.single('file'), (req, res) => {
//   const uploadedId = req.body.id; 
//   console.log("Uploaded ID:", uploadedId);
//   console.log("Uploaded File:", req.file);

//   resume.create({
//     file: req.file.filename,
//     id: uploadedId,
//   })
//   .then((result) => console.log(result))
//   .then(result => res.json(result))
//   .catch(err => console.log(err))
// });

// app.patch('/update-candidate-resume/:id', upload.single('resume'), (req, res) => {
//   const uploadedId = req.params.id;
//   const newResumeFilename = req.file.filename;

//   resume.findOneAndUpdate(
//     { id: uploadedId },
//     { $set: { file: newResumeFilename } },
//     { new: true },
//     (err, updatedResume) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }

//       if (!updatedResume) {
//         return res.status(404).json({ error: 'Resume not found' });
//       }

//       console.log('Updated Resume:', updatedResume);

//       res.json(updatedResume);
//     }
//   );
// });

app.get('/candidate-resume/:id', async(req, res)=>{
  const {id} = req.params;
  try {
    // Fetch the resume from the database based on the provided ID
    const existingResume = await resume.findOne({ id });

    if (!existingResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.status(200).json(existingResume);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


/* base64 conversion */
const storageMemory = multer.memoryStorage();
const uploadImgBase64 = multer({ storage: storageMemory });

app.post('/upload', uploadImgBase64.single('file'), async (req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ error: 'No resume id provided' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No resume provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Save the image to the database
    const newResume = new resume({
      id: req.body.id,
      file: base64Image
    });
    await newResume.save();

    res.status(200).json({ message: 'Resume uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/update-candidate-resume/:id', uploadImgBase64.single('resume'), async (req, res) => {
  try {
    const {id} = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No resume provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Update the existing content with new logo using findOneAndUpdate
    const updatedResume = await resume.findOneAndUpdate(
      { id },
      { file: base64Image },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/*  */

// const storageImg = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "./public/images")
//   },
//   filename: function(req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })

// const uploadImg = multer({storage: storageImg})

const storageMemoryEvent = multer.memoryStorage();
const uploadImgBase64Event = multer({ storage: storageMemoryEvent });

app.post('/upload-image', employeeAuth, uploadImgBase64Event.single('image'), async(req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ error: 'No image id provided' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Save the image to the database
    const newImage = new image({
      id: req.body.id,
      image: base64Image
    });
    await newImage.save();

    res.status(200).json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/event-image', async(req, res)=>{
  try {
    // Fetch the resume from the database based on the provided ID
    const existingResume = await image.find();

    if (existingResume.length===0) {
      return res.status(404).json({ error: 'Images not found' });
    }

    res.status(200).json(existingResume);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/event-image/:id', async(req, res)=>{
  const {id} = req.params;
  try {
    // Fetch the resume from the database based on the provided ID
    const existingResume = await image.findOne({ id });

    if (!existingResume) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json(existingResume);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/event-image-delete/:id', employeeAuth, async(req, res) => {
  const { id } = req.params;

  image.findOneAndDelete({ id }) 
    .then(deletedImage => {
      if (!deletedImage) {
        return res.status(404).json({ message: 'Image not found' });
      }
      res.status(200).json({ message: 'Image deleted successfully' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Internal Server Error', error: err });
    });
});

app.patch('/update-image/:id', employeeAuth, uploadImgBase64Event.single('image'), async(req, res) => {
  try {
    const {id} = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Update the existing content with new logo using findOneAndUpdate
    const updatedResume = await image.findOneAndUpdate(
      { id },
      { image: base64Image },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: 'Image not found' });
    }

    res.status(200).json({ message: 'Image updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//candidate profile photohandling
// const storageCandidateImg = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "./public/candidate_profile")
//   },
//   filename: function(req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })

// const uploadCandidateImg = multer({storage: storageCandidateImg})
const storageMemoryCand = multer.memoryStorage();
const uploadImgBase64Cand = multer({ storage: storageMemoryCand });
app.post('/upload-candidate-profile-image', uploadImgBase64Cand.single('image'), async(req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ error: 'No candidate id provided' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No candidate profile provided' });
    }

    // const image = await jimp.read(req.file.buffer);

    // // Compress the image
    // image.resize(100, jimp.AUTO); // Resize to width 300, maintaining aspect ratio

    // // Convert the image to base64
    // const base64Image = await image.getBase64Async(jimp.AUTO);
    // // const base64Image = req.file.buffer.toString('base64');

    const base64Image = req.file.buffer.toString('base64');

    // Save the image to the database
    const newCandidateProfile = new candidateProfile({
      id: req.body.id,
      image: base64Image
    });
    await newCandidateProfile.save();

    res.status(200).json({ message: 'Profile Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.get('/candidate-image', async(req, res)=>{
  
  try {
    // Fetch the resume from the database based on the provided ID
    const existingResume = await candidateProfile.find();

    if (existingResume.length===0) {
      return res.status(404).json({ error: 'Profile Images not found' });
    }

    res.status(200).json(existingResume);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/candidate-image/:id', async(req, res)=>{
  const {id} = req.params;
  try {
    // Fetch the resume from the database based on the provided ID
    const existingResume = await candidateProfile.findOne({ id });

    if (!existingResume) {
      return res.status(404).json({ error: 'Profile Image not found' });
    }

    res.status(200).json(existingResume);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/update-candidate-profile-image/:id', employeeAuth, uploadImgBase64Cand.single('image'), async(req, res) => {
  try {
    const {id} = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No Profile Image provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Update the existing content with new logo using findOneAndUpdate
    const updatedResume = await candidateProfile.findOneAndUpdate(
      { id },
      { image: base64Image },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: 'Profile Image not found' });
    }

    res.status(200).json({ message: 'Profile Image updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//client company profile photohandling
// const storageClientImg = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "./public/client_profile")
//   },
//   filename: function(req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })

// const uploadClientImg = multer({storage: storageClientImg})
const storageMemoryClient = multer.memoryStorage();
const uploadImgBase64Client = multer({ storage: storageMemoryClient });
app.post('/upload-client-profile-image', employeeAuth, uploadImgBase64Client.single('image'), async(req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ error: 'No client  id provided' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No client profile provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Save the image to the database
    const newClientProfile = new clientProfile({
      id: req.body.id,
      image: base64Image
    });
    await newClientProfile.save();

    res.status(200).json({ message: 'Profile Image uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

// /* base64 conversion */
// const storageMemory = multer.memoryStorage();
// const uploadImgBase64 = multer({ storage: storageMemory });

// app.post('/upload-client-profile-image', uploadImgBase64.single('image'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No image provided' });
//     }

//     // Convert image buffer to base64
//     const base64Image = req.file.buffer.toString('base64');

//     // Save the image to the database
//     const clientImage = new clientProfile({
//       id: req.body.id,
//       image: base64Image
//     });
//     await clientImage.save();

//     res.status(200).json({ message: 'Image uploaded successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
// /*  */

app.get('/client-image', async(req, res)=>{
  try {
    // Fetch the resume from the database based on the provided ID
    const existingResume = await clientProfile.find();

    if (existingResume.length===0) {
      return res.status(404).json({ error: 'Profile Images not found' });
    }

    res.status(200).json(existingResume);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/client-image/:id', async(req, res)=>{
  const {id} = req.params;
  try {
    // Fetch the resume from the database based on the provided ID
    const existingResume = await clientProfile.findOne({ id });

    if (!existingResume) {
      return res.status(404).json({ error: 'Profile Image not found' });
    }

    res.status(200).json(existingResume);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/update-client-profile-image/:id', employeeAuth, uploadImgBase64Client.single('image'), async(req, res) => {
  try {
    const {id} = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No Profile Image provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Update the existing content with new logo using findOneAndUpdate
    const updatedResume = await clientProfile.findOneAndUpdate(
      { id },
      { image: base64Image },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: 'Profile Image not found' });
    }

    res.status(200).json({ message: 'Profile Image updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//ATS.....................

//offlinet client doc save
// const offlineClientDocStorage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "./public/offline_client_doc")
//   },
//   filename: function(req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })

// const offlineClientDocUpload = multer({storage:offlineClientDocStorage});

const storageMemoryOffClient = multer.memoryStorage();
const uploadImgBase64OffClient = multer({ storage: storageMemoryOffClient });
app.post('/offline-client-doc/upload', employeeAuth, uploadImgBase64OffClient.single('doc'), async(req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ error: 'No doc  id provided' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No doc provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Save the image to the database
    const newOffClientDoc = new offlineClientDoc({
      clientId: req.body.id,
      doc: base64Image
    });
    await newOffClientDoc.save();

    res.status(200).json({ message: 'Document uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//update the exiesting offline client document
app.patch('/update-exiesting-offline-client-doc/:id', employeeAuth, uploadImgBase64OffClient.single('doc'), async(req, res) => {
  try {
    const {id} = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No Doc provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Update the existing content with new logo using findOneAndUpdate
    const updatedResume = await offlineClientDoc.findOneAndUpdate(
      { clientId:id },
      { doc: base64Image },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: 'Doc not found' });
    }

    res.status(200).json({ message: 'Doc updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//find an offline client document
app.get('/offline-client-doc/:id', employeeAuth, (req, res)=>{
  const {id} = req.params;
  offlineClientDoc.findOne({clientId:id})
  .then(offlineClientDocument=>res.json(offlineClientDocument))
  .catch(err=>res.json(err))
});

//offline_client logo handling
// const offlineClientLogoStorage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     return cb(null, "./public/offline_client_logo")
//   },
//   filename: function(req, file, cb) {
//     return cb(null, `${Date.now()}_${file.originalname}`)
//   }
// })

// const offlineClientLogoUpload = multer({storage: offlineClientLogoStorage})

const storageMemoryOffClientLogo = multer.memoryStorage();
const uploadImgBase64OffClientLogo = multer({ storage: storageMemoryOffClientLogo });
app.post('/offline-client-logo/upload', employeeAuth, uploadImgBase64OffClientLogo.single('logo'), async(req, res) => {
  try {
    if (!req.body.id) {
      return res.status(400).json({ error: 'No logo  id provided' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No logo provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Save the image to the database
    const newOffClientLoc = new offlineClientLogo({
      clientId: req.body.id,
      logo: base64Image
    });
    await newOffClientLoc.save();

    res.status(200).json({ message: 'Logo uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

//find an offline client logo
app.get('/an-offline-client-logo/:id', employeeAuth, (req, res)=>{
  const {id} = req.params;
  offlineClientLogo.findOne({clientId:id})
  .then(offlineClientLogo=>res.json(offlineClientLogo))
  .catch(err=>res.json(err))
});

//update an exiesting offline client logo
app.patch('/update-exiesting-offline-client-logo/:id', employeeAuth, uploadImgBase64OffClientLogo.single('logo'), async(req, res) => {
  try {
    const {id} = req.params;

    if (!req.file) {
      return res.status(400).json({ error: 'No Logo provided' });
    }

    // Convert image buffer to base64
    const base64Image = req.file.buffer.toString('base64');

    // Update the existing content with new logo using findOneAndUpdate
    const updatedResume = await offlineClientLogo.findOneAndUpdate(
      { clientId:id },
      { logo: base64Image },
      { new: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: 'Logo not found' });
    }

    res.status(200).json({ message: 'Logo updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//ATS.........................


// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// app.post('/upload', upload.single('file'), async (req, res) => {
//   const { originalname, buffer } = req.file;
//   const resume = new file({
//     id:req.body.id,
//     filename: originalname,
//     data: buffer,
//   });
//   await resume.save();
//   console.log(resume);
//   res.json('File uploaded successfully');
// });

// app.get('/download/:id', async (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   const resume = await file.findOne({ id });

//   if (resume) {
//     // res.setHeader('Content-Type', 'application/pdf');
//     res.status(200).json(resume.data);
//     console.log(resume.data);
//   } else {
//     res.status(404).send('File not found');
//   }
// });


// Configure multer for file upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     console.log(req.file);
//     const { originalname, buffer } = req.file;

//     const newResume = new cv({
//       id:req.body.id,
//       file: originalname,
//       base64Data: buffer.toString('base64'),
//     });

//     await newResume.save();
//     console.log(newResume)
//     // Assume you have retrieved the base64 strings from MongoDB
//     const base64PDFData = newResume.base64Data; // Your base64 encoded PDF data here
//     // const base64WordData = newResume.base64Data; // Your base64 encoded Word data here

//     // Specify the path where you want to save the files
//     const outputDir = path.join(__dirname,'public/files');

//     // Convert base64 to binary buffer and write to file
//     function saveToFile(base64Data, fileName) {
//       const buffer = Buffer.from(base64Data, 'base64');
//       const filePath = path.join(outputDir, fileName);

//       fs.writeFile(filePath, buffer, (err) => {
//         if (err) {
//           console.error(`Error writing ${fileName} file:`, err);
//         } else {
//           console.log(`${fileName} file saved successfully.`);
//         }
//       });
//     }
//     // Save PDF
//     saveToFile(base64PDFData, `${originalname}.pdf`);
//     // Save Word document (docx)
//     // const wordBuffer = Buffer.from(base64WordData, 'base64');
//     // const wordFilePath = path.join(outputDir, 'yourfile.docx');

//     // mammoth.convertToHtml({ arrayBuffer: wordBuffer })
//     //   .then(result => {
//     //     fs.writeFile(wordFilePath, result, err => {
//     //       if (err) {
//     //         console.error('Error writing Word file:', err);
//     //       } else {
//     //         console.log('Word file saved successfully.');
//     //       }
//     //     });
//     //   })
//     //   .catch(err => {
//     //     console.error('Error converting Word file:', err);
//     // });
//     res.status(201).json('Resume uploaded successfully.');
//   } catch (error) {
//     console.error(error);
//     res.status(500).json('An error occurred.');
//   }
// });

// Serve the PDF file from a specific folder
// app.use('/public/files', express.static(path.join(__dirname, 'resume')));

// Create an API endpoint to retrieve the PDF
// app.get('/api/getpdf', (req, res) => {
//   // You might want to add authentication/authorization logic here
//   const pdfFilePath = path.join(__dirname, 'public/files', 'Skillety Client Packages.pdf');

//   res.sendFile(pdfFilePath);

// });


server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  console.log(new Date());
});
