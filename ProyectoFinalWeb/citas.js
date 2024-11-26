const citaForm = document.getElementById('citaForm');
const citaList = document.querySelector('#citaList ul');
const especialidadSelect = document.getElementById('especialidadCita');
const medicoSelect = document.getElementById('medicoCita');

// Cargar especialidades y médicos dinámicamente
document.addEventListener('DOMContentLoaded', () => {
    const especialidades = obtenerEspecialidades();
    especialidades.forEach(especialidad => {
        const option = document.createElement('option');
        option.value = especialidad;
        option.textContent = especialidad;
        especialidadSelect.appendChild(option);
    });

    const medicos = obtenerMedicos();
    medicos.forEach(medico => {
        const option = document.createElement('option');
        option.value = medico.id;
        option.textContent = `${medico.nombre} (${medico.especialidad})`;
        medicoSelect.appendChild(option);
    });
});

// Manejar el formulario de registro de citas
citaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const fechaHora = new Date(document.getElementById('fechaHora').value);
    const especialidadCita = document.getElementById('especialidadCita').value;
    const medicoCita = document.getElementById('medicoCita').value;
    const estadoCita = document.getElementById('estadoCita').value;
    const motivoConsulta = document.getElementById('motivoConsulta').value || 'No especificado';
    const idCita = `CITA-${Date.now()}`;

    // Validaciones
    if (!validarFechaHora(fechaHora)) {
        alert('La fecha y hora deben ser futuras y dentro del horario permitido (8:00 AM - 12:00 PM, 2:00 PM - 6:00 PM).');
        return;
    }

    if (especialidadCita && medicoCita) {
        const nuevaCita = {
            id: idCita,
            fechaHora: fechaHora.toLocaleString(),
            especialidad: especialidadCita,
            medico: medicoCita,
            estado: estadoCita,
            motivo: motivoConsulta,
        };

        agregarCita(nuevaCita);
        console.log('Cita registrada:', nuevaCita);
        citaForm.reset();
    } else {
        alert('Por favor, selecciona una especialidad y un médico.');
    }
});

// Validar fecha y hora de la cita
function validarFechaHora(fecha) {
    const ahora = new Date();
    const horarioPermitido = [
        { inicio: 8, fin: 12 },
        { inicio: 14, fin: 18 },
    ];

    if (fecha <= ahora) return false;

    const hora = fecha.getHours();
    return horarioPermitido.some(rango => hora >= rango.inicio && hora < rango.fin);
}

// Agregar cita al listado
function agregarCita(cita) {
    const li = document.createElement('li');
    li.textContent = `ID: ${cita.id}, Fecha y Hora: ${cita.fechaHora}, Especialidad: ${cita.especialidad}, Médico: ${cita.medico}, Estado: ${cita.estado}, Motivo: ${cita.motivo}`;
    citaList.appendChild(li);
}