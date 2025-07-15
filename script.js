document.addEventListener("DOMContentLoaded", function () {
  // Validación del formulario
  const form = document.getElementById("newsletter-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const message = document.getElementById("form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    let errorMessage = "";

    if (name.length < 3) {
      errorMessage = "El nombre debe tener al menos 3 caracteres.";
    } else if (!validateEmail(email)) {
      errorMessage = "Por favor ingresá un correo electrónico válido.";
    }

    if (errorMessage) {
      message.style.color = "red";
      message.textContent = errorMessage;
    } else {
      message.style.color = "green";
      message.textContent = `¡Gracias por suscribirte, ${name}!`;
      form.reset();
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Productos
  const productos = [
    { id: 1, nombre: "Set de Cocina", categoria: "COCINA", imagen: "img/cocina.webp", precio: 14999 },
    { id: 2, nombre: "Centro de Mesa", categoria: "MESA", imagen: "img/BINAH_128.jpg.webp", precio: 18999 },
    { id: 3, nombre: "Set Café & Té", categoria: "CAFÉ Y TÉ", imagen: "img/cafe.webp", precio: 12999 },
    { id: 4, nombre: "Organizador de Baño", categoria: "BAÑO", imagen: "img/Imagen.jpg", precio: 10999 },
    { id: 5, nombre: "Decoración Floral", categoria: "DECORACION", imagen: "img/deco.webp", precio: 9999 },
    { id: 6, nombre: "Set Asado & Vino", categoria: "ASADO & VINO", imagen: "img/asado.webp", precio: 19999 },
    { id: 7, nombre: "Difusor Aromático", categoria: "AROMAS", imagen: "img/BINAH16244.jpg.webp", precio: 7999 },
    { id: 8, nombre: "Pack Colección", categoria: "COLLECTION", imagen: "img/004241.jpg.webp", precio: 22999 }
  ];

  const contenedor = document.getElementById("grid-productos");

  productos.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
      <div class="img-container">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="overlay"></div>
      </div>
      <div class="etiqueta">
        <div class="numero">${producto.id < 10 ? "0" + producto.id : producto.id}.</div>
        <span class="categoria">${producto.categoria}</span>
      </div>
      <h3 class="nombre">${producto.nombre}</h3>
      <p class="precio">$${producto.precio.toLocaleString()}</p>
      <button class="btn-agregar" data-id="${producto.id}">Agregar al carrito</button>
    `;

    contenedor.appendChild(card);
  });

  // Carrito
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(p => p.id === id);

    if (itemEnCarrito) {
      itemEnCarrito.cantidad += 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
  }

  function actualizarContadorCarrito() {
    const total = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    const contador = document.getElementById("contador-carrito");
    if (contador) {
      contador.textContent = total;
    }
  }
  // Función para vaciar el carrito
const btnVaciar = document.getElementById("vaciar-carrito");
if (btnVaciar) {
  btnVaciar.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
      carrito.length = 0; // Vacía el array
      localStorage.removeItem("carrito"); // Borra el storage
      actualizarContadorCarrito(); // Refresca el contador
      alert("Carrito vaciado correctamente.");
    }
  });
}

  // Delegación de eventos
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-agregar")) {
      const id = parseInt(e.target.getAttribute("data-id"));
      agregarAlCarrito(id);
    }
  });

  // Mostrar cantidad al cargar
  actualizarContadorCarrito();

  // Room inspiration mensajes
  const mensajes = [
    "Inspirate con este living.",
    "Diseña tu cocina soñada.",
    "Decorá tu consola con calidez.",
    "Creá un espacio verde único."
  ];

  const imagenesRoom = document.querySelectorAll('.room-inspiration .img-container');
  imagenesRoom.forEach((imgContainer, index) => {
    const mensajeDiv = imgContainer.querySelector('.mensaje-secreto');
    imgContainer.addEventListener('mouseover', () => {
      mensajeDiv.textContent = mensajes[index];
    });
    imgContainer.addEventListener('mouseout', () => {
      mensajeDiv.textContent = '';
    });
  });
});
 