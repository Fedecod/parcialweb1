const especialidadForm = document.getElementById('especialidadForm');
const especialidadList = document.querySelector('#especialidadList ul');

// Evento para manejar el formulario de registro
especialidadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los valores de los campos
    const nombreEspecialidad = document.getElementById('nombreEspecialidad').value;
    const descripcionEspecialidad = document.getElementById('descripcionEspecialidad').value || 'No especificada';
    const estadoEspecialidad = document.getElementById('estadoEspecialidad').value;
    const idEspecialidad = `ESP-${Date.now()}`; // Generar un ID único
    const fechaCreacion = new Date().toLocaleDateString();

    // Validar que los campos obligatorios no estén vacíos
    if (nombreEspecialidad && estadoEspecialidad) {
        const nuevaEspecialidad = {
            id: idEspecialidad,
            nombre: nombreEspecialidad,
            descripcion: descripcionEspecialidad,
            estado: estadoEspecialidad,
            fechaCreacion,
        };

        agregarEspecialidad(nuevaEspecialidad);
        console.log('Especialidad registrada:', nuevaEspecialidad);
        especialidadForm.reset();
    } else {
        alert('Por favor, completa todos los campos obligatorios.');
    }
});

// Función para agregar una especialidad al listado
function agregarEspecialidad(especialidad) {
    const li = document.createElement('li');
    li.textContent = `${especialidad.nombre} (ID: ${especialidad.id}) - Estado: ${especialidad.estado} - Creada el: ${especialidad.fechaCreacion}`;
    especialidadList.appendChild(li);
}