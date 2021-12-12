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

const {orders,} = require("./../schemas/ordersDBSchema.js");


module.exports = class OrdersModel{


    createOrder(data){
        return new Promise((resolve, reject) => {
            const query = new orders(data)

            query.save((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }




    getAllOrdersByUserId(id){
        return new Promise((resolve, reject) => {
            orders.find({userId: id})
            .sort({dateCreated: -1})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }




    getOrdersByUserIdAndOrderId(userId, orderId){
         return new Promise((resolve, reject) => {
            orders.findOne({userId: userId, _id: orderId})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }


    getAllOrders(){
        return new Promise((resolve, reject) => {
            orders.find({})
            .sort({dateCreated: -1})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }




    updateOrderById(filter, update){
        return new Promise((resolve, reject) => {
            orders.findOneAndUpdate(filter, update, {useFindAndModify: false, returnOriginal: false, upsert: true}, (err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }




    getStatusById(id){
        return new Promise((resolve, reject) => {
            orders.findOne({_id: id})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result.status)
            })
        })
    }




    trackOrderId(id){
        return new Promise((resolve, reject) => {
            orders.findOne({_id: id})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve({status: result.status, cancelled: result.cancelled})
            })
        })
    }



}





