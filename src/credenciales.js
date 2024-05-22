import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const PROVIDER_GOOGLE = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyDcbxTfTllUBJv84uSognUDTa-x43ws-QU",
  authDomain: "desafiofinal-g45.firebaseapp.com",
  projectId: "desafiofinal-g45",
  storageBucket: "desafiofinal-g45.appspot.com",
  messagingSenderId: "223384339207",
  appId: "1:223384339207:web:060c6a61ac0e9ffc38bba2",
};

initializeApp(firebaseConfig);

export function loginGoogle() {
  const auth = getAuth();
  signInWithPopup(auth, PROVIDER_GOOGLE)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
}

export const onChangeUser = (setUsuario) => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    // console.log(user);
    const usuario = user ? user.displayName || user.email : null;
    setUsuario(usuario);
  });
};

export const onSignOut = () => {
  const auth = getAuth();
  signOut(auth);
};

export const registroUsuario = (formData, setFormData, setUserData) => {
  const auth = getAuth();
  console.log("registroUsuario" + formData.email + formData.password);
  if (!formData.email || !formData.password) return;

  createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then((result) => {
      const { email, uid } = result.user;
      setUserData({ email, uid, tipoAcceso: "" });
    })
    .catch((err) =>
      setFormData({ ...formData, error: handleError(err.code, err.message) })
    );
};

// export const loginUsuario = (formData, setFormData, setUserData, userData) => {
//   const auth = getAuth()
//   // console.log(formData);
//   if (!formData.email || ! formData.password) return

//   signInWithEmailAndPassword(auth, formData.email, formData.password)
//   .then((result) => setUserData({...userData, email:"ejemplo"}))
//   .catch((err) => setFormData({...formData, error: handleError(err.code, err.message) }))
// }

export const loginUsuario = (formData, setFormData, setUserData) => {
  const auth = getAuth();

  if (!formData.email || !formData.password) return;

  signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((result) => {
      const { email, uid } = result.user;
      setUserData({ email, uid, tipoAcceso: "" });
    })
    .catch((err) => {
      setFormData({ ...formData, error: handleError(err.code, err.message) });
      window.alert(`Los datos son incorrectos.`);
    });
};

function handleError(code, message) {
  switch (code) {
    case "auth/wrong-password":
      return "Correo o contraseña incorrectos.";
    case "auth/user-not-found":
      return "Correo o contraseña incorrectos.";
    case "auth/invalid-credential":
      return "Correo o contraseña incorrectos.";
    case "auth/invalid-email":
      return "Por favor valida que el correo electrónico este escrito correctamente.";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "auth/email-already-in-use":
      return "la dirección de correo electrónico ya se encuentra en uso.";
    default:
      return message;
  }
}
