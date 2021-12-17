/**
 *
 * ////////////////////
 * Base server
 * ////////////////////
 *
 */

//Variables
const port = process.env.PORT || 8000;

//Establish environment
require("dotenv").config();

//Dependencies
const express = require("express"); //express
const app = express(); //app
const admin = require("./routes/adminRoute.js"); //Admin 
const users = require("./routes/usersRoute.js"); //Users 
const contacts = require("./routes/contactsRoute.js"); //Contacts
const products = require("./routes/productsRoute.js") //Products route
const cors = require ("cors"); //Cross Site Resource Sharing
const db = require ("./helpers/dbConnection.js"); //Get data base connection from helpers
const session = require("express-session"); //Session



db.connect(); //Start db connection


//Use cors for react connections
app.use(cors({
	origin: process.env.FRONT_END,
	optionsSuccessStatus: 200,
	credentials: true
}));


const TWO_DAYS = 2 * 1000 * 60 * 60 * 24 //Duration in milliseconds
app.use(session({
    secret: "process.env.SESSION_SECRET", 
    saveUninitialized: false,
    cookie: {maxAge: TWO_DAYS, secure: false, httpOnly: false},
    resave: true,
})) 



//Uses json parser
app.use(express.json());


app.get("/", (req, res) => {
	res.send("Kaitind")
})

//Expose front end storage
app.use("/storage", express.static("storage"))


//Admin router
app.use("/admin", admin);

 
//Users router
app.use("/users", users);


//Users router
app.use("/products", products);


//Contacts router
app.use("/contacts", contacts);



//Start server
app.listen(port, () => console.log(`Server started  at port ${port}`));
