// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const  {mainQuestion, addDepartmentQuestion, addRoleQuestion, addEmployeeQuestion, updateEmployeeQuestion} = require('./questions.js');



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




// TODO: Create a function to initialize app
function init() {

    // Connect to database
    const db = mysql.createConnection(
        {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'classlist_db'
        },
        console.log(`Connected to the classlist_db database.`)
    );    
    inquirer
    .prompt(mainQuestion)
    .then(data => {
        switch (data.mainquestion){
            //case 'View All Departments':
                
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
    })
}

// Function call to initialize app
init();
