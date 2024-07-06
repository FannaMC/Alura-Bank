
const botonAbrirCamara = document.querySelector("[data-video-boton]");
const video = document.querySelector("[data-video]");
const campoCamara = document.querySelector("[data-camera]");

const botonTomarFoto = document.querySelector("[data-tomar-foto]");
const mensaje = document.querySelector("[data-mensaje]");
const canvas = document.querySelector("[data-video-canvas]");
const botonEnviar = document.querySelector("[data-enviar]");

let imagenURL = "";

botonAbrirCamara.addEventListener("click", async () => {
    //declamramos una funcion asincrona | navigator debe esperar que se autorice el uso de la camara
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })

    //con display none, estamos ocultando el boton y dar lugar a campoCamara
    botonAbrirCamara.style.display = "none";
    //campoCamara es el contenedor donde se encuentra el video de la camara al ser aceptada
    campoCamara.style.display = "block";
    //video es lo que nos permite mostrar nuestro video en pantalla
    video.srcObject = iniciarVideo;
});

botonTomarFoto.addEventListener("click", () => {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    imagenURL = canvas.toDataURL("image/jpeg");
    campoCamara.style.display = "none";
    mensaje.style.display = "block";
});

botonEnviar.addEventListener("click", () => {
    const recibirDatos = localStorage.getItem("registro");
    const convertirDatos = JSON.parse(recibirDatos);
    convertirDatos.img_url = imagenURL;

    localStorage.setItem("registro", JSON.stringify(convertirDatos));
    window.location.href = "./abrir-cuenta-form-3.html";
});
