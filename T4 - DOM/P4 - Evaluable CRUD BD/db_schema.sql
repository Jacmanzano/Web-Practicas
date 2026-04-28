-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS lol_manager_db;
USE lol_manager_db;

-- CREACIÓN DE LA TABLA CAMPEONES
CREATE TABLE IF NOT EXISTS campeones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    dificultad VARCHAR(20) NOT NULL,
    precio INT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INSERCIÓN DE DATOS DE EJEMPLO
INSERT INTO campeones (nombre, rol, dificultad, precio) VALUES
('Ahri', 'Mago', 'Media', 3150),
('Garen', 'Luchador', 'Baja', 450),
('Thresh', 'Apoyo', 'Alta', 4800),
('Lee Sin', 'Jungla', 'Alta', 4800),
('Jinx', 'Tirador', 'Media', 4800);
