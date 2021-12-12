/**
 * 
 * 
 * ////////////////////////////
 * Products Models
 * ////////////////////////////
 * 
 * 
 */

//Dependencies

const {products,} = require("./../schemas/productsDBSchema.js");


module.exports = class ProductsModel{
    createProduct(payload){
        return new Promise((resolve, reject) => {
            const model = new products(payload);
            model.save((err, result) => {
                if(err) reject(err)
                else resolve(result)
            })
        })
    }



    getAllProducts(){
        return new Promise((resolve, reject) => {
            products.find({})
            .sort({dateCreated: -1})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }


    updateOneProduct(filter, update){
        console.log(update)
        return new Promise((resolve, reject) => {
            products.findOneAndUpdate(filter, {"$set":update}, {useFindAndModify: false, returnOriginal: true, upsert: true}, (err, result) => {
                if(err) reject(err);
                else resolve(result)
                console.log(result)
            })
        })
    }


    deleteProduct(id){
        return new Promise((resolve, reject) => {
            products.findOneAndDelete({_id: id}, (err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }



    getImageFileNameById(id){
        return new Promise((resolve, reject) => {
            products.findOne({_id: id}, {foodImage: 1, _id: 0}, (err, result) => {
                if(err) reject(err);
                else resolve(result.foodImage)
            })
        })
    }




    getOneProduct(id){
        return new Promise((resolve, reject) => {
            products.find({_id: id})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result);
            })
        })
    }



   

}





