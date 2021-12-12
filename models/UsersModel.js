/**
 * 
 * 
 * ////////////////////////////
 * Users Models
 * ////////////////////////////
 * 
 * 
 */

//Dependencies

const {users,} = require("./../schemas/usersDBSchema.js");


module.exports = class ProductsModel{
    getUserByEmail(email){
        return new Promise((resolve, reject) => {
            users.findOne({Email: email})
            .exec((err, res) => {
                if(err) reject(err)
                else resolve(res)
            })
        })
    }


    storeUser(data){
        return new Promise((resolve, reject) => {
            const query = new users(data)

            query.save((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }


    getAddressById(id){
        return new Promise((resolve, reject) => {
            users.findOne({_id: id})
            .exec((err, res) => {
                if(err) reject(err)
                else{
                    if(res !== null) resolve(JSON.parse(res.billingAddress))
                    else resolve(null);
                }
            })
        })
    }


    addBillingAddressById(id, addresses){
        console.log(addresses)
        return new Promise((resolve, reject) => {
            users.findOneAndUpdate({_id: id}, {billingAddress: addresses}, {useFindAndModify: false, returnOriginal: false, upsert: true}, (err, data) => {
                if(err) reject(err);
                else resolve(data)
            })
        })
    }



    getAllBillingAddressesById(id){
        return new Promise((resolve, reject) => {
            users.findOne({_id: id})
            .exec((err, result) => {
                if(err) return (reject(err))

                if(result == null) resolve(null)
                else resolve(JSON.parse(result.billingAddress))
            })
        })
    }

}





