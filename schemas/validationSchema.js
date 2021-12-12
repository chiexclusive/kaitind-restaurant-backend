/**
 * 
 * /////////////////////
 * Handle user route validation
 * //////////////////////
 * 
 */

 //Dependencies
const Joi = require("joi"); //Joi


/**
 * Define schema
 */
const adminLoginValidationSchema = Joi.object({
    id: Joi.string().lowercase().required(),
    password: Joi.string().required()
})


const adminCreateProductValidationSchema = Joi.object({
    foodGroup : Joi.string().lowercase().required(),
    foodGroupCaption: Joi.string().lowercase(),
    foodName : Joi.string().lowercase().required(),
    foodType: Joi.string().lowercase(), 
    calories : Joi.string(),
    amount: Joi.number().required(),
    isOpen: Joi.boolean(),
    isBestOffer: Joi.boolean().required(),
    isCustomizable: Joi.boolean().required(),
    percentageDiscount : Joi.string(),
    tags : Joi.string(),

})


const adminUpdateProductValidationSchema = Joi.object({
    foodGroup : Joi.string().lowercase(),
    foodGroupCaption: Joi.string().lowercase(),
    foodName : Joi.string().lowercase(),
    foodType: Joi.string().lowercase(), 
    calories : Joi.string(),
    tags : Joi.string(),
    isOpen: Joi.boolean(),
    isBestOffer: Joi.boolean(),
    isCustomizable: Joi.boolean(),
    amount: Joi.number(),
    percentageDiscount : Joi.number(),
})




const userRegistrationSchema = Joi.object({
    FirstName : Joi.string().lowercase().required(),
    LastName : Joi.string().lowercase().required(),
    Email : Joi.string().email().lowercase().required(),
    Phone : Joi.number().required(),
    Password: Joi.string().min(6).required()  
})


const userLoginSchema = Joi.object({
    Email : Joi.string().email().lowercase().required(),
    Password: Joi.string().required()  
})


const userBillingAddressSchema = Joi.object({
    address : Joi.string().lowercase().required(),
})


const cartFetchSchema = Joi.object({
    list : Joi.string().required(),
})


const contactsValidationSchema = Joi.object({
    email : Joi.string().email().lowercase().required(),
    message : Joi.string().required(), 
    subject : Joi.string().required()
})



const bulkOrderValidationSchema = Joi.object({
    email : Joi.string().email().lowercase().required(),
    query : Joi.string().required(), 
    name : Joi.string().required(),
    phone: Joi.number().required()
})



const discountsValidationSchema = Joi.object({
    coupon : Joi.string().lowercase().required(),
    discount : Joi.number().required(), 
    expires : Joi.number().required(),
})




module.exports = {
    adminLoginValidationSchema,
    adminCreateProductValidationSchema,
    adminUpdateProductValidationSchema,
    userRegistrationSchema,
    userLoginSchema,
    userBillingAddressSchema,
    cartFetchSchema,
    contactsValidationSchema,
    bulkOrderValidationSchema,
    discountsValidationSchema
}//Export schemas
