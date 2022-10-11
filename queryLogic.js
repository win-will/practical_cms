const { printTable } = require('console-table-printer');
const queryFunctions = require('./queryFunctions');

const db = queryFunctions.db;

//all of the logic to execute the queries for for inquiry answers
async function queryLogic(answers) {
    let sql = "";

    if (answers.selectQueryType === 'Quit') return false;  //Quit application
    else if (answers.selectQueryType === 'View all departments') {
        //View all departments
        try {
            sql = "SELECT * FROM department";
            await db.promise().query(sql)
                    .then( ([rows, fields]) => { if (rows[0]) printTable(rows); });
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'View all roles') {
        //View all the roles
        try {
            sql = "SELECT * FROM role";
            await db.promise().query(sql)
                        .then( ([rows, fields]) => { if (rows[0]) printTable(rows); });
        }
        catch(err) {
            console.log(err)
            return false;
        }
    }
    else if (answers.selectQueryType === 'View all employees') {
        //View all of the employees
        try {
            sql = "SELECT * FROM employee";
            await db.promise().query(sql)
                        .then( ([rows, fields]) => { if (rows[0]) printTable(rows); });
                    }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'View employees by manager') {
        //View employee's by the manager using two queries, 1 for the manager the other for the employees with that mangaer id
        try {

            sql = "SELECT * FROM employee WHERE manager_id = ?;";
            let [first, last] = answers.viewManagerName.split(" ");
            let managerId = await queryFunctions.getEmployeeId(first,last);
            await db.promise().query(sql, [managerId])
                    .then( ([rows, fields]) => { if (rows[0]) printTable(rows); });

            
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'View employees by department') {
        //View employees by department by getting the department name then getting all employees in that department
        try {

            sql = "SELECT * FROM employee WHERE role_id = ?;";
            let departmentId = await queryFunctions.getDepartmentId(answers.viewDepartmentName);
            let roleIds = await queryFunctions.getRoleIdsByDepartmentId(departmentId);
            for (id of roleIds){
        
                await db.promise().query(sql, [id])
                    .then( ([rows, fields]) => { if (rows[0]) printTable(rows); });
            }
            
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'View total utilitze budget by department') {
        //Sum of all of the salaries in a department
        try {

            sql = "SELECT SUM(salary) FROM cms_db.role WHERE department_id = ?;";
            let departmentId = await queryFunctions.getDepartmentId(answers.viewTotalBudgetDepartmentName);
            
            await db.promise().query(sql, [departmentId])
                    .then( ([rows, fields]) => { if (rows[0]) printTable(rows); });
            
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'Add a department') {
        //Insert a department
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
        //Insert a role
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
        //Insert an employee
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
        //Update employee's role by matching based on their id and updating their role_id with using another gather query
        try {

            sql = "UPDATE employee SET role_id = ? WHERE id = ?;";
            let [first, last] = answers.updateEmployeeName.split(" ");
            let employeeId = await queryFunctions.getEmployeeId(first,last);
            let roleId = await queryFunctions.getRoleId(answers.updateEmployeeRole);
            let message = await db.promise().query(sql, [roleId, employeeId ]);
            // console.log(message);
            console.log("Updated the employee with the id " + employeeId + " with the role id " + roleId + " in the database");
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'Update an employee manager') {
        //Update employee manager by maching on their id and updating their manager_id using another query
        try {

            sql = "UPDATE employee SET manager_id = ? WHERE id = ?;";
            let [first, last] = answers.updateEmployeeNameManager.split(" ");
            let employeeId = await queryFunctions.getEmployeeId(first,last);
            let managerId = answers.updateEmployeeManagerId;
            let message = await db.promise().query(sql, [managerId, employeeId ]);
            // console.log(message);
            console.log("Updated the employee with the id " + employeeId + " with the manager id " + managerId + " in the database");
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'Delete employee') {
        //Delete employee based on their id
        try {

            sql = "DELETE FROM employee WHERE id = ?;";
            let [first, last] = answers.deleteEmployeeName.split(" ");
            let employeeId = await queryFunctions.getEmployeeId(first,last);
            let message = await db.promise().query(sql, [employeeId]);
            // console.log(message);
            console.log("Deleted the employee with the id " + employeeId + " in the database");
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'Delete role') {
        //Delete role based on title
        try {

            sql = "DELETE FROM role WHERE title = ?;";
            let message = await db.promise().query(sql, [answers.deleteRoleTitle]);
            // console.log(message);
            console.log("Deleted the role with the title " + answers.deleteRoleTitle + " in the database");
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else if (answers.selectQueryType === 'Delete department') {
        //Delete department based on name
        try {

            sql = "DELETE FROM department WHERE name = ?;";
            let message = await db.promise().query(sql, [answers.deleteDepartmentName]);
            // console.log(message);
            console.log("Deleted the department with the name " + answers.deleteDepartmentName + " in the database");
        }
        catch(err) {
            console.log(err);
            return false;
        }
    }
    else {
        //Additoinal else if there is an inability to retrieve the selectQueryType
        console.log("Invalid value provided for selectQueryType")
        return false
    }

    return true
}

module.exports = {queryLogic};