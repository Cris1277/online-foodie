// VARIABLES
let selector = document.getElementById('miSelector');
let input = document.getElementById('miInput');
let boton = document.getElementById('miBoton');
let lista = document.getElementById('miListado');

let archivo = 'recetas_espanolas.json';

// ESCUCHADORES DE EVENTOS
selector.addEventListener('change', cambiarArchivo);
selector.addEventListener('cambioModo', mensajeModo);
input.addEventListener('keydown', verificarInput);
boton.addEventListener('click', buscar);

// FUNCIONES
function cambiarArchivo() {
    archivo = selector.value;
    let evento = new CustomEvent('cambioModo');
    selector.dispatchEvent(evento);
}

function mensajeModo() {
    console.log("El archivo de búsqueda ahora es " + selector.value);
}

function verificarInput(evento) {
    if ((evento.keyCode < 65 || evento.keyCode > 90) && evento.keyCode != 32 && evento.keyCode != 8) {
        evento.preventDefault();
    }
}

function buscar() {
    lista.innerHTML = "";
    let encontrado = false; // Bandera para saber si se encontró un plato

    fetch(archivo)
        .then(respuesta => respuesta.json())
        .then(function (salida) {
            for (let item of salida.data) {
                if (item.nombre.toLowerCase().startsWith(input.value.trim().toLowerCase())) {
                    encontrado = true; // Se encontró al menos un resultado

                    let card = document.createElement('div');
                    card.classList.add('card');

                    let nombre = document.createElement('strong');
                    nombre.textContent = item.nombre;
                    nombre.classList.add('card-title');

                    let img = document.createElement("img");
                    img.setAttribute("src", item.imagen);
                    img.classList.add('card-image');

                    img.style.objectFit = "cover";

                    let descripcion = document.createElement('p');
                    descripcion.textContent = item.descripcion;
                    descripcion.classList.add('card-description');

                    card.appendChild(nombre);
                    card.appendChild(img);
                    card.appendChild(descripcion);
                    lista.appendChild(card);
                }
            }

            // Si no se encontró ningún resultado, mostrar alerta fuera del bucle
            if (!encontrado) {
                console.log(`Plato no encontrado en ${archivo}`)
                alert(`Plato no encontrado en esta sección, consulta las otras opciones`);
                location.reload();
            }

            // Verificar si el footer ya tiene el texto para no duplicarlo
            let footer = document.getElementById("footer");
            if (!document.getElementById("textoFooter")) {
                let textoFooter = document.createElement("p");
                textoFooter.id = "textoFooter"; // Asignamos un ID para evitar duplicados
                textoFooter.style.fontSize = "25px";
                textoFooter.style.padding = "20px";
                textoFooter.innerHTML = `Desarrollado por bitnazari © Todos los derechos reservados.<br>
                Más proyectos disponibles en  <a id="myLink" href="https://www.bitnazari.com/">bitnazari.com</a> `;
                textoFooter.style.textAlign = "center";
                footer.appendChild(textoFooter);
            }
        })
        .catch(function (error) {
            console.log("Error al cargar el archivo JSON:", error);
        });
}


