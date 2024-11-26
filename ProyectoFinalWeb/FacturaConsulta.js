document.addEventListener('DOMContentLoaded', () => {
    // Recuperar usuario activo desde el Local Storage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActual'));

    if (!usuarioActivo || usuarioActivo.rol !== 'paciente') {
        alert('No tienes permiso para acceder a esta página.');
        window.location.href = 'login.html';
        return;
    }

    // Cargar facturas del paciente activo
    cargarFacturas(usuarioActivo.id);
});

// Función para cargar facturas filtradas por ID de paciente
function cargarFacturas(idPaciente) {
    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    const facturasFiltradas = facturas.filter(factura => factura.pacienteId === idPaciente);

    const tablaFacturas = document.getElementById('tablaFacturas');
    tablaFacturas.innerHTML = ''; // Limpiar contenido previo

    if (facturasFiltradas.length === 0) {
        const fila = document.createElement('tr');
        fila.innerHTML = `<td colspan="5" style="text-align: center;">No se encontraron facturas generadas.</td>`;
        tablaFacturas.appendChild(fila);
    } else {
        facturasFiltradas.forEach(factura => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${factura.id}</td>
                <td>${factura.fechaEmision}</td>
                <td>${factura.monto}</td>
                <td>${factura.estado}</td>
                <td>${factura.metodoPago}</td>
            `;
            tablaFacturas.appendChild(fila);
        });
    }
}