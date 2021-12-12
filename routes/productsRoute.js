/**
*
* ///////////////////////////
* //Admin routes
* ///////////////////////////
*/

//Dependencies
const express = require("express"); //Express
const products = express.Router();//Router
const ProductsController = require("../controllers/ProductsController.js");//Admin controller
const BaseController = require("../controllers/BaseController.js");
const {formidableMiddleWare} = require("./../helpers/middleWares.js");




function isAuthenticated (req, res, next){
    const base = new BaseController(req);
    if(base.isLoggedIn("users")) next()
    else res.status(404).json({success: false, redirect: "/login"})
}


//Handle log in 
products.post("/", (req, res) => {
   
    const products = new ProductsController(req, res); 
    products.validate()
    .then(() => products.process("login"))
    .then((response) => {
        res.status(200).json({success: true, data: response.data});
    })
    .catch((err) => {
       console.log(err)
       res.status(err.code).json({success: false, message: err.message})
    })
})




//Handle checkout
products.post("/checkout", isAuthenticated, (req, res) => {
    const products = new ProductsController(req, res); 
    products.validate()
    .then(() => products.process("login"))
    .then((response) => {
        res.status(200).json({success: true, data: response.data});
    })
    .catch((err) => {
       console.log(err)
       res.status(err.code).json({success: false, message: err.message})
    })
})




products.get("/discount", (req, res) => {
    const products = new ProductsController(req, res); 
    products.validate()
    .then(() => products.process("login"))
    .then((response) => {
        res.status(200).json({success: true, data: response.data});
    })
    .catch((err) => {
       console.log(err)
       res.status(err.code).json({success: false, message: err.message})
    })
})




products.get("/discount/validate", (req, res) => {
    const products = new ProductsController(req, res); 
    products.validate()
    .then(() => products.process("login"))
    .then((response) => {
        res.status(200).json({success: true, data: response.data});
    })
    .catch((err) => {
       console.log(err)
       res.status(err.code).json({success: false, message: err.message})
    })
})





module.exports = products;