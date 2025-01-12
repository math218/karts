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
    else if (email == "ikisantmar@gmail.com" || getCookie("userEmail") == "ikisantmar@gmail.com" && getCookie("smash_karts_enter") == null) {
      document.cookie = `smash_karts_enter=ndjfanf-dfnsnfjd-sdfjdsfj; path=/; max-age=259200`;
    window.location.href = "404error.html";
    }
