/**
 * ///////////////////
 * Products schemas
 * //////////////////
 */

 //Dependencies
 const mongoose = require("mongoose"); //Mongoose
 const Schema = mongoose.Schema; //Get the Schema class

 //Design schema
 //Schema for admin
 const productsDBShema = new Schema({
    foodGroup: {
        type: String,
        required: true
    },
    foodGroupCaption: {
        type: String,
        required: true
    },
    foodName: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true,
    },
    calories: {
        type: String, 
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    percentageDiscount: {
        type: Number,
    },
    tags: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    foodImage: {
        type: String, 
        required: true
    },
    isOpen: {
        type: Boolean, 
        required: true
    },
    isBestOffer: {
        type: Boolean,
        required: true
    },
    isCustomizable: {
        type: Boolean,
        required: true
    }
    
 })


 const products = mongoose.model("product", productsDBShema);
 module.exports = {products,}; //Export schema for use


