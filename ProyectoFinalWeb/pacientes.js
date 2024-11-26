document.addEventListener('DOMContentLoaded', () => {
    const pacienteForm = document.getElementById('pacienteForm');

    // Recuperar el usuario activo desde el Local Storage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActual'));

    // Validar que haya un usuario activo y que sea un paciente
    if (!usuarioActivo || usuarioActivo.rol !== 'paciente') {
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = 'login.html';
        return;
    }

    // Cargar datos del usuario activo en el formulario
    cargarDatosUsuario(usuarioActivo);

    // Manejar la actualización de datos
    pacienteForm.addEventListener('submit', (event) => {
        event.preventDefault();
        actualizarDatosUsuario(usuarioActivo);
    });
});

// Función para cargar los datos del usuario activo en el formulario
function cargarDatosUsuario(usuario) {
    document.getElementById('nombreCompleto').value = usuario.nombreCompleto || '';
    document.getElementById('numeroIdentificacion').value = usuario.numeroIdentificacion || ''; // No editable
    document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento || '';
    document.getElementById('direccion').value = usuario.direccion || '';
    document.getElementById('telefono').value = usuario.telefono || '';
    document.getElementById('correo').value = usuario.correo || '';
    document.getElementById('estado').value = usuario.estado || 'activo';
}

// Función para actualizar los datos del usuario activo
function actualizarDatosUsuario(usuarioActivo) {
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar el usuario activo en la lista general
    const usuarioIndex = usuariosRegistrados.findIndex(user => user.id === usuarioActivo.id);

    if (usuarioIndex !== -1) {
        // Actualizar los datos del usuario activo
        usuariosRegistrados[usuarioIndex].nombreCompleto = document.getElementById('nombreCompleto').value.trim();
        usuariosRegistrados[usuarioIndex].fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
        usuariosRegistrados[usuarioIndex].direccion = document.getElementById('direccion').value.trim() || 'No especificada';
        usuariosRegistrados[usuarioIndex].telefono = document.getElementById('telefono').value.trim();
        usuariosRegistrados[usuarioIndex].correo = document.getElementById('correo').value.trim() || 'No especificado';
        usuariosRegistrados[usuarioIndex].estado = document.getElementById('estado').value.trim();

        // Guardar los cambios en Local Storage
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

        // Actualizar los datos del usuario activo
        localStorage.setItem('usuarioActual', JSON.stringify(usuariosRegistrados[usuarioIndex]));

        alert('Datos actualizados correctamente.');
    } else {
        alert('Error al localizar al usuario en los registros.');
    }
}