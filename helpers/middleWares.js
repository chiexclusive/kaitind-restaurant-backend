
//dependencies
const formidable = require("formidable")


function formidableMiddleWare(req, res, next){
    const form = new formidable.IncomingForm();
    form.on("error", (error) => console.log(error))
    form.on("aborted", () => console.log("Form was aborted"))
    form.parse(req, (err, fields, files) => {
        if(!err){
            console.log(files)
            if(Object.keys(fields).length !== 0) req["body"] = fields;
            if(Object.keys(files).length !== 0) req["files"] = files;
            next();
        }
    })

}


module.exports  = {
    formidableMiddleWare,
}