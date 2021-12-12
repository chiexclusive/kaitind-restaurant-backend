/**
 * ///////////////////
 * Orders schemas
 * //////////////////
 */

 //Dependencies
 const mongoose = require("mongoose"); //Mongoose
 const Schema = mongoose.Schema; //Get the Schema class

 //Design schema
 //Schema for admin
 const ordersDBShema = new Schema({
    orders: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    userId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    billingAddress: {
        type: String,
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    charges: {
        type: String,
        required: true,
    },
    grandTotal: {
        type: String,
        required: true,
    },
    FirstName: {
        type: String,
        required: true,
    },
    LastName: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    cancelled: {
        type: Boolean,
        required: true,
    },
    coupon: {
        type: String,
        required: true,
    },
 })


 const orders = mongoose.model("order", ordersDBShema);
 module.exports = {orders,}; //Export schema for use


