function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var draggedItem = document.getElementById(data);
    var loader = document.getElementById('loader');

    // Mostrar la animación de carga
    loader.style.display = 'block';

    // Simular una carga (para demostración)
    setTimeout(function () {
        event.target.classList.remove('hover');
        event.target.appendChild(draggedItem);
        loader.style.display = 'none'; // Ocultar la animación después de la carga
    }, 1000); // Tiempo de simulación de carga en milisegundos
}

// Permitir arrastrar el elemento fuera del contenedor
document.addEventListener("dragstart", function (event) {
    var dragItem = event.target;
    if (dragItem.classList.contains('drag-item')) {
        dragItem.style.opacity = '0.5'; // Cambiar la opacidad durante el arrastre
    }
});

document.addEventListener("dragend", function (event) {
    var dragItem = event.target;
    if (dragItem.classList.contains('drag-item')) {
        dragItem.style.opacity = ''; // Restaurar la opacidad después de soltar
    }
});