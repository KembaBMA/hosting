document.addEventListener("DOMContentLoaded", function () {
  const empresaLat = 40.4168;
  const empresaLng = -3.7038
  const map = L.map('map').setView([empresaLat, empresaLng], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);
  L.marker([empresaLat, empresaLng])
    .addTo(map)
    .bindPopup('Nuestra empresa')
    .openPopup();
    document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  const nombre = this.querySelector('input[type="text"]').value;
  const email= this.querySelector('input[type="email"]').value;
  const mensaje = this.querySelector('textarea').value
  console.log("Nombre:", nombre)
console.log("Email:", email);
console.log("Mensaje:", mensaje);
  alert(`Mensaje enviado`);
  this.reset();
});
});
