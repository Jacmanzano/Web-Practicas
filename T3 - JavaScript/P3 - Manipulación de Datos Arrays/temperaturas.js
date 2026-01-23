let temperaturas = [-10, 0, 15, 22, 30, 35, 40];
let temperaturaMasBaja = temperaturas[0];
let temperaturaMasAlta = temperaturas[0];

for(let x= 0; x < temperaturas.length; x++){
    if(temperaturas[x] < temperaturaMasBaja){
        temperaturaMasBaja = temperaturas[x];
    }
    if(temperaturas[x] > temperaturaMasAlta){
        temperaturaMasAlta = temperaturas[x];
    }
}

let suma = 0;
for(let x= 0; x < temperaturas.length; x++) {
    suma += temperaturas[x];
}
let promedio = suma / temperaturas.length;

console.log("La temperatura más baja es: " + temperaturaMasBaja);
console.log("La temperatura mas alta es: " + temperaturaMasAlta);
console.log("El promedio es: " + promedio);

temperaturas.push(18);

for (let i = 0; i < temperaturas.length; i++) {
    for (let j = 0; j < temperaturas.length - 1; j++) {
        if (temperaturas[j] < temperaturas[j + 1]) {
            let temp = temperaturas[j];
            temperaturas[j] = temperaturas[j + 1];
            temperaturas[j + 1] = temp;
        }
    }
}

console.log("Array ordenado de mayor a menor:", temperaturas);