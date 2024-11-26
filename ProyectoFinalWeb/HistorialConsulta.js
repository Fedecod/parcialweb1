document.addEventListener('DOMContentLoaded', () => {
    // Recuperar usuario activo desde el Local Storage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActivo || usuarioActivo.rol !== 'paciente') {
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = 'login.html';
        return;
    }

    // Cargar historiales médicos del paciente activo
    cargarHistoriales(usuarioActivo.id);
});

// Función para cargar historiales médicos filtrados por ID de paciente
function cargarHistoriales(idPaciente) {
    const historiales = JSON.parse(localStorage.getItem('historiales')) || [];
    const historialesFiltrados = historiales.filter(historial => historial.pacienteId === idPaciente);

    const tablaHistoriales = document.getElementById('tablaHistoriales');
    tablaHistoriales.innerHTML = ''; // Limpiar contenido previo

    if (historialesFiltrados.length === 0) {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td colspan="5" style="text-align: center;">No se encontraron historiales médicos.</td>`;
        tablaHistoriales.appendChild(fila);
    } else {
        historialesFiltrados.forEach(historial => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${historial.id}</td>
                <td>${historial.fechaConsulta}</td>
                <td>${historial.diagnostico}</td>
                <td>${historial.tratamiento || 'No especificado'}</td>
                <td>${historial.notasAdicionales || 'Sin notas'}</td>
            `;
            tablaHistoriales.appendChild(fila);
        });
    }
}