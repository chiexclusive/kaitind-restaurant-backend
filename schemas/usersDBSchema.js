/**
 * ///////////////////
 * Users schemas
 * //////////////////
 */

 //Dependencies
 const mongoose = require("mongoose"); //Mongoose
 const Schema = mongoose.Schema; //Get the Schema class

 //Design schema
 //Schema for admin
 const usersDBShema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone: {
        type: Number,
        required: true,
    },
    Password: {
        type: String, 
        required: true,
    },
    billingAddress: {
        type: String,
        required: false,
    }
 })


 const users = mongoose.model("user", usersDBShema);
 module.exports = {users,}; //Export schema for use


