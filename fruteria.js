//Array de frutas

const frutas = [
  { id: 1, nombre: "arandano", precio: 5000, imagen: "img/arandano.jpg" },
  { id: 2, nombre: "banana", precio: 1000, imagen: "img/banana.jpg" },
  { id: 3, nombre: "frambuesa", precio: 4000, imagen: "img/frambuesa.jpg" },
  { id: 4, nombre: "frutilla", precio: 3000, imagen: "img/frutilla.jpg" },
  { id: 5, nombre: "kiwi", precio: 2000, imagen: "img/kiwi.jpg" },
  { id: 6, nombre: "mandarina", precio: 800, imagen: "img/mandarina.jpg" },
  { id: 7, nombre: "manzana", precio: 1500, imagen: "img/manzana.jpg" },
  { id: 8, nombre: "naranja", precio: 2000, imagen: "img/naranja.jpg" },
  { id: 9, nombre: "pera", precio: 2500, imagen: "img/pera.jpg" },
  { id: 10, nombre: "anana", precio: 3000, imagen: "img/anana.jpg" },
  { id: 11, nombre: "pomelo-amarillo", precio: 2000, imagen: "img/pomelo-amarillo.jpg" },
  { id: 12, nombre: "pomelo-rojo", precio: 2000, imagen: "img/pomelo-rojo.jpg" },
  { id: 13, nombre: "granada", precio: 3500, imagen: "img/granada.jpg" }
];


//  Datos del alumno
function imprimirDatosAlumno() {
  const alumno = {
    dni: "12345678",
    nombre: "FABRICIO",
    apellido: "QUIROGA"
  };

  const nav = document.getElementById("nombre-alumno");
  nav.textContent = `${alumno.nombre}`;

  console.log(`Alumno: ${alumno.nombre} ${alumno.apellido} - DNI: ${alumno.dni}`);
}


//Mostrar productos (Genera y muestra las tarjetas de cada fruta en el contenedor)
function mostrarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";
  productos.forEach((fruta) => {
    const card = document.createElement("div");
    card.className = "card-producto";
    card.innerHTML = `
      <img src="${fruta.imagen}" alt="${fruta.nombre}">
      <h3>${fruta.nombre}</h3>
      <p>$${fruta.precio}</p>
      <button onclick="agregarAlCarrito(${fruta.id})">Agregar a carrito</button>
    `;
    contenedor.appendChild(card);
  });
}


// Filtro por input (Cuando el usuario escribe en el buscador, filtra las frutas que contengan ese texto y actualiza la lista mostrada.)
document.getElementById("inputBuscar").addEventListener("input", (e) => {
  const valor = e.target.value.toLowerCase();
  const filtrados = frutas.filter(fruta => fruta.nombre.includes(valor));
  mostrarProductos(filtrados);
});


// Carrito + localstorage + contador (Carga el carrito desde localStorage si existe. Busca la fruta por su ID, la agrega al carrito )
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarCarrito();

function agregarAlCarrito(id) {
  const fruta = frutas.find(f => f.id === id);
  carrito.push(fruta);
  guardarCarrito();
  actualizarCarrito();
  console.log("Carrito:", carrito);
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  actualizarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "bloque-item";
    // Define el contenido del <li> con nombre, precio y botón eliminar (me la rebusque)
    li.innerHTML = `
      <p class="nombre-item">${item.nombre} - $${item.precio}</p>
      <button class="boton-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });
}

function actualizarCarrito() {
  mostrarCarrito();
  document.getElementById("contador-carrito").textContent = `Carrito: ${carrito.length} productos`;
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);
  document.getElementById("total").textContent = `Total: $${total}`;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}


// Ordenar por nombre o precio 

document.getElementById("ordenar-nombre").addEventListener("click", () => {
  const ordenado = [...frutas].sort((a, b) => a.nombre.localeCompare(b.nombre));
  mostrarProductos(ordenado);
});

document.getElementById("ordenar-precio").addEventListener("click", () => {
  const ordenado = [...frutas].sort((a, b) => a.precio - b.precio);
  mostrarProductos(ordenado);
});


// Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
});


// Inicialización
function init() {
  imprimirDatosAlumno();
  mostrarProductos(frutas);
}

init();
