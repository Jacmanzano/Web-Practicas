<?php
// Incluir el archivo de conexión
include_once 'conexion.php';

// Detectar el método de la solicitud (GET, POST, PUT, DELETE)
$metodo = $_SERVER['REQUEST_METHOD'];

switch($metodo) {
    case 'GET':
        // ============================================
        // READ: OBTENER TODOS LOS CAMPEONES
        // ============================================
        try {
            $query = "SELECT id, nombre, rol, dificultad, precio FROM campeones ORDER BY id DESC";
            $stmt = $conexion->prepare($query);
            $stmt->execute();
            
            $campeones = $stmt->fetchAll();
            
            http_response_code(200); // OK
            echo json_encode($campeones);
        } catch(PDOException $e) {
            http_response_code(500);
            echo json_encode(["mensaje" => "Error al obtener campeones: " . $e->getMessage()]);
        }
        break;

    case 'POST':
        // ============================================
        // CREATE: AÑADIR UN NUEVO CAMPEÓN
        // ============================================
        // Leer los datos en formato JSON enviados en el body
        $datos = json_decode(file_get_contents("php://input"));
        
        if(!empty($datos->nombre) && !empty($datos->rol) && !empty($datos->dificultad) && isset($datos->precio)) {
            try {
                $query = "INSERT INTO campeones (nombre, rol, dificultad, precio) VALUES (:nombre, :rol, :dificultad, :precio)";
                $stmt = $conexion->prepare($query);
                
                // Limpiar datos
                $nombre = htmlspecialchars(strip_tags($datos->nombre));
                $rol = htmlspecialchars(strip_tags($datos->rol));
                $dificultad = htmlspecialchars(strip_tags($datos->dificultad));
                $precio = htmlspecialchars(strip_tags($datos->precio));
                
                // Bind de los parámetros
                $stmt->bindParam(":nombre", $nombre);
                $stmt->bindParam(":rol", $rol);
                $stmt->bindParam(":dificultad", $dificultad);
                $stmt->bindParam(":precio", $precio);
                
                if($stmt->execute()) {
                    http_response_code(201); // Created
                    echo json_encode(["mensaje" => "Campeón creado correctamente.", "id" => $conexion->lastInsertId()]);
                } else {
                    http_response_code(503); // Service Unavailable
                    echo json_encode(["mensaje" => "No se pudo crear el campeón."]);
                }
            } catch(PDOException $e) {
                http_response_code(500);
                echo json_encode(["mensaje" => "Error al insertar: " . $e->getMessage()]);
            }
        } else {
            http_response_code(400); // Bad Request
            echo json_encode(["mensaje" => "Datos incompletos. Se requieren nombre, rol, dificultad y precio."]);
        }
        break;

    case 'PUT':
        // ============================================
        // UPDATE: ACTUALIZAR UN CAMPEÓN EXISTENTE
        // ============================================
        $datos = json_decode(file_get_contents("php://input"));
        
        if(!empty($datos->id) && !empty($datos->nombre) && !empty($datos->rol) && !empty($datos->dificultad) && isset($datos->precio)) {
            try {
                $query = "UPDATE campeones SET nombre = :nombre, rol = :rol, dificultad = :dificultad, precio = :precio WHERE id = :id";
                $stmt = $conexion->prepare($query);
                
                $id = htmlspecialchars(strip_tags($datos->id));
                $nombre = htmlspecialchars(strip_tags($datos->nombre));
                $rol = htmlspecialchars(strip_tags($datos->rol));
                $dificultad = htmlspecialchars(strip_tags($datos->dificultad));
                $precio = htmlspecialchars(strip_tags($datos->precio));
                
                $stmt->bindParam(":id", $id);
                $stmt->bindParam(":nombre", $nombre);
                $stmt->bindParam(":rol", $rol);
                $stmt->bindParam(":dificultad", $dificultad);
                $stmt->bindParam(":precio", $precio);
                
                if($stmt->execute()){
                    if($stmt->rowCount() > 0) {
                        http_response_code(200); // OK
                        echo json_encode(["mensaje" => "Campeón actualizado correctamente."]);
                    } else {
                        http_response_code(404); // Not Found (no se modificó nada o no existe)
                        echo json_encode(["mensaje" => "No se encontró el campeón o no hubo cambios."]);
                    }
                } else {
                    http_response_code(503);
                    echo json_encode(["mensaje" => "No se pudo actualizar el campeón."]);
                }
            } catch(PDOException $e) {
                http_response_code(500);
                echo json_encode(["mensaje" => "Error al actualizar: " . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensaje" => "Datos incompletos, asegúrate de proporcionar el ID."]);
        }
        break;

    case 'DELETE':
        // ============================================
        // DELETE: ELIMINAR UN CAMPEÓN POR SU ID
        // ============================================
        $datos = json_decode(file_get_contents("php://input"));
        
        // El id puede venir en el JSON body o en la querystring (?id=X). Vamos a soportar JSON
        if(!empty($datos->id)) {
            try {
                $query = "DELETE FROM campeones WHERE id = :id";
                $stmt = $conexion->prepare($query);
                
                $id = htmlspecialchars(strip_tags($datos->id));
                $stmt->bindParam(":id", $id);
                
                if($stmt->execute()) {
                    if($stmt->rowCount() > 0) {
                        http_response_code(200);
                        echo json_encode(["mensaje" => "Campeón eliminado correctamente."]);
                    } else {
                        http_response_code(404);
                        echo json_encode(["mensaje" => "Campeón no encontrado."]);
                    }
                } else {
                    http_response_code(503);
                    echo json_encode(["mensaje" => "No se pudo eliminar el campeón."]);
                }
            } catch(PDOException $e) {
                http_response_code(500);
                echo json_encode(["mensaje" => "Error al eliminar: " . $e->getMessage()]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["mensaje" => "ID no proporcionado para la eliminación."]);
        }
        break;

    default:
        // Método no soportado
        http_response_code(405); // Method Not Allowed
        echo json_encode(["mensaje" => "Método no permitido."]);
        break;
}
?>
