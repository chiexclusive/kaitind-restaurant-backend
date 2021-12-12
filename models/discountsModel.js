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

const {discounts,} = require("./../schemas/discountsDBSchema.js");


module.exports = class DiscountsModel{



    getDiscountByCoupon(coupon){
         return new Promise((resolve, reject) => {
            discounts.findOne({coupon})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }


    createDiscount(data){
        return new Promise((resolve, reject) => {
            const query = new discounts(data)

            query.save((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }



    fetchDiscounts(){
        return new Promise((resolve, reject) => {
            discounts.find({})
            .sort({dateCreated: -1})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }




    deleteDiscount(id){
        return new Promise((resolve, reject) => {
            discounts.findOneAndDelete({_id: id}, (err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }



    upDateDiscountInUseAll(val){
        return new Promise((resolve, reject) => {
            discounts.updateMany({"inUse": true}, {"$set":{"inUse": val}}, {"multi": true}, (err, writeResult) => {
                if(err) reject(err);
                else resolve(writeResult)
            })
        })
    }



    upDateDiscountInUseOne(id, val){
        return new Promise((resolve, reject) => {
            discounts.findOneAndUpdate({_id: id}, {inUse: val}, {useFindAndModify: false, returnOriginal: false, upsert: true}, (err, writeResult) => {
                if(err) reject(err);
                else resolve(writeResult)
            })
        })
    }



    getDiscountInUse(){
        return new Promise((resolve, reject) => {
            discounts.findOne({inUse: true})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }



     getDiscount(coupon){
        return new Promise((resolve, reject) => {
            discounts.findOne({coupon: coupon})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result);
            })
        })
    }

  



}





