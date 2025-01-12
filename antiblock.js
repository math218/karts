    // Leer datos del formulario POST
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const admin_enter = params.get('admin_enter');


    function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}
var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Verificar si el correo está presente
    if (!email && getCookie("userEmail") == null && admin_enter != "belu-mom" && validEmail.test(email) == false) {
      alert("Unauthorized access. Redirecting to login.");
      window.location.href = "login.html";
    }
    else if (email == "cihangir.gultek@colegiolakeside.edu.mx") {

    window.location.href = "baned.html";
    }
