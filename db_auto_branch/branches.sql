CREATE TABLE branches (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    cep VARCHAR(255) NOT NULL UNIQUE,
    employeeCount INT,
    vehicleCount INT,
    phoneNumber VARCHAR(11)
); 