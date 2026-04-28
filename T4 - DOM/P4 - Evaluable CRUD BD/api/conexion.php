<?php
// Configuración de la cabecera para evitar problemas de CORS y definir JSON como salida
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Si es una petición OPTIONS, salir de inmediato (Pre-flight request de CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuración de la base de datos (XAMPP por defecto)
$host = "localhost";
$db_name = "lol_manager_db";
$username = "root";
$password = "";

/* ========================================================
   OPCIÓN 1: CONEXIÓN USANDO PDO (Recomendada y Moderna)
   ======================================================== */
try {
    $conexion = new PDO("mysql:host=" . $host . ";dbname=" . $db_name . ";charset=utf8", $username, $password);
    // Configurar el modo de error de PDO a excepción
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Configurar la persistencia de datos devueltos en forma de arrays asociativos
    $conexion->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $exception) {
    http_response_code(500); // 500 Internal Server Error
    echo json_encode(array("mensaje" => "Error de conexión a la base de datos (PDO): " . $exception->getMessage()));
    exit();
}

/* ========================================================
   OPCIÓN 2: CONEXIÓN USANDO MySQLi (Estilo Orientado a Objetos)
   (Descomentar si prefieres usar esta forma. Deberás
   adaptar el archivo campeones.php para usar $conexion->query / prepare)
   ======================================================== */
/*
$conexion_mysqli = new mysqli($host, $username, $password, $db_name);

// Comprobar la conexión
if ($conexion_mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(array("mensaje" => "Error de conexión a la base de datos (MySQLi): " . $conexion_mysqli->connect_error));
    exit();
}
// Establecer el charset a utf8
$conexion_mysqli->set_charset("utf8");
*/
?>