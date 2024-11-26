document.addEventListener('DOMContentLoaded', () => {
    const tablaPacientes = document.getElementById('tablaPacientes');
    const tablaMedicos = document.getElementById('tablaMedicos');

    const pacientesRegistrados = obtenerUsuariosPorRol('paciente');
    const medicosRegistrados = obtenerUsuariosPorRol('medico');

    // Mostrar pacientes en la tabla
    if (pacientesRegistrados.length > 0) {
        pacientesRegistrados.forEach((paciente) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${paciente.id}</td>
                <td>${paciente.nombreCompleto}</td>
                <td>${paciente.numeroIdentificacion}</td>
                <td>${paciente.telefono}</td>
                <td>${paciente.correo || 'N/A'}</td>
                <td>${paciente.estado}</td>
                <td>
                    <button class="danger" onclick="eliminarUsuario('${paciente.id}')">Eliminar</button>
                </td>
            `;
            tablaPacientes.appendChild(row);
        });
    } else {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `<td colspan="7" style="text-align: center;">No hay pacientes registrados.</td>`;
        tablaPacientes.appendChild(noDataRow);
    }

    // Mostrar médicos en la tabla
    if (medicosRegistrados.length > 0) {
        medicosRegistrados.forEach((medico) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${medico.id}</td>
                <td>${medico.nombreCompleto}</td>
                <td>${medico.numeroLicencia}</td>
                <td>${medico.especialidad}</td>
                <td>${medico.telefono}</td>
                <td>${medico.estado}</td>
                <td>
                    <button class="danger" onclick="eliminarUsuario('${medico.id}')">Eliminar</button>
                </td>
            `;
            tablaMedicos.appendChild(row);
        });
    } else {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = `<td colspan="7" style="text-align: center;">No hay médicos registrados.</td>`;
        tablaMedicos.appendChild(noDataRow);
    }
});

// Función para obtener usuarios por rol (paciente o médico) del Local Storage
function obtenerUsuariosPorRol(rol) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.filter((usuario) => usuario.rol === rol);
}

// Función para eliminar un usuario
function eliminarUsuario(idUsuario) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        usuarios = usuarios.filter((usuario) => usuario.id !== idUsuario);

        // Actualizar el Local Storage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Usuario eliminado correctamente.');
        location.reload(); // Recargar la página para reflejar los cambios
    }
}