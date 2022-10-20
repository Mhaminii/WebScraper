const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
        title: String ,
        url: String,
        type:String,
        imageUrl:String,
        company: String,
        city: String,
        passedDay: String,
        JobDes: String,
        JobType: String,
        contractType:String,
        Experience: String,
        salary: String,
        skills:[ String ],
        gender: String,
        militaryService: String,
        degree: String,
        expireDay: String,
        deadline: String,
        projectDesc: String,
        budget: String,
});

const listing = mongoose.model("DataListing", listingSchema);
module.exports = listing ;