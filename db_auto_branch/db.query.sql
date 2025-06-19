CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO roles (name) VALUES ("Diretor");
INSERT INTO roles (name) VALUES ("Gerente");
INSERT INTO roles (name) VALUES ("Vendedor");

CREATE TABLE status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO status (name) VALUES ("Disponível");
INSERT INTO status (name) VALUES ("Vendido");

CREATE TABLE branches (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    cep VARCHAR(255) NOT NULL UNIQUE,
    phoneNumber VARCHAR(11)
); 

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(11) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    roleId INT NOT NULL,
    branchId INT
);

ALTER TABLE users
ADD CONSTRAINT fk_users_role
FOREIGN KEY (roleId) REFERENCES roles(id);

ALTER TABLE users
ADD CONSTRAINT fk_users_branch
FOREIGN KEY (branchId) REFERENCES branches(id);

CREATE TABLE vehicles (
	id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    version VARCHAR(255) NOT NULL,
    year VARCHAR(255) NOT NULL,
    gearbox VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    motorization VARCHAR(255) NOT NULL,
    plate VARCHAR(255) NOT NULL UNIQUE,
    km DECIMAL(10, 2) NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    branchId INT NOT NULL
); 

ALTER TABLE vehicles
ADD CONSTRAINT fk_vehicles_branch
FOREIGN KEY (branchId) REFERENCES branches(id);

CREATE TABLE sellHistory (
	id INT AUTO_INCREMENT PRIMARY KEY,
    branchId INT NOT NULL,
    vehicleId INT NOT NULL,
    userId INT NOT NULL,
    sellPrice DECIMAL(10, 2) NOT NULL,
    discountPercent DECIMAL(10, 2) NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL
); 

ALTER TABLE sellHistory
ADD CONSTRAINT fk_history_branch
FOREIGN KEY (branchId) REFERENCES branches(id);

ALTER TABLE sellHistory
ADD CONSTRAINT fk_history_vehicle
FOREIGN KEY (vehicleId) REFERENCES vehicles(id);

ALTER TABLE sellHistory
ADD CONSTRAINT fk_history_user
FOREIGN KEY (userId) REFERENCES users(id);