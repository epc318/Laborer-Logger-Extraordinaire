const dataBase = require("./db/connection");
const inquire = require("inquirer");
const {getDepartment, addDepartment, removeDepartment} = require("./routes/APIroutes/department");


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






initialPrompt()
    .then(response => {
        if(response.category === "Departments") {
            promptDepartments(response);
        }
    })