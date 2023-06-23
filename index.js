// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const  {mainQuestion, addDepartmentQuestion, addRoleQuestion, addEmployeeQuestion, updateEmployeeQuestion} = require('./questions.js');

// Connect to database
const db = mysql.createConnection(
    {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);    


function doAddDepartment() {

    inquirer
    .prompt(addDepartmentQuestion)
    .then(data => {
        switch (data.mainquestion){

            case 'Quit':
                break;
        }
    })
    
}
function viewAllDepartment() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departments', function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.table(results);
                resolve();
            }
        });
    });
}


// TODO: Create a function to initialize app
function init() {

    inquirer
    .prompt(mainQuestion)
    .then(data => {
        let nextAction;
        switch (data.mainquestion){
            case 'View All Departments':
                nextAction = viewAllDepartment();    
                break;
            //case 'View All Roles':
            //case 'View All Employees':

            case 'Add Department':
                doAddDepartment();
                break;
            case 'Add Role':
            case 'Add Employee':
            case 'Update Employee Role':

            case 'Quit':
                break;
        }
        if (nextAction) {
            nextAction.then(init); // Call init() again once the selected operation is done
        }        
    })
}

// Function call to initialize app
init();
