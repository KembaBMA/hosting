document.querySelectorAll('.galeria img').forEach(img => {
      img.addEventListener('click', () => {
        window.open(img.src, '_blank');
      });
    });