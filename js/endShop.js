carrito =[];
if (localStorage.getItem("carrito") != null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}
document.getElementById("numeroItemsCarrito").innerHTML = `${carrito.length}`;

function resumenProductos(){
    // mostrar productos seleccionados en el carrito
    let totalItemsPagar = 0;
    let resumenCarrito = ``;
    for (let i = 0; i < carrito.length; i++) {
        let subtotalItem = carrito[i].cantidad * carrito[i].precio;
        resumenCarrito += `
        <div class="row">
            <div class="row-img"><img  src="${carrito[i].imagen}" alt="${carrito[i].nombre}"></div>
            <div class="row-name"><p>${carrito[i].nombre}</p></div> 
            <div class="row-quantity"><p>${carrito[i].cantidad}</p></div> 
            <div class="row-price" id="precio${i}"><p>$ ${subtotalItem}</p></div>
        </div> 
        `;
        totalItemsPagar += subtotalItem;
    }
    document.getElementById("resume").innerHTML = resumenCarrito;
    document.getElementById("totalResumen").innerHTML = `
    <div class="row row-total">
        <div><p>Total: $ ${totalItemsPagar}</p></div>        
    </div> 
    `;
}
resumenProductos();

//Envio inputs a form endShop.html
function inputsFormMp(){
    let acuInputs=``;
    for (let i = 0; i < carrito.length; i++) {
        acuInputs += `
        <input type="hidden" name="title${[i]}" value="Amigurumi: ${carrito[i].nombre}">
        <input type="hidden" name="price${[i]}" value="${carrito[i].precio}">
        <input type="hidden" name="quantity${[i]}" value="${carrito[i].cantidad}">
        `;
    }
    document.getElementById("cantidadItems").innerHTML = 
    `<input type="hidden" name="cantidadItemsCarrito" value="${carrito.length}">`;
    document.getElementById("prodItems").innerHTML = acuInputs;
}
inputsFormMp();