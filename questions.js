// TODO: Create an array of questions for user input
const mainQuestion = [    
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'mainquestion',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'View Employee by Manager',
        'View Employee by Department',
        'View Budget by Department',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'Quit',
        ],      
    },
];

const addDepartmentQuestion = [
    {
      type: 'input',
      message: 'What is the name of the department?',
      name: 'departmentname',
    },
];


const addRoleQuestion = [
    {
        type: 'input',
        message: 'What is the name of the role?',
        name: 'rolename',
    },    
    {
        type: 'input',
        message: 'What is the salary of the role?',
        name: 'rolesalary',
    },
    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'roledepartment',
        choices: [],
    },
];

const addEmployeeQuestion = [
    {
      type: 'input',
      message: 'What is the employee\'s first name?',
      name: 'employeefirstname',
    },
    {
      type: 'input',
      message: 'what is the employee\'s last name?',
      name: 'employeelastname',
    },
    {
        type: 'list',
        message: 'What is the employee\'s role?',
        name: 'employeerole',
        choices: [ ],      
    },    
    {
        type: 'list',
        message: 'What is the employee\'s manager?',
        name: 'managername',
        choices: [ ],      
    },        
];
const updateEmployeeQuestion = [
    {
        type: 'list',
        message: 'Which employee\'s role do you want to update?',
        name: 'employeename',
        choices: [ ],            
    },      
    {
        type: 'list',
        message: 'Which role do you want to assign the selected employee?',
        name: 'employeerole',
        choices: [ ],            
    },      

];

const updateEmployeeManagerQuestion = [
    {
        type: 'list',
        message: 'Which employee\'s role do you want to update?',
        name: 'employeename',
        choices: [ ],            
    },      
    {
        type: 'list',
        message: 'Which manager do you want to assign the selected employee?',
        name: 'employeemanager',
        choices: [ ],            
    },      

];

const viewEmployeeByManagerQuestion = [
    {
      type: 'list',
      message: 'What is the name of the manager?',
      name: 'managername',
      choices: [ ],            
    },
];

const viewEmployeeByDepartmentQuestion = [
    {
      type: 'list',
      message: 'What is the name of the department?',
      name: 'departmentname',
      choices: [ ],            
    },
];

const deleteDepartmentQuestion = [
    {
      type: 'list',
      message: 'Which department to delete?',
      name: 'departmentname',
      choices: [ ],            
    },
];

const deleteRoleQuestion = [
    {
      type: 'list',
      message: 'Which role to delete?',
      name: 'rolename',
      choices: [ ],            
    },
];

const deleteEmployeeQuestion = [
    {
      type: 'list',
      message: 'Which employee to delete?',
      name: 'employeename',
      choices: [ ],            
    },
];


module.exports = {
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
  };