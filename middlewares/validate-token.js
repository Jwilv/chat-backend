const jwt = require('jsonwebtoken')

const validateToken = (req, res, next)=>{

    try {
        
        const token = req.header('x-token');

        if(!token){
            return res.status(401).json({
                ok:false,
                msg:'no token in request'
            })
        }

        const {uid}= jwt.verify( token, process.env.JWT_KEY);
        req.id = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok:false,
            msg:'invalid token'
        })
    }
}

module.exports = {
    validateToken
}