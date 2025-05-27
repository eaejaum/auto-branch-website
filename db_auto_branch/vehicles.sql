CREATE TABLE vehicles (
	id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    version VARCHAR(255) NOT NULL,
    gearbox VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    motorization VARCHAR(255) NOT NULL,
    plate VARCHAR(255) NOT NULL UNIQUE,
    value DECIMAL(10, 2),
    branchId INT NOT NULL,
    FOREIGN KEY (branchId) REFERENCES branches(id)
); 