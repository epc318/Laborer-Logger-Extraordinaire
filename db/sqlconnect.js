const sql = require("mysql2");

//sql Database connection and parameters
const dataBase = sql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "Notverycashmoney318!",
        database: "laborer_logger"
    },
    console.log("The Connection Attempt to Laborer Logger was successful!")
);

module.exports = dataBase;