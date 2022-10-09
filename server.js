const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: '4Bvptk076VGT9WxDQNbPKhapyIqLlL',
    database: 'cms_db'
  },
  console.log(`Connected to the books_db database.`)
);

function outputEmployees() {

    const employees = ["Sam", "John", "Jim"];
    return employees;
}

function outputRoles() {

    const employees = ["Employee", "Manager", "Intern"];
    return employees;
}

//Array of inquiry objects for the different types of employees questions
const questionsBuildTeam = [
    {
        type: "list",
        name: "selectQueryType",
        message: "Select an option. (Use arrows to select from the options.)",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 
                'Update an employee role']
    },
    {
        type: "input",
        name: "addDepartmentName",
        message: "Please enter department name:",
        when: (answers) => answers.selectQueryType === 'Add a department',
        validate(answer) {
            if(!answer) {
                return "Please enter department name:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addRoleName",
        message: "Please enter role name:",
        when: (answers) => answers.selectQueryType === 'Add a role',
        validate(answer) {
            if(!answer) {
                return "Please enter role name:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addRoleSalary",
        message: "Please enter role salary:",
        when: (answers) => answers.selectQueryType === 'Add a role',
        validate(answer) {
            if(!answer) {
                return "Please enter role salary:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addRoleDepartment",
        message: "Please enter role department:",
        when: (answers) => answers.selectQueryType === 'Add a role',
        validate(answer) {
            if(!answer) {
                return "Please enter role department:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addEmployeeFN",
        message: "Please enter employee first name:",
        when: (answers) => answers.selectQueryType === 'Add an employee',
        validate(answer) {
            if(!answer) {
                return "Please enter employee first name:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addEmployeeLN",
        message: "Please enter employee last name",
        when: (answers) => answers.selectQueryType === 'Add an employee',
        validate(answer) {
            if(!answer) {
                return "Please enter employee last name:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addEmployeeRole",
        message: "Please enter employee role:",
        when: (answers) => answers.selectQueryType === 'Add an employee',
        validate(answer) {
            if(!answer) {
                return "Please enter employee role:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addEmployeeManager",
        message: "Please enter employee manager:",
        when: (answers) => answers.selectQueryType === 'Add an employee',
        validate(answer) {
            if(!answer) {
                return "Please enter employee manager:"
            }
            return true
        }
    },
    {
        type: "list",
        name: "updateEmployeeName",
        message: "Select an option. (Use up/down arrows)",
        choices: outputEmployees(),
        when: (answers) => answers.selectQueryType === 'Update an employee',
        validate(answer) {
            if(!answer) {
                return "Select an option. (Use up/down arrows)"
            }
            return true
        }
    },
    {
        type: "list",
        name: "updateEmployeeRole",
        message: "Select an option. (Use up/down arrows)",
        choices: outputRoles(),
        when: (answers) => answers.selectQueryType === 'Update an employee',
        validate(answer) {
            if(!answer) {
                return "Select an option. (Use up/down arrows)"
            }
            return true
        }
    }
]