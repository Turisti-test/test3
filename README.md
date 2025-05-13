# test3
prueba2

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Sistema de Reservas</title>
  <style>
    body { font-family: Arial; margin: 20px; }
    .reserva, .alojamiento { margin-bottom: 10px; padding: 10px; border: 1px solid #ccc; }
    .disponible { color: green; }
    .reservado { color: red; }
  </style>
</head>
<body>

<h1>Sistema de Reservas</h1>

<div id="alojamientos"></div>

<h2>Hacer una Reserva</h2>
<form id="formReserva">
  <label>Nombre del Huésped: <input type="text" id="huesped" required></label><br><br>
  <label>ID del Alojamiento: <input type="number" id="idAlojamiento" required></label><br><br>
  <label>Fecha de Entrada: <input type="date" id="fecha" required></label><br><br>
  <label>Número de Personas: <input type="number" id="personas" required></label><br><br>
  <label>Noches: <input type="number" id="noches" required></label><br><br>
  <button type="submit">Reservar</button>
</form>

<h2>Reservas Realizadas</h2>
<div id="reservas"></div>

<script>
const alojamientos = [
  { id: 1, nombre: "Chalet El Bosque", capacidad: 5, precio: 120.0, disponible: true },
  { id: 2, nombre: "Hotel Playa Azul", capacidad: 2, precio: 85.0, disponible: true },
  { id: 3, nombre: "Cabaña La Montaña", capacidad: 4, precio: 95.5, disponible: true }
];

const reservas = [];

function mostrarAlojamientos() {
  const contenedor = document.getElementById('alojamientos');
  contenedor.innerHTML = '<h2>Alojamientos Disponibles</h2>';
  alojamientos.forEach(a => {
    contenedor.innerHTML += `
      <div class="alojamiento">
        <strong>${a.id}. ${a.nombre}</strong><br>
        Capacidad: ${a.capacidad} <br>
        Precio: $${a.precio}/noche <br>
        Estado: <span class="${a.disponible ? 'disponible' : 'reservado'}">
        ${a.disponible ? 'Disponible' : 'Reservado'}
        </span>
      </div>`;
  });
}

function mostrarReservas() {
  const contenedor = document.getElementById('reservas');
  contenedor.innerHTML = '';
  reservas.forEach((r, i) => {
    contenedor.innerHTML += `
      <div class="reserva">
        ${i + 1}. ${r.huesped} reservó ${r.alojamiento} desde ${r.fecha}
        para ${r.personas} personas por ${r.noches} noches - Total: $${r.totalPagado.toFixed(2)}
      </div>`;
  });
}

document.getElementById('formReserva').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('idAlojamiento').value);
  const huesped = document.getElementById('huesped').value;
  const fecha = document.getElementById('fecha').value;
  const personas = parseInt(document.getElementById('personas').value);
  const noches = parseInt(document.getElementById('noches').value);

  const alojamiento = alojamientos.find(a => a.id === id);
  if (!alojamiento) {
    alert("Alojamiento no encontrado.");
    return;
  }
  if (!alojamiento.disponible) {
    alert("Este alojamiento ya está reservado.");
    return;
  }
  if (personas > alojamiento.capacidad) {
    alert("Demasiadas personas para este alojamiento.");
    return;
  }

  const total = noches * alojamiento.precio;
  reservas.push({
    huesped,
    alojamiento: alojamiento.nombre,
    fecha,
    personas,
    noches,
    totalPagado: total
  });

  alojamiento.disponible = false;
  mostrarAlojamientos();
  mostrarReservas();
  alert("Reserva completada. Total pagado: $" + total.toFixed(2));
  this.reset();
});

mostrarAlojamientos();
</script>

</body>
</html>

