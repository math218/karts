    // Leer datos del formulario POST
    const params = new URLSearchParams(window.location.search);
    const email = params.get('email');

    // Verificar si el correo está presente
    if (!email) {
      alert("Unauthorized access. Redirecting to login.");
      window.location.href = "login.html";
    }
