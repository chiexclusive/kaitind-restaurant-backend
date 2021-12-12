/**
 * ///////////////////
 * Slide show schemas
 * //////////////////
 */

 //Dependencies
 const mongoose = require("mongoose"); //Mongoose
 const Schema = mongoose.Schema; //Get the Schema class



 const slideshowDBSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true,
    },

 })





 const slideshow = mongoose.model("slideshow", slideshowDBSchema);
 module.exports = {slideshow,}; //Export schema for use


