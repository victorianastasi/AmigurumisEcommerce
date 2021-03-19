let carrito = [];
if (localStorage.getItem("carrito") != null) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}
document.getElementById("numeroItemsCarrito").innerHTML = `${carrito.length}`;

//FORMULARIO

// Transformar primer letra en mayúscula y el resto en minúscula
function capitalizeFirstLetter(example) {
    return example.charAt(0).toUpperCase() + example.slice(1).toLowerCase();
}

$(document).ready(function() {
    $('form').on('submit', (e) => {
        e.preventDefault();

        const subject = capitalizeFirstLetter($('#nombre').val().trim());
        const email = $('#email').val().trim();
        const text = $('#text').val().trim();
        const title = $('#title').val().trim();
    
        const data = {
            title,
            subject,
            email,
            text
        };
        
        console.log(data);
        //Validacion de los datos ingresados en los inputs 
        if(subject != "" && email != "" && text != ""){
            $.post('http://localhost:8080/email',data, function(){
                console.log('Data recibida');
                $('#mensajeEnviado').html(`
                <div class="mensajeSuccess">
                <p>Gracias ${subject} por tu consulta!!</p>
                <p>Muy pronto nos comunicaremos con vos</p>
                <p style="font-size: 3rem; color: rgb(188, 143, 143)"><i class="far fa-smile-beam"></i></p>
                </div>`).css({"margin-bottom": "0rem", "font-family": "'Pangolin', cursive", "color": "rgb(98, 101, 103)", "text-shadow": "5px 5px 5px rgb(200, 197, 189)", "display": "none"});
                $('#mensajeEnviado').slideDown(500);
                $('html, body').animate({
                    scrollTop: $("#mensajeEnviado").offset().top
                }, 500);
            });
        }
        else{
            $('#alert').html(`
            <p>Por favor, completá los datos solicitados *</p>`).css({"color": "rgb(173, 26, 26)", "font-weight": "600"});
            //Marco el input que no contiene datos
            if($('#nombre').val().length == 0){
                $('#nombre').css({"border" : "2px solid rgb(173, 26, 26)"});
            }else if ($('#email').val().length == 0){
                $('#email').css({"border" : "2px solid rgb(173, 26, 26)"});
            }else if ($('#text').val().length == 0){
                $('#text').css({"border" : "2px solid rgb(173, 26, 26)"});
            }
        }
    });

    //Al hacer focus en el input, el mensaje previo de alerta no se muestra, y el input vuelve a su estilo original
    $('.form-control').focus(function cleanMsgSuscription(){
        $('#alert').html(``);
        $('.form-control').css({"border" : "inherit"});
    });
    
});
