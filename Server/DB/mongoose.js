const mongoose = require("mongoose");
const chalk = require('chalk')

mongoose.connect("mongodb+srv://Hami:Mohammad1379@cluster0.oaiep.mongodb.net/ScrapingUni?retryWrites=true&w=majority", {
  useNewUrlParser: true,
});
console.log(chalk.magenta('Connect to DataBase'))


