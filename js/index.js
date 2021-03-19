AOS.init();
let carrito = [];
if (localStorage.getItem("carrito") != null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}
document.getElementById("numeroItemsCarrito").innerHTML = `${carrito.length}`;
