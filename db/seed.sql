INSERT INTO department (name)
VALUES ("Human Resources"),
       ("Application Development"),
       ("Information Security"),
       ("Executive Staff");

INSERT INTO role (title, salary, department_id)
VALUES ("Human Resources Representative", 50000, 1),
       ("Developer", 80000, 2),
       ("Enterprise Architect", 100000, 2),
       ("Security Engineer", 90000, 3),
       ("Security Architect", 110000, 3),
       ("Vice President of Operations", 150000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Sam", "Jones", 1, 6),
       ("Sally", "Sue", 2, 6),
       ("John", "Smith", 3, 6),
       ("Tom", "Jacobs", 4, 6),
       ("Molly", "Ring", 5, 6),
       ("Jason", "Snipps", 6, NULL);