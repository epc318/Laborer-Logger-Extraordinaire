const dataBase = require("../../db/sqlconnect");

//function to get all existing Roles in Database
getAllRoles = () => {
    const sqlDB = `SELECT role.title, role.id, role.salary, department.name AS department
                 FROM role
                 LEFT JOIN department ON role.department_id = department.id`
                 dataBase.query(sqlDB, (err, result) => {
        if(err)
        throw err;
        if(result.length === 0) {
            console.log("The database contains no roles at this time");
        }
        else {
            console.table(result);
        }
        process.exit();
    });
};

//function to add roles to Database
addRole = (title, salary, department_id) => {
    const sqlDB = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
    const condition  = [title, salary, department_id];
    dataBase.query(sqlDB, condition, (err, rows) => {
        if(err)
        throw err;
        console.log("Role successfully added");
        process.exit();
    });
};

//function to remove employees from Database
removeRole = (title) => {
    const sqlDB = `DELETE FROM role WHERE title = ?`;
    dataBase.query(sqlDB, title, (err, result) => {
        if(err)
        throw err;
        console.log("Role successfully removed");
        process.exit();
    })
}

module.exports = { getAllRoles, addRole, removeRole };