const alojamientos = JSON.parse(localStorage.getItem("alojamientos")) || [
  { id: 1, nombre: "Chalet El Bosque", capacidad: 5, precio: 120.0, disponible: true },
  { id: 2, nombre: "Hotel Playa Azul", capacidad: 2, precio: 85.0, disponible: true },
  { id: 3, nombre: "Cabaña La Montaña", capacidad: 4, precio: 95.5, disponible: true }
];

const reservas = JSON.parse(localStorage.getItem("reservas")) || [];

function guardarDatos() {
  localStorage.setItem("alojamientos", JSON.stringify(alojamientos));
  localStorage.setItem("reservas", JSON.stringify(reservas));
}

function mostrarAlojamientos() {
  const contenedor = document.getElementById('alojamientos');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  alojamientos.forEach(a => {
    contenedor.innerHTML += `
      <div class="alojamiento">
        <strong>${a.id}. ${a.nombre}</strong><br>
        Capacidad: ${a.capacidad}<br>
        Precio: $${a.precio}/noche<br>
        Estado: <span style="color:${a.disponible ? 'green' : 'red'}">
          ${a.disponible ? 'Disponible' : 'Reservado'}
        </span>
      </div>`;
  });
}

function mostrarReservas() {
  const contenedor = document.getElementById('reservas');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  reservas.forEach((r, i) => {
    contenedor.innerHTML += `
      <div class="reserva">
        ${i + 1}. ${r.huesped} reservó ${r.alojamiento} desde ${r.fecha}
        para ${r.personas} personas por ${r.noches} noches - Total: $${r.totalPagado.toFixed(2)}
      </div>`;
  });
}

function hacerReserva(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById('idAlojamiento').value);
  const huesped = document.getElementById('huesped').value;
  const fecha = document.getElementById('fecha').value;
  const personas = parseInt(document.getElementById('personas').value);
  const noches = parseInt(document.getElementById('noches').value);

  const alojamiento = alojamientos.find(a => a.id === id);
  if (!alojamiento) return alert("Alojamiento no encontrado.");
  if (!alojamiento.disponible) return alert("Este alojamiento ya está reservado.");
  if (personas > alojamiento.capacidad) return alert("Demasiadas personas.");

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
  guardarDatos();
  alert("Reserva completada. Total pagado: $" + total.toFixed(2));
  e.target.reset();
}
