const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        maxLength: 200, 
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        maxLength: 200, 
        trim: true
    },
    message: {
        type: String, 
        required: true, 
        maxLength: 3000, 
        trim: true
    },
    ip: {
        type: String
    },
    userAgent: {
        type: String
    }
}, {timestamps:true});
module.exports = mongoose.model("Contact", contactSchema);