/**
 * ///////////////////
 * Discounts schemas
 * //////////////////
 */

 //Dependencies
 const mongoose = require("mongoose"); //Mongoose
 const Schema = mongoose.Schema; //Get the Schema class



 const discountDBSchema = new Schema({
    coupon: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true,
    },
    expires: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    inUse: {
        type: Boolean,
        required: true
    }
 })





 const discounts = mongoose.model("discount", discountDBSchema);
 module.exports = {discounts,}; //Export schema for use


