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

const {slideshow,} = require("./../schemas/slideshowDBSchema.js");


module.exports = class SlideShowModel{



    addSlide({name, src}){
        return new Promise((resolve, reject) => {
            const model = new slideshow({name: name, src: src});
            model.save((err, result) => {
                if(err) reject(err)
                else resolve(result)
            })
        })
    }




    getAllSlides(){
        return new Promise((resolve, reject) => {
            slideshow.find({})
            .sort({_id: -1})
            .exec((err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }





    removeSlideById(id){
        return new Promise((resolve, reject) => {
            slideshow.findOneAndDelete({_id: id}, (err, result) => {
                if(err) reject(err);
                else resolve(result)
            })
        })
    }



    // createProduct(payload){
    //     return new Promise((resolve, reject) => {
    //         const model = new products(payload);
    //         model.save((err, result) => {
    //             if(err) reject(err)
    //             else resolve(result)
    //         })
    //     })
    // }



    // getAllProducts(){
    //     return new Promise((resolve, reject) => {
    //         products.find({})
    //         .sort({dateCreated: -1})
    //         .exec((err, result) => {
    //             if(err) reject(err);
    //             else resolve(result)
    //         })
    //     })
    // }


    // updateOneProduct(filter, update){
    //     return new Promise((resolve, reject) => {
    //         products.findOneAndUpdate(filter, update, {useFindAndModify: false, returnOriginal: false, upsert: true}, (err, result) => {
    //             if(err) reject(err);
    //             else resolve(result)
    //         })
    //     })
    // }


    // deleteProduct(id){
    //     return new Promise((resolve, reject) => {
    //         products.findOneAndDelete({_id: id}, (err, result) => {
    //             if(err) reject(err);
    //             else resolve(result)
    //         })
    //     })
    // }



    // getImageFileNameById(id){
    //     return new Promise((resolve, reject) => {
    //         products.findOne({_id: id}, {foodImage: 1, _id: 0}, (err, result) => {
    //             if(err) reject(err);
    //             else resolve(result.foodImage)
    //         })
    //     })
    // }




    // getOneProduct(id){
    //     return new Promise((resolve, reject) => {
    //         products.find({_id: id})
    //         .exec((err, result) => {
    //             if(err) reject(err);
    //             else resolve(result);
    //         })
    //     })
    // }



   

}





