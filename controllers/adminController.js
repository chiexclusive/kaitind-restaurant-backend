const {
    adminLoginValidationSchema, 
    adminCreateProductValidationSchema,
    adminUpdateProductValidationSchema ,
    discountsValidationSchema
    }= require("./../schemas/validationSchema.js"); //Validation log in schema

const BaseController = require("./BaseController.js"); //Base controller
const fs = require("fs");
const ProductsModel = require("./../models/ProductsModel.js")
const OrdersModel = require("./../models/ordersModel.js")
const DiscountsModel = require("./../models/discountsModel.js")
const SlideShowModel = require("./../models/slideshowModel.js")


class AdminController extends BaseController{
    constructor(req) {
        super(req);
        this.req =  req;
        this.data = ("body" in req) ? req.body : "";
        this.BASE_PRODUCT_STORAGE_URL = __dirname + "/./../storage/images/products/",
        this.BASE_SLIDESHOW_IMAGES_URL = __dirname + "/./../storage/images/slideshow/"
    }


    validate () {
        return new Promise((resolve, reject) => {
            if(this.req._parsedUrl.pathname == "/login"){
                adminLoginValidationSchema.validateAsync(this.req.body)
                .then((res) => resolve())
                .catch((err) => reject({code: 400, message: err.message}))
            }

            if(this.req._parsedUrl.pathname == "/logout") resolve();

            if(this.req._parsedUrl.pathname == "/products" && this.req.method == "POST"){
                adminCreateProductValidationSchema.validateAsync(this.req.body)
                .then((res) => {
                    if("files" in this.req && Object.keys(this.req.files).length !== 0) resolve();
                    else reject({code: 400, message: "Food image is required"})
                })
                .catch((err) => reject({code: 400, message: err.message}))
            }

            if(this.req._parsedUrl.pathname == "/products" && this.req.method == "GET"){
                resolve();   
            }

            if(this.req._parsedUrl.pathname == "/products" && this.req.method == "PUT"){
                if(!("id" in this.req.query)) return(reject({code: 401, message: "Server expected an identifier"}))
                if("body" in this.req && Object.keys(this.req.body).length !== 0){
                    adminUpdateProductValidationSchema.validateAsync(this.req.body)
                    .then(() => resolve())
                    .catch((err) => reject({code: 400, message: err.message}))
                }

                if("files" in this.req && Object.keys(this.req.files).length !== 0){
                    resolve()
                }
            }



            if(this.req._parsedUrl.pathname == "/products" && this.req.method == "DELETE"){
                console.log(this.req.body);
                if(!("body" in this.req) || Object.keys(this.req.body).length == 0) reject({code: 401, message: "Server expected an identifier"})
                else resolve()
            }


            if(this.req._parsedUrl.pathname == "/orders" && this.req.method == "GET"){
                resolve();
            }


            if(this.req._parsedUrl.pathname == "/orders/status" && this.req.method == "PUT"){
                if("id" in this.req.query && "status" in this.req.query && this.req.query.id !== "" && this.req.query.status !== "") resolve()
                else reject({code: 401, message: "Incomplete request"})
            }




            if(this.req._parsedUrl.pathname == "/orders/cancel" && this.req.method == "PUT"){
                if("id" in this.req.query && this.req.query.id !== "" ) resolve()
                else reject({code: 401, message: "Incomplete request"})
            }


            if(this.req._parsedUrl.pathname == "/discounts" && this.req.method == "POST"){
                discountsValidationSchema.validateAsync(this.req.body)
                .then((res) => resolve())
                .catch((err) => reject({code: 400, message: err.message}))
            }





            if(this.req._parsedUrl.pathname == "/discounts/fetch" && this.req.method == "GET"){
                resolve();
            }




            if(this.req._parsedUrl.pathname == "/discounts" && this.req.method == "DELETE"){
                console.log(this.req.query)
               if("id" in this.req.query && this.req.query.id !== "" ) resolve()
                else reject({code: 401, message: "Incomplete request"})
            }


            if(this.req._parsedUrl.pathname == "/discounts" && this.req.method == "PUT"){
               if("id" in this.req.query && this.req.query.id !== "") resolve()
                else reject({code: 401, message: "Incomplete request"})
            }



            if(this.req._parsedUrl.pathname == "/slideshow" && this.req.method == "POST"){
               if("files" in this.req && Object.keys(this.req.files).length > 0) resolve()
                else reject({code: 401, message: "No Image was selected"})
            }



             if(this.req._parsedUrl.pathname == "/slideshow" && this.req.method == "GET"){
               resolve();
            }



            if(this.req._parsedUrl.pathname == "/slideshow" && this.req.method == "DELETE"){
               if("id" in this.req.query && this.req.query.id !== "") resolve()
                else reject({code: 400, message: "Invalid Request"})
            }




        })
    }




    process () {
        return new Promise( async (resolve, reject) => {
            if(this.req._parsedUrl.pathname == "/login"){
                if(this.isLoggedIn("admin")) reject({code: 401, message: ""})
                else{
                    console.log(this.data.id)
                    if(this.data.id === process.env.ID && this.data.password === process.env.PASSWORD) 
                        this.setSession("admin", this.data).then(() => resolve({code: 200, message: "Login successful"})).catch(() => reject({code: 500, message: ""}))
                    else reject({code: 400, message: "Id or Password is incorrect"})
                }

            }

            if(this.req._parsedUrl.pathname == "/logout"){
                if(!this.isLoggedIn("admin")) return (reject({code: 500, message: "Logout has already been processed"}))
                this.clearSession()
                .then(() => resolve({success: true, message: "Log out successful"}))
                .catch(() => reject({code: 500, message: "Unexpected error"}))
            }

            if(this.req._parsedUrl.pathname == "/products" && this.req.method == "POST"){

                //Store food images
                var file = this.req.files;
                const oldPath = file.productImage.filepath;
                const newPath = this.BASE_PRODUCT_STORAGE_URL + file.productImage.originalFilename;
                fs.rename(oldPath, newPath, (err) => {
                    if(err) reject({code: 500, message: "Unidentified Error"});
                    else{
                        //Store the product information
                        this.data['foodImage'] = file.productImage.originalFilename;
                        this.data['isOpen'] = true;
                        const products = new ProductsModel();
                        products.createProduct(this.data)
                        .then((result) => resolve({code: 201, message: result}))
                        .catch((err) => reject({code: 500, message: err.message}))
                    }
                });

                
            }



            if(this.req._parsedUrl.pathname == "/products" && this.req.method == "GET"){
                const products = new ProductsModel();
                products.getAllProducts()
                .then((result) => resolve({code: 201, data: result}))
                .catch((err) => reject({code: 500, message: err.message}))        
            }


        
            if(this.req._parsedUrl.pathname == "/products" && this.req.method == "PUT"){
                const products = new ProductsModel();
                if("files" in this.req && Object.keys(this.req.files) !== 0){
                    products.getImageFileNameById(this.req.query.id)
                    .then((fileName) => {
                        
                       console.log(fileName)
                        var file = this.req.files;
                        const oldPath = file.productImage.path;
                        const newPath = this.BASE_PRODUCT_STORAGE_URL + file.productImage.name;
                        const filter = {_id: this.req.query.id}
                        const update = {foodImage: file.productImage.name}
                        products.updateOneProduct(filter, update)
                        .then((result) => {
                            fs.rm(this.BASE_PRODUCT_STORAGE_URL+fileName, (err) => {
                                fs.rename(oldPath, newPath, (err) => {
                                    if(!err) resolve({code: 200, message: result})
                                })
                            })

                            console.log(result)
                        })
                        .catch((err) => reject({code: 500, message: err.message}))
                            
        
                    })
                }


                if("body" in this.req && Object.keys(this.req.body).length !== 0){
                    const filter = {_id:this.req.query.id};
                    const update = this.req.body;
                    products.updateOneProduct(filter, update)
                    .then((result) => resolve({code: 200, message: result}))
                    .catch((err) => reject({code: 500, message: err.message}))
                }

            }



            if(this.req._parsedUrl.pathname == "/products" && this.req.method == "DELETE"){
                const list = this.req.body.list;
                let status = []
                const products = new ProductsModel();
                //Delete record
                list.forEach((item, index) => {
                    products.deleteProduct(item)
                    .then((result) => {
                        status.push(result);
                        if(status.length == list.length) resolve({code: 200, message: status})
                    })
                    .catch((err) => reject({code: 500, message: err.message})) 
                })
  
            }





            if(this.req._parsedUrl.pathname == "/orders" && this.req.method == "GET"){
                console.log("i got here")
                const orders = new OrdersModel();
                orders.getAllOrders()
                .then((res) => resolve({code: 200, data: res}))
                .catch((err) => reject({code: 404, message: "No orders found"}))
            }




            if(this.req._parsedUrl.pathname == "/orders/status" && this.req.method == "PUT"){
                const id = this.req.query.id;
                const newStatus = this.req.query.status

                const orders = new OrdersModel();
                const filter = {_id: id};
                const update = {status: newStatus};
                orders.updateOrderById(filter, update)
                .then((res) => resolve({code: 200, data: res}))
                .catch((err) => reject({code: 500, message: "Unidentified error!"}))
            }



             if(this.req._parsedUrl.pathname == "/orders/cancel" && this.req.method == "PUT"){
                //prevent access if status is delivered

                const id = this.req.query.id;
                const orders = new OrdersModel();

                orders.getStatusById(id)
                .then((status) => {
                    if(status !== null && status !== undefined && status !== "delivered"){
                        const filter = {_id: id};
                        const update = {cancelled: true};
                        orders.updateOrderById(filter, update)
                        .then((res) => resolve({code: 200, data: res}))
                        .catch((err) => reject({code: 500, message: "Unidentified error!"}))
                    }else{
                        reject({code: 400, message: "Sever prevent access to the resource"})
                    }
                })
                .catch(() => reject({code: 500, message: "Unidentified error!"}))
            }





            if(this.req._parsedUrl.pathname == "/discounts" && this.req.method == "POST"){
                const coupon = this.req.body.coupon;
                const expires = this.req.body.expires * 60 * 60
                const discount = this.req.body.discount;

                const discounts = new DiscountsModel();

                if(await this.hasCoupon(discounts) === false) {
                    discounts.createDiscount({coupon, expires, discount, inUse: false})
                    .then(result => resolve({code: 200, data: result}))
                    .catch(err =>  reject({code: 500, message: err.message})); 
                }else{
                    reject({code: 500, message: "Discount Coupon Exist Already"});
                }

            }




            if(this.req._parsedUrl.pathname == "/discounts/fetch" && this.req.method == "GET"){
                const discounts = new DiscountsModel();
                discounts.fetchDiscounts()
                .then(result => resolve({code: 200, data: result}))
                .catch(err =>  reject({code: 500, message: err.message})); 
            }




            if(this.req._parsedUrl.pathname == "/discounts" && this.req.method == "DELETE"){
               const id = this.req.query.id;
                const discounts = new DiscountsModel();
                discounts.deleteDiscount(id)
                .then(result => resolve({code: 200, data: result}))
                .catch(err =>  reject({code: 500, message: err.message})); 
            }


            if(this.req._parsedUrl.pathname == "/discounts" && this.req.method == "PUT"){
                const id = this.req.query.id;
                const inUse = true;
                const discounts = new DiscountsModel();
                try{
                    await discounts.upDateDiscountInUseAll(false)
                }catch(err){
                    return reject({code: 500, message: err.message})
                }


                try{
                    const result = await discounts.upDateDiscountInUseOne(id, true)
                    resolve({code: 200, data: result})
                }catch(err){
                    return reject({code: 500, message: err.message})
                }

            }




             if(this.req._parsedUrl.pathname == "/slideshow" && this.req.method == "POST"){
                const length = Object.keys(this.req.files).length;
                var x = 0
                var slideshow = new SlideShowModel();
                for(var file in this.req.files){
                    let item = this.req.files[file]
                    let name = item.originalFilename;
                    name = name.replace(/\s/g, "");
                    let path = item.filepath;
                    var src = this.BASE_SLIDESHOW_IMAGES_URL+name;
                    var list = []

                    const next = (result) => {
                        list.push(result)
                        if(x == length){
                            resolve({code: 200, data: list})
                        }
                    }

                    fs.rename(path, src, (err, res) => {
                        if(err) console.log(err)
                        else{
                            try{
                                src = "/storage/images/slideshow/"+name;
                                slideshow.addSlide({name, src})
                                .then((result) => {
                                    x++
                                    next(result);
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                                
                            }catch(err){
                                console.log(err)

                            }
                        }
                    });
                   
                }

                



            }




            if(this.req._parsedUrl.pathname == "/slideshow" && this.req.method == "GET"){
                var slideshow = new SlideShowModel();
                slideshow.getAllSlides()
                .then((result) => resolve({code: 200, data: result}))
                .catch(() => reject({code: 500, message: "Server Error!"}))
            }




             if(this.req._parsedUrl.pathname == "/slideshow" && this.req.method == "DELETE"){
               const id = this.req.query.id;
               var slideshow = new SlideShowModel();
                slideshow.removeSlideById(id)
                .then((result) => {
                    if(result !== null)
                        fs.unlink(this.BASE_SLIDESHOW_IMAGES_URL+result.name, (err, info) => {
                            if(!err)  resolve({code: 200, data: result})
                            else reject({code: 500, message: "Server Error!"})
                        })

                })
                .catch(() => reject({code: 500, message: "Server Error!"}))

            }


        })
    }



    async hasCoupon(model, coupon){
        var result = true;
        try{
            const res = await model.getDiscountByCoupon(coupon)
            if(res === null) result = false;
            console.log(res)
        }catch(err){
            console.log(err)
        }



        
        console.log(result)


        return result;

    }
}


module.exports = AdminController;