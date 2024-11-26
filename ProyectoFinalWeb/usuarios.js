const usuarioForm = document.getElementById('usuarioForm');
const rolUsuario = document.getElementById('rolUsuario');
const datosPaciente = document.getElementById('datosPaciente');
const datosMedico = document.getElementById('datosMedico');
const tablaPacientes = document.getElementById('tablaPacientes');
const tablaMedicos = document.getElementById('tablaMedicos');

// Obtener usuarios almacenados en Local Storage
function obtenerUsuariosDeLocalStorage() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

// Guardar usuarios en Local Storage
function guardarUsuariosEnLocalStorage(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// Cargar usuarios guardados al iniciar
function cargarUsuariosEnTablas() {
    const usuariosRegistrados = obtenerUsuariosDeLocalStorage();

    usuariosRegistrados.forEach((usuario) => {
        if (usuario.rol === 'paciente') {
            agregarPaciente(usuario);
        } else if (usuario.rol === 'medico') {
            agregarMedico(usuario);
        }
    });
}

// Mostrar campos específicos según el rol seleccionado
rolUsuario.addEventListener('change', () => {
    const rol = rolUsuario.value;
    if (rol === 'paciente') {
        datosPaciente.style.display = 'block';
        datosMedico.style.display = 'none';
    } else if (rol === 'medico') {
        datosPaciente.style.display = 'none';
        datosMedico.style.display = 'block';
    } else {
        datosPaciente.style.display = 'none';
        datosMedico.style.display = 'none';
    }
});

// Manejar el formulario de registro de usuarios
usuarioForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const idUsuario = `USR-${Date.now()}`;
    const nombreUsuario = document.getElementById('nombreUsuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();
    const estadoCuenta = document.getElementById('estadoCuenta').value;
    const usuariosRegistrados = obtenerUsuariosDeLocalStorage();

    const rol = rolUsuario.value;
    if (rol === 'paciente') {
        const paciente = {
            id: idUsuario,
            rol: 'paciente',
            nombreUsuario, // Guardar el nombre de usuario
            contrasena,    // Guardar la contraseña
            nombre: document.getElementById('nombreCompletoPaciente').value,
            identificacion: document.getElementById('identificacionPaciente').value,
            telefono: document.getElementById('telefonoPaciente').value,
            correo: document.getElementById('correoPaciente').value || 'N/A',
            estado: estadoCuenta,
        };

        usuariosRegistrados.push(paciente);
        guardarUsuariosEnLocalStorage(usuariosRegistrados);
        agregarPaciente(paciente);
    } else if (rol === 'medico') {
        const medico = {
            id: idUsuario,
            rol: 'medico',
            nombreUsuario, // Guardar el nombre de usuario
            contrasena,    // Guardar la contraseña
            nombre: document.getElementById('nombreCompletoMedico').value,
            licencia: document.getElementById('licenciaMedico').value,
            especialidad: document.getElementById('especialidadMedico').value,
            telefono: document.getElementById('telefonoMedico').value || 'N/A',
            estado: estadoCuenta,
        };

        usuariosRegistrados.push(medico);
        guardarUsuariosEnLocalStorage(usuariosRegistrados);
        agregarMedico(medico);
    }

    usuarioForm.reset();
    datosPaciente.style.display = 'none';
    datosMedico.style.display = 'none';
    rolUsuario.value = '';
});

// Funciones para agregar usuarios a las tablas
function agregarPaciente(paciente) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${paciente.id}</td>
        <td>${paciente.nombre}</td>
        <td>${paciente.identificacion}</td>
        <td>${paciente.telefono}</td>
        <td>${paciente.correo}</td>
        <td>${paciente.estado}</td>
    `;
    tablaPacientes.appendChild(row);
}

function agregarMedico(medico) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${medico.id}</td>
        <td>${medico.nombre}</td>
        <td>${medico.licencia}</td>
        <td>${medico.especialidad}</td>
        <td>${medico.telefono}</td>
        <td>${medico.estado}</td>
    `;
    tablaMedicos.appendChild(row);
}

// Cargar usuarios guardados en tablas al iniciar
document.addEventListener('DOMContentLoaded', cargarUsuariosEnTablas);