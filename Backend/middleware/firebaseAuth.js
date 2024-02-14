const admin = require('../config/firebase-config');

const firebaseAuth = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];

        try {
            if (!token) {
                return res.status(401).json({
                    message: "User is not authorized or token is missing"
                });
            }
            
            const decodeValue = await admin.auth().verifyIdToken(token);
            
            if (decodeValue) {
                req.user = decodeValue;
                next();
            } else {
                return res.status(401).json({
                    message: "User is not authorized"
                });
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json({
                message: "Internal Server Error"
            });
        }
    } else {
        return res.status(403).json({
            message: "Please provide valid auth token"
        });
    }
}

module.exports = firebaseAuth;
