import { auth, db } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";

/* ========================= */
/* DADOS */
/* ========================= */

let personagemTemp = {
  atributos: {},
  oficio: null,
  atributoOficio: null,
  pericias: [],
  classe: null,
  jogador: "",
  nome: "",
  descricao: "",
  campanha: "Sem campanha"
};

const oficios = [
  { nome: "Ferreiro", atributo: "FOR" },
  { nome: "Armeiro", atributo: "FOR" },
  { nome: "Lenhador", atributo: "FOR" },
  { nome: "Marceneiro", atributo: "FOR" },
  { nome: "Minerador", atributo: "FOR" },

  { nome: "Alfaiate", atributo: "AGI" },
  { nome: "Caçador", atributo: "AGI" },
  { nome: "Ladrão", atributo: "AGI" },
  { nome: "Joalheiro", atributo: "AGI" },

  { nome: "Artesão", atributo: "INT" },
  { nome: "Cozinheiro", atributo: "INT" },
  { nome: "Alquimista", atributo: "INT" },
  { nome: "Herbalista", atributo: "INT" },
  { nome: "Aluno", atributo: "INT" },
  { nome: "Mecânica", atributo: "INT" },

  { nome: "Nobre", atributo: "AUR" },
  { nome: "Professor", atributo: "AUR" },
  { nome: "Mercador", atributo: "AUR" }
];

const pericias = [
  { nome: "Ciências", atributo: "INT" },
  { nome: "Medicina", atributo: "INT" },
  { nome: "Cosmologia", atributo: "INT" },
  { nome: "Tática", atributo: "INT" },
  { nome: "Conhecimento", atributo: "INT" },
  { nome: "Memoria", atributo: "INT" },
  { nome: "Sobrevivencia", atributo: "INT" },
  { nome: "Misticismo", atributo: "INT" },

  { nome: "Fortitude", atributo: "VIG" },
  { nome: "Meditação", atributo: "VIG" },
  { nome: "Atletismo", atributo: "VIG" },
  { nome: "Descanso", atributo: "VIG" },
  { nome: "Vontade", atributo: "VIG" },

  { nome: "Poder", atributo: "AUR" },
  { nome: "Percepção", atributo: "AUR" },
  { nome: "Ocultar-se", atributo: "AUR" },

  { nome: "Luta", atributo: "FOR/AGI" },

  { nome: "Força", atributo: "FOR" },
  { nome: "Arremessar", atributo: "FOR" },
  { nome: "Escalar", atributo: "FOR" },
  { nome: "Bloquear", atributo: "FOR" },

  { nome: "Iniciativa", atributo: "AGI" },
  { nome: "Acrobacia", atributo: "AGI" },
  { nome: "Dança", atributo: "AGI" },
  { nome: "Roubo", atributo: "AGI" },
  { nome: "Pilotagem[A]", atributo: "AGI" },
  { nome: "Pilotagem[B]", atributo: "AGI" },
  { nome: "Pilotagem[C]", atributo: "AGI" },
  { nome: "Furtividade", atributo: "AGI" },
  { nome: "Reflexos", atributo: "AGI" },
  { nome: "Pontaria", atributo: "AGI" },

  { nome: "Intimidar", atributo: "AUR" },
  { nome: "Seduzir", atributo: "AUR" }
];

/* ========================= */
/* CLASSES (VOCÊ PODE COLOCAR TODAS AQUI) */
/* ========================= */
const classes = [
  {
    nome: "Mago",
    bonus: ["HP: -15", "MP: +25"],
    habilidades: [
      "Magia básica: ataque balístico comum do elemento natural do personagem.",
      "Dano: 1d6 + elemento.",
      "Custo: 12MP."
    ],
    oficioPericias: [
      "Estudioso (INT): Aumenta +1 em aprendizado.",
      "Consumidor (INT): Consumir Cristais de mana recuperam sua mana."
    ],
    requisitos: []
  }
];

/* ========================= */
/* UTIL */
/* ========================= */

function mostrarTopoEtapas(mostrar) {
  document.getElementById("topoEtapas").style.display = mostrar ? "flex" : "none";
}

function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");

  // 🔥 topo só aparece durante a criação
  const telasSemTopo = ["tela-login", "tela-personagens", "tela-ficha"];
  if (telasSemTopo.includes(id)) {
    mostrarTopoEtapas(false);
  }
}

function atualizarTopo(etapaId) {
  document.querySelectorAll(".etapa").forEach(e => e.classList.remove("ativa"));
  document.getElementById(etapaId).classList.add("ativa");
}

function atualizarPlaceholder(inputId, placeholderId) {
  const input = document.getElementById(inputId);
  const ph = document.getElementById(placeholderId);
  if (!input || !ph) return;
  ph.style.display = input.value.trim().length > 0 ? "none" : "block";
}

/* ========================= */
/* LOGIN */
/* ========================= */

window.criarConta = async function criarConta() {
  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada com sucesso!");
  } catch (e) {
    alert("Erro ao criar conta: " + e.message);
  }
};

window.entrarConta = async function entrarConta() {
  const email = document.getElementById("loginEmail").value.trim();
  const senha = document.getElementById("loginSenha").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    alert("Login feito!");
  } catch (e) {
    alert("Erro no login: " + e.message);
  }
};

window.sairConta = async function sairConta() {
  await signOut(auth);
};

/* ========================= */
/* LISTAR PERSONAGENS */
/* ========================= */

async function carregarPersonagens() {
  const user = auth.currentUser;
  if (!user) return;

  const lista = document.getElementById("listaPersonagens");
  lista.innerHTML = "Carregando...";

  try {
    const q = query(
      collection(db, "fichas"),
      where("uid", "==", user.uid),
      orderBy("criadoEm", "desc")
    );

    const snap = await getDocs(q);

    if (snap.empty) {
      lista.innerHTML = "<p style='color:#777;'>Nenhum personagem salvo ainda.</p>";
      return;
    }

    lista.innerHTML = "";

    snap.forEach((doc) => {
      const data = doc.data();
      const ficha = data.ficha;

      const btn = document.createElement("button");
      btn.className = "card-btn";
      btn.innerText = `${ficha.nome} - ${ficha.classe}`;

      btn.onclick = () => {
        alert(
          `Personagem: ${ficha.nome}\nJogador: ${ficha.jogador}\nClasse: ${ficha.classe}\nOfício: ${ficha.oficio}`
        );
      };

      lista.appendChild(btn);
    });
  } catch (e) {
    lista.innerHTML = "<p style='color:#777;'>Erro ao carregar personagens.</p>";
    console.log(e);
  }
}

/* ========================= */
/* CRIAÇÃO */
/* ========================= */

window.abrirCriacao = function abrirCriacao() {
  resetarCriacao();
  mostrarTopoEtapas(true);
  trocarTela("etapa-atributos");
  atualizarTopo("t-atributos");
};

function resetarCriacao() {
  personagemTemp = {
    atributos: {},
    oficio: null,
    atributoOficio: null,
    pericias: [],
    classe: null,
    jogador: "",
    nome: "",
    descricao: "",
    campanha: "Sem campanha"
  };

  ["forca","agilidade","intelecto","vigor","aura"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });

  document.getElementById("nomeJogadorInput").value = "";
  document.getElementById("nomePersonagemInput").value = "";
  document.getElementById("descricaoPersonagem").value = "";
  document.getElementById("contadorDescricao").innerText = "0 / 100";

  document.getElementById("btnAtributos").disabled = true;
  document.getElementById("btnAtributos").classList.remove("enabled");

  document.getElementById("btnOficio").disabled = true;
  document.getElementById("btnOficio").classList.remove("enabled");

  document.getElementById("btnPericias").disabled = true;
  document.getElementById("btnPericias").classList.remove("enabled");

  document.getElementById("btnClasse").disabled = true;
  document.getElementById("btnClasse").classList.remove("enabled");

  document.getElementById("btnFinalizar").disabled = true;
  document.getElementById("btnFinalizar").classList.remove("enabled");

  document.getElementById("atributoOficioSelecionado").innerText = "—";

  const detalhes = document.getElementById("detalhesClasse");
  detalhes.classList.add("escondido");
}

/* ATRIBUTOS */
window.verificarAtributos = function verificarAtributos() {
  const ids = ["forca", "agilidade", "intelecto", "vigor", "aura"];
  const ok = ids.every(id => document.getElementById(id).value !== "");

  const btn = document.getElementById("btnAtributos");
  btn.disabled = !ok;

  if (ok) btn.classList.add("enabled");
  else btn.classList.remove("enabled");
};

window.irParaOficio = function irParaOficio() {
  personagemTemp.atributos = {
    forca: Number(document.getElementById("forca").value),
    agilidade: Number(document.getElementById("agilidade").value),
    intelecto: Number(document.getElementById("intelecto").value),
    vigor: Number(document.getElementById("vigor").value),
    aura: Number(document.getElementById("aura").value)
  };

  trocarTela("etapa-oficio");
  atualizarTopo("t-oficio");

  document.getElementById("filtroOficio").value = "";
  atualizarPlaceholder("filtroOficio", "phOficio");

  renderizarOficios();
};

/* OFÍCIO */
function renderizarOficios(lista = oficios) {
  const div = document.getElementById("listaOficios");
  div.innerHTML = "";

  lista.forEach(o => {
    const btn = document.createElement("button");
    btn.className = "card-btn";
    btn.innerText = `${o.nome} (${o.atributo})`;
    btn.onclick = () => selecionarOficio(btn, o);
    div.appendChild(btn);
  });
}

window.filtrarOficios = function filtrarOficios() {
  atualizarPlaceholder("filtroOficio", "phOficio");

  const texto = document.getElementById("filtroOficio").value.toLowerCase().trim();
  const filtrados = oficios.filter(o =>
    o.nome.toLowerCase().includes(texto) ||
    o.atributo.toLowerCase().includes(texto)
  );

  renderizarOficios(filtrados);
};

function selecionarOficio(botao, oficio) {
  document.querySelectorAll("#listaOficios .card-btn").forEach(b => b.classList.remove("selecionado"));
  botao.classList.add("selecionado");

  personagemTemp.oficio = oficio.nome;
  personagemTemp.atributoOficio = oficio.atributo;

  document.getElementById("atributoOficioSelecionado").innerText = oficio.atributo;

  const btn = document.getElementById("btnOficio");
  btn.disabled = false;
  btn.classList.add("enabled");
}

window.irParaPericias = function irParaPericias() {
  trocarTela("etapa-pericias");
  atualizarTopo("t-pericias");

  document.getElementById("filtroPericias").value = "";
  atualizarPlaceholder("filtroPericias", "phPericias");

  renderizarPericias();
  verificarPericias();
};

/* PERÍCIAS */
function renderizarPericias(lista = pericias) {
  const div = document.getElementById("listaPericias");
  div.innerHTML = "";

  lista.forEach(p => {
    const btn = document.createElement("button");
    btn.className = "card-btn multi";
    btn.innerText = `${p.nome} (${p.atributo})`;

    if (personagemTemp.pericias.includes(p.nome)) btn.classList.add("selecionado");

    btn.onclick = () => alternarPericia(btn, p.nome);
    div.appendChild(btn);
  });
}

window.filtrarPericias = function filtrarPericias() {
  atualizarPlaceholder("filtroPericias", "phPericias");

  const texto = document.getElementById("filtroPericias").value.toLowerCase().trim();
  const filtrados = pericias.filter(p =>
    p.nome.toLowerCase().includes(texto) ||
    p.atributo.toLowerCase().includes(texto)
  );

  renderizarPericias(filtrados);
};

function alternarPericia(botao, nomePericia) {
  const existe = personagemTemp.pericias.includes(nomePericia);

  if (existe) {
    personagemTemp.pericias = personagemTemp.pericias.filter(p => p !== nomePericia);
    botao.classList.remove("selecionado");
  } else {
    personagemTemp.pericias.push(nomePericia);
    botao.classList.add("selecionado");
  }

  verificarPericias();
}

function verificarPericias() {
  const btn = document.getElementById("btnPericias");
  if (personagemTemp.pericias.length >= 1) {
    btn.disabled = false;
    btn.classList.add("enabled");
  } else {
    btn.disabled = true;
    btn.classList.remove("enabled");
  }
}

window.irParaClasse = function irParaClasse() {
  trocarTela("etapa-classe");
  atualizarTopo("t-classe");

  document.getElementById("filtroClasse").value = "";
  atualizarPlaceholder("filtroClasse", "phClasse");

  renderizarClasses();
  verificarClasse();
};

/* CLASSE */
function renderizarClasses(lista = classes) {
  const div = document.getElementById("listaClasses");
  div.innerHTML = "";

  lista.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "card-btn";
    btn.innerText = c.nome;

    if (personagemTemp.classe === c.nome) btn.classList.add("selecionado");

    btn.onclick = () => selecionarClasse(btn, c);
    div.appendChild(btn);
  });
}

window.filtrarClasses = function filtrarClasses() {
  atualizarPlaceholder("filtroClasse", "phClasse");

  const texto = document.getElementById("filtroClasse").value.toLowerCase().trim();
  const filtrados = classes.filter(c => c.nome.toLowerCase().includes(texto));
  renderizarClasses(filtrados);
};

function selecionarClasse(botao, classeObj) {
  document.querySelectorAll("#listaClasses .card-btn").forEach(b => b.classList.remove("selecionado"));
  botao.classList.add("selecionado");

  personagemTemp.classe = classeObj.nome;

  mostrarDetalhesClasse(classeObj);
  verificarClasse();
}

function mostrarDetalhesClasse(classeObj) {
  const box = document.getElementById("detalhesClasse");
  box.classList.remove("escondido");

  document.getElementById("dcNome").innerText = classeObj.nome;
  document.getElementById("dcBonus").innerText = (classeObj.bonus || []).join("\n");
  document.getElementById("dcHabilidades").innerText = (classeObj.habilidades || []).join("\n\n");
  document.getElementById("dcOficioPericias").innerText = (classeObj.oficioPericias || []).join("\n");

  const reqBloco = document.getElementById("dcReqBloco");
  const reqTexto = (classeObj.requisitos || []).join("\n");

  if (reqTexto.trim().length === 0) {
    reqBloco.style.display = "none";
  } else {
    reqBloco.style.display = "block";
    document.getElementById("dcRequisitos").innerText = reqTexto;
  }
}

function verificarClasse() {
  const btn = document.getElementById("btnClasse");
  if (personagemTemp.classe) {
    btn.disabled = false;
    btn.classList.add("enabled");
  } else {
    btn.disabled = true;
    btn.classList.remove("enabled");
  }
}

window.irParaIdentidade = function irParaIdentidade() {
  trocarTela("etapa-identidade");
  atualizarTopo("t-identidade");
};

/* IDENTIDADE */
window.atualizarContador = function atualizarContador() {
  const texto = document.getElementById("descricaoPersonagem").value;
  document.getElementById("contadorDescricao").innerText = `${texto.length} / 100`;
};

window.verificarIdentidade = function verificarIdentidade() {
  const jogador = document.getElementById("nomeJogadorInput").value.trim();
  const personagem = document.getElementById("nomePersonagemInput").value.trim();

  const btn = document.getElementById("btnFinalizar");
  if (jogador && personagem) {
    btn.disabled = false;
    btn.classList.add("enabled");
  } else {
    btn.disabled = true;
    btn.classList.remove("enabled");
  }
};

window.finalizarPersonagem = async function finalizarPersonagem() {
  personagemTemp.jogador = document.getElementById("nomeJogadorInput").value.trim();
  personagemTemp.nome = document.getElementById("nomePersonagemInput").value.trim();
  personagemTemp.descricao = document.getElementById("descricaoPersonagem").value;

  await salvarFichaFirebase();

  document.getElementById("fJogador").innerText = personagemTemp.jogador;
  document.getElementById("fPersonagem").innerText = personagemTemp.nome;
  document.getElementById("fOficio").innerText = personagemTemp.oficio;
  document.getElementById("fClasse").innerText = personagemTemp.classe;
  document.getElementById("fCampanha").innerText = personagemTemp.campanha;

  trocarTela("tela-ficha");
};

async function salvarFichaFirebase() {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado!");
    return;
  }

  try {
    await addDoc(collection(db, "fichas"), {
      uid: user.uid,
      criadoEm: Date.now(),
      ficha: personagemTemp
    });
    alert("Ficha salva na sua conta!");
  } catch (e) {
    alert("Erro ao salvar ficha: " + e.message);
  }
}

window.voltarParaLista = async function voltarParaLista() {
  trocarTela("tela-personagens");
  await carregarPersonagens();
};

/* ========================= */
/* AUTO TELA POR LOGIN */
/* ========================= */

onAuthStateChanged(auth, async (user) => {
  if (user) {
    trocarTela("tela-personagens");
    await carregarPersonagens();
  } else {
    trocarTela("tela-login");
  }
});