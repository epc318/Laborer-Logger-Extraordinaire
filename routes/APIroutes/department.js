const dataBase = require("../../db/sqlconnect");

getAllDepartments = () => {
    const sqlDB = `SELECT * FROM department`;
    dataBase.query(sqlDB, (err, result) => {
        if(err)
        throw err;
        if(result.length === 0) {
            console.log("The database contains no departments at this time");
            process.exit();
        }
        else {
            console.table(result);
            process.exit();
        }
    });
};

addDepartment = (name) => {
    const sqlDB = `INSERT INTO department (name) VALUES (?)`;
    const  condition = [name];
    dataBase.query(sqlDB, condition, (err, rows) => {
        if(err)
        throw err;
        console.log("Department successfully added");
        process.exit();
    });
};

removeDepartment = (name) => {
    const sqlDB = `DELETE FROM department WHERE name = ?`;
    dataBase.query(sqlDB, name, (err, result) => {
        if(err)
        throw err;
        console.log("Department successfully removed");
        process.exit();
    })
}

module.exports = { getAllDepartments, addDepartment, removeDepartment };