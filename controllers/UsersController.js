
//Dependencies
const bcrypt = require("bcrypt"); //Bcrypt
const UsersModel = require("./../models/UsersModel.js");//User Database
const OrdersModel = require("./../models/ordersModel.js");//Orders Database
const fs = require("fs"); //File system
const jwt = require("jsonwebtoken");
const {userRegistrationSchema, userLoginSchema, userBillingAddressSchema} = require("./../schemas/validationSchema.js");
const BaseController = require("./BaseController.js")
const SlideShowModel = require("./../models/slideshowModel.js")





class UsersController extends BaseController {


	constructor (req) {
		super(req);
		this.req = req;
	}


	validate () {
		return new Promise((resolve, reject) => {

			 //Validate user signup data
	        if(this.req._parsedUrl.pathname == "/register"){
	            //do some validation
	            userRegistrationSchema.validateAsync(this.req.body)
	            .then(() => {
	            	resolve();
	            })
	            .catch((err) => {
	            	reject({code: 401, message: err.message})
	            })
	        }



	        //Validate log in
	        if(this.req._parsedUrl.pathname == "/login"){
	            //do some validation
	            userLoginSchema.validateAsync(this.req.body)
	            .then(() => {
	            	resolve();
	            })
	            .catch((err) => {
	            	reject({code: 401, message: err.message})
	            })
	        }




	        //Validate billing address on post
	        if(this.req._parsedUrl.pathname == "/billing-address"  && this.req.method == "POST"){
	            //do some validation
	            userBillingAddressSchema.validateAsync(this.req.body)
	            .then(() => {
	            	resolve();
	            })
	            .catch((err) => {
	            	reject({code: 401, message: err.message})
	            })
	        }




	         //Validate billing address on get
	        if(this.req._parsedUrl.pathname == "/billing-address"  && this.req.method == "GET"){
	            resolve();
	        }



	        //Validate billing address on delete
	        if(this.req._parsedUrl.pathname == "/billing-address"  && this.req.method == "DELETE"){
	            if("index" in this.req.query) resolve();
	            else reject({code: 401, message: "Server required an identifier"})
	        }


	    	//Validate get users order
	        if(this.req._parsedUrl.pathname == "/orders"  && this.req.method == "GET"){
	            resolve();
	        }


	        //Validate get users specific order
	        if(this.req._parsedUrl.pathname == "/orders/details"  && this.req.method == "GET"){
	            if("id" in this.req.query) resolve();
	            else reject({code: 401, message: "Invalid request"})
	        }






            if(this.req._parsedUrl.pathname == "/orders/track" && this.req.method == "GET"){
                if("id" in this.req.query && this.req.query.id !== "" ) resolve()
                else reject({code: 401, message: "Incomplete request"})
            }





            if(this.req._parsedUrl.pathname == "/orders/cancel" && this.req.method == "POST"){
                if("id" in this.req.query && this.req.query.id !== "" ) resolve()
                else reject({code: 401, message: "Incomplete request"})
            }



        	if(this.req._parsedUrl.pathname == "/slideshow" && this.req.method == "GET"){
                resolve();
            }




		})

	}



	process () {
		return new Promise((resolve, reject) => {

			if(this.req._parsedUrl.pathname == "/register"){
				const users = new UsersModel();
	            users.getUserByEmail(this.req.body.Email)
	            .then(async (res) => {
	            	
	            	if(res !== null) return (reject({code: 400, message: "User with this email exist already"}));

	            	var password, passwordSalt;
		          	passwordSalt = await bcrypt.genSalt()
		          	password = await bcrypt.hash(this.req.body.Password, passwordSalt)

	          		this.req.body.Password = password;
	          		this.req.body["billingAddress"] = JSON.stringify([]);
	                users.storeUser(this.req.body)
	                .then(result => resolve({code: 200, message: "User successfully created"}))
	                .catch(err =>  reject({code: 500, message: err.message})); 
	        	}) 
			}





			if(this.req._parsedUrl.pathname == "/login"){
				const users = new UsersModel();
	            users.getUserByEmail(this.req.body.Email)
	            .then(async (res) => {
	            	if(res == null) return (reject({code: 400, message: "Email or Password is incorrect"}));

	            	bcrypt.compare( this.req.body.Password, res.Password, (err, result) => {
	            		if(err)  return (reject({code: 400, message: "Email or Password is incorrect"}));
	            		
	            		if(result === true){
	            			this.setSession("users", {id: res._id, Email: res.Email, Phone: res.Phone, FirstName: res.FirstName, LastName: res.LastName})
	            			.then(() => {
	            				resolve({code: 200, message: "Login Successful. Wait while we redirect you"})
	            			})
	            			.catch((err) => {
	            				reject({code: 500, message: "Unidentified Error. Try Again"})
	            			})
	            		}
	            	})
	        	}) 
			}




			//Validate billing address
	        if(this.req._parsedUrl.pathname == "/billing-address" && this.req.method == "POST"){
	            //do some validation
	           	const id = this.req.session.users.id;
	           	const address = this.req.body.address;
	           	const users = new UsersModel();
	           	users.getAddressById(id)
	           	.then((res) => {
	           		let addresses;
	           		if(res !== null){
	           			addresses = res

	           			addresses.unshift(address)

	           			users.addBillingAddressById(id, JSON.stringify(addresses))
		           		.then((res) => {
		           			resolve({code: 200, message: res})
		           		}) 
		           		.catch((err) => {
		           			resolve({code: 500, message: "Unidenified Error"})
		           		})

	           		}else{
	           			return(reject({code: 401, message:"Unauthorized Request"}))
	           		}



	           		
	           	})
	           	.catch((err) => {
	           		resolve({code: 500, message: "Unidenified Error"})
	           	})
	        }





	        if(this.req._parsedUrl.pathname == "/billing-address"  && this.req.method == "GET"){
	           const users = new UsersModel;
	           const id = this.req.session.users.id
	           users.getAllBillingAddressesById(id)
	           .then((res) => {
	        		if(res == null) resolve({code: 200, data: []})
	        		else{
	        			resolve({code: 200, data: res})
	        		}
	           })
	           .catch((err) => {
	           	console.log(err)
	           	reject({code: 500, message: "Server Error!"})
	           })
	        }




	        if(this.req._parsedUrl.pathname == "/billing-address"  && this.req.method == "DELETE"){
	           const users = new UsersModel;
	           const id = this.req.session.users.id
	           users.getAllBillingAddressesById(id)
	           .then((res) => {
	        		if(res !== null){
	        			let addresses = res;
	        			addresses.splice(this.req.query.index, 1);
	        			users.addBillingAddressById(id, JSON.stringify(addresses))
		           		.then((res) => {
		           			resolve({code: 200, message: res})
		           		}) 
		           		.catch((err) => {
		           			resolve({code: 500, message: "Unidenified Error"})
		           		})
	        		}
	           })
	           .catch((err) => {
	           	console.log(err)
	           	reject({code: 500, message: "Server Error!"})
	           })
	        }




	        if(this.req._parsedUrl.pathname == "/orders"  && this.req.method == "GET"){
	            const orders = new OrdersModel();
	            orders.getAllOrdersByUserId(this.req.session.users.id)
	            .then((res) => resolve({code: 200, data: res}))
	            .catch((err) => reject({code: 404, message: "No orders found for this user"}))
	        }





	        if(this.req._parsedUrl.pathname == "/orders/details"  && this.req.method == "GET"){
	            const id = this.req.query.id;
	            const orders = new OrdersModel();
	            orders.getOrdersByUserIdAndOrderId(this.req.session.users.id, id)
	            .then((res) => resolve({code: 200, data: res}))
	            .catch((err) => reject({code: 401, message: "Invalid request"}))
	        }





	        if(this.req._parsedUrl.pathname == "/orders/track" && this.req.method == "GET"){
                const id = this.req.query.id;

                const orders = new OrdersModel();
                orders.trackOrderId(id)
                .then((res) => resolve({code: 200, data: res}))
                .catch((err) => reject({code: 500, message: "Unidentified error!"}))
            }




            if(this.req._parsedUrl.pathname == "/orders/cancel" && this.req.method == "POST"){
                const id = this.req.query.id;

                //Check if the id is valid and is not cancelled or delivered
                const orders = new OrdersModel();
                orders.getOrdersByUserIdAndOrderId(this.req.session.users.id, id)
                .then((res) => {
                	if(res !== null){
                		if(res.cancelled !== true && res.status !== "delivered"){
                			//Start mail service
			          		const mailer = new MailController();

			          		//Send mail to the user
			          		from  = "KAITIND RESTAURANT";
			          		to = process.env.ADMIN_EMAIL
			          		subject = "CANCEL ORDER REQUEST ("+ id+")";
			          		html = mailer.createCancelOrderMailHTML(id);

			          	
			          		mailer.sendMail(from, to, subject, html)
			          		.then(() => {
			          			 resolve({code: 200, message: "Cancel order send successfully"})
			          		})
			          		.catch(() => reject({code: 500, message: "Unidentified error!"}))

			          		

                		}else  reject({code: 404, message: "The Order has been canelled or delivered already"})
                	}else  reject({code: 404, message: "Order not found"})
                })
                .catch((err) => reject({code: 500, message: "Unidentified error!"}))
            }





            if(this.req._parsedUrl.pathname == "/slideshow" && this.req.method == "GET"){
                var slideshow = new SlideShowModel();
                slideshow.getAllSlides()
                .then((result) => resolve({code: 200, data: result}))
                .catch(() => reject({code: 500, message: "Server Error!"}))
            }




		})
	}
}



module.exports = UsersController;