const {contactsValidationSchema, bulkOrderValidationSchema}= require("./../schemas/validationSchema.js"); //Validation log in schema
const MailController = require("./MailController")


class ContactsController{
    constructor(req) {;
        this.req =  req;
    }


    validate () {
        return new Promise((resolve, reject) => {
            if(this.req._parsedUrl.pathname == "/"){
                contactsValidationSchema.validateAsync(this.req.body)
                .then((res) => resolve())
                .catch((err) => reject({code: 400, message: err.message}))
            }




            if(this.req._parsedUrl.pathname == "/bulk-order"){
                bulkOrderValidationSchema.validateAsync(this.req.body)
                .then((res) => {resolve()})
                .catch((err) => reject({code: 400, message: err.message}))
            }



        })
    }




    process () {
        return new Promise((resolve, reject) => {
         	if(this.req._parsedUrl.pathname == "/"){
         		const email = this.req.body.email;
         		const message = this.req.body.message;
         		let subject = this.req.body.subject;


         		//Start mail service
          		const mailer = new MailController();

          		//Send mail to the user
          		let from, to, html;
          		from  = email;
          		to = process.env.ADMIN_EMAIL
          		subject = subject.toString().toUpperCase;
          		html = mailer.createContactMailHTML (subject, message) 

          	
          		mailer.sendMail(from, to, subject, html)
          		.then((res) =>	resolve({code: 200, message:"Contact have been sent successfully."}))
  				.catch((err) => {
          			console.log(err)
          			reject({code: 500, message: "Server Error!"})
          		})
            }



            if(this.req._parsedUrl.pathname == "/bulk-order"){
         		const email = this.req.body.email;
         		const query = this.req.body.query;
         		const  name = this.req.body.name;
         		const phone = this.req.body.phone;


         		//Start mail service
          		const mailer = new MailController();

          		//Send mail to the user
          		let from, to, subject, html;
          		from  = email;
          		to = process.env.ADMIN_EMAIL
          		subject = "NEW BULK ORDER REQUEST"
          		html = mailer.createBulkOrderMailHTML(email, query, name, phone) 

          	
          		mailer.sendMail(from, to, subject, html)
          		.then((res) =>	resolve({code: 200, message:"Bulk Order have been sent successfully."}))
  				.catch((err) => {
          			console.log(err)
          			reject({code: 500, message: "Server Error!"})
          		})
            }
        })
    }
}


module.exports = ContactsController;