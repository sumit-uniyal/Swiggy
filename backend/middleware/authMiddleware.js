const jwt = require('jsonwebtoken')

const authMiddleware = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({msg:'Unauthorized: No token'})
        }
        const token_decode = jwt.verify(token, process.env.JWT_TOKEN_KEY)
        req.user = { userId: token_decode.user_id }

        next();
    } catch (error) {
        return res.status(401).json({msg:'Unauthorized: Invalid token '+error})
    }
}

module.exports = authMiddleware