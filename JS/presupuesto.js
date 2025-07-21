document.addEventListener('DOMContentLoaded', function () {
  function calcularPresupuesto() {
    const producto = parseFloat(document.getElementById('producto').value) || 0;
    const plazo = parseInt(document.getElementById('plazo').value) || 0;
    let descuento = 0;
    if (plazo >= 30) descuento = 0.1;

    let extras = 0;
    document.querySelectorAll('.extra:checked').forEach(e => extras += parseFloat(e.value));
    let total = (producto + extras) * (1 - descuento);
    document.getElementById('total').value = `${total.toFixed(2)}€`;
  }

  document.getElementById('producto').addEventListener('change', calcularPresupuesto);
  document.getElementById('plazo').addEventListener('input', calcularPresupuesto);
  document.querySelectorAll('.extra').forEach(cb => cb.addEventListener('change', calcularPresupuesto));

  document.getElementById('form-contacto').addEventListener('submit', function (e) {
    e.preventDefault();
    let valido = true;

  const nombre = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const correo = document.getElementById('correo').value.trim();

    const nombreValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,15}$/;
    const apellidosValido = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,40}$/;
    const telefonoValido = /^\d{9}$/;
    const correoValido = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
    if (!nombreValido.test(nombre)) {
      document.getElementById('error-nombre').textContent = 'Nombre no válido (solo letras, 2-15 caracteres).';
      valido = false;
    } else {
      document.getElementById('error-nombre').textContent = '';
    }
    if (!apellidosValido.test(apellidos)) {
      document.getElementById('error-apellidos').textContent = 'Apellidos no válidos (solo letras, 2-40 caracteres).';
      valido = false;
    } else {
      document.getElementById('error-apellidos').textContent = '';
    }

    if (!telefonoValido.test(telefono)) {
      document.getElementById('error-telefono').textContent = 'Teléfono no válido (exactamente 9 números).';
      valido = false;
    } else {
      document.getElementById('error-telefono').textContent = '';
    }

    if (!correoValido.test(correo)) {
      document.getElementById('error-correo').textContent = 'Correo electrónico inválido.';
      valido = false;
    } else {
      document.getElementById('error-correo').textContent = '';
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

    if (!document.getElementById('condiciones').checked) {
      alert('Debes aceptar las condiciones.');
      return;
    }
    const data = {
      nombre: document.getElementById('nombre').value.trim(),
      apellidos: document.getElementById('apellidos').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      correo: document.getElementById('correo').value.trim(),
      producto: document.getElementById('producto').value,
      plazo: document.getElementById('plazo').value,
      extras: Array.from(document.querySelectorAll('.extra:checked')).map(e => e.value),
      total: document.getElementById('total').value,
    };
    fetch('http://localhost:3000/api/enviar-presupuesto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) throw new Error('Error en el envío');
        return response.json();
      })
      .then(result => {
        alert('Presupuesto enviado con éxito.');
        this.reset();
        document.getElementById('total').value = '';
        document.getElementById('form-contacto').reset();
        const formContacto = document.getElementById('form-contacto');
        formContacto.style.opacity = '1';
        Array.from(formContacto.elements).forEach(el => el.disabled = false);
        document.getElementById('form-presupuesto').style.display = 'none';
      })
      .catch(error => {
        alert('Error al enviar el presupuesto. Inténtalo de nuevo.');
        console.error(error);
      });
  });
});
