const mongoose = require('mongoose')

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
    } catch (error) {
        console.log('Error in Connection DB '+ error)
    }
}

module.exports = dbConnection