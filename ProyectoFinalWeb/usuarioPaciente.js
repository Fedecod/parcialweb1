document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el usuario activo desde el Local Storage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActivo || usuarioActivo.rol !== 'paciente') {
        // Si no hay usuario activo o no es paciente, redirigir al login
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = 'login.html';
        return;
    }

    // Personalizar mensaje de bienvenida
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.textContent = `¡Hola, ${usuarioActivo.nombreUsuario}!`;

    // Mostrar datos específicos del usuario si es necesario
    console.log('Usuario activo:', usuarioActivo);

    // Si necesitas usar el ID para filtrar datos
    const idUsuarioActivo = usuarioActivo.id;

    // Ejemplo: mostrar solo datos relacionados con el ID del usuario activo
    // Aquí podrías llamar a funciones que carguen facturas o historiales médicos
    mostrarDatosUsuario(idUsuarioActivo);
});

// Función para mostrar datos específicos del usuario
function mostrarDatosUsuario(idUsuario) {
    // Ejemplo de consulta para cargar datos relacionados con el usuario activo
    console.log(`Cargando datos para el usuario con ID: ${idUsuario}`);

    // Aquí puedes agregar lógica para cargar facturas, citas, etc., relacionadas con el ID
    // Por ejemplo, filtrando datos de Local Storage o de una API
}