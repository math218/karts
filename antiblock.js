    // Leer datos del formulario POST
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const admin_enter = params.get('admin_enter');
function getCookie(name) {
    // Construir la expresión regular para buscar el nombre de la cookie
    let cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='));
    return cookieValue ? cookieValue.split('=')[1] : null;
}



var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Verificar si el correo está presente
    if (!email && getCookie("userEmail") == null && validEmail.test(getCookie("userEmail"))) {
      // alert("Unauthorized access. Redirecting to login.");
      
      window.location.href = "login.html";
    }
    addEventListener("keydown", function (e)
    {
        if (e.shiftKey && e.ctrlKey) {
            window.location.href = "https://mathletics.com/";
        }
     });
