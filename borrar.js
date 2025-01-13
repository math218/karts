import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, deleteUser } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAdY2qq9083amKDS0R8tn2tjIKQB8mocco",
  authDomain: "webgltest-17af1.firebaseapp.com",
  databaseURL: "https://webgltest-17af1.firebaseio.com",
  projectId: "webgltest-17af1",
  messagingSenderId: "480659433590",
  appId: "1:480659433590:web:a01ad1599e963843a0d757",
  measurementId: "G-1W23DRFHK9"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Botón para eliminar la cuenta
const deleteAccountBtn = document.getElementById("deleteAccountBtn");

// Función para eliminar la cuenta del usuario autenticado
deleteAccountBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("Por favor, ingresa tu correo electrónico y contraseña.");
    return;
  }

  // Iniciar sesión con las credenciales proporcionadas
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Confirmar eliminación de la cuenta
      const confirmation = confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");
      if (!confirmation) return;

      // Eliminar la cuenta de Firebase Authentication
      deleteUser(user)
        .then(() => {
          alert("Tu cuenta ha sido eliminada exitosamente.");
          window.location.href = "index.html"; // Redirigir a la página principal
        })
        .catch((error) => {
          console.error("Error al eliminar la cuenta:", error);
          alert("Hubo un problema al eliminar tu cuenta. Por favor, inténtalo más tarde.");
        });
    })
    .catch((error) => {
      console.error("Error de inicio de sesión:", error);
      if (error.code === "auth/wrong-password") {
        alert("Contraseña incorrecta. Por favor, inténtalo nuevamente.");
      } else if (error.code === "auth/user-not-found") {
        alert("No se encontró una cuenta con ese correo electrónico.");
      } else {
        alert("Hubo un error. Por favor, inténtalo más tarde.");
      }
    });
});
