//connections to external files
const dataBase = require("./db/sqlconnect.js");
const inquire = require("inquirer");
const { getAllDepartments, addDepartment, removeDepartment } = require("./routes/APIroutes/department");
const { getAllRoles, addRole, removeRole } = require("./routes/APIroutes/role");
const { getAllEmployees, addEmployee, removeEmployee } = require("./routes/APIroutes/employee");

//connecting to the previously established sql database
dataBase.connect(err => {
    if(err)
    throw err;
});

// First prompts asking users what sector they want and what they want to do with it
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

        // if User chooses Departments
        {
            type: "list",
            name: "action",
            message: "What do you need to do within Departments today?",
            choices:
            [
                "View ALL Departments",
                "Add Department",
                "Remove Department"
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

        // if User chooses Roles
        {
            type: "list",
            name: "action",
            message: "What do you need to do with Roles today?",
            choices:
            [
                "View ALL Roles",
                "Add Role",
                "Remove Role"
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

        // if User chooses Employees
        {
            type: "list",
            name: "action",
            message: "What do you need to do with Employees today?",
            choices:
            [
                "View ALL Employees",
                "Add Employee",
                "Remove Employee"
            ],
            when: ({sector}) => {
                if(sector === "Employees") {
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

//Prompts is user chooses any of the 3 Department options in the initialPrompt above
departmentPrompts = data => {
    switch(data.action) {
        // user chooses View ALL Departments and the getAllDepartments function from department.js runs
        case "View ALL Departments":
            getAllDepartments();
            break;

        // user chooses Add Department, is prompted for necessary info, info is validated and the addDepartment function from department.js runs
        case "Add Department":
            return inquire.prompt([
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

        // user chooses Remove Department, is prompted for necessary info, info is validated and the removeDepartment function from department.js runs
        case "Remove Department":
            return inquire.prompt([
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
                removeDepartment(response.name);
            })
    }
};

//Prompts is user chooses any of the 3 Roles options in the initialPrompt above
rolePrompts = data => {    
    switch(data.action) {
        // user chooses View ALL Roles and the getAllRoles function from role.js runs
        case "View ALL Roles":
            getAllRoles();
            break;

        // user chooses Add Role, is prompted for necessary info, info is validated and the addRole function from role.js runs
        case "Add Role":
            return inquire.prompt([
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
                    message: "Enter the department id of the Role you want to add",
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

        // user chooses Remove Role, is prompted for necessary info, info is validated and the removeRole function from role.js runs           
        case "Remove Role":
            return inquire.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Enter the name of the Role you want to remove",
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

//Prompts is user chooses any of the 3 Employees options in the initialPrompt above
employeePrompts = data => {
    switch(data.action) {
        // user chooses View ALL Employees and the getAllEmployees function from employee.js runs
        case "View ALL Employees":
            getAllEmployees();
            break;
        
        // user chooses Add Employee, is prompted for necessary info, info is validated and the addEmployee function from employee.js runs
        case "Add Employee":
            return inquire.prompt([
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
                    message: "Enter this employee's role ID",
                    validate: response => {
                        if(response) {
                            return true;
                        }
                    }
                },
            ])

            .then((response) => {
                addEmployee(response.first_name, response.last_name, response.role_id);
            })

        // user chooses Remove Employee, is prompted for necessary info, info is validated and the removeEmployee function from employee.js runs
        case "Remove Employee":
            return inquire.prompt([
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


// After user finishes, adding, removing or viewing a sector, they are re-directed to the intial prompt. (not working at the moment)
initialPrompt()
    .then(response => {
        if(response.sector === "Departments") {
            departmentPrompts(response);
        }
        else if(response.sector === "Roles") {
            rolePrompts(response);
        }
        else if(response.sector === "Employees") {
            employeePrompts(response);
        }
    })