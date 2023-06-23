-- CREATE DATABASE
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);


CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  department_id INT, 
  salary INT NOT NULL,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL    

);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(30) NOT NULL,
  lastname VARCHAR(30) NOT NULL,
  role_id INT, 
  manager_id INT, 
  FOREIGN KEY (role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL    
);


