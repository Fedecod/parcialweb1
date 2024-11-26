document.getElementById('registroForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rol = document.getElementById('rol').value;

    if (nombre && password) {
        console.log({ nombre, email, password, rol });
        alert('Usuario registrado exitosamente. Revisa la consola para más detalles.');
    } else {
        alert('Por favor, completa todos los campos obligatorios.');
    }
});