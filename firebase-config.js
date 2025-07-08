// Configuração do Firebase (do seu projeto)
const firebaseConfig = {
  apiKey: "AIzaSyC7qg6OppLHwRjni_ZX5HQ7Q5lbIy0rwyc",
  authDomain: "meu-jogo-multiplayer-ceae7.firebaseapp.com",
  databaseURL: "https://meu-jogo-multiplayer-ceae7-default-rtdb.firebaseio.com",
  projectId: "meu-jogo-multiplayer-ceae7",
  storageBucket: "meu-jogo-multiplayer-ceae7.firebasestorage.app",
  messagingSenderId: "86688143652",
  appId: "1:86688143652:web:f0a50adf1b2c3509687bb1",
  measurementId: "G-R1W7EY3LXY"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
