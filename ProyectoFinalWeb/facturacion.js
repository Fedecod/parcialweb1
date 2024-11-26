const facturaForm = document.getElementById('facturaForm');
const facturaList = document.querySelector('#facturaList ul');

// Manejar el formulario de registro de facturas
facturaForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Obtener los valores de los campos
    const conceptoServicio = document.getElementById('conceptoServicio').value;
    const montoPagar = parseFloat(document.getElementById('montoPagar').value);
    const metodoPago = document.getElementById('metodoPago').value;
    const estadoPago = document.getElementById('estadoPago').value;
    const descuento = parseFloat(document.getElementById('descuento').value) || 0;
    const idFactura = `FACT-${Date.now()}`;
    const fechaEmision = new Date();
    const fechaVencimiento = new Date(fechaEmision);
    fechaVencimiento.setDate(fechaVencimiento.getDate() + 30);

    // Calcular el monto total con descuento
    const montoFinal = montoPagar - (montoPagar * descuento / 100);

    // Validar campos obligatorios
    if (conceptoServicio && montoPagar > 0 && metodoPago && estadoPago) {
        const nuevaFactura = {
            id: idFactura,
            concepto: conceptoServicio,
            montoOriginal: montoPagar,
            descuento: `${descuento}%`,
            montoFinal: montoFinal.toFixed(2),
            metodoPago,
            estado: estadoPago,
            fechaEmision: fechaEmision.toLocaleDateString(),
            fechaVencimiento: fechaVencimiento.toLocaleDateString(),
        };

        agregarFactura(nuevaFactura);
        console.log('Factura generada:', nuevaFactura);
        facturaForm.reset();
    } else {
        alert('Por favor, completa todos los campos obligatorios.');
    }
});

// Función para agregar una factura al listado
function agregarFactura(factura) {
    const li = document.createElement('li');
    li.textContent = `ID: ${factura.id}, Concepto: ${factura.concepto}, Monto Final: $${factura.montoFinal}, Estado: ${factura.estado}, Fecha de Emisión: ${factura.fechaEmision}, Vence: ${factura.fechaVencimiento}`;
    facturaList.appendChild(li);
}