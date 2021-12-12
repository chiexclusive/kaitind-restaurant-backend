
const Mailer = require("./../mails/Mailer.js")
const fs = require("fs")



class MailController {





/**
	* @return {String | HTML}
	*/
	// {
	// 	id: {
	// 		data: {all product information optained from  db}
	// 		qty: 2,

	// 	}
	// }
	// /from, to, subject, html //Mail options
	createOrderMailHTML (products, amount, who, user, address) {

		let template, orders, html
		const map = {
			admin: "adminOrderMail",
			user: "customerOrderMail"
		}

		const url = __dirname+"/../mails/mail-views/"+map[who]+".html"
		//Get html template
		try{
			template = fs.readFileSync(url, "utf-8");
		}catch(err){
			console.log(err)
		}


		//Cook the orders
		orders = "";
		products.forEach((item, index) => {
			orders = orders + `
				<li style = "padding: 20px;">
					<div style = "display: flex; justify-content: space-between;">
						<div>${item.data.foodName}</div>
						<div><span>${item.data.amount}</span></div>
					</div>
					<div style = "font-size: 10px; color: grey;">${item.data.foodGroup}</div>
					<span>Qty: ${item.qty}</span>
				</li>
				<hr style = "padding: 0px; margin: 0px; border: 1px solid #e1e1e1;" />
			`
		})


		orders = orders + `
			<div style = "padding-left: 20px; padding-right: 20px; display: flex; justify-content: space-between;">
				<h4>Sub Total</h4>
				<h4>${amount.total}</h4>
			</div>
			<div style = "padding-left: 20px; padding-right: 20px;  display: flex; justify-content: space-between;">
				<h4>Vat Charges</h4>
				<h4>${amount.charges}</h4>
			</div>
			<div style = "padding-left: 20px; padding-right: 20px; display: flex; justify-content: space-between;">
				<h3>GRAND TOTAL</h3>
				<h3>${amount.grandTotal}</h3>
			</div>


		`

		html = template;


		//Add user name
		html = html.replace("clientName", (who == "admin")? user.FirstName: (user.FirstName +" "+user.LastName));

		//Add customer orders
		html = html.replace("clientOrders", orders);

		//Add billing address
		html = html.replace("billingAddress", address);

		//Add phone number
		html = html.replace("phoneNumber", user.Phone);

		//Add Email number
		html = html.replace("emailAddress", user.Email);


		return html;

	}






	createCancelOrderMailHTML (id) {
		let template, html;

		const url =  __dirname+"/../mails/mail-views/cancelOrderMail.html";
		//Get html template
		try{
			template = fs.readFileSync(url, "utf-8");
		}catch{

		}


		//Add user name
		html = html.replace("/order-id/g", id);

		return html;



	}





	createContactMailHTML (subject, message) {

		let template, orders, html;

		const url = __dirname+ "/../mails/mail-views/contactMail.html"
		//Get html template
		try{
			template = fs.readFileSync(url, "utf-8");
		}catch{

		}


		html = template;


		//Add message

		html = html.replace("/message/g", message);
		html = html.replace("/subject/g", subject);


		return html;
	}





	createBulkOrderMailHTML(email, query, name, phone) {
		let template, orders, html;

		const url = __dirname+ "/../mails/mail-views/bulkOrderMail.html"
		//Get html template
		try{
			template = fs.readFileSync(url, "utf-8");
		}catch{

		}


		html = template;


		//Add message

		html = html.replace("/customer-query/g", query);
		html = html.replace("/customer-email/g", email);
		html = html.replace("/customer-phone/g", phone);
		html = html.replace("/customer-name/g", name);



		return html;
	}




	sendMail(...args){
		return new Promise((resolve, reject) => {
			const mailer = new Mailer();
			mailer.bind(...args)
			mailer.send()
			.then((res) => resolve(res))
			.catch((err) => reject(err))
		})
	}


}



module.exports = MailController;