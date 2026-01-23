var nombre;
var apellidos;
var edad;

nombre = prompt("Cual es tu nombre?");
apellidos = prompt("Cuales son tus apellidos?");
edad = prompt("Cual es tu edad?");

if(edad < 18) {
    alert("Bienvenido niño! Te voy a hacer unas preguntas!.")
    var colorfav = prompt("Cual es tu color favorito?");
} else {
    alert("Bienvenido a la pagina web! +18");
}

alert("Finalizando el asistente..." + nombre + " " + apellidos)