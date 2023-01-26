CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employees(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) DEFAULT NULL,
    salary INT(6) DEFAULT NULL,
    PRIMARY KEY(id)
);

DESCRIBE employees;