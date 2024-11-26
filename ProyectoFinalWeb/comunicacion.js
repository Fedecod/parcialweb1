document.addEventListener('DOMContentLoaded', () => {
    const mensajeForm = document.getElementById('mensajeForm');
    const remitenteInput = document.getElementById('remitente');
    const destinatarioSelect = document.getElementById('destinatario');
    const mensajesRecibidosList = document.querySelector('#mensajesRecibidos ul');

    // Obtener usuario activo desde el Local Storage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActivo) {
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = 'login.html';
        return;
    }

    // Configurar remitente y cargar destinatarios
    remitenteInput.value = usuarioActivo.nombreUsuario;
    cargarDestinatarios(usuarioActivo.rol);

    // Cargar mensajes recibidos
    cargarMensajesRecibidos(usuarioActivo.nombreUsuario);

    // Manejar el formulario de envío de mensajes
    mensajeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const destinatario = destinatarioSelect.value;
        const contenidoMensaje = document.getElementById('contenidoMensaje').value;
        const idMensaje = `MSG-${Date.now()}`;
        const fechaHora = new Date().toLocaleString();

        // Validar campos obligatorios
        if (destinatario && contenidoMensaje) {
            const nuevoMensaje = {
                id: idMensaje,
                remitente: usuarioActivo.nombreUsuario,
                destinatario,
                contenido: contenidoMensaje,
                fechaHora,
                estado: 'No leído',
            };

            guardarMensaje(nuevoMensaje);
            mensajeForm.reset();
            alert('Mensaje enviado con éxito.');
        } else {
            alert('Por favor, completa todos los campos obligatorios.');
        }
    });

    // Función para cargar destinatarios dinámicamente
    function cargarDestinatarios(rol) {
        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
        const destinatarios = usuariosRegistrados.filter(user =>
            (rol === 'paciente' && user.rol === 'medico') ||
            (rol === 'medico' && user.rol === 'paciente')
        );

        destinatarios.forEach(destinatario => {
            const option = document.createElement('option');
            option.value = destinatario.nombreUsuario;
            option.textContent = destinatario.nombreUsuario;
            destinatarioSelect.appendChild(option);
        });
    }

    // Función para guardar un mensaje en Local Storage
    function guardarMensaje(mensaje) {
        const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
        mensajes.push(mensaje);
        localStorage.setItem('mensajes', JSON.stringify(mensajes));
    }

    // Función para cargar mensajes recibidos
    function cargarMensajesRecibidos(nombreUsuario) {
        const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
        const mensajesRecibidos = mensajes.filter(mensaje => mensaje.destinatario === nombreUsuario);

        if (mensajesRecibidos.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No tienes mensajes recibidos.';
            mensajesRecibidosList.appendChild(li);
        } else {
            mensajesRecibidos.forEach(mensaje => {
                const li = document.createElement('li');
                li.textContent = `De: ${mensaje.remitente}, Fecha: ${mensaje.fechaHora}`;
                li.addEventListener('click', () => {
                    alert(`Mensaje de ${mensaje.remitente}:\n\n${mensaje.contenido}`);
                    mensaje.estado = 'Leído';
                    guardarMensajeActualizado(mensajes);
                });
                mensajesRecibidosList.appendChild(li);
            });
        }
    }

    // Función para actualizar mensajes en Local Storage
    function guardarMensajeActualizado(mensajes) {
        localStorage.setItem('mensajes', JSON.stringify(mensajes));
    }
});