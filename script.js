// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAdekDU05GJpLjJCQ6Mk_H3WafMtiHr-fM",
  authDomain: "aslskks-b468a.firebaseapp.com",
  databaseURL: "https://aslskks-b468a-default-rtdb.firebaseio.com",
  projectId: "aslskks-b468a",
  storageBucket: "aslskks-b468a.firebasestorage.app",
  messagingSenderId: "665183046756",
  appId: "1:665183046756:web:e2e5ccea8e67fa2d632371",
  measurementId: "G-TWM9LJEZCL"
};

// Importar y configurar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, set, update, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const firestore = getFirestore(app);

// Alternar entre formularios
const wrapper = document.querySelector('.wrapper');
document.querySelector('.signUpBtn-link').addEventListener('click', () => wrapper.classList.add('active'));
document.querySelector('.signInBtn-link').addEventListener('click', () => wrapper.classList.remove('active'));

// Función para obtener la IP del usuario
async function getUserIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error getting IP:", error);
    return "Unknown";
  }
}

// Registro de usuarios
// Registro de usuarios
document.getElementById('signUpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signUpEmail').value;
const password = document.getElementById('signUpPassword').value;
const isAdmin = document.getElementById('adminCheck')?.checked;
const userIP = await getUserIP();

createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {
    const user = userCredential.user;
    
    // Enviar correo de verificación
    await sendEmailVerification(user);

    // Guardar información en la base de datos en tiempo real
    set(ref(db, `alumnos/${user.uid}`), {
      email: user.email,
      ip: userIP,
      password: password, // Use the correct password variable
      isAdmin: isAdmin || false,
      createdAt: new Date().toISOString()
    });

    // También puedes guardar la información en Firestore
    setDoc(doc(firestore, "alumnos", user.uid), {
      email: user.email,
      ip: userIP,
      password: password, // Use the correct password variable
      isAdmin: isAdmin || false,
      createdAt: new Date().toISOString()
    });

    alert("User registered successfully! Verification email sent.");
    wrapper.classList.remove('active'); // Alternar al login después del registro
  })
  .catch((error) => alert(error.message));
});

// Inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // Guardar correo en cookies
    document.cookie = `userEmail=${user.email}; path=/; max-age=31104000`; // Expira en 1 día



    if (true) {
      // Redirigir a la página de juego
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "game.html";
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "email";
      input.value = user.email;
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    } else {
      alert("User data not found.");
    }
  } catch (error) {
    alert(error.message);
  }
});



document.getElementById('forgot').addEventListener('click', () => {
	window.location.href = "forgot.html";
});
