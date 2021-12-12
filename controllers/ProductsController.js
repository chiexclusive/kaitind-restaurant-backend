
//Dependencies
const bcrypt = require("bcrypt"); //Bcrypt
const ProductsModel = require("./../models/ProductsModel.js");//User Database
const UsersModel = require("./../models/UsersModel.js");//User Database
const OrdersModel = require("./../models/OrdersModel.js");//User Database
const fs = require("fs"); //File system
const {cartFetchSchema,} = require("./../schemas/validationSchema.js");
const BaseController = require("./BaseController.js")
const MailController = require("./MailController")
const DiscountsModel = require("./../models/DiscountsModel.js")





class ProductsController extends BaseController {


	constructor (req) {
		super(req);
		this.req = req;
	}


	validate () {
		return new Promise((resolve, reject) => {

			 //Validate user signup data
	        if(this.req._parsedUrl.pathname == "/" && this.req.method  ==  "POST"){
	          cartFetchSchema.validateAsync(this.req.body)
	          .then((res) => {
	          	resolve();
	          })
	          .catch((err) => {
	          	reject({code: 401, message: err.message})
	          })
	        }




	        if(this.req._parsedUrl.pathname == "/checkout" && this.req.method  ==  "POST"){
		        if(!("products" in this.req.body) || (this.req.body.products.length == 0)) reject({code: 401, message: "Incomplete request"})
		        else if(!("selectedAddress" in this.req.body)) reject({code: 401, message: "Incomplete request"});
	      		else if(this.req.body.selectedAddress == "") reject({code: 401, message: "Please select a billing address"});
	         	else resolve();
	        }


	
	        if(this.req._parsedUrl.pathname == "/discount" && this.req.method  ==  "GET"){
		       resolve();
	        }



	        if(this.req._parsedUrl.pathname == "/discount/validate" && this.req.method  ==  "GET"){
		       if("coupon" in this.req.query && this.req.query.coupon !== "") resolve()
		       else reject({code: 401, message: "Please input a valid coupon"});
	        }

		})

	}



	process () {
		return new Promise(async (resolve, reject) => {
			if(this.req._parsedUrl.pathname == "/" && this.req.method  ==  "POST"){
	          const list = JSON.parse(this.req.body.list)
	          const products = new ProductsModel;
	          const result = [];
	          list.map((item, index) => {
	          	products.getOneProduct(item)
	          	.then((res) => {
	          		if(res !== null) result.push(res[0]);
	          		next()

	          	})
	          	.catch((err) => {
	          		console.log(err)
	          	})
	          })


	          const next = () => {
	          	if(result.length == list.length){
	          		resolve({code: 200, data: result})
	          	}
	          }
	        }





	        if(this.req._parsedUrl.pathname == "/checkout" && this.req.method  ==  "POST"){
	        	const products = new ProductsModel();
	        	const users = new UsersModel();
	        	const list = this.req.body.products
	        	const coupon = (this.disCountIsNotExpired(JSON.parse(this.req.body.validCoupon).dateCreated, JSON.parse(this.req.body.validCoupon).expires)) ? JSON.parse(this.req.body.validCoupon): {};
	        	let result = [];
	        	let address = [];
	        	let from, to, html, subject;



	        	try{
	        		address = await users.getAddressById(this.req.session.users.id);
	        		address = address[this.req.body.selectedAddress -1]
	        	}catch(err){
	        		console.log(err)
	        		return;
	        	}


	        	if (typeof address !== 'string') {
				    return reject({code: 400, message: "No Billing Address Found"})
				}




	        	list.map((item, index) => {
		          	products.getOneProduct(item.id)
		          	.then((res) => {
		          		if(res !== null) result.push(res[0]);
		          		next()

		          	})
		          	.catch((err) => {
		          		console.log(err)
		          	})
		        })




		        const next = () => {
		        	

		          	if(result.length == list.length){
		          		result.forEach((item, index) => {
		          			list[index]["data"] = item;
		          		})



			          	let total, charges, grandTotal;
			          	total = 0;
			          	list.forEach((item, index) => {
		          			total = total + (item.data.amount * item.qty);
		          		})

		          		charges = (7/100) *  total;
		          		grandTotal = total + charges;

		          		if(Object.keys(coupon).length > 0) grandTotal = grandTotal - (grandTotal * coupon.discount/100)


		          		let amountInfo  = {
		          			total,
		          			charges,
		          			grandTotal
		          		}



		          		//Start mail service
		          		const mailer = new MailController();

		          		//Send mail to the user
		          		from  = "KAITIND RESTAURANT";
		          		to = this.req.session.users.Email
		          		subject = "NO REPLY (Order Confirmation)"
		          		html = mailer.createOrderMailHTML (list, amountInfo, "user", this.req.session.users, address) 

		          	
		          		// mailer.sendMail(from, to, subject, html)
		          		// .then(() => {

		          		// 	from  = "KAITIND RESTAURANT";
			          	// 	to = process.env.ADMIN_EMAIL;
			          	// 	subject = "NEW ORDER !!!"
			          	// 	html = mailer.createOrderMailHTML (list, amountInfo, "admin", this.req.session.users, address) 
			          	// 	mailer.sendMail(from, to, subject, html)
			          	// 	.then(() => {

			          										
    							const data  = {
    								orders: JSON.stringify(list),
    								userId: this.req.session.users.id,
    								status: "received",
    								billingAddress: address,
    								...amountInfo,
    								FirstName: this.req.session.users.FirstName,
    								LastName: this.req.session.users.LastName,
    								Phone: this.req.session.users.Phone,
    								Email: this.req.session.users.Email,
    								cancelled: false,
    								coupon: JSON.stringify(coupon)
    							};


			          			const order = new OrdersModel();
			          			order.createOrder(data)
			          			.then((res) =>	resolve({code: 200, data: res}))
		          				.catch((err) => {
				          			console.log(err)
				          			reject({code: 500, message: "Server Error!"})
				          		})
			          	// 	})
			          	// 	.catch((err) => {
			          	// 		console.log(err)
			          	// 		reject({code: 500, message: "Server Error!"})
			          	// 	})
		          		// })
		          		// .catch((err) => {
		          		// 	console.log(err)
		          		// 	reject({code: 500, message: "Server Error!"})
		          		// })

		          	}else{

		          	}

		        }
	        }




	        if(this.req._parsedUrl.pathname == "/discount" && this.req.method  ==  "GET"){
		       
	        	const discounts = new DiscountsModel();
	        	var result;
		       try{
                    result = await discounts.getDiscountInUse()
         
                }catch(err){
                    return reject({code: 500, message: err.message})
                }


                if(result === null) return (reject({code: 404, message:"No discount found"}))
                else{
                	if(this.disCountIsNotExpired(result)) resolve({code: 200, data: result})
                	else reject({code: 404, message: "No discount found"})
                }
	        }





	        if(this.req._parsedUrl.pathname == "/discount/validate" && this.req.method  ==  "GET"){
		       const coupon = this.req.query.coupon;

		       const discounts = new DiscountsModel();
	        	var result;

		       try{
                    result = await discounts.getDiscount(coupon)
         
                }catch(err){
                    return reject({code: 500, message: err.message})
                }


                if(result === null) return (reject({code: 404, message:"Invalid Coupon Code"}))
                else{
                	if(this.disCountIsNotExpired(result.dateCreated, result.expires)) resolve({code: 200, data: result})
                	else reject({code: 404, message: "Coupon is Expired"})
                }

	        }












		})
	}




	disCountIsNotExpired(date, expires){
		const created = new Date(date)
		const now = new Date()

		const diff = (Date.parse(now) - Date.parse(created))/1000;

		const left = (diff + expires) / 3600

		if(Math.sign(left) == -1) return false;
		else return true;
	}
}



module.exports = ProductsController;