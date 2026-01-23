let texto = "  ¡Hola mundo!  ";
console.log(texto);
console.log(texto.length);
console.log(texto.toUpperCase());
console.log(texto.toLowerCase());
console.log(texto.trim());

let hola = "¡Hola mundo!";
console.log(hola.split(" ")[0]);
console.log(hola.slice(0, 5));

let frase = "I Love Days Of JavaScript";
console.log(frase.substring(7));
console.log(frase.includes("Days"));
console.log(frase.split(""));
console.log(frase.split(" "));

let marcas = "Facebook, Google, Microsoft, Apple, IBM, Oracle, Amazon";
console.log(marcas.split(", "));

console.log(frase.replace("Days", "Weeks"));
console.log(frase.charAt(15));
console.log(frase.indexOf("a"));
console.log(frase.lastIndexOf("a"));

let frase2 = 'You cannot end a sentence with because, because it is a conjunction';
console.log(frase2.indexOf("because"));
console.log(frase2.lastIndexOf("because"));

console.log('I love' + ' sunny days');

let frase3 = 'These Are Days Of JavaScript';
console.log(frase3.startsWith("These"));
console.log(frase3.endsWith("JavaScript"));

console.log('I love sunny days '.repeat(10));

console.log("La cita 'No hay mejor ejercicio para el corazón que ayudar a levantar a las personas.' de John Holmes nos enseña a ayudarnos mutuamente.");
console.log("El amor no es condescendencia, y la caridad no es lástima. La caridad y el amor son lo mismo; con caridad das amor, así que no des solo dinero, extiende también tu mano.");

console.log(Number('10') === 10);
console.log(Math.ceil(parseFloat('9.8')) === 10);
console.log(Math.floor(Math.random() * 256));

let frase4 = 'El trabajo es una cosa difícil en este mundo. A algunas personas les gusta trabajar, pero muchas aún buscan fuerza para trabajar todos los días.';
console.log(frase4.match(/trabajo/gi).length);