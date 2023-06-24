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

function doAddRole() {
    // Fetch departments from the database
    db.query('SELECT * FROM departments', function(err, departments) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }
        console.log(departments);
        let ids = departments.map(item => item.id);
        let names = departments.map(item => item.name);
        addRoleQuestion[2].choices = names;

        // Now, run the prompt with the updated questions
        inquirer.prompt(addRoleQuestion)
        .then(data => {
            console.log(data);
            //data.roledepartment
            let index = names.indexOf(data.roledepartment);
            //console.log(ids[index]);
            // insert the new role to database here.
            const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [data.rolename, data.rolesalary, ids[index]];
    
            db.query(sql, params, function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Added ${data.rolename} to the roles table.`);
                    init();
                }
            });
        });
    });
}

function doAddEmployee() {
    db.query('SELECT * FROM roles', function(err, roles) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }

        console.log(roles);
        let rids = roles.map(item => item.id);
        let rnames = roles.map(item => item.title);
        console.log(rids);
        console.log(rnames);
        addEmployeeQuestion[2].choices = rnames;


        db.query('SELECT id, CONCAT(firstname, " ", lastname) as manager from employees', function(err, managers) {
            if (err) {
                console.log('Error: ' + err.message);
                return;
            }

            let mids = managers.map(item => item.id);
            let mnames = managers.map(item => item.manager);
            mids.unshift(null);
            mnames.unshift("None");        
            addEmployeeQuestion[3].choices = mnames;

            inquirer.prompt(addEmployeeQuestion)
            .then(data => {
                let roleindex = rnames.indexOf(data.employeerole);
                let managerindex = mnames.indexOf(data.managername);

                const sql = `INSERT INTO employees (firstname, lastname, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const params = [data.employeefirstname, data.employeelastname, rids[roleindex], mids[managerindex]];
        
                db.query(sql, params, function (err, results) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`Added ${data.employeefirstname} ${data.employeelastname}  to the employees table.`);
                        init();
                    }
                });
            });
        });
    });
}


/*function doAddRole() {
    inquirer.prompt(addRoleQuestion)
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
}*/


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
                doAddRole();
                break;
            case 'Add Employee':
                doAddEmployee();
                break;
            case 'Update Employee Role':

            case 'Quit':
                return process.exit();                 
                //break;
        }
        if (nextAction) {
            nextAction.then(init); // Call init() again once the selected operation is done
        }        
    })
}

// Function call to initialize app
init();
