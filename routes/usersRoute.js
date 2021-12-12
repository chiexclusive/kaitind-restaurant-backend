/**
*
* ///////////////////////////
* //Users routes
* ///////////////////////////
*/

//Dependencies
const express = require("express"); //Express
const users = express.Router();//Router
const UsersController = require("../controllers/UsersController.js");//Admin controller
const BaseController = require("../controllers/BaseController.js");
const {formidableMiddleWare} = require("./../helpers/middleWares.js");



function isAuthenticated (req, res, next){
    const base = new BaseController(req);
    if(base.isLoggedIn("users")) next()
    else res.status(404).json({success: false, redirect: "/login"})
}





users.post("/register", (req, res) => {

    const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, message: response.message})
        })
        .catch((err) => {
            console.log(err)
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        res.status(err.code).json({success: false, message: err.message})
    })
})




users.post("/login", (req, res) => {

    const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, message: response.message})
        })
        .catch((err) => {
            console.log(err)
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        res.status(err.code).json({success: false, message: err.message})
    })
})




users.put("/logout", (req, res) => {

    const base = new BaseController();
    base.clearSession()
    .then(() => res.status(200).json({success: true, message: "Logout Successful."}))
    .catch(() => res.status(404).json({success: false, message: "No user session found"}))
})




users.get("/isAuthenticated", (req, res) => {
    const base = new BaseController(req);
    if(base.isLoggedIn("users")) res.status(200).json({success: true})
    else res.status(404).json({success: false});
})



users.post("/billing-address", isAuthenticated, (req, res) => {
     const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, message: response.message})
        })
        .catch((err) => {
            console.log(err)
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(err.code).json({success: false, message: err.message})
    })
})



users.get("/billing-address", isAuthenticated, (req, res) => {
     const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, message: response.data})
        })
        .catch((err) => {
            console.log(err)
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        res.status(err.code).json({success: false, message: err.message})
    })
})



users.delete("/billing-address", isAuthenticated, (req, res) => {
     const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, message: response.data})
        })
        .catch((err) => {
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        res.status(err.code).json({success: false, message: err.message})
    })
})




users.get("/orders", isAuthenticated, (req, res) => {
     const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, data: response.data})
        })
        .catch((err) => {
            console.log(err)
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(err.code).json({success: false, message: err.message})
    })
})



users.get("/orders/details", isAuthenticated, (req, res) => {
     const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, data: response.data})
        })
        .catch((err) => {
            console.log(err)
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(err.code).json({success: false, message: err.message})
    })
})




users.get("/orders/track", (req, res) => {
     const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, data: response.data})
        })
        .catch((err) => {
            console.log(err)
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(err.code).json({success: false, message: err.message})
    })
})


users.post("/orders/cancel", isAuthenticated, (req, res) => {
     const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, data: response.data})
        })
        .catch((err) => {
            console.log(err)
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(err.code).json({success: false, message: err.message})
    })
})



users.get("/get-user", (req, res) => {
    if("session" in req && "users" in req.session) res.status(200).json({success: true, data: req.session.users})
    else res.status(404).json({success: false, message: "No user is logged in"})
})




users.get("/slideshow", (req, res) => {
     const users = new UsersController(req);
    users.validate()
    .then(() => {
        users.process()
        .then((response) => {
            res.status(200).json({success: true, data: response.data})
        })
        .catch((err) => {
            console.log(err)
            res.status(err.code).json({success: false, message: err.message})
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(err.code).json({success: false, message: err.message})
    })
})




module.exports = users;