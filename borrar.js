import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { httpsCallable } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-functions.js";

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

// Referencias a elementos del DOM
const deleteEmailInput = document.getElementById("deleteEmail");
const deleteUserBtn = document.getElementById("form-wrapper sign-in");

// Función para eliminar un usuario de Firebase Authentication
deleteUserBtn.addEventListener("submit", async () => {
  const email = deleteEmailInput.value.trim();
  if (!email) {
    alert("Por favor, ingresa un correo electrónico.");
    return;
  }

  try {
    // Llamar a una función de Cloud Functions para eliminar al usuario
    const deleteUser = httpsCallable(auth, "deleteUserByEmail");
    const result = await deleteUser({ email });
    if (result.data.success) {
      alert("Usuario eliminado correctamente.");
    } else {
      alert("No se pudo eliminar el usuario. Verifica la consola para más detalles.");
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    alert("Error al intentar eliminar el usuario.");
  }
});
