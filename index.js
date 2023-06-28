// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const mysql = require('mysql2');
const  {
    mainQuestion, 
    addDepartmentQuestion, 
    addRoleQuestion, 
    addEmployeeQuestion, 
    updateEmployeeQuestion, 
    updateEmployeeManagerQuestion,
    viewEmployeeByManagerQuestion,
    viewEmployeeByDepartmentQuestion,
    deleteDepartmentQuestion,
    deleteRoleQuestion,
    deleteEmployeeQuestion    
  } = require('./questions.js');
  

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

/**
 * Function to add a department to the database.
 */
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


/**
 * Function to view all departments.
 */
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

/**
 * Function to view all roles.
 */
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


/**
 * Function to view all employees and then with many details bits like manager_name, role_name and department name.
 */
function viewAllEmployee() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM 
        (SELECT employees.id, employees.firstname, employees.lastname, roles.title, 
        departments.name, roles.salary, managername
        FROM roles, departments, employees, 
        (SELECT id, CONCAT(firstname, ' ', lastname) AS 'managername' FROM employees UNION select null, '') as manager
        WHERE department_id = departments.id AND employees.role_id = roles.id AND (manager.id = manager_id)
        UNION
        SELECT employees.id, employees.firstname, employees.lastname, roles.title, departments.name, roles.salary, manager_id AS managername
        FROM roles, departments, (SELECT * FROM employees WHERE manager_id is null) AS employees 
        WHERE department_id = departments.id AND employees.role_id = roles.id) AS A
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

/**
 * Function to add a new role to table roles.
 */
function doAddRole() {
    // Fetch departments from the database
    db.query('SELECT * FROM departments', function(err, departments) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }
        let ids = departments.map(item => item.id);
        let names = departments.map(item => item.name);
        addRoleQuestion[2].choices = names;

        // Now, run the prompt with the updated questions
        inquirer.prompt(addRoleQuestion)
        .then(data => {
            let index = names.indexOf(data.roledepartment);
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

/**
 * Function to add a new employee to table employees.
 */
function doAddEmployee() {
    db.query('SELECT * FROM roles', function(err, roles) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }

        let rids = roles.map(item => item.id);
        let rnames = roles.map(item => item.title);
        addEmployeeQuestion[2].choices = rnames;


        db.query('SELECT id, CONCAT(firstname, " ", lastname) AS manager FROM employees', function(err, managers) {
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

/**
 * Function to update an employee's role.
 */
function doUpdateEmployeeRole() {

    db.query("SELECT id, CONCAT(firstname, ' ', lastname) AS name FROM employees", function(err, employees) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }    
        let ids = employees.map(item => item.id);
        let names = employees.map(item => item.name);
        updateEmployeeQuestion[0].choices = names;
        
        
        db.query('SELECT id, title FROM roles', function(err, roles) {
            if (err) {
                console.log('Error: ' + err.message);
                return;
            }

            let rids = roles.map(item => item.id);
            let rnames = roles.map(item => item.title);
            updateEmployeeQuestion[1].choices = rnames;

            inquirer.prompt(updateEmployeeQuestion)
            .then(data => {
                let employeeindex = names.indexOf(data.employeename);
                let roleindex = rnames.indexOf(data.employeerole);

                const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
                const params = [rids[roleindex], ids[employeeindex]];
        
                db.query(sql, params, function (err, results) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(`Updated ${names[employeeindex]}  employee role`);
                        init();
                    }
                });
            });
        });
    });
}

/**
 * Function to update employee's manager
 */
function doUpdateEmployeeManager() {
    db.query("SELECT id, CONCAT(firstname, ' ', lastname) AS name FROM employees", function(err, employees) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }    
        let ids = employees.map(item => item.id);
        let names = employees.map(item => item.name);
        let mids = employees.map(item => item.id);
        let mnames = employees.map(item => item.name);
        mids.unshift(null);
        mnames.unshift("None");     

        updateEmployeeManagerQuestion[0].choices = names;
        updateEmployeeManagerQuestion[1].choices = mnames;
        
        inquirer.prompt(updateEmployeeManagerQuestion)
        .then(data => {
            let managerindex = mnames.indexOf(data.employeemanager);
            let index = names.indexOf(data.employeename);

            const sql = `UPDATE employees SET manager_id = ? WHERE id = ?`;
            const params = [mids[managerindex], ids[index]];
    
            db.query(sql, params, function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Updated ${names[index]}  employee manager`);
                    init();
                }
            });
        });
    });
}

/**
 * Function to view all employees managed by particular manager.
 */
function doViewEmployeeByManager(){

    const sql = `SELECT id, CONCAT(firstname, ' ', lastname) AS name FROM employees
    WHERE id IN (select DISTINCT manager_id FROM employees WHERE manager_id is NOT NULL);`;    
    db.query(sql, function(err, managers) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }    
        let mids = managers.map(item => item.id);
        let mnames = managers.map(item => item.name);
        viewEmployeeByManagerQuestion[0].choices = mnames;
        
        inquirer.prompt(viewEmployeeByManagerQuestion)
        .then(data => {
            let managerindex = mnames.indexOf(data.managername);

            const sql = `SELECT employees.id, employees.firstname, employees.lastname, roles.title, 
            departments.name, roles.salary, managername
            FROM roles, departments, employees, 
            (SELECT id, CONCAT(firstname, ' ', lastname) AS 'managername' FROM employees UNION select null, '') AS manager
            WHERE department_id = departments.id AND employees.role_id = roles.id AND (manager.id = manager_id) 
            AND manager_id = ?`
            const params = mids[managerindex];
    
            db.query(sql, params, function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.table(results);
                    init();
                }
            });
        });
    });
    
}

/**
 * Function to view employees by department level.
 */
function doViewEmployeeByDepartment(){

    const sql = `SELECT id,  name FROM departments`;    
    db.query(sql, function(err, departments) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }    
        let ids = departments.map(item => item.id);
        let names = departments.map(item => item.name);
        viewEmployeeByDepartmentQuestion[0].choices = names;

        inquirer.prompt(viewEmployeeByDepartmentQuestion)
        .then(data => {
            let index = names.indexOf(data.departmentname);

            const sql = `SELECT employees.id, employees.firstname, employees.lastname, roles.title, 
            departments.name, roles.salary, managername
            FROM roles, departments, employees, 
            (SELECT id, CONCAT(firstname, ' ', lastname) AS 'managername' FROM employees UNION SELECT null, '') AS manager
            WHERE department_id = departments.id AND employees.role_id = roles.id AND (manager.id = manager_id) 
            AND department_id = ?`
            const params = ids[index];
    
            db.query(sql, params, function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.table(results);
                    init();
                }
            });
        });
    });
    
}




/**
 * Function to view Budget of each development order by budget in desc order
 */
function doViewBudgetbyDepartment() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT a.name, sum(salary) AS budget FROM
        (SELECT employees.id, employees.firstname, employees.lastname, roles.title, 
             departments.name, roles.salary, managername
        FROM roles, departments, employees, 
        (SELECT id, CONCAT(firstname, ' ', lastname) AS 'managername' FROM employees UNION SELECT null, '') AS manager
        WHERE department_id = departments.id AND employees.role_id = roles.id AND (manager.id = manager_id)) AS a
        GROUP BY a.name ORDER BY budget DESC;`
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


/**
 * Function to delete a department.
 */
function doDeleteDepartment(){

    const sql = `SELECT id,  name FROM departments`;    
    db.query(sql, function(err, departments) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }    
        let ids = departments.map(item => item.id);
        let names =departments.map(item => item.name);
        deleteDepartmentQuestion[0].choices = names;

        inquirer.prompt(deleteDepartmentQuestion)
        .then(data => {
            let index = names.indexOf(data.departmentname);

            const sql = `DELETE FROM departments WHERE id = ?`
            const params = ids[index];
    
            db.query(sql, params, function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted ${names[index]} department`);
                    init();
                }
            });
        });
    });
    
}

/**
 * Function to delete a role.
 */
function doDeleteRole(){

    const sql = `SELECT id,  title FROM roles`;    
    db.query(sql, function(err, roles) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }    
        let ids = roles.map(item => item.id);
        let names =roles.map(item => item.title);
        deleteRoleQuestion[0].choices = names;

        inquirer.prompt(deleteRoleQuestion)
        .then(data => {
            let index = names.indexOf(data.rolename);

            const sql = `DELETE FROM roles WHERE id = ?`
            const params = ids[index];
    
            db.query(sql, params, function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted role ${names[index]} `);
                    init();
                }
            });
        });
    });
    
}


/**
 * Function to delete an employee
 */
function doDeleteEmployee(){

    const sql = `SELECT id, CONCAT(firstname, ' ', lastname) AS name FROM employees`;    
    db.query(sql, function(err, employees) {
        if (err) {
            console.log('Error: ' + err.message);
            return;
        }    
        let ids = employees.map(item => item.id);
        let names =employees.map(item => item.name);
        deleteEmployeeQuestion[0].choices = names;

        inquirer.prompt(deleteEmployeeQuestion)
        .then(data => {
            let index = names.indexOf(data.employeename);

            const sql = `DELETE FROM employees WHERE id = ?`
            const params = ids[index];
    
            db.query(sql, params, function (err, results) {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted employee ${names[index]} `);
                    init();
                }
            });
        });
    });
    
}


/**
 * Init function upon calling
 */
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
                doUpdateEmployeeRole();
                break;
            case 'Update Employee Manager':
                doUpdateEmployeeManager();
                break;
            case 'View Employee by Manager':
                doViewEmployeeByManager();
                break; 
            case 'View Employee by Department':
                doViewEmployeeByDepartment();
                break; 
            case 'View Budget by Department':
                nextAction = doViewBudgetbyDepartment();
                break; 
            case 'Delete Department':
                doDeleteDepartment();
                break; 
            case 'Delete Role':
                doDeleteRole();
                break; 
            case 'Delete Employee':
                doDeleteEmployee();
                break; 
                        
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

