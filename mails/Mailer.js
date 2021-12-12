//////////////////////////////////
/*
/*
/* Mailer class
/*
/*////////////////////////////////


//Dependencies
const nodemailer = require("nodemailer")

class Mailer {



	constructor () {
		this.setConfig();
	}



	setConfig () {
		this.transporter = nodemailer.createTransport({
								service: process.env.SERVICE,
								auth: {
									user: process.env.AUTH_USER,
									pass: process.env.AUTH_PASSWORD
								}
							})
	}



	bind(from, to, subject, html){
		this.payload = {
			from,
			to, 
			subject,
			html
		}
	}



	send(){
		return new Promise((resolve, reject) => {
			this.transporter.sendMail(this.payload, (err, info) => {
				if(err) reject(err)
				else resolve(info)
			})
		})
	}
}



module.exports = Mailer;