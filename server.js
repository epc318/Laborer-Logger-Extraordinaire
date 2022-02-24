const dataBase = require("./db/sqlconnect.js");
const inquire = require("inquirer");
const { getAllDepartments, addDepartment, removeDepartment } = require("./routes/APIroutes/department");
const { getAllRoles, addRole, removeRole } = require("./routes/APIroutes/role");
const { getAllEmployees, addEmployee, removeEmployee } = require("./routes/APIroutes/employee");

dataBase.connect(err => {
    if(err)
    throw err;
});

const initialPrompt = () => {
    return inquire.prompt([
        {
            type: "list",
            name: "sector",
            message: "Please Choose a Sector:",
            choices:
            [
                "Departments",
                "Roles",
                "Employees"
            ]
        },

        {
            type: "list",
            name: "action",
            message: "What do you need to do with Departments today?",
            choices:
            [
                "View ALL departments",
                "Add a department",
                "Remove a department"
            ],
            when: ({sector}) => {
                if(sector === "Departments") {
                    return true;
                }
                else {
                    return false;
                }
            }
        },

        {
            type: "list",
            name: "action",
            message: "What do you need to do with Roles today?",
            choices:
            [
                "View ALL roles",
                "Add a role",
                "Remove a role"
            ],
            when: ({sector}) => {
                if(sector === "Roles") {
                    return true;
                }
                else {
                    return false;
                }
            }
        },

        {
            type: "list",
            name: "action",
            message: "What do you need to do with Employees today?",
            choices:
            [
                "View ALL employees",
                "Add an employee",
                "Remove an employee"
            ],
            when: ({category}) => {
                if(category === "Employees") {
                    return true;
                }
                else {
                    return false;
                }
            }
        },
    ])

    .then((response) => {
        return response;
    })
};

departmentPrompts = data => {
    switch(data.command) {
        case "View All Departments":
            getAllDepartments();
            break;
        case "Add Department":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Enter the name of the Department you want to add",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                }
            ])

            .then((response) => {
                addDepartment(response.name);
            })
        case "Remove Department":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "Enter the name of the Department you want to remove",
                    validate: response => {
                        if(response) {
                            return true;
                        } 
                    }
                }
            ])

            .then((response) => {
                removeDepartment(response.id);
            })
    }
};

rolePrompts = data => {    
    switch(data.command) {
        case "View all Roles":
            getAllRoles();
            break;
        case "Add Role":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Enter the name of the Role you want to add",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                },
                {
                    type: "number",
                    name: "salary",
                    message: "Enter the salary of the Role you want to add",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                },
                {
                    type: "number",
                    name: "department_id",
                    message: "Enter the desired id of the Role you want to add",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                }
            ])

            .then((response) => {
                addRole(response.title, response.salary, response.department_id);
            })

        case "Remove Role":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Enter the name of the Role you want to add",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                }
            ])

            .then((response) => {
                removeRole(response.title);
            })
    }
};

employeePrompts = data => {
    switch(data.command) {
        case "View all Employees":
            getAllEmployees();
            break;
        case "View Employee by their manager":
            return inquirer.prompt([
                {
                    type: "number",
                    name: "manager_id",
                    message: "Enter the manager's id to view employees they manage",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                }
            ])

            .then(response => {
                employeeByManager(response.manager_id);
            });
        
        case "View Employee by their department":
            return inquirer.prompt([
                {
                    type: "number",
                    name: "id",
                    message: "Enter the department's id to view employees that work in it",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                }
            ])

            .then(response => {
                employeesByDepartment(response.id);
            });

        case "Add Employee":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "Enter the first name of this employee",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Enter the last name of this employee",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                },
                {
                    type: "number",
                    name: "role_id",
                    message: "Enter this employee's role",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                },
                {
                    type: "number",
                    name: "manager_id",
                    message: "Enter the manager id for this employee",
                }
            ])

            .then((response) => {
                addEmployee(response.first_name, response.last_name, response.role_id, response.manager_id);
            })

        case "Remove Employee":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "Enter id of the employee you want to remove",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                }
            ])

            .then((response) => {
                removeEmployee(response.id);
            })
    }
};


initialPrompt()
    .then(response => {
        if(response.category === "Departments") {
            departmentPrompts(response);
        }
        else if(response.category === "Roles") {
            rolePrompts(response);
        }
        else if(response.category === "Employees") {
            employeePrompts(response);
        }
    });