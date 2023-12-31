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


const corsOptions = {
  origin: ['https://skillety-frontend-wcth.onrender.com', 'https://skillety-dashboard-tk2y.onrender.com', 'http://localhost:3000', 'http://localhost:3001'],
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
    origin: ['https://skillety-frontend-wcth.onrender.com', 'https://skillety-dashboard-tk2y.onrender.com', 'http://localhost:3000', 'http://localhost:3001'],
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
  
let onlineUsers = [];

const addNewUser = (userName, socketId) => {
  !onlineUsers.some((user)=>user.userName === userName) && 
    onlineUsers.push({userName, socketId});
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userName) => {
  return onlineUsers.find((user)=>user.userName === userName);
};

io.on('connection', (socket) => {

  console.log(`user connected: ${socket.id}`);
  
  socket.on("newUser", (userName) => {
    console.log(userName);
    addNewUser(userName, socket.id);
  });

  socket.on("sendNotification", ({ senderId, senderName, receiverId, receiverName, type, time, date }) => {
    console.log({ senderId, senderName, receiverId, receiverName, type, time, date });
  
    if (Array.isArray(receiverName)) {
      // If receiverName is an array, iterate through each name
      receiverName.forEach((name) => {
        const receiver = getUser(name);
        if (receiver) {
          io.to(receiver?.socketId).emit("getNotification", {
            senderId,
            senderName,
            type,
            time,
            date,
          });
        }
      });
    } else {
      // If receiverName is not an array, handle it as a single user
      const receiver = getUser(receiverName);
      if (receiver) {
        io.to(receiver?.socketId).emit("getNotification", {
          senderId,
          senderName,
          type,
          time,
          date,
        });
      }
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



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/files")
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({storage});
app.post('/upload', upload.single('file'), (req, res) => {
  const uploadedId = req.body.id; 
  console.log("Uploaded ID:", uploadedId);
  console.log("Uploaded File:", req.file);

  resume.create({
    file: req.file.filename,
    id: uploadedId,
  })
  .then((result) => console.log(result))
  .then(result => res.json(result))
  .catch(err => console.log(err))
});

app.patch('/update-candidate-resume/:id', upload.single('resume'), (req, res) => {
  const uploadedId = req.params.id;
  const newResumeFilename = req.file.filename;

  resume.findOneAndUpdate(
    { id: uploadedId },
    { $set: { file: newResumeFilename } },
    { new: true },
    (err, updatedResume) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!updatedResume) {
        return res.status(404).json({ error: 'Resume not found' });
      }

      console.log('Updated Resume:', updatedResume);

      res.json(updatedResume);
    }
  );
});

app.get('/candidate-resume/:id', (req, res)=>{
  const {id} = req.params;
  resume.findOne({id})
  .then(candidateResume=>res.json(candidateResume))
  .catch(err=>res.json(err))
});

const storageImg = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/images")
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const uploadImg = multer({storage: storageImg})
app.post('/upload-image', employeeAuth, uploadImg.single('image'), (req, res) => {
  const uploadedId = req.body.id; 
  console.log("Uploaded ID:", uploadedId);
  console.log("Uploaded File:", req.file);

  image.create({
    image: req.file.filename,
    id: uploadedId,
  })
  .then((result) => console.log(result))
  .then(result => res.json(result))
  .catch(err => console.log(err)) 
})

app.get('/event-image', (req, res)=>{
  image.find()
  .then(eventImg=>res.json(eventImg))
  .catch(err=>res.json(err))
});

app.get('/event-image/:id', (req, res)=>{
  const {id} = req.params;
  image.findOne({id})
  .then(eventImg=>res.json(eventImg))
  .catch(err=>res.json(err))
});

app.delete('/event-image-delete/:id', employeeAuth, (req, res) => {
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

app.patch('/update-image/:id', employeeAuth, uploadImg.single('image'), (req, res) => {
  const uploadedId = req.params.id;
  const newImageFilename = req.file.filename;

  // Find the existing image by ID
  image.findOneAndUpdate(
    { id: uploadedId },
    { $set: { image: newImageFilename } },
    { new: true },
    (err, updatedImage) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!updatedImage) {
        return res.status(404).json({ error: 'Image not found' });
      }

      console.log('Updated Image:', updatedImage);

      res.json(updatedImage);
    }
  );
});


//candidate profile photohandling
const storageCandidateImg = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/candidate_profile")
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const uploadCandidateImg = multer({storage: storageCandidateImg})
app.post('/upload-candidate-profile-image', employeeAuth, uploadCandidateImg.single('image'), (req, res) => {
  const uploadedId = req.body.id; 
  console.log("Uploaded ID:", uploadedId);
  console.log("Uploaded File:", req.file);

  candidateProfile.create({
    image: req.file.filename,
    id: uploadedId,
  })
  .then((result) => console.log(result))
  .then(result => res.json(result))
  .catch(err => console.log(err)) 
})

app.get('/candidate-image', (req, res)=>{
  candidateProfile.find()
  .then(candidateImg=>res.json(candidateImg))
  .catch(err=>res.json(err))
});

app.get('/candidate-image/:id', (req, res)=>{
  const {id} = req.params;
  candidateProfile.findOne({id})
  .then(candidateImg=>res.json(candidateImg))
  .catch(err=>res.json(err))
});

app.patch('/update-candidate-profile-image/:id', employeeAuth, uploadCandidateImg.single('image'), (req, res) => {
  const uploadedId = req.params.id;
  const newImageFilename = req.file.filename;

  // Find the existing image by ID
  candidateProfile.findOneAndUpdate(
    { id: uploadedId },
    { $set: { image: newImageFilename } },
    { new: true },
    (err, updatedImage) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!updatedImage) {
        return res.status(404).json({ error: 'Image not found' });
      }

      console.log('Updated Image:', updatedImage);

      res.json(updatedImage);
    }
  );
});

//client company profile photohandling
const storageClientImg = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/client_profile")
  },
  filename: function(req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
})

const uploadClientImg = multer({storage: storageClientImg})
app.post('/upload-client-profile-image', employeeAuth, uploadClientImg.single('image'), (req, res) => {
  const uploadedId = req.body.id; 
  console.log("Uploaded ID:", uploadedId);
  console.log("Uploaded File:", req.file);

  clientProfile.create({
    image: req.file.filename,
    id: uploadedId,
  })
  .then((result) => console.log(result))
  .then(result => res.json(result))
  .catch(err => console.log(err)) 
})

app.get('/client-image', (req, res)=>{
  clientProfile.find()
  .then(clientImg=>res.json(clientImg))
  .catch(err=>res.json(err))
});

app.get('/client-image/:id', (req, res)=>{
  const {id} = req.params;
  clientProfile.findOne({id})
  .then(clientImg=>res.json(clientImg))
  .catch(err=>res.json(err))
});

app.patch('/update-client-profile-image/:id', employeeAuth, uploadClientImg.single('image'), (req, res) => {
  const uploadedId = req.params.id;
  const newImageFilename = req.file.filename;

  // Find the existing image by ID
  clientProfile.findOneAndUpdate(
    { id: uploadedId },
    { $set: { image: newImageFilename } },
    { new: true },
    (err, updatedImage) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!updatedImage) {
        return res.status(404).json({ error: 'Image not found' });
      }

      console.log('Updated Image:', updatedImage);

      res.json(updatedImage);
    }
  );
});


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
});
