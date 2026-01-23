let colaClientes = ["Ana", "Roberto", "Lucía", "Marcos"];
console.log("Cola inicial:", colaClientes);

let siguiente = colaClientes[0];
console.log("El siguiente cliente es: " + siguiente);

let atendido = colaClientes.shift();
console.log("Se ha atendido a: " + atendido);
console.log("Cola después de atender:", colaClientes);

colaClientes.push("Elena");
console.log("Nuevo cliente llega: Elena");
console.log("Cola actualizada:", colaClientes);