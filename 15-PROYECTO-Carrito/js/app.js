const $listaDeCursos = document.querySelector("#lista-cursos");

const $carrito = document.querySelector('#carrito');
const $contenedorCarrito = document.querySelector('#lista-carrito tbody');
const $btnVaciarCarrito = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

//EVENT LISTENERS
cargarEventListtener ();
function cargarEventListtener () {
    $listaDeCursos.addEventListener('click', agregarCurso);

    $carrito.addEventListener('click', borrarArticulo)

    $btnVaciarCarrito.addEventListener('click', vaciarCarrito)
}


/* *****
    Functions
******* */

// Sends data to the cart
function agregarCurso (e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')){
        const $cursoSeleccionado = e.target.parentElement.parentElement;
        const infoCurso = leerDatosCurso($cursoSeleccionado);
        

        articulosCarrito = sumarProductosIguales(articulosCarrito,infoCurso)
        
        // crearTabla(infoCurso)
        crearTabla (articulosCarrito)
    }
}

// It reads the course's data
function leerDatosCurso($curso) {
    const infoCurso = {
        imagen: $curso.querySelector('img').src,
        titulo: $curso.querySelector('h4').textContent,
        precio: $curso.querySelector('span').textContent,
        id: $curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }
    return infoCurso;
}

function sumarProductosIguales (articulosCarrito, infoCurso) {
    const existe = articulosCarrito.some( (articulo) => articulo.id === infoCurso.id)
    if (existe) { 
        // aumento la cantidad de ese curso en el carrito
        articulosCarrito.map( articulo => {
            if (articulo.id === infoCurso.id){
                articulo.cantidad++
            }
        })   
    }

    else{ //agrego al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    return articulosCarrito
}

function limpiarCarrito (){   
    //slower than while
    // $contenedorCarrito.innerHTML = '';

    // this is faster than innerHTML = '';
    while($contenedorCarrito.firstChild) {
        $contenedorCarrito.removeChild($contenedorCarrito.firstChild);
   }
}


function crearTabla (articulosCarrito){
    // Clean table Body HTML
    limpiarCarrito();
    // Create HTML and append it to table
    articulosCarrito.forEach( articulo => {
        const {imagen,titulo,precio,cantidad,id} = articulo;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        $contenedorCarrito.appendChild(row);
    });
}


function borrarArticulo (e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')){
        const borrarID = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter( articulo => {
            if (articulo.id !== borrarID)
                return articulo
        } )
    }
    limpiarCarrito();
    crearTabla (articulosCarrito);
}

function vaciarCarrito (e) {
    e.preventDefault();
    articulosCarrito = [];
    limpiarCarrito();
}

