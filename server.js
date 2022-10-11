// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { exit } = require('process');
const { printTable } = require('console-table-printer');
const cTable = require('console.table');

// const main_options =  ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role','Quit'];

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
  console.log(`Connected to the cms_db database.`)
);

var employee_names;
var role_titles;

async function outputEmployeeNames() {
    let names = [];

    try {
        await db.promise().query("SELECT * FROM employee;")
            .then( results => { 

                for (let i = 0; i < results[0].length; i++) {
                    names.push(results[0][i].first_name + " " + results[0][i].last_name);
                }
        });
      

    }
    catch (err){
        console.log("Error accessing employees outputEmployeeNames function");
        console.log(err);
    }
    return names;
}


async function outputRoles() {

    let roles = [];

    try {
        await db.promise().query("SELECT * FROM role;")
            .then( results => { 

                for (let i = 0; i < results[0].length; i++) {
                    roles.push(results[0][i].title);
                }
        });
    }
    catch (err){
        console.log("Error accessing employees outputRoles function");
        console.log(err);
    }
    return roles;
}

async function getEmployeeId(first,last) {

    let id = null;

    try {
        await db.promise().query("SELECT * FROM employee WHERE first_name = ? and last_name = ?;",[first, last])
            .then( results => { id = results[0][0].id; });

    }
    catch (err){
        console.log("Error accessing employees getEmployeeID function");
        console.log(err);

    }
    return id;
}

async function getRoleId(title) {

    let id = null;

    try {
        await db.promise().query("SELECT * FROM role WHERE title = ?;",[title])
            .then( results => { id = results[0][0].id; });

    }
    catch (err){
        console.log("Error accessing employees getRoleID function");
        console.log(err);

    }
    return id;
}

function generateQuestions () {

    const questions =  [
        {
            type: "list",
            name: "selectQueryType",
            message: "What would you like to do? (Use arrows)",
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee','Update an employee role','Quit']
        },
        {
            type: "input",
            name: "addDepartmentName",
            message: "Please enter the department name:",
            when: (answers) => answers.selectQueryType === 'Add a department',
            validate(answer) {
                if(!answer) {
                    return "Please enter the department name:";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "addRoleTitle",
            message: "Please enter the role's title:",
            when: (answers) => answers.selectQueryType === 'Add a role',
            validate(answer) {
                if(!answer) {
                    return "Please enter the role's title:";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "addRoleSalary",
            message: "Please enter the role's salary:",
            when: (answers) => answers.selectQueryType === 'Add a role',
            
            validate(answer) {
                answer.trim();
                const decimalRegex = /^\d*\.?\d*$/;
    
                if(!decimalRegex.test(answer)) {
                    return "Invalid answer.  Please enter a decimal number for role's salary:";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "addRoleDepartmentId",
            message: "Please enter role department:",
            when: (answers) => answers.selectQueryType === 'Add a role',
            validate(answer) {
                answer.trim();
                const digitRegex = /^[\d+]+$/;
    
                if(!digitRegex.test(answer)) {
                    return "Invalid answer. Please enter an integer for the role's department id:";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "addEmployeeFN",
            message: "Please enter employee's first name:",
            when: (answers) => answers.selectQueryType === 'Add an employee',
            validate(answer) {
                if(!answer) {
                    return "Please enter the employee's first name:";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "addEmployeeLN",
            message: "Please enter employee's last name",
            when: (answers) => answers.selectQueryType === 'Add an employee',
            validate(answer) {
                if(!answer) {
                    return "Please enter employee's last name:";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "addEmployeeRoleId",
            message: "Please enter the employee's role id:",
            when: (answers) => answers.selectQueryType === 'Add an employee',
            validate(answer) {
                answer.trim();
                const digitRegex = /^[\d+]+$/;
    
                if(!digitRegex.test(answer)) {
                    return "Invalid answer.  Please enter an integer for employee's role id:";
                }
                return true;
            }
        },
        {
            type: "input",
            name: "addEmployeeManagerId",
            message: "Please enter the employee's manager id:",
            when: (answers) => answers.selectQueryType === 'Add an employee',
            validate(answer) {
                answer.trim();
                const digitRegex = /^[\d+]+$/;
    
                if(!digitRegex.test(answer)) {
                    return "Invalid answer.  Please enter an integer for employee's manager id:"
                }
                return true;
            }
        },
        {
            type: "list",
            name: "updateEmployeeName",
            message: "Select an option. (Use up/down arrows)",
            choices: employee_names,
            when: (answers) => answers.selectQueryType === 'Update an employee role',
            validate(answer) {
                if(!answer) {
                    return "Select an option. (Use up/down arrows)";
                }
                return true;
            }
        },
        {
            type: "list",
            name: "updateEmployeeRole",
            message: "Select an option. (Use up/down arrows)",
            choices: role_titles,
            when: (answers) => answers.selectQueryType === 'Update an employee role',
            validate(answer) {
                if(!answer) {
                    return "Select an option. (Use up/down arrows)"
                }
                return true
            }
        }
    ]

    return questions;
}

async function queryLogic(answers) {
    let sql = "";

    if (answers.selectQueryType === 'Quit') return false;
    else if (answers.selectQueryType === 'View all departments') {
        
        try {
            sql = "SELECT * FROM department";
            await db.promise().query(sql)
                    .then( ([rows, fields]) => { printTable(rows); });
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'View all roles') {
        
        try {
            sql = "SELECT * FROM role";
            await db.promise().query(sql)
                        .then( ([rows, fields]) => { printTable(rows); });
        }
        catch(err) {
            console.log(err)
            return false;
        }
    }
    else if (answers.selectQueryType === 'View all employees') {
        
        try {
            sql = "SELECT * FROM employee";
            await db.promise().query(sql)
                        .then( ([rows, fields]) => { printTable(rows); });
                    }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'Add a department') {
        
        try {
            sql = "INSERT INTO department (name) VALUES (?);";
            await db.promise().query(sql, [answers.addDepartmentName]);
            console.log("Added " + answers.addDepartmentName + " to the database");
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'Add a role') {
        
        try {
            sql = "INSERT INTO role (title,salary,department_id) VALUES (?,?,?);";
            await db.promise().query(sql, [answers.addRoleTitle, answers.addRoleSalary, answers.addRoleDepartmentId]);
            console.log("Added " + answers.addRoleTitle + " to the database");
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'Add an employee') {
        
        try {
            sql = "INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?);";
            await db.promise().query(sql, [answers.addEmployeeFN, answers.addEmployeeLN, answers.addEmployeeRoleId, answers.addEmployeeManagerId]);
            console.log("Added " + answers.addEmployeeFN + " " + answers.addEmployeeLN + " to the database");
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'Update an employee role') {
        try {

            sql = "UPDATE employee SET role_id = ? WHERE id = ?;";
            let [first, last] = answers.updateEmployeeName.split(" ");
            let employeeId = await getEmployeeId(first,last);
            let roleId = await getRoleId(answers.updateEmployeeRole);
            await db.promise().query(sql, [roleId, employeeId ]);
            console.log("Updated the employee with the id " + employeeId + " with the role id " + roleId + " in the database");
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else {
        console.log("Invalid value provided for selectQueryType")
        return false
    }

    return true
}

//Initialize script and launch inquriy questions
async function init(){
    let cont = true;

    //Prompt user for manager questions 
    while(cont) {
        // console.log(questions);
        //Array of inquiry objects for the different types of employees questions
        employee_names = await outputEmployeeNames();
        role_titles = await outputRoles();
        const questions = generateQuestions();

        let answers = await inquirer
            .prompt(questions)
                .then(answers => { return answers});
          
        cont = await queryLogic(answers);
        console.log(cont);
    }
    
    exit();
}

init();

