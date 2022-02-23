const dataBase = require("./db/connection");
const inquire = require("inquirer");


dataBase.connect(err => {
    if(err)
    throw err;
});