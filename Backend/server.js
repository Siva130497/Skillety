const express = require('express');
const bp = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter')
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const resume = require('./Database/resume');
// const cv = require('./Database/cv');
//converting base64 to pdf
// const fs = require('fs');
// const path = require('path');
// const mammoth = require('mammoth'); // For handling Word documents
const http = require('http');
const {Server} = require('socket.io');

app.use(cors());
app.use(morgan("tiny"));
app.use(bp.json());
app.use(cookieParser());
app.use(bp.urlencoded({extended: true}))
app.use('', userRouter);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 3000;

// Connecting our database
mongoose.connect(process.env.DB_CONNECT)
  .then(() => {
    console.log('MongoDB connected...');
  })

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials']
// };

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on('send_message', (data) => {
    console.log(data.message);
    socket.broadcast.emit("receive_message", data);
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
})


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


server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
