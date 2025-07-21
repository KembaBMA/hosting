document.addEventListener("DOMContentLoaded", () => {
  fetch("JSON/noticias.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo JSON");
      }
      return response.json();
    })
    .then(noticias => {
      const lista = document.getElementById("lista-noticias");
      noticias.forEach(noticia => {
        const item = document.createElement("li");
        item.innerHTML = `<h3>${noticia.titulo}</h3><p>${noticia.descripcion}</p>`;
        lista.appendChild(item);
      });
    })
    .catch(error => {
      console.error("Error al cargar las noticias:", error);
    });
});
