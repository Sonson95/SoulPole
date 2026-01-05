// variable global para ver el estado de sesion del usuario
let usuarioHaIniciadoSesion= true; 

// Variable global para almacenar el temporizador del autoplay
let autoplayInterval;
const AUTOPLAY_DELAY = 5000; // 5000 milisegundos = 5 segundos

// Función para ir a la reserva (se mantiene igual)
function irAReserva() {
    const reservas = document.getElementById("reservas");
    if (reservas) {
        reservas.scrollIntoView({ behavior: "smooth" });
    } else {
        alert('La sección de reservas no se encontró.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.querySelectorAll('.hero-carrusel .carrusel-img');
    let currentImageIndex = 0;

    console.log("Número de imágenes del carrusel encontradas:", carouselImages.length);

    if (carouselImages.length > 0) {
        // Asegura que la primera imagen tenga la clase 'active' al cargar la página
        // Y que las demás no la tengan (esto lo habrás corregido en tu HTML ya)
        carouselImages.forEach((img, index) => {
            if (index === 0) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });

        // Función principal para cambiar la imagen
        function showImage(index) {
            console.log("DEBUG: Mostrando imagen:", index);
            // Quita la clase 'active' de todas las imágenes
            carouselImages.forEach(img => {
                img.classList.remove('active');
            });
            // Añade la clase 'active' a la imagen deseada
            carouselImages[index].classList.add('active');
            currentImageIndex = index; // Actualiza el índice actual
        }

        // Función para cambiar de slide al hacer clic en las flechas (o por autoplay)
        window.changeSlide = function(direction) {
            console.log("DEBUG: changeSlide llamada, dirección:", direction);
            let newIndex = currentImageIndex + direction;

            // Lógica para que el carrusel sea infinito
            if (newIndex < 0) {
                newIndex = carouselImages.length - 1; // Si va más allá del inicio, ve al final
            } else if (newIndex >= carouselImages.length) {
                newIndex = 0; // Si va más allá del final, ve al inicio
            }

            showImage(newIndex); // Muestra la nueva imagen
            resetAutoplay(); // Reinicia el temporizador de autoplay después de un cambio manual
        };

        // --- Funcionalidad Autoplay ---

        // Función para iniciar el autoplay
        function startAutoplay() {
            // Limpia cualquier temporizador existente para evitar duplicados
            clearInterval(autoplayInterval);
            autoplayInterval = setInterval(() => {
                window.changeSlide(1); // Avanza a la siguiente imagen
            }, AUTOPLAY_DELAY);
        }

        // Función para detener el autoplay
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }

        // Función para reiniciar el autoplay
        function resetAutoplay() {
            stopAutoplay(); // Detiene el actual
            startAutoplay(); // Inicia uno nuevo
        }

        // Iniciar el autoplay cuando la página se carga
        startAutoplay();

        // Pausar el autoplay al pasar el ratón por encima del carrusel
        const heroCarrusel = document.querySelector('.hero-carrusel');
        if (heroCarrusel) {
            heroCarrusel.addEventListener('mouseenter', stopAutoplay);
            heroCarrusel.addEventListener('mouseleave', startAutoplay);
        }

        // También puedes pausar el autoplay al hacer clic en los botones (ya se maneja con resetAutoplay)
        // Puedes añadirlo explícitamente a los botones si lo prefieres:
        document.querySelectorAll('.carrusel-nav').forEach(button => {
            button.addEventListener('click', resetAutoplay);
        });

    } else {
        console.warn("No se encontraron imágenes con la clase 'carrusel-img' dentro de '.hero-carrusel'. El carrusel no funcionará.");
    }
});

//-------Funciones de inicio de sesion y reserva---------------
// Función para ir a la reserva 
function irAReserva() {
    const reservas = document.getElementById("reservas");
    if (reservas) {
        reservas.scrollIntoView({ behavior: "smooth" });
    } else {
        alert('La sección de reservas no se encontró.');
    }
}

//funcion para verificar el estado de la sesion y mostrar el formulario de reserva
function verificarSesionYReservar(){
    //verifica si el usuario ha inicio de sesion 
    if(usuarioHaIniciadoSesion){
        // si inicia sesion, muestra el formulario
        mostrarFormulario();
    }else{
        alert("Para reservar primero debes iniciar sesión");

        irAInicioDeSesion();
    }
}

//muestra el formulario
function mostrarFormulario(){
    var formulario= document.getElementById("formulario-reserva");
    formulario.style.display= "block";
}
// Procesar la reserva del usuario, valida los campos y muestra mensaje
function procesarReserva(){
    //obtener valores seleccionados por el usuario
    var barraSeleccionada = document.getElementById("barra").value;
    var fechaSeleccionada = document.getElementById("fecha").value;
    var horaSeleccionada= document.getElementById("hora").value;

    //validacion de los campos para que no esten vacios
    if(!barraSeleccionada || !fechaSeleccionada || !horaSeleccionada){
        alert("Por favor, es necesario completar todos los campos paraa tu reserva.");
        return; //detiene la ejecucion si hay campos vacios
    }
    //Enviar los datos al servidor
    var mensaje = "Has reservado la " + barraSeleccionada+ " para la fecha " + fechaSeleccionada+ " a las "+ horaSeleccionada + ". Gracias por reservar en nuestra sala. "
    alert(mensaje);

    //ocultar el formulario despues de reservar
    var formulario= document.getElementById("formulario-reserva");
    formulario.style.display = "none";
}
function irAInicioDeSesion(){
    //redirecciona a la pagina de inicio de sesion
    window.location.href= "login.html";
}
// Función para verificar la sesión antes de mostrar el formulario de pago
function comprarBono(nombreBono, precio) {
    if (usuarioHaIniciadoSesion) {
        mostrarFormularioPago(nombreBono, precio);
    } else {
        alert("Para comprar un bono, primero debes iniciar sesión.");
        irAInicioDeSesion();
    }
}
//funcion para los precios 
//abre el modal de bonos
function bonosPrecios(){
    const modal = document.getElementById('bonos-modal');
    modal.classList.add('visible');
    // asegura que el panel de bonos este visible al abrir el modal
    document.getElementById('bonos-info').style.display = 'block';
    document.getElementById('pago-info').style.display = 'none';

}
// cierra el modal de bonos
function cerrarBonosPrecios(){
    const modal = document.getElementById('bonos-modal');
    modal.classList.remove('visible');
}

//funcion para mostrar el formulario de pago
function mostrarFormularioPago(nombreBono, precio){
    //oculta el panel de bonos y muestra el de pago
    document.getElementById('bonos-info').style.display= 'none';
    document.getElementById('pago-info').style.display= 'block';

    //Actualiza el texto del nombre y precio elegido 
    document.getElementById('bono-elegido').innerText= nombreBono;
    document.getElementById('precio-total').innerText= `${precio}€`;
}

//funcion para volver al listado de bonos
function volverABonos() {
    document.getElementById('bonos-info').style.display = 'block';
    document.getElementById('pago-info').style.display = 'none';
}
//cierre el modal al dar clic fuera
window.addEventListener('click', function(event){
    const modal = document.getElementById('bonos-modal');
    if (event.target === modal){
        cerrarBonosPrecios();
    }
})

//funcion para procesar el pago
document.getElementById('pago-form').addEventListener('submit', function(event){
    event.preventDefault(); // evita que el formulario se envie realmente
    alert("Pago simulado procesado. GRACIAS!");
    cerrarBonosPrecios();
})