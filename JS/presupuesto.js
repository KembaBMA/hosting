document.addEventListener('DOMContentLoaded', function () {
  function calcularPresupuesto() {
    const producto = parseFloat(document.getElementById('producto').value) || 0;
    const plazo = parseInt(document.getElementById('plazo').value) || 0;
    let descuento = 0;
    if (plazo >= 30) descuento = 0.1;

    let extras = 0;
    document.querySelectorAll('.extra:checked').forEach(e => extras+= parseFloat(e.value));
    let total = (producto + extras) * (1 - descuento);
    document.getElementById('total').value = `${total}€`;
  }
  document.getElementById('producto').addEventListener('change', calcularPresupuesto);
   document.getElementById('plazo').addEventListener('input', calcularPresupuesto);
document.querySelectorAll('.extra').forEach(cb => cb.addEventListener('change', calcularPresupuesto));

  document.getElementById('form-contacto').addEventListener('submit', function (e) {
    e.preventDefault();
    let valido = true;
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim()
    const telefono = document.getElementById('telefono').value.trim()
    const correo = document.getElementById('correo').value.trim()
    const nombreValido = /^[A-Za-zÁáÉéÍíÓóÚúÑñ ]{1,15}$/;
    const apellidosValido = /^[A-Za-zÁáÉéÍíÓóÚúÑñ ]{1,40}$/;
    const telefonoValido = /^\d{1,9}$/;
     const correoValido = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
document.getElementById('error-nombre').textContent = nombreValido.test(nombre) ? '' : 'Nombre no valido solo letras';
    document.getElementById('error-apellidos').textContent = apellidosValido.test(apellidos) ? '' : 'Apellidos no validos solo letras';
    document.getElementById('error-telefono').textContent = telefonoValido.test(telefono) ? '' : 'Teléfono no valido solo numeros';
    document.getElementById('error-correo').textContent = correoValido.test(correo) ? '' : 'Correo electrónico invalido';

    if (!nombreValido.test(nombre) || !apellidosValido.test(apellidos) || !telefonoValido.test(telefono) || !correoValido.test(correo)) {
      valido = false;
    }
    if (valido) {
      document.getElementById('form-presupuesto').style.display = 'block';
      const formContacto = document.getElementById('form-contacto');
      Array.from(formContacto.elements).forEach(element => {
        element.disabled = true;
      });
        formContacto.style.opacity = '0.6';
    }
  });

  document.getElementById('form-presupuesto').addEventListener('submit', function (e) {
    e.preventDefault();
    if (document.getElementById('condiciones').checked ) {
      alert('Presupuesto enviado con éxito.');
      this.reset();
      document.getElementById('total').value = '';
    }
  });
});
