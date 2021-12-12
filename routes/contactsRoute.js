/**
*
* ///////////////////////////
* //Contacts/Bulk Order routes
* ///////////////////////////
*/

//Dependencies
const express = require("express"); //Express
const contacts = express.Router();//Router
const ContactsController = require("../controllers/ContactsController.js");//Contacts Controller





//Handle contacts
contacts.post("/", (req, res) => {
    const contacts = new ContactsController(req); 
    contacts.validate()
    .then(() => contacts.process())
    .then((response) => {
        res.status(200).json({success: true, data: response.data});
    })
    .catch((err) => {
       console.log(err)
       res.status(err.code).json({success: false, message: err.message})
    })
})




//Handle bulk-order
contacts.post("/bulk-order", (req, res) => {
    const contacts = new ContactsController(req); 
    contacts.validate()
    .then(() => contacts.process())
    .then((response) => {
        res.status(200).json({success: true, data: response.data});
    })
    .catch((err) => {
       console.log(err)
       res.status(err.code).json({success: false, message: err.message})
    })
})





module.exports = contacts;