const medicoForm = document.getElementById('medicoForm');
const medicoList = document.querySelector('#medicoList ul');
const especialidadSelect = document.getElementById('especialidad');

// Cargar especialidades dinámicamente
document.addEventListener('DOMContentLoaded', () => {
    const especialidades = obtenerEspecialidades();
    especialidades.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad;
        option.textContent = especialidad;
        especialidadSelect.appendChild(option);
    });
});

// Simular obtención de especialidades disponibles
function obtenerEspecialidades() {
    return ['Cardiología', 'Pediatría', 'Neurología', 'Dermatología', 'Oncología']; // Se pueden cargar desde un servidor en un entorno real
}

// Manejar el formulario de registro de médicos
medicoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los valores de los campos
    const nombreMedico = document.getElementById('nombreMedico').value;
    const licenciaProfesional = document.getElementById('licenciaProfesional').value;
    const especialidad = document.getElementById('especialidad').value;
    const telefonoMedico = document.getElementById('telefonoMedico').value || 'No especificado';
    const idMedico = `MED-${Date.now()}`; // Generar un ID único

    // Validar campos obligatorios
    if (nombreMedico && licenciaProfesional && especialidad) {
        const nuevoMedico = {
            id: idMedico,
            nombre: nombreMedico,
            licencia: licenciaProfesional,
            especialidad,
            telefono: telefonoMedico
        };

        agregarMedico(nuevoMedico);
        console.log('Médico registrado:', nuevoMedico);
        medicoForm.reset();
    } else {
        alert('Por favor, completa todos los campos obligatorios.');
    }
});

// Función para agregar un médico al listado
function agregarMedico(medico) {
    const li = document.createElement('li');
    li.textContent = `${medico.nombre} (ID: ${medico.id}) - Licencia: ${medico.licencia} - Especialidad: ${medico.especialidad} - Tel: ${medico.telefono}`;
    medicoList.appendChild(li);
}