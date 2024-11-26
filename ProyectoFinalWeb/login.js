const loginForm = document.getElementById('loginForm');
const errorDiv = document.getElementById('error');

// Usuario administrador por defecto
const adminDefault = {
    id: 'ADM-001',
    nombreUsuario: 'admn',
    contrasena: 'admn123@',
    rol: 'administrador',
};

// Función para inicializar el usuario administrador en el Local Storage
function inicializarAdminDefault() {
    const usuarios = obtenerUsuariosDeLocalStorage();

    // Verificar si ya existe el administrador
    const adminExiste = usuarios.some(
        (user) =>
            user.nombreUsuario === adminDefault.nombreUsuario &&
            user.rol === adminDefault.rol
    );

    // Si no existe, agregarlo
    if (!adminExiste) {
        usuarios.push(adminDefault);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}

// Llamar a la función para inicializar el administrador
inicializarAdminDefault();

// Obtener usuarios del Local Storage
function obtenerUsuariosDeLocalStorage() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

// Guardar usuario actual en Local Storage
function guardarUsuarioActual(usuario) {
    localStorage.setItem('usuarioActual', JSON.stringify(usuario));
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
}

// Redirigir según el rol del usuario
function redirigirSegunRol(rol) {
    if (rol === 'paciente') {
        window.location.href = 'usuarioPaciente.html';
    } else if (rol === 'medico') {
        window.location.href = 'usuarioMedico.html';
    } else if (rol === 'administrador') {
        window.location.href = 'administrador.html'; // Cambio aquí
    } else {
        mostrarError('Rol no reconocido.');
    }
}

// Manejar el evento de inicio de sesión
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    // Recuperar usuarios registrados del Local Storage
    const usuariosRegistrados = obtenerUsuariosDeLocalStorage();

    // Buscar el usuario en los datos registrados
    const usuario = usuariosRegistrados.find(
        (user) =>
            user.nombreUsuario === nombreUsuario && user.contrasena === contrasena
    );

    if (usuario) {
        guardarUsuarioActual(usuario); // Guardar el usuario actual en el Local Storage
        redirigirSegunRol(usuario.rol); // Redirigir según el rol
    } else {
        mostrarError('Nombre de usuario o contraseña incorrectos.');
    }
});