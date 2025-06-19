CREATE TABLE status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO status (name) VALUES ("Disponível");
INSERT INTO status (name) VALUES ("Vendido");