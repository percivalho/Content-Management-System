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
    inquirer.prompt(addDepartmentQuestion)
    .then(data => {
        const sql = `INSERT INTO departments (name) VALUES (?)`;
        const params = [data.departmentname];

        db.query(sql, params, function (err, results) {
            if (err) {
                console.error(err);
            } else {
                console.log(`Added ${data.departmentname} to the departments table.`);
                init();
            }
        });
    });
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

function viewAllRole() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT roles.id, roles.title, roles.salary, departments.name
        FROM roles, departments
        WHERE department_id = departments.id;`
        db.query(sql, function (err, results) {
            if (err) {
                reject(err);
            } else {
                console.table(results);
                resolve();
            }
        });
    });
}

function viewAllEmployee() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM 
        (SELECT employees.id, employees.firstname, employees.lastname, roles.title, 
        departments.name, roles.salary, managername
        FROM roles, departments, employees, 
        (SELECT id, CONCAT(firstname, ' ', lastname) AS 'managername' FROM employees UNION select null, '') as manager
        WHERE department_id = departments.id and employees.role_id = roles.id and (manager.id = manager_id)
        UNION
        SELECT employees.id, employees.firstname, employees.lastname, roles.title, departments.name, roles.salary, manager_id as managername
        FROM roles, departments, (select * from employees where manager_id is null) AS employees 
        WHERE department_id = departments.id and employees.role_id = roles.id) AS A
        ORDER BY id;`
        db.query(sql, function (err, results) {
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
            case 'View All Roles':
                nextAction = viewAllRole();    
                break;
            case 'View All Employees':
                nextAction = viewAllEmployee();
                break;
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
