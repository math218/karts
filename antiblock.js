    // Leer datos del formulario POST
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');
    const admin_enter = params.get('admin_enter');



var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Verificar si el correo está presente
    if (!email) {
      alert("Unauthorized access. Redirecting to login.");
      window.location.href = "login.html";
    }
    if (email == "" || getCookie("userEmail") == "") {
      document.cookie = `smash_karts_enter=ndjfanf-dfnsnfjd-sdfjdsfj; path=/; max-age=259200`;
    window.location.href = "404error.html";
    }
    else if (getCookie("smash_karts_enter") != null) {
      window.location.href = "404error.html";
    }
    addEventListener("keydown", function (e)
    {
      if(getCookie("smash_karts_enter") != null) {
        window.location.href = "404error.html";
      }
      if(e.shiftKey && e.ctrlKey && e.keyCode == 73) {
        document.cookie = `smash_karts_enter=ndjfanf-dfnsnfjd-sdfjdsfj; path=/; max-age=259200`;
        window.location.href = "404error.html";
      }
  
     });
