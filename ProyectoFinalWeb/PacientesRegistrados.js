document.addEventListener('DOMContentLoaded', () => {
    const tablaPacientes = document.getElementById('tablaPacientes');
    const pacientesRegistrados = obtenerPacientesRegistrados();

    if (pacientesRegistrados.length > 0) {
        pacientesRegistrados.forEach((paciente) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.id}</td>
                <td>${paciente.nombre}</td>
                <td>${paciente.identificacion}</td>
                <td>${paciente.telefono}</td>
                <td>${paciente.correo || 'N/A'}</td>
                <td>${paciente.estado}</td>
            `;
            tablaPacientes.appendChild(row);
        });
    } else {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `<td colspan="6" style="text-align: center;">No hay pacientes registrados.</td>`;
        tablaPacientes.appendChild(noDataRow);
    }
});

// Función para obtener pacientes registrados del Local Storage
function obtenerPacientesRegistrados() {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.filter((usuario) => usuario.rol === 'paciente');
}
