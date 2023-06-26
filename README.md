# Content-Management-System

Content Management Systems (CMS) is done by building a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```


## Installation
  
to install for running in localhost:
1. Inquirer@8.2.4. It is a Node.js package that provides an interactive command-line interface by prompting and receiving user input for easier and efficient program execution.

  ```md
  npm i inquirer@8.2.4
  ```

2. mysql2. It is is a Node.js package that allows developers to interact with MySQL databases, providing a fast and efficient way to execute queries and manage database connections.

  ```md
  npm i mysql2
  ```


## Technologies Used

This application is built using the following technologies:

- **JavaScript**: Programming language for adding interactivity and dynamic content.
- **NodeJS**: an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser.
- **inquirer@8.2.4**: a Node.js package that provides an interactive command-line interface by prompting and receiving user input for easier and efficient program execution.
- **MySQL**: It is an open-source relational database management system that enables efficient storage, retrieval, and management of structured data for various applications and websites.


## Usage

The user should clone the repository and run 'npm i inquirer@8.2.4' to install inquirer@8.2.4, 
then run 'npm i mysql2' to install mysql2.

database setup:
run with 'mysql -u root'
then run 'source db/schema.sql' to create the schema
then run 'source db/seeds.sql' to create the database and tables out.

for localhost:
then run node index.js to invoke the content management system.


## Features

The application is capable of the full functionality of Content Management System.
Include the  following operations:

1.  View All Departments
2.  View All Roles
3.  View All Employees
4.  Add Department
5.  Add Role
6.  Add Employee
7.  Update Employee Role
8.  Update Employee Manager
9.  View Employee by Manager
10. View Employee by Department
11. View Budget by Department
12. Delete Department
13. Delete Role
14. Delete Employee

the walkthrough video is below:

![WalkThrough Video](link_to_the_mov_file)



## Tests

Testing done on:

1. testing on view all departments.
2. testing on view all roles.
3. testing on view all employees.
4. testing on adding a new department.
5. testing on adding a new role.
6. testing on adding a new employee.
7. testing on updating employee Role.
8. testing on updating employee manager.
9. testing on viewing Employee by Manager.
10. testing on viewing employee by Department.
11. testing on viewing budget by departments.
12. testing on deleting a department.
13. testing on deleting a role.
14. testing on deleting an employee.


## Resources

Link to Video:

https://note-taker-server-e16f72bce28f.herokuapp.com


Link to GitHub repo:

https://github.com/percivalho/Note-Taker-Server.git




## License 

![License badge](https://img.shields.io/badge/license-MIT-blue.svg)


## Credits
Prof. Uday Reddy in Database Course: for Advanced SQL statements use without using JOIN.

## Credits and Copyright 
&copy; Copyright 2023 - Present. Percival Ho