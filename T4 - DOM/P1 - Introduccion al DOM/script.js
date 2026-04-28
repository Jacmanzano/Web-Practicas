const primerParrafo = document.querySelector('p');
console.log(primerParrafo.textContent);

const parrafos = document.querySelectorAll('p');
parrafos.forEach((p, i) => {
    console.log(p.textContent);
    p.setAttribute('id', 'parrafo-' + (i + 1));
    p.setAttribute('class', 'clase-p-' + (i + 1));
    
    if (i === 0) {
        p.style.color = '#ffffff';
        p.style.background = '#4a90e2';
        p.style.border = '2px solid #2a5a8e';
        p.style.fontFamily = 'Arial';
        p.style.fontSize = '16px';
    } else if (i === 1) {
        p.style.color = '#333333';
        p.style.background = '#f5f5f5';
        p.style.border = '1px dashed #999';
        p.style.fontFamily = 'Verdana';
        p.style.fontSize = '18px';
    } else if (i === 2) {
        p.style.color = '#d0021b';
        p.style.background = '#fff5f5';
        p.style.border = '2px double #d0021b';
        p.style.fontFamily = 'Courier New';
        p.style.fontSize = '14px';
    } else if (i === 3) {
        p.style.color = '#417505';
        p.style.background = '#f8e71c';
        p.style.border = '1px solid #417505';
        p.style.fontFamily = 'Georgia';
        p.style.fontSize = '20px';
    }
});

parrafos[parrafos.length - 1].textContent = 'Este es el último párrafo';

const spanColor = document.querySelector('h2 span');
setInterval(() => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    spanColor.style.color = randomColor;
}, 1000);

const items = document.querySelectorAll('li');
items.forEach(li => {
    if (li.textContent.includes('Terminado')) {
        li.style.backgroundColor = '#90ee90';
    } else if (li.textContent.includes('En progreso')) {
        li.style.backgroundColor = '#ffffa0';
    } else if (li.textContent.includes('Próximo')) {
        li.style.backgroundColor = '#ffcc99';
    }
});

const docBody = document.body;
docBody.style.display = 'flex';
docBody.style.flexDirection = 'column';
docBody.style.alignItems = 'center';
docBody.style.justifyContent = 'center';
docBody.style.textAlign = 'center';
docBody.style.margin = '20px';

function esNumeroPrimo(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const contenedorNum = document.getElementById('numeros');
for (let i = 1; i <= 100; i++) {
    const caja = document.createElement('div');
    caja.textContent = i;
    if (esNumeroPrimo(i)) {
        caja.style.backgroundColor = '#f3c0f3';
    } else if (i % 2 === 0) {
        caja.style.backgroundColor = '#b2f2bb';
    } else {
        caja.style.backgroundColor = '#fff3bf';
    }
    contenedorNum.appendChild(caja);
}