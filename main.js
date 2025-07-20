document.addEventListener('DOMContentLoaded', () => {
  const jsonData = document.getElementById('data-json').textContent;
  const data = JSON.parse(jsonData);
   const lista = document.getElementById('lista-noticias');
data.noticias.forEach(noticia => {
    const li = document.createElement('li');
    const titulo = document.createElement('strong');
    titulo.textContent = noticia.titulo;
 const descripcion = document.createElement('p');
    descripcion.textContent = noticia.descripcion;

    li.appendChild(titulo);
    li.appendChild(descripcion);
    lista.appendChild(li);
  });
});
