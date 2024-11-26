document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el médico activo desde el Local Storage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActivo || usuarioActivo.rol !== 'medico') {
        // Si no hay usuario activo o no es médico, redirigir al login
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = 'login.html';
        return;
    }

    // Personalizar mensaje de bienvenida
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.textContent = `¡Hola, Dr./Dra. ${usuarioActivo.nombreUsuario}!`;

    // Mostrar citas agendadas específicas del médico activo
    cargarCitasAgendadas(usuarioActivo.licencia);
});

// Función para cargar citas agendadas filtradas por la licencia del médico
function cargarCitasAgendadas(licenciaMedico) {
    const citas = JSON.parse(localStorage.getItem('citas')) || [];
    const citasFiltradas = citas.filter(cita => cita.medico === licenciaMedico);

    const tablaCitas = document.getElementById('tablaCitas');
    tablaCitas.innerHTML = ''; // Limpiar contenido previo

    if (citasFiltradas.length === 0) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td colspan="6" style="text-align: center;">No tienes citas agendadas.</td>
        `;
        tablaCitas.appendChild(fila);
    } else {
        citasFiltradas.forEach(cita => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${cita.id}</td>
                <td>${cita.fechaHora}</td>
                <td>${cita.paciente}</td>
                <td>${cita.especialidad}</td>
                <td>${cita.motivo || 'No especificado'}</td>
                <td>${cita.estado}</td>
            `;
            tablaCitas.appendChild(fila);
        });
    }
}