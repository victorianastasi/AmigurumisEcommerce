const express = require('express');
const app = express();

// SDK de Mercado Pago
const mercadopago = require ('mercadopago');

//BodyParser
app.use(express.urlencoded({ extended: true }));


// Agrega credenciales
mercadopago.configure({
    access_token: 'APP_USR-1842378098406533-030723-6ed3c2513fa80812f4547b971a1b5c42-725259016'
});

//routes
app.post('/checkout', (req, res) => {
    //res.send('<h1>Hola desde checkout!!</h1>');
    // Crea un objeto de preferencia
    let preference = {};
    let cantidadProductos = parseInt(req.body.cantidadItemsCarrito);
    //let acum;
    let itemsArray = []
    for(let i = 0; i < cantidadProductos; i++){
        itemsArray.push(
            {
                title: eval(`req.body.title${i}`),
                unit_price: parseInt(eval(`req.body.price${i}`)),
                quantity: parseInt(eval(`req.body.quantity${i}`)),
                currency_id: 'ARS'
            }
        )
    }
    preference.items = itemsArray;

    preference.back_urls = {
        "success": "http://localhost:5500/views/success.html",
        "failure": "http://localhost:5500/views/failure.html",
        "pending": "http://localhost:5500/views/failure.html"
    }

    mercadopago.preferences.create(preference)
    .then(function(response){

        res.redirect(response.body.init_point)
       
    }).catch(function(error){
    console.log(error);
    });
});


//server
app.listen(3000, () => {
console.log("Server on port 3000");
});