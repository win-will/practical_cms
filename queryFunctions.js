// Import and require mysql2
const mysql = require('mysql2');

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

//get employee objects using the manager id
async function getEmployeesByManagerId(manager_id) {
    let employees = [];

    try {
        await db.promise().query("SELECT * FROM employee WHERE d_id = ?;",[manager_id])
            .then( results => { 

                for (let i = 0; i < results[0].length; i++) {
                    employees.push(results[0][i]);

                }
        });

    }
    catch (err){
        console.log("Error accessing employees outputManagerNames function");
        console.log(err);
    }
    return employees;
}

//get role ids using department ids
async function getRoleIdsByDepartmentId(department_id) {
    let ids = [];

    try {
        await db.promise().query("SELECT * FROM role WHERE department_id = ?;",[department_id])
            .then( results => { 

                for (let i = 0; i < results[0].length; i++) {
                    ids.push(results[0][i].id);

                }
        });
    }
    catch (err){
        console.log("Error accessing employees outputManagerNames function");
        console.log(err);
    }
    return ids;
}

//output all of the manager names using the ids 
async function outputManagerNames() {
    let ids = [];
    let names = [];

    try {
        await db.promise().query("SELECT manager_id FROM employee GROUP BY manager_id;")
            .then( results => { 

                for (let i = 0; i < results[0].length; i++) {
                    if (results[0][i].manager_id) ids.push(results[0][i].manager_id);

                }
        });

        for (const i of ids) {
            await db.promise().query("SELECT * FROM employee WHERE id = ?;", [i])
                        .then(results => {
                            for (let i = 0; i < results[0].length; i++) {
                                names.push(results[0][i].first_name + " " + results[0][i].last_name);
            
                            }
                        });
        }
        
    }
    catch (err){
        console.log("Error accessing employees outputManagerNames function");
        console.log(err);
    }
    return names;
}

//output all department names in the department table
async function outputDepartmentNames() {
    let names = [];

    try {
        await db.promise().query("SELECT * FROM department;")
            .then( results => { 

                for (let i = 0; i < results[0].length; i++) {
                    names.push(results[0][i].name);
                }
        });
      

    }
    catch (err){
        console.log("Error accessing employees outputDepartmentNames function");
        console.log(err);
    }
    return names;
}

//output the first and last name of all employees in the employee table
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

//output all the roles in the role table
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

//retreieve department id using it's name
async function getDepartmentId(name) {

    let id = null;

    try {
        await db.promise().query("SELECT * FROM department WHERE name = ?;",[name])
            .then( results => { id = results[0][0].id; });

    }
    catch (err){
        console.log("Error accessing employees getEmployeeID function");
        console.log(err);

    }
    return id;
}

//retrieve employee id using the employee's first and last names
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


//Retrieve role id using role title
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

module.exports = {db,getEmployeesByManagerId,getRoleIdsByDepartmentId,outputManagerNames,
                outputDepartmentNames,outputEmployeeNames,outputRoles,
                getDepartmentId,getEmployeeId, getRoleId};