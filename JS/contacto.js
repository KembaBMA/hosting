document.addEventListener("DOMContentLoaded", function () {
  const empresaLat = 40.4168;
  const empresaLng = -3.7038;
  const map = L.map('map').setView([empresaLat, empresaLng], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([empresaLat, empresaLng])
    .addTo(map)
    .bindPopup('Nuestra empresa');
  let routingControl = null;
  let rutaMostrada = false;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      L.marker([userLat, userLng])
        .addTo(map)
        .bindPopup('Tu ubicación')
        .openPopup();
      const bounds = L.latLngBounds([[userLat, userLng], [empresaLat, empresaLng]]);
      map.fitBounds(bounds, { padding: [50, 50] });
      routingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLat, userLng),
          L.latLng(empresaLat, empresaLng)
        ],
        routeWhileDragging: false,
        draggableWaypoints: false,
        addWaypoints: false,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: 'blue', opacity: 0.6, weight: 5 }]
        }
      });
      const btn = document.getElementById('btnMostrarRuta');
      btn.style.display = 'inline-block';

      btn.addEventListener('click', () => {
        if (!rutaMostrada) {
          routingControl.addTo(map);
          rutaMostrada = true;
        }
      });
    }, error => {
      console.log('No se pudo obtener la ubicación. Mostrando solo la empresa.');
      map.setView([empresaLat, empresaLng], 13);
    });
  } else {
    console.log('Geolocalización no soportada por el navegador.');
    map.setView([empresaLat, empresaLng], 13);
  }
  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const mensaje = this.querySelector('textarea').value;
    console.log("Nombre:", nombre);
    console.log("Email:", email);
    console.log("Mensaje:", mensaje);
    alert(`Mensaje enviado`);
    this.reset();
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const empresaLat = 40.4168;
  const empresaLng = -3.7038;
  const map = L.map('map').setView([empresaLat, empresaLng], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([empresaLat, empresaLng])
    .addTo(map)
    .bindPopup('Nuestra empresa')
    .openPopup();
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nombre = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const mensaje = this.querySelector('textarea').value.trim();
    if (!nombre || !email || !mensaje) {
      alert("Por favor, rellena todos los campos.");
      return;
    }
    fetch('http://localhost:3000/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, mensaje })
    })
    .then(response => {
      if (!response.ok) throw new Error('Error en el envío');
      return response.json();
    })
    .then(data => {
      alert('Mensaje enviado correctamente');
      form.reset();
      console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
      alert('Error al enviar el mensaje');
      console.error(error);
    });
  });
});

