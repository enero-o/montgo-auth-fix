const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ error: 'unauthorize user' });
        }

        //Verify Token
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET_AUTH_SERVICE);
        req.user = userId;

        next();
    } catch (error) {
        let errorMessage;

        switch(error.name){
            case 'TokenExpiredError':
                errorMessage = 'auth expired';
                break;
            case 'JsonWebTokenError':
                errorMessage = 'invalid auth';
                break;
            default:
                errorMessage = 'unauthorize user';
        }
       
        return res.status(401).json({ error: errorMessage });
    }
}

module.exports = { authMiddleware };