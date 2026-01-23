let oracion = "Hola me llamo carlos, esto es una prueba de una oracion de texto";
const palabras = oracion.split(" ");
const palabrasLargas = palabras.filter(palabra => palabras.length > 5);
const palabrasMayusculas = palabrasLargas.map(palabra => palabra.toUpperCase());
const palabrasOrdenadas = palabrasMayusculas.sort();

console.log("Original: " +  palabras);
console.log("Filtradas por mas de 5 letras: " + palabrasLargas);
console.log("Resultado final: " + palabrasOrdenadas);
