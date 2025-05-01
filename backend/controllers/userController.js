const {OAuth2Client} = require('google-auth-library')
const userModal = require('../models/userModal')
const bcrypt = require('bcrypt');

const googleLogin = async(req,res)=>{
    try {
        const oAuth2Client = new OAuth2Client();
        const result = await oAuth2Client.verifyIdToken({
            idToken:req.body.token,
            expectedAudience:process.env.GOOGLE_CLIENT_ID
        });

        const { name, email, picture } = result.getPayload();

        let userData = await userModal.findOne({email:email})

        if(!userData){
            userData = await userModal.create({
                name,
                email,
                password:'dummypass@123',
                profileImage:picture,
            })
        }
        const token = await userData.getToken()

        res.cookie('token',token,{
            httponly:true,
            secure:true,
            maxAge:24 * 60 * 60 * 1000
        })
        
        res.status(200).json({msg:'Successfully login'})
        
    } catch (error) {
        res.status(400).json({msg:'Failed to google login'})
    }
}

const login =async(req,res)=>{
    try {
        const {email,password} = req.body
        const userData = await userModal.findOne({email:email})

        if(!userData){
            res.status(400).json({msg:'Email not register'})
        }

        const checkPassword = await bcrypt.compare(password,userData.password)
        
        if(!checkPassword){
            res.status(400).json({msg:'Password not match'})
        }
        const token = await userData.getToken()

        res.cookie('token',token,{
            httponly:true,
            secure:true,
            maxAge:24 * 60 * 60 * 1000
        })
        res.status(200).json({msg:'Successfully login'})

    } catch (error) {
        res.status(400).json({msg:'Failed to login '+error})
    }
}

const register =async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const checkEmail = await userModal.findOne({email:email})

        if(checkEmail){
            res.status(400).json({msg:'Email Already register'})
        }

        const userData = await userModal.create({
            name,
            email,
            password,
        })

        const token = await userData.getToken()

        res.cookie('token',token,{
            httponly:true,
            secure:true,
            maxAge:24 * 60 * 60 * 1000
        })
        res.status(200).json({msg:'Successfully Register'})

    } catch (error) {
        res.status(400).json({msg:'Failed to Register '+error})
    }
}

module.exports = {googleLogin,login,register}