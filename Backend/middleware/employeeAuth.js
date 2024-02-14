const jwt =require("jsonwebtoken");
const admin = require('../config/firebase-config');

// const employeeAuth =   (req, res, next) => {
//     let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     if(authHeader && authHeader.startsWith("Bearer")){
//         token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
//             if (err){
//                 return res.status(401).json({
//                     message: "User is not authorized"
//                   });
//             }
//             req.user = decoded;
//             next();
//         })
//         if(!token){
//             return res.status(401).json({
//                 message: "User is not authorized or token is missing"
//               });
//         }
//     } else {
//         return res.status(403).json({
//             message: "Please give authHeader"
//           });
//     }
//   }

//   module.exports = employeeAuth;

const employeeAuth = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader) {
        return res.status(403).json({
            message: "Please provide an auth token"
        });
    }

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.substring(7); // Remove "Bearer " prefix

        // Check if it's a Firebase token
        if (token.startsWith("firebase:")) {
            try {
                const decodeValue = await admin.auth().verifyIdToken(token.substring(9)); // Remove "firebase:" prefix
                req.user = decodeValue;
                next();
            } catch (e) {
                console.error(e);
                return res.status(401).json({
                    message: "Invalid Firebase token"
                });
            }
        } else {
            // Assume it's a JWT token
            jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: "Invalid JWT token"
                    });
                }
                req.user = decoded;
                next();
            });
        }
    } else {
        return res.status(403).json({
            message: "Invalid auth token format"
        });
    }
};

module.exports = employeeAuth;