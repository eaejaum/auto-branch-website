CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (name) VALUES ("Administrador");
INSERT INTO roles (name) VALUES ("Gerente");
INSERT INTO roles (name) VALUES ("Vendedor");