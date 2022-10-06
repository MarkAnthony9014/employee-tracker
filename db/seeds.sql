INSERT INTO departments (name)
VALUES ('Programming'), ('Human Resources'), ('Legal'), ('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES ('Front End Developer', 50000, 1),
       ('Useless HRd', 100000, 2),
       ('Lawyer', 130000, 3),
       ('Junior Sales Lead', 38000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Leroy', 'Johnson', 4, NULL),
       ('John', 'Schwartz', 3, NULL),
       ('Becky', 'Witworth', 2, NULL),
       ('Nick', 'Hemenway', 1, NULL);
