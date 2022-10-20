const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
        Title: String ,
        url: String,
        site : String,
        Description : String,
        ImageUrl:String,
        Price: String,
        InternalMemory: String,
        Ram: String,
        DisplaySize: String,
        MobileNetwok: String,
        CameraReso: String,
        Battery: String
});

const product = mongoose.model("product", productSchema);
module.exports = product ;