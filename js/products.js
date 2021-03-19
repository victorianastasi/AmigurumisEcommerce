AOS.init(); //Inicialización de animación AOS
let carrito = [];
if (localStorage.getItem("carrito") != null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}
document.getElementById("numeroItemsCarrito").innerHTML = `${carrito.length}`;

var productos;
$(document).ready(function () {
    $.ajax({
        url: "/js/datos.json", 
        dataType: "json",
        success: function(data) {
            productos = data;
            showCardsProducts(productos);
            let smallSize = productos.filter(tamaño => tamaño.medida <= 15);
            let mediumSize = productos.filter(tamaño => tamaño.medida >15 && tamaño.medida <= 28);
            let largeSize = productos.filter(tamaño => tamaño.medida > 28);
            sizeFilter(smallSize, mediumSize, largeSize, productos);
            searchBar(productos);
        }
    });
});


//Muestra cards de productos en html
function showCardsProducts(unidad){
    let acu = ``;
    for (let i = 0; i < unidad.length; i++) {
        acu += `
        <div class="card card-products" data-aos="fade-up" data-aos-duration="800">
            <img src="${unidad[i].imagen}" class="card-img-top" alt="${unidad[i].nombre}">
            <div class="card-body">
                <h5 class="card-title">${unidad[i].nombre}</h5>
                <p class="card-text">$${unidad[i].precio}</p>
                <button type="button" class="btn-modal" data-toggle="modal" data-target="#modal" onclick = 'showDetails(${JSON.stringify(unidad[i])})'>
                <i class="fas fa-search-plus"></i>
                </button>
                <button type="button" class="btn btn-primary btn-purchase" onclick='agregarAlCarrito(${JSON.stringify(unidad[i])})'><i class="fas fa-cart-plus"></i> Agregar
                </button>
            </div>
        </div>
        `;
    }
    document.getElementById("productos").innerHTML = acu;
}

//Modal con detalles de cada producto
let details;
function showDetails(unidad){
    details = `
        <div class="modal fade " id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div class="modal-content modalDetails">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">${unidad.nombre}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body" id="modalBody">
                        <img src="${unidad.imagen}" class="modal-img" alt="${unidad.nombre}">
                        <p class="subtitle">Características:</p>
                        <p>Tejido artesanalmente al crochet, hecho con hilos de algodón hipoalargénicos aptos para bebés recién nacidos, niñas y niños chiquitos.</p>
                        <p>Es apto babeo y los ojitos tienen traba de seguridad interna para mas seguridad de los más peques.</p>
                        <p class="subtitle">Medidas:</p>
                        <p>Su medida es ${unidad.medida} cm de alto.</p>
                        <p class="subtitle">Precio:</p>
                        <p>$${unidad.precio}</p>
                        <button type="button" class="btn btn-primary btn-purchase-modal" data-dismiss="modal" onclick='agregarAlCarrito(${JSON.stringify(unidad)})'><i class="fas fa-cart-plus"></i> Agregar
                        </button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-footer-modal" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    
    document.getElementById("modalDetails").innerHTML = details;
}

//Filtrar productos segun la medida
function sizeFilter(small, medium, large, all) {
    $('#sizeSelect').change(function(){
    let valorSelect = document.getElementById("sizeSelect").value;
        switch (valorSelect) {
            case "todos":
                showCardsProducts(all);
                searchBar(all);
                break;
            case "pequeño":
                showCardsProducts(small);
                searchBar(small);
                break;
            case "mediano":
                showCardsProducts(medium);
                searchBar(medium);
                break;
            case "grande":
                showCardsProducts(large);
                searchBar(large);
                break;
            default:
                showCardsProducts(all);
                searchBar(all);
        };
    });  
};

//Filtrar productos por nombre
function searchBar(listado){
    document.getElementById('searchWord').addEventListener('input', function(){
        let buscar = document.getElementById('searchWord').value;
        if(buscar.length > 0){
            let filtro = listado.filter((listado) => listado.nombre.toLowerCase().includes(buscar.toLowerCase().trim()));
            showCardsProducts(filtro);
            if (filtro.length == 0){
                document.getElementById('productos').innerHTML = `<p class="no-products-search"> No hay productos que coincidan con tu búsqueda</p>`;
            }
        }else{
            showCardsProducts(listado);
        } 
    });
};


//Agregar productos al carrito en storage
function agregarAlCarrito(producto) {
    //Busco si el producto ya se encuentra en el carrito
    findNombre = carrito.find(carrito => carrito.nombre == producto.nombre);
    indexList = carrito.indexOf(findNombre);
    //Si el producto se encuentra en el carrito, sumo una unidad de ese producto
    if(findNombre != null){
        if(carrito[indexList].cantidad < 10){
            carrito[indexList].cantidad += 1;
            //cartel animado que se despliega
            $("#productoUnidad").html(`
            <p class="cartel-unidad" id="cartelUnidad">Añadiste una unidad del amigurumi ${carrito[indexList].nombre} <i class="fas fa-check-circle"></i></p>`);
            $("#productoUnidad").slideDown(1000);
            setTimeout(function(){
                $("#productoUnidad").slideUp(1000);
            }, 2500);
            localStorage.setItem("carrito", JSON.stringify(carrito));
        }
        else{
            //cartel animado que se despliega
            $("#productoUnidadMax").html(
            `<p class="cartel-unidad" id="cartelUnidadMax">No se pueden agregar más unidades del amigurumi ${carrito[indexList].nombre} <i class="fas fa-exclamation"></i></p>`);
            $("#productoUnidadMax").slideDown(1000);
            setTimeout(function(){
                $("#productoUnidadMax").slideUp(1000);
            }, 2500);
        }
    }
    else{
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito)); 
        document.getElementById("numeroItemsCarrito").innerHTML = `${carrito.length}`;

        //cartel animado que se despliega
        $("#productoAgregado").html(`
        <p class="cartel" id="cartel">Añadiste el amigurumi ${producto.nombre} al carrito <i class="fas fa-check-circle"></i></p>`);
        $("#productoAgregado").slideDown(1000);
        setTimeout(function(){
            $("#productoAgregado").slideUp(1000);
        }, 2500);
    }  
}

//Boton que lleva al top de la pagina, y aparece al hacer scroll
btnTop = document.getElementById("btnTop");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
}
function topScroll() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0; 
}
