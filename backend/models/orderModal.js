const  {model, Schema} = require('mongoose')

const orderModal = new Schema ({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:'Processing'
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:Boolean,
        default:false
    }
})

const order = model('order',orderModal)

module.exports = order