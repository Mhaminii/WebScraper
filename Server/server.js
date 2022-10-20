const app = require("./app");
require('./DB/mongoose')
const dotenv= require('dotenv')
const chalk = require('chalk')

//setting up config file 
dotenv.config({ path:'config/config.env' })

app.listen(process.env.PORT, () => {
  console.log(chalk.blue("server is up on port :" + process.env.PORT ,"in",process.env.NODE_ENV,'mode. '));
});
