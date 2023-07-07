const mongoose = require("mongoose")
 
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true  
    },
    image:[{
        type: String,
        required: true  
    }],
})

const familyModel = mongoose.model("students", studentSchema)

module.exports = familyModel