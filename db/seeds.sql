-- Seed Data for departments
INSERT INTO departments (name)
VALUES ('Sales'), 
       ('Marketing'), 
       ('Human Resources'), 
       ('Research and Development'), 
       ('Finance'),
       ('Customer Service'),
       ('Engineering'),
       ('Operations'),
       ('Product'),
       ('Information Technology');

-- Seed Data for roles
INSERT INTO roles (title, department_id, salary)
VALUES ('Sales Manager', 1, 75000), 
       ('Marketing Specialist', 2, 65000),
       ('Human Resources Coordinator', 3, 55000),
       ('Software Engineer', 4, 80000),
       ('Financial Analyst', 5, 70000),
       ('Customer Service Representative', 6, 50000),
       ('Senior Engineer', 7, 85000),
       ('Operations Manager', 8, 80000),
       ('Product Manager', 9, 82000),
       ('IT Support Specialist', 10, 60000);

-- Seed Data for employees
INSERT INTO employees (firstname, lastname, role_id, manager_id)
VALUES ('Jason', 'Sammon', 1, NULL), 
       ('Jack', 'Stockwell', 2, 1),
       ('ChiKin', 'Chan', 3, 2),
       ('Chris', 'Bradshaw', 4, 1),
       ('Myra', 'Khatoon', 5, 1),
       ('Danielle', 'Rees', 6, NULL),
       ('Percival', 'Ho', 7, 2),
       ('Oliver', 'Cray', 8, 3),
       ('Tiernan', 'Green', 9, NULL),
       ('Robyn', 'Smith', 10, 1),
       ('Ashton', 'Kabote', 10, 2);
