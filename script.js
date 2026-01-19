function calcular() {
  let forca = Number(document.getElementById("for").value);
  let vigor = Number(document.getElementById("vig").value);
  let intel = Number(document.getElementById("int").value);
  let aura = Number(document.getElementById("aur").value);

  let hp = vigor * 10 + 20;
  let ki = forca * 10 + 60;
  let cos = (intel + aura) * 10;

  document.getElementById("hp").innerText = hp;
  document.getElementById("ki").innerText = ki;
  document.getElementById("cos").innerText = cos;
}
async function registrar() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const { createUserWithEmailAndPassword } =
    await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");

  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => alert("Conta criada com sucesso!"))
    .catch(err => alert(err.message));
}
async function login() {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  const { signInWithEmailAndPassword } =
    await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js");

  signInWithEmailAndPassword(auth, email, senha)
    .then(() => {
      alert("Logado!");
      carregarFicha();
    })
    .catch(err => alert(err.message));
}
async function salvarFicha() {
  const user = auth.currentUser;
  if (!user) return alert("Faça login primeiro!");

  const { doc, setDoc } =
    await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

  await setDoc(doc(db, "fichas", user.uid), {
    nome: nome.value,
    forca: for.value,
    vigor: vig.value,
    inteligencia: intel.value,
    aura: aur.value
  });

  alert("Ficha salva!");
}
async function carregarFicha() {
  const user = auth.currentUser;
  if (!user) return;

  const { doc, getDoc } =
    await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

  const snap = await getDoc(doc(db, "fichas", user.uid));
  if (snap.exists()) {
    const d = snap.data();
    nome.value = d.nome;
    for.value = d.forca;
    vig.value = d.vigor;
    intel.value = d.inteligencia;
    aur.value = d.aura;
    calcular();
  }
}
