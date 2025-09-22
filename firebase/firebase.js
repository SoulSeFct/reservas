import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

import dotenv from 'dotenv';
dotenv.config();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Añade una reserva nueva (crea documento con id automático)
export const addReservation = async (reservation) => {
  try {
    const colRef = collection(db, "reservas");
    const payload = { ...reservation, createdAt: serverTimestamp() };
    const docRef = await addDoc(colRef, payload);
    return { success: true, id: docRef.id };
  } catch (err) {
    // Serializa el error completo para que nunca sea undefined
    const errorMessage = err?.message || JSON.stringify(err) || String(err);
    console.error("Error añadiendo reserva:", err);
    return { success: false, error: errorMessage };
  }
};


// Ejemplo de función para listar reservas (opcional)
export const getReservations = async () => {
  const colRef = collection(db, "reservas");
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
};