/**
*
* ///////////////////////////
* //Admin routes
* ///////////////////////////
*/

//Dependencies
const express = require("express"); //Express
const admin = express.Router();//Router
const AdminController = require("../controllers/adminController.js");//Admin controller
const BaseController = require("../controllers/BaseController.js");
const {formidableMiddleWare} = require("./../helpers/middleWares.js");




function isAuthenticated (req, res, next){
    const base = new BaseController(req);
    if(base.isLoggedIn("admin")) next()
    else res.status(404).json({success: false, redirect: "/admin/login"})
    // next();
}



admin.get("/isAuthenticated", (req, res) => {
    // res.status(200).json({success: true})
    const base = new BaseController(req);
    if(base.isLoggedIn("admin")) res.status(200).json({success: true})
    else res.status(404).json({success: false});
})


//Handle log in 
admin.post("/login", (req, res) => {
   
    const admin = new AdminController(req, res); 
    admin.validate()
    .then(() => admin.process("login"))
    .then((response) => {
        console.log(req.session)
        res.status(200).json({success: true, message: response.message});
    })
    .catch((err) => {
       console.log(err)
       res.status(err.code).json({success: false, message: err.message})
    })
})


//Handle log out 
admin.delete("/logout", (req, res) => {
    const admin = new AdminController(req, res); 
    admin.validate()
    .then(() => admin.process("login"))
    .then((response) => {
        res.status(200).json({success: true, message: response.message});
    })
    .catch((err) => {
        res.status(err.code).json({success: false, message: err.message})
    })
})


//Handle manage products

admin.get("/products", (req, res) => {
    const admin = new AdminController(req, res); 
    admin.validate()
    .then(() => admin.process())
    .then((response) => {
        res.status(200).json({success: true, data: response.data});
    })
    .catch((err) => {
        console.log(err)
        res.status(err.code).json({success: false, message: err.message})
    })
})

admin.post("/products", isAuthenticated, formidableMiddleWare, (req, res) => {
    const admin = new AdminController(req, res); 
    admin.validate()
    .then(() => admin.process())
    .then((response) => {
        res.status(200).json({success: true, message: response.message});
    })
    .catch((err) => {
        res.status(err.code).json({success: false, message: err.message})
    })
})


admin.put("/products", isAuthenticated, formidableMiddleWare, (req, res) => {

    const admin = new AdminController(req, res); 
    admin.validate()
    .then(() => admin.process())
    .then((response) => {
        res.status(200).json({success: true, message: response.message});
    })
    .catch((err) => {
        console.log(err)
        res.status(err.code).json({success: false, message: err.message})
    })
})


admin.delete("/products", isAuthenticated, (req, res) => {
    const admin = new AdminController(req, res); 
    admin.validate()
    .then(() => admin.process())
    .then((response) => {
        res.status(200).json({success: true, message: response.message});
    })
    .catch((err) => {
        res.status(err.code).json({success: false, message: err.message})
    })
})


admin.get("/orders",  isAuthenticated, (req, res) => {
    console.log("sdasdad")
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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



admin.put("/orders/status",  isAuthenticated, (req, res) => {
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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



admin.put("/orders/cancel",  isAuthenticated, (req, res) => {
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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



admin.post("/discounts",  isAuthenticated, (req, res) => {
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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





admin.get("/discounts/fetch",  isAuthenticated, (req, res) => {
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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



admin.delete("/discounts",  isAuthenticated, (req, res) => {
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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



admin.put("/discounts",  isAuthenticated, (req, res) => {
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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



admin.post("/slideshow",  isAuthenticated, formidableMiddleWare, (req, res) => {
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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



admin.get("/slideshow",  isAuthenticated, formidableMiddleWare, (req, res) => {
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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



admin.delete("/slideshow",  isAuthenticated, (req, res) => {
    const admin = new AdminController(req);
    admin.validate()
    .then(() => {
        admin.process()
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



module.exports = admin;