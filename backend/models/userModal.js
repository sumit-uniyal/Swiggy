const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    },
    profileImage:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{minimize:false})

userSchema.pre('save', async function(){
    try {
        const salt = await bcrypt.genSalt(10);
        return this.password = await bcrypt.hash(this.password,salt)
    } catch (error) {
        console.log('Error in encrypting password')
    }
})

userSchema.methods.getToken = async function(){
    try {
        return token = jwt.sign({ 
            user_id: this._id,
            email:this.email,
            isAdmin:this.isAdmin
         }, process.env.JWT_TOKEN_KEY);

    } catch (error) {
        console.log('Error in genrating token')
    }
}

const userModal = model('user',userSchema)

module.exports = userModal