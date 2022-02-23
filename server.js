const dataBase = require("./db/connection");
const inquire = require("inquirer");
const { getAllDepartments, addDepartment, removeDepartment } = require("./routes/APIroutes/department");


dataBase.connect(err => {
    if(err)
    throw err;
});

const initialPrompt = () => {
    return inquirer.prompt([
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

        //department prompts
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
            getDepartments();
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
        case "Remove department":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "Provide the id of the department you want to delete:",
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
    console.log(data.command);
};

employeePrompts = data => {
    console.log(data.command);
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