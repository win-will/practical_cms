

function generateQuestions (employee_names,role_titles,manager_names,department_names) {
    //The inquiry questions; each has a condition and a validation if necessary
    const questions =  [
        {
            type: "list",
            name: "selectQueryType",
            message: "What would you like to do? (Use arrows)",
            choices: ['View all departments', 'View all roles', 'View all employees', 'View employees by manager', 'View employees by department','View total utilitze budget by department',
                    'Add a department', 'Add a role', 'Add an employee','Update an employee role','Update an employee manager','Delete department',
                    'Delete role','Delete employee','Quit']
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
            when: (answers) => answers.selectQueryType === 'Update an employee role'
        },
        {
            type: "list",
            name: "updateEmployeeRole",
            message: "Select an option. (Use up/down arrows)",
            choices: role_titles,
            when: (answers) => answers.selectQueryType === 'Update an employee role'
        },
        {
            type: "list",
            name: "updateEmployeeNameManager",
            message: "Select an option. (Use up/down arrows)",
            choices: employee_names,
            when: (answers) => answers.selectQueryType === 'Update an employee manager'
        },
        {
            type: "input",
            name: "updateEmployeeManagerId",
            message: "Please enter the employee's manager id:",
            when: (answers) => answers.selectQueryType === 'Update an employee manager',
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
            name: "viewManagerName",
            message: "Select an option. (Use up/down arrows)",
            choices: manager_names,
            when: (answers) => answers.selectQueryType === 'View employees by manager'
        },
        {
            type: "list",
            name: "viewDepartmentName",
            message: "Select an option. (Use up/down arrows)",
            choices: department_names,
            when: (answers) => answers.selectQueryType === 'View employees by department'
        },
        {
            type: "list",
            name: "viewTotalBudgetDepartmentName",
            message: "Select an option. (Use up/down arrows)",
            choices: department_names,
            when: (answers) => answers.selectQueryType === 'View total utilitze budget by department'
        },
        {
            type: "list",
            name: "deleteEmployeeName",
            message: "Select an option. (Use up/down arrows)",
            choices: employee_names,
            when: (answers) => answers.selectQueryType === 'Delete employee'
        },
        {
            type: "list",
            name: "deleteDepartmentName",
            message: "Select an option. (Use up/down arrows)",
            choices: department_names,
            when: (answers) => answers.selectQueryType === 'Delete department'
        },
        {
            type: "list",
            name: "deleteRoleTitle",
            message: "Select an option. (Use up/down arrows)",
            choices: role_titles,
            when: (answers) => answers.selectQueryType === 'Delete role'
        }
    ]
// Delete department','Delete role','Delete employee'
    return questions;
}

module.exports = {generateQuestions};