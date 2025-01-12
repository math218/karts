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
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getDatabase, ref, set, update, get } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

async function sendresetpassword() {
	const email = document.getElementById('loginEmail').value;
	try {
		await sendPasswordResetEmail(auth, email);
		alert("Password reset email sent!");
	} catch (error) {
		alert(error.message);
	}
}
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
document.getElementById('signUpForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;
  const isAdmin = document.getElementById('adminCheck')?.checked;
  const userIP = await getUserIP();

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      
      // Guardar información en la base de datos en tiempo real
      set(ref(db, `alumnos/${user.uid}`), {
        email: user.email,
        ip: userIP,
        password: document.getElementById('loginPassword').value,
        isAdmin: isAdmin || false,
        createdAt: new Date().toISOString()
      });

      // También puedes guardar la información en Firestore
      setDoc(doc(firestore, "alumnos", user.uid), {
        email: user.email,
        ip: userIP,
        password: document.getElementById('loginPassword').value,
      });

      alert("User registered successfully!");
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
    document.cookie = `userEmail=${user.email}; path=/; max-age=86400`; // Expira en 1 día

    // Verificar si es administrador
    const userRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userRef);

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
    }
	catch (error) {
    alert(error.message);
  }
});

const email = document.getElementById('loginEmail').value;
var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
if (validEmail.test(email) == false) {
	alert("Invalid email address");
	
}
else {
document.getElementById('forgot').addEventListener('click', sendresetpassword);
}