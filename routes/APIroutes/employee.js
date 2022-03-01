const dataBase = require("../../db/sqlconnect");

//function to get all existing Employees in Database
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

//function to add employees to Database
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

//function to remove employees from Database
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