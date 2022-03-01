const dataBase = require("../../db/sqlconnect");

getAllEmployees = () => {
    const sqlDB = `SELECT * FROM employee`;
                 dataBase.query(sqlDB, (err, result) => {
        if(err)
        throw err;
        if(result.length === 0) {
            console.log("The database contains no employees at this time");
        }
        else {
            console.table(result);
        }
        process.exit();
    });
};

addEmployee = (first_name, last_name, role_id) => {
    const sqlDB = `INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)`;
    const condition  = [first_name, last_name, role_id];
    dataBase.query(sqlDB, condition, (err, rows) => {
        if(err)
        throw err;
        console.log("Employee successfully added");
        process.exit();
    });
};

removeEmployee = (id) => {
    const sqlDB = `DELETE FROM employee WHERE id = ?`;
    dataBase.query(sqlDB, id, (err, result) => {
        if(err)
        throw err;
        console.log("Employee successfully removed");
        process.exit();
    })
}

module.exports = { getAllEmployees, addEmployee, removeEmployee };