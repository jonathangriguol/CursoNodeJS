const socket = io();

// Función para actualizar el listado automáticamente
const updateList = list => {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = list.map(({
        code, 
        title, 
        description, 
        price, 
        thumbnails, 
        stock
    }) => `<tr>
    <td>${code}</td>
    <td>${title}</td>
    <td>${description}</td>
    <td>${price}</td>
    <td>${thumbnails}</td>
    <td>${stock}</td>
    </tr>`).join('');
}

// Escuchar el evento updateList y llamar a la función para actualizar la interfaz
socket.on('updateList', (data) => {
    updateList(data.list);
});

// Cuando todo se carga, ejecuto este codigo
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }})
    .then(response => response.json())
    .then(data => {
        updateList(data.products);
    })
    .catch(error => {
    console.error('Error al cargar el listado:', error);
    });
});

// Enviar el formulario mediante AJAX para evitar la recarga de la página
document.getElementById('data-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    // Enviar el nuevo dato al servidor
    fetch('/api/products', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            code: formData.get('code'),
            title: formData.get('title'),
            description: formData.get('description'),
            price: formData.get('price'),
            thumbnails: formData.get('thumbnails'),
            stock: formData.get('stock'),
            category: formData.get('category'),
            status: formData.get('status'),
        }),
    });

    // Limpio el campo de entrada después de enviar los datos
    document.getElementById('code').value = '';
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnails').value = '';
    document.getElementById('stock').value = '';
    document.getElementById('category').value = '';
    document.getElementById('status').value = '';
});