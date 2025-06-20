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
    status INT NOT NULL DEFAULT 1,
    branchId INT NOT NULL
); 

ALTER TABLE vehicles
ADD CONSTRAINT fk_vehicles_branch
FOREIGN KEY (branchId) REFERENCES branches(id);

ALTER TABLE vehicles
ADD CONSTRAINT fk_vehicles_status
FOREIGN KEY (status) REFERENCES status(id);