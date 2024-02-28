const socket = io();

// Función para actualizar el listado automáticamente
const updateList = (data) => {
  const listContainer = document.getElementById("list-container");
  listContainer.innerHTML = data.products
    .map(
      ({ code, title, description, price, thumbnails, stock }) => `<tr>
    <td>${code}</td>
    <td>${title}</td>
    <td>${description}</td>
    <td>${price}</td>
    <td>${thumbnails}</td>
    <td>${stock}</td>
    </tr>`
    )
    .join("");
};

// Escuchar el evento updateList y llamar a la función para actualizar la interfaz
socket.on("updateList", (data) => {
  updateList(data);
});

// Cuando todo se carga, ejecuto este codigo
/*document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/api/products', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }})
    .then(response => response.json())
    .then(data => {
        productsData = data
        //updateList(data);
    })
    .catch(error => {
    console.error('Error al cargar el listado:', error);
    });
});*/

// Función para manejar el clic en el botón "Add to cart"
function addToCartHandler(event) {
    // Obtén el ID del producto desde el atributo de datos del botón
    const productId = event.target.dataset.productId;
    
    // Aquí puedes llamar a tu API con el ID del producto
    // Por ejemplo:
    // fetch(`/api/cart/add/${productId}`, {
    //   method: 'POST',
    //   // Otras opciones de configuración, como encabezados, cuerpo, etc.
    // })
    // .then(response => {
    //   // Manejar la respuesta de la API
    // })
    // .catch(error => {
    //   // Manejar errores
    // });
    
    // Solo para fines de demostración
    console.log(`Product ID ${productId} added to cart`);
  }
  
document.addEventListener("DOMContentLoaded", () => {
  let pageSizeInput = document.getElementById("limit");

  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = urlParams.get("page");
  const currentSort = urlParams.get("sort");
  const currentOrder = urlParams.get("order");

  document.getElementById("applyLimit").addEventListener("click", () => {
    updatePageUrl();
  });

  // Listener para el selector de campo de ordenamiento
  document.getElementById("sortField").addEventListener("change", () => {
    updatePageUrl();
  });

  // Listener para el selector de dirección de ordenamiento
  document.getElementById("sortOrder").addEventListener("change", () => {
    updatePageUrl();
  });

  const updatePageUrl = () => {
    let sortField = document.getElementById("sortField").value;
    let sortOrder = document.getElementById("sortOrder").value;
    let pageSize = parseInt(pageSizeInput.value);
    if (!isNaN(pageSize) && pageSize > 0) {
      // Redirigir a la misma página con los nuevos valores de ordenamiento
      window.location.href = `realtimeproducts?page=${currentPage}&limit=${pageSize}&sort=${sortField}&order=${sortOrder}`;
    } else {
      alert("Por favor, ingrese un tamaño de paginación válido (mayor que 0).");
    }
  };

  // Escucha eventos de clic en los botones "Add to cart"
  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", addToCartHandler);
  });
});


// Enviar el formulario mediante AJAX para evitar la recarga de la página
document
  .getElementById("data-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Enviar el nuevo dato al servidor
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: formData.get("code"),
        title: formData.get("title"),
        description: formData.get("description"),
        price: formData.get("price"),
        thumbnails: formData.get("thumbnails"),
        stock: formData.get("stock"),
        category: formData.get("category"),
        status: formData.get("status"),
      }),
    });

    // Limpio el campo de entrada después de enviar los datos
    document.getElementById("code").value = "";
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("thumbnails").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("category").value = "";
    document.getElementById("status").value = "";
  });
