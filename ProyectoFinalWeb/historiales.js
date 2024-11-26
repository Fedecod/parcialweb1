const historialForm = document.getElementById('historialForm');
const historialList = document.querySelector('#historialList ul');

// Validación de rol (Simulada: Solo médicos pueden agregar/editar)
document.addEventListener('DOMContentLoaded', () => {
    const esMedico = validarRol();
    if (!esMedico) {
        alert('Acceso denegado: Solo el personal médico puede gestionar historiales médicos.');
        historialForm.style.display = 'none';
    }
});

// Función para validar el rol (Simulación)
function validarRol() {
    const usuario = { rol: 'medico' }; // Cambiar a 'paciente' para probar acceso denegado
    return usuario.rol === 'medico';
}

// Manejar el formulario de registro de historial
historialForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los valores de los campos
    const pacienteId = document.getElementById('pacienteId').value;
    const fechaConsulta = document.getElementById('fechaConsulta').value;
    const diagnostico = document.getElementById('diagnostico').value;
    const tratamiento = document.getElementById('tratamiento').value || 'No especificado';
    const notasAdicionales = document.getElementById('notasAdicionales').value || 'No especificadas';
    const adjuntos = document.getElementById('adjuntos').files[0] || 'Sin adjuntos';
    const historialId = `HIST-${Date.now()}`; // Generar ID único

    // Validaciones
    if (pacienteId && fechaConsulta && diagnostico) {
        const nuevoHistorial = {
            id: historialId,
            pacienteId,
            fechaConsulta,
            diagnostico,
            tratamiento,
            notasAdicionales,
            adjuntos: adjuntos.name || 'Sin adjuntos',
        };

        agregarHistorial(nuevoHistorial);
        console.log('Historial registrado:', nuevoHistorial);
        historialForm.reset();
    } else {
        alert('Por favor, completa todos los campos obligatorios.');
    }
});

// Función para agregar un historial al listado
function agregarHistorial(historial) {
    const li = document.createElement('li');
    li.textContent = `Paciente ID: ${historial.pacienteId}, Fecha: ${historial.fechaConsulta}, Diagnóstico: ${historial.diagnostico}, Tratamiento: ${historial.tratamiento}, Notas: ${historial.notasAdicionales}, Adjuntos: ${historial.adjuntos}`;
    historialList.appendChild(li);
}