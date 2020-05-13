const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    //Listener para filtrado por categoria.
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        })
    })
    //Listener para la barra de buqueda.

    document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
        const busqueda = evento.target.value;
        grid.filter((item) => item.getElement().dataset.etiquetas.includes(busqueda));

    });

    // Agregamos listener para las img

    const capa = document.getElementById('capa');
    document.querySelectorAll('.grid .item img').forEach((elemento) => {
        const ruta = elemento.getAttribute('src');
        const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

        elemento.addEventListener('click', () => {
            capa.classList.add('activo');
            document.querySelector('#capa img').src = ruta;
            document.querySelector('#capa .descripcion').innerHTML = descripcion;
        });
    });
    // Boton cerrar img
    document.querySelector('#btn-cerrar-img').addEventListener('click', () => {
        capa.classList.remove('activo');
    });

    // Cerrar clickeando en la parte oscura
    capa.addEventListener('click', (evento) => {
        evento.target.id === 'capa' ? capa.classList.remove('activo') : '';
    });

});