
const inquirer = require('inquirer');
const { exit } = require('process');
const queryFunctions = require('./queryFunctions');
const logic = require('./queryLogic');
const inquiryQuestions = require('./generateQuestions');

var employee_names;
var manager_names;
var role_titles;
var department_names;


//Initialize script and launch inquriy questions
async function init(){
    let cont = true;

    
    while(cont) {
        // console.log(questions);
        
        //Initialize the variables needed for the questions
        employee_names = await queryFunctions.outputEmployeeNames();
        role_titles = await queryFunctions.outputRoles();
        manager_names = await queryFunctions.outputManagerNames();
        department_names = await queryFunctions.outputDepartmentNames();

        //Array of inquiry objects for the different types of employees questions
        const questions = inquiryQuestions.generateQuestions(employee_names,role_titles,manager_names,department_names);

        //Prompt user for manager questions 
        let answers = await inquirer
            .prompt(questions)
                .then(answers => { return answers});
          
        cont = await logic.queryLogic(answers);
        //console.log(cont);
    }
    //exit process when done
    exit();
}

init();

