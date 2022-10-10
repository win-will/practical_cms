// const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

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
const questions = [
    {
        type: "list",
        name: "selectQueryType",
        message: "Select an option. (Use arrows to select from the options.)",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 
                'Update an employee role','Quit']
    },
    {
        type: "input",
        name: "addDepartmentName",
        message: "Please enter the department name:",
        when: (answers) => answers.selectQueryType === 'Add a department',
        validate(answer) {
            if(!answer) {
                return "Please enter the department name:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addRoleTitle",
        message: "Please enter the role's title:",
        when: (answers) => answers.selectQueryType === 'Add a role',
        validate(answer) {
            if(!answer) {
                return "Please enter the role's title:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addRoleSalary",
        message: "Please enter the role's salary:",
        when: (answers) => answers.selectQueryType === 'Add a role',
        validate(answer) {
            if(!answer) {
                return "Please enter the role's salary:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addRoleDepartmentId",
        message: "Please enter role department:",
        when: (answers) => answers.selectQueryType === 'Add a role',
        validate(answer) {
            if(!answer) {
                return "Please enter the role's department id:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addEmployeeFN",
        message: "Please enter employee's first name:",
        when: (answers) => answers.selectQueryType === 'Add an employee',
        validate(answer) {
            if(!answer) {
                return "Please enter the employee's first name:"
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
        name: "addEmployeeRoleId",
        message: "Please enter the employee's role id:",
        when: (answers) => answers.selectQueryType === 'Add an employee',
        validate(answer) {
            if(!answer) {
                return "Please enter the employee's role:"
            }
            return true
        }
    },
    {
        type: "input",
        name: "addEmployeeManagerId",
        message: "Please enter the employee's manager id:",
        when: (answers) => answers.selectQueryType === 'Add an employee',
        validate(answer) {
            if(!answer) {
                return "Please enter the employee's manager id:"
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
        when: (answers) => answers.selectQueryType === 'Update an employee role',
        validate(answer) {
            if(!answer) {
                return "Select an option. (Use up/down arrows)"
            }
            return true
        }
    }
]

//Initialize script and launch inquriy questions
async function init(){
    let cont = true;
    
    //Prompt user for manager questions 
    while(cont) {
        let inquiryAnswers = await inquirer
        .prompt(questions)
            .then(answers => {
                // console.info('Build team answers:', answers);
                let sql = "";
                if (answers.selectQueryType === 'Quit') cont = false;
                else if (answers.selectQueryType === 'View all departments') {
                    sql = "SELECT * FROM department";
                    db.query(sql, function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);
                      });
                }
                else if (answers.selectQueryType === 'View all roles') {
                    sql = "SELECT * FROM role";
                    db.query(sql, function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);
                      });
                }
                else if (answers.selectQueryType === 'View all employees') {
                    sql = "SELECT * FROM employee";
                    db.query(sql, function (err, results) { 
                        if (err) console.log(err);
                        else console.log(results);
                      });
                }
                else if (answers.selectQueryType === 'Add a department') {
                    sql = "INSERT INTO department (name) VALUES ?";
                    db.query(sql, [answers.addDepartmentName], function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);
                      });
                }
                else if (answers.selectQueryType === 'Add a role') {
                    sql = "INSERT INTO role (title,salary,department_id) VALUES ?";
                    db.query(sql, [answers.addRoleTitle, answers.addRoleSalary, answers.addRoleDepartmentId], function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);
                      });

                }
                else if (answers.selectQueryType === 'Add an employee') {
                    sql = "INSERT INTO employee (title,salary,department_id,manager_id) VALUES ?";
                    db.query(sql, [answers.addEmployeeFN, answers.addEmployeeLN, answers.answers.addEmployeeRoleId, answers.addEmployeeManagerId], function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);
                      });

                }
                else if (answers.selectQueryType === 'Update an employee') {
                    sql = "UPDATE employee SET role_id = ? WHERE id = ?";
                    let role_id = 1;
                    let employee_id = 1;
                    db.query(sql, [role_id, employee_id], function (err, results) {
                        if (err) console.log(err);
                        else console.log(results);
                      });

                }
                else {
                    console.log("Invalid value provided for selectQueryType")
                }
            });
        
    }


}

init()