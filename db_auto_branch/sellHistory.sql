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