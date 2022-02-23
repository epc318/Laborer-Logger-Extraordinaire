const dataBase = require("../../db/sqlconnect");

getAllEmployees = () => {
    const sqlDB = `SELECT emp.id, emp.first_name, emp.last_name,
                 role.title AS current_role, role.salary AS current_salary,
                 department.name AS department,
                 mang.first_name AS manager_name 
                 FROM employee emp
                 LEFT JOIN role ON emp.role_id = role.id
                 LEFT JOIN department ON role.department_id = department.id
                 LEFT JOIN employee mang ON mang.id = emp.manager_id`;
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

addEmployee = (first_name, last_name, role_id, manager_id) => {
    if(!manager_id) {
        manager_id = null;
    }
    const sqlDB = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const condition  = [first_name, last_name, role_id, manager_id];
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
        console.log("Role successfully removed");
        process.exit();
    })
}

module.exports = { getAllEmployees, addEmployee, removeEmployee };