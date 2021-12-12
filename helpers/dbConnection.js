/**
 * 
 * ///////////////////////////
 * Data base connection module
 * //////////////////////////
 * 
 */

 //dependencies
 const mongoose = require("mongoose"); //Expose mongoose

class DBConnection {

    constructor() {
        this.db_url = process.env.DB_URL;
        this.config = {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    }

    connect () {
        mongoose.connect(this.db_url.toString(), this.config, (err) => {
             if(err) console.log(err.message) //Log this later
             else console.log("Successfully connected to data base");
        })

        const db = mongoose.connection
        db.on("error", console.error.bind(console, "Mongo db error:"))
    }
}


module.exports = new DBConnection();