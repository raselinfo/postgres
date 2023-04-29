-- create database
CREATE DATABASE bookDB;

-- Create Table
CREATE TABLE book(
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(20),
    description VARCHAR(255)
);

-- Delete a table
DROP TABLE book;

-- create/insert data
INSERT INTO book (id,name,description)
VALUES(101,"xbook","nice book");

