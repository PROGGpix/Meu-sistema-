/* =========================
   FIREBASE (CDN / MULTIPLAYER REAL)
========================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  arrayUnion
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKxt0jilkvGj0kDIpXlktHih_n_2qDKY0",
  authDomain: "meu-sistema-9ffe4.firebaseapp.com",
  projectId: "meu-sistema-9ffe4",
  storageBucket: "meu-sistema-9ffe4.firebasestorage.app",
  messagingSenderId: "603836576137",
  appId: "1:603836576137:web:d6bbce12dc7b17cafb3158",
  measurementId: "G-7DSHNMYYM5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let userUID = null;

/* =========================
   DADOS BASE
========================= */
const OFICIOS = [
  { nome: "Ferreiro", atributo: "FOR" },
  { nome: "Armeiro", atributo: "FOR" },
  { nome: "Lenhador", atributo: "FOR" },
  { nome: "Marceneiro", atributo: "FOR" },
  { nome: "Minerador", atributo: "FOR" },
  { nome: "Alfaiate", atributo: "AGI" },
  { nome: "Caçador", atributo: "AGI" },
  { nome: "Ladrão", atributo: "AGI" },
  { nome: "Joalheiro", atributo: "AGI" },
  { nome: "Artesãos", atributo: "INT" },
  { nome: "Cozinheiro", atributo: "INT" },
  { nome: "Alquimista", atributo: "INT" },
  { nome: "Herbalista", atributo: "INT" },
  { nome: "Aluno", atributo: "INT" },
  { nome: "Mecanica", atributo: "INT" },
  { nome: "Nobre", atributo: "AUR" },
  { nome: "Professor", atributo: "AUR" },
  { nome: "Mercador", atributo: "AUR" }
];

const PERICIAS = [
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
  { nome: "Intimidar", atributo: "AUR" },
  { nome: "Seduzir", atributo: "AUR" },

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
  { nome: "Pontaria", atributo: "AGI" }
];

const CLASSES = [
  { nome: "Mago" },
  { nome: "Cavaleiro" }
];

/* =========================
   ESTADO
========================= */
let fichaAbertaId = null;
let campanhaAtualId = null;
let personagemTemp = criarFichaVazia();

function criarFichaVazia() {
  return {
    atributos: { FOR: 0, AGI: 0, INT: 0, VIG: 0, AUR: 0 },
    oficio: null,
    pericias: [],
    classe: null,
    identidade: { jogador: "", personagem: "", descricao: "", campanha: "" },

    // itens online equipados
    itensEquipados: [],

    // bônus acumulado vindo de itens
    bonusMax: { HP: 0, MP: 0, COS: 0, KI: 0, CK: 0 },

    recursos: {
      HP: { atual: 0, max: 0 },
      MP: { atual: 0, max: 0 },
      COS: { atual: 0, max: 0 },
      KI: { atual: 0, max: 0 },
      CK: { atual: 0, max: 0 }
    },

    recursosInicializados: false,
    resDef: { RES: 0, DEF: 5 }
  };
}

/* =========================
   UTIL
========================= */
function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  const el = document.getElementById(id);
  if (el) el.classList.add("ativa");
}

function formatarDataBR(timestamp) {
  const d = new Date(timestamp);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();
  const hora = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${hora}:${min}`;
}

function calcularStatus(atributos, bonusMax) {
  const FOR = Number(atributos.FOR || 0);
  const INT = Number(atributos.INT || 0);
  const VIG = Number(atributos.VIG || 0);
  const AUR = Number(atributos.AUR || 0);

  const base = {
    HP: 120 + (VIG * 10),
    MP: 140 + (INT * 20),
    COS: 100 + ((INT + AUR) * 10),
    KI: 130 + (FOR * 10),
    CK: 30 + (AUR * 10)
  };

  return {
    HP: base.HP + (bonusMax.HP || 0),
    MP: base.MP + (bonusMax.MP || 0),
    COS: base.COS + (bonusMax.COS || 0),
    KI: base.KI + (bonusMax.KI || 0),
    CK: base.CK + (bonusMax.CK || 0)
  };
}

function recalcularRecursos() {
  const maximos = calcularStatus(personagemTemp.atributos, personagemTemp.bonusMax);

  ["HP","MP","COS","KI","CK"].forEach((k) => {
    personagemTemp.recursos[k].max = maximos[k];
    if (personagemTemp.recursos[k].atual > maximos[k]) personagemTemp.recursos[k].atual = maximos[k];
    if (personagemTemp.recursos[k].atual < 0) personagemTemp.recursos[k].atual = 0;
  });

  if (!personagemTemp.recursosInicializados) {
    ["HP","MP","COS","KI","CK"].forEach((k) => personagemTemp.recursos[k].atual = personagemTemp.recursos[k].max);
    personagemTemp.recursosInicializados = true;
  }
}

function atualizarBarrasUI() {
  const map = {
    HP: { texto: "hpTexto", fill: "hpFill", input: "hpAtual" },
    MP: { texto: "mpTexto", fill: "mpFill", input: "mpAtual" },
    COS:{ texto: "cosTexto", fill: "cosFill", input: "cosAtual" },
    KI: { texto: "kiTexto", fill: "kiFill", input: "kiAtual" },
    CK: { texto: "ckTexto", fill: "ckFill", input: "ckAtual" }
  };

  Object.keys(map).forEach((k) => {
    const atual = personagemTemp.recursos[k].atual;
    const max = personagemTemp.recursos[k].max;

    document.getElementById(map[k].texto).textContent = `${atual}/${max}`;
    const pct = max > 0 ? (atual / max) * 100 : 0;
    document.getElementById(map[k].fill).style.width = `${Math.max(0, Math.min(100, pct))}%`;

    const inp = document.getElementById(map[k].input);
    inp.value = atual;
    inp.max = max;
  });

  document.getElementById("resManual").value = personagemTemp.resDef?.RES ?? 0;
  document.getElementById("defManual").value = personagemTemp.resDef?.DEF ?? 5;
}

/* =========================
   TOPO ETAPAS
========================= */
const ETAPAS = ["atributos", "oficio", "pericias", "classe", "identidade"];
let etapaLiberadaIndex = 4;

function setTopoEtapa(etapa) {
  ETAPAS.forEach(e => {
    const el = document.getElementById(`etapaTopo-${e}`);
    if (el) el.classList.remove("ativa");
  });
  const atual = document.getElementById(`etapaTopo-${etapa}`);
  if (atual) atual.classList.add("ativa");
}

function atualizarTopoEtapas() {
  ETAPAS.forEach((nomeEtapa, i) => {
    const el = document.getElementById(`etapaTopo-${nomeEtapa}`);
    if (!el) return;

    if (i <= etapaLiberadaIndex) el.classList.remove("bloqueada");
    else el.classList.add("bloqueada");
  });
}

window.irEtapa = function (nomeEtapa) {
  trocarTela(`etapa-${nomeEtapa}`);
  setTopoEtapa(nomeEtapa);
};

/* =========================
   MENU LATERAL
========================= */
window.toggleMenuLateral = function () {
  document.getElementById("menuLateral").classList.toggle("ativo");
  document.getElementById("overlayMenu").classList.toggle("ativo");
};

function fecharMenuLateral() {
  document.getElementById("menuLateral").classList.remove("ativo");
  document.getElementById("overlayMenu").classList.remove("ativo");
}

window.toggleSubCampanhas = function () {
  document.getElementById("submenuCampanhas").classList.toggle("ativo");
};

window.irHome = function () {
  fecharMenuLateral();
  trocarTela("etapa-identidade");
  setTopoEtapa("identidade");
  renderPersonagensOnline();
};

/* =========================
   PERSONAGENS ONLINE (Firestore)
   coleção: users/{uid}/personagens/{id}
========================= */

function refPersonagensUser() {
  return collection(db, "users", userUID, "personagens");
}

async function criarPersonagemOnline(ficha) {
  const docRef = await addDoc(refPersonagensUser(), {
    criadoEm: Date.now(),
    ficha
  });
  return docRef.id;
}

async function atualizarPersonagemOnline(id, ficha) {
  await updateDoc(doc(db, "users", userUID, "personagens", id), {
    ficha
  });
}

async function carregarPersonagensOnline() {
  const snap = await getDocs(query(refPersonagensUser(), orderBy("criadoEm", "desc")));
  const lista = [];
  snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
  return lista;
}

async function renderPersonagensOnline() {
  const container = document.getElementById("listaSalvos");
  if (!container) return;

  container.innerHTML = `<div class="card"><div class="sub-card">Carregando...</div></div>`;

  const fichas = await carregarPersonagensOnline();

  if (fichas.length === 0) {
    container.innerHTML = `<div class="card"><div class="sub-card">Nenhum personagem salvo ainda.</div></div>`;
    return;
  }

  container.innerHTML = "";

  fichas.forEach((item) => {
    const nome = item.ficha?.identidade?.personagem || "Sem nome";
    const data = item.criadoEm ? formatarDataBR(item.criadoEm) : "-";

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div class="titulo-card">${nome}</div>
      <div class="sub-card">Criado em: ${data}</div>
      <button class="btn enabled" style="margin-top:10px;" onclick="acessarFichaOnline('${item.id}')">ACESSAR</button>
    `;
    container.appendChild(div);
  });
}

window.acessarFichaOnline = async function (id) {
  const snap = await getDoc(doc(db, "users", userUID, "personagens", id));
  if (!snap.exists()) {
    alert("Ficha não encontrada!");
    return;
  }

  fichaAbertaId = id;
  personagemTemp = snap.data().ficha;

  abrirFichaAtual();
};

window.criarNovoPersonagem = function () {
  personagemTemp = criarFichaVazia();
  fichaAbertaId = null;
  etapaLiberadaIndex = 0;
  atualizarTopoEtapas();
  trocarTela("etapa-atributos");
  setTopoEtapa("atributos");
};

window.finalizarPersonagem = async function () {
  if (!userUID) {
    alert("Aguarde conectar...");
    return;
  }

  fichaAbertaId = await criarPersonagemOnline(personagemTemp);
  alert("Personagem salvo ONLINE!");
  abrirFichaAtual();
};

/* =========================
   CRIAÇÃO (etapas)
========================= */
function validarAtributos() {
  const forca = Number(document.getElementById("forca").value);
  const agi = Number(document.getElementById("agilidade").value);
  const inte = Number(document.getElementById("intelecto").value);
  const vig = Number(document.getElementById("vigor").value);
  const aur = Number(document.getElementById("aura").value);

  personagemTemp.atributos = { FOR: forca, AGI: agi, INT: inte, VIG: vig, AUR: aur };

  const ok = [forca, agi, inte, vig, aur].every(v => !isNaN(v) && v >= 0);
  const btn = document.getElementById("btnProximoAtributos");
  btn.disabled = !ok;
  if (ok) btn.classList.add("enabled");
  else btn.classList.remove("enabled");
}

window.irParaOficio = function () {
  trocarTela("etapa-oficio");
  setTopoEtapa("oficio");
};

function renderOficios(lista) {
  const container = document.getElementById("listaOficios");
  container.innerHTML = "";
  lista.forEach((o) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<div class="titulo-card">${o.nome}</div><div class="sub-card">${o.atributo}</div>`;
    div.onclick = () => {
      personagemTemp.oficio = o;
      document.querySelectorAll("#listaOficios .card").forEach(c => c.classList.remove("selecionado"));
      div.classList.add("selecionado");
      document.getElementById("btnProximoOficio").disabled = false;
      document.getElementById("btnProximoOficio").classList.add("enabled");
    };
    container.appendChild(div);
  });
}

window.irParaPericias = function () {
  trocarTela("etapa-pericias");
  setTopoEtapa("pericias");
};

function renderPericias(lista) {
  const container = document.getElementById("listaPericias");
  container.innerHTML = "";
  lista.forEach((p) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<div class="titulo-card">${p.nome}</div><div class="sub-card">${p.atributo}</div>`;
    div.onclick = () => {
      const existe = personagemTemp.pericias.find(x => x.nome === p.nome);
      if (existe) {
        personagemTemp.pericias = personagemTemp.pericias.filter(x => x.nome !== p.nome);
        div.classList.remove("selecionado");
      } else {
        personagemTemp.pericias.push(p);
        div.classList.add("selecionado");
      }
      const ok = personagemTemp.pericias.length >= 1;
      document.getElementById("btnProximoPericias").disabled = !ok;
      if (ok) document.getElementById("btnProximoPericias").classList.add("enabled");
      else document.getElementById("btnProximoPericias").classList.remove("enabled");
    };
    container.appendChild(div);
  });
}

window.irParaClasse = function () {
  trocarTela("etapa-classe");
  setTopoEtapa("classe");
};

function renderClasses(lista) {
  const container = document.getElementById("listaClasses");
  container.innerHTML = "";
  lista.forEach((c) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<div class="titulo-card">${c.nome}</div><div class="sub-card">Toque para escolher</div>`;
    div.onclick = () => {
      personagemTemp.classe = c;
      document.querySelectorAll("#listaClasses .card").forEach(x => x.classList.remove("selecionado"));
      div.classList.add("selecionado");
      document.getElementById("btnProximoClasse").disabled = false;
      document.getElementById("btnProximoClasse").classList.add("enabled");
    };
    container.appendChild(div);
  });
}

window.irParaIdentidade = function () {
  trocarTela("etapa-identidade");
  setTopoEtapa("identidade");
};

function validarIdentidade() {
  const jogador = document.getElementById("nomeJogador").value.trim();
  const personagem = document.getElementById("nomePersonagem").value.trim();
  const desc = document.getElementById("descricaoPersonagem").value.trim();
  const campanha = document.getElementById("nomeCampanha").value.trim();

  personagemTemp.identidade = { jogador, personagem, descricao: desc, campanha };

  const ok = jogador.length > 0 && personagem.length > 0 && campanha.length > 0;
  const btn = document.getElementById("btnFinalizar");
  btn.disabled = !ok;
  if (ok) btn.classList.add("enabled");
  else btn.classList.remove("enabled");
}

/* =========================
   FICHA
========================= */
async function salvarAutoOnline() {
  if (!fichaAbertaId) return;
  await atualizarPersonagemOnline(fichaAbertaId, personagemTemp);
}

function abrirFichaAtual() {
  document.getElementById("fJogador").textContent = personagemTemp.identidade?.jogador || "";
  document.getElementById("fPersonagem").textContent = personagemTemp.identidade?.personagem || "";
  document.getElementById("fOficio").textContent = personagemTemp.oficio?.nome || "";
  document.getElementById("fClasse").textContent = personagemTemp.classe?.nome || "";
  document.getElementById("fCampanha").textContent = personagemTemp.identidade?.campanha || "";
  document.getElementById("fPericias").textContent = (personagemTemp.pericias || []).map(p => p.nome).join(", ");

  trocarTela("tela-ficha");

  // atributos editáveis na ficha
  document.getElementById("fichaFOR").value = personagemTemp.atributos.FOR ?? 0;
  document.getElementById("fichaAGI").value = personagemTemp.atributos.AGI ?? 0;
  document.getElementById("fichaINT").value = personagemTemp.atributos.INT ?? 0;
  document.getElementById("fichaVIG").value = personagemTemp.atributos.VIG ?? 0;
  document.getElementById("fichaAUR").value = personagemTemp.atributos.AUR ?? 0;

  ["FOR","AGI","INT","VIG","AUR"].forEach((k) => {
    const el = document.getElementById(`ficha${k}`);
    el.oninput = async () => {
      personagemTemp.atributos[k] = Number(el.value || 0);
      recalcularRecursos();
      atualizarBarrasUI();
      await salvarAutoOnline();
    };
  });

  document.getElementById("resManual").oninput = async (e) => {
    personagemTemp.resDef.RES = Number(e.target.value || 0);
    await salvarAutoOnline();
  };

  document.getElementById("defManual").oninput = async (e) => {
    personagemTemp.resDef.DEF = Number(e.target.value || 0);
    await salvarAutoOnline();
  };

  recalcularRecursos();
  atualizarBarrasUI();
}

/* =========================
   CAMPANHAS ONLINE
========================= */
let unsubCampanhas = null;
let campanhaSelecionadaTemp = null;

window.abrirCampanhas = function (modo) {
  fecharMenuLateral();
  trocarTela("tela-campanhas");

  const box = document.getElementById("campanhasModoBox");

  if (modo === "criar") {
    box.innerHTML = `
      <div class="titulo-card">Criar campanha</div>
      <div class="sub-card">Você vira GM</div>

      <div class="campo" style="margin-top:12px;">
        <label>Nome da campanha</label>
        <input id="nomeNovaCamp" placeholder="Ex: Guerra dos Reinos" />
      </div>

      <div class="campo">
        <label>Tipo</label>
        <select id="tipoNovaCamp" style="padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.15);background:#151515;color:white;">
          <option value="publica">Pública</option>
          <option value="convite">Via convite</option>
        </select>
      </div>

      <button class="btn enabled" onclick="criarCampanhaAgora()">CRIAR</button>
    `;
  } else {
    box.innerHTML = `
      <div class="titulo-card">Entrar em campanha</div>
      <div class="sub-card">Pública ou convite</div>

      <div class="campo" style="margin-top:12px;">
        <label>Código de convite</label>
        <input id="codigoConvite" placeholder="Cole o ID da campanha" />
      </div>

      <button class="btn enabled" onclick="entrarPorCodigo()">ENTRAR COM CÓDIGO</button>
    `;
  }

  escutarCampanhasTempoReal();
};

function escutarCampanhasTempoReal() {
  const area = document.getElementById("campanhasArea");
  area.innerHTML = `<div class="card"><div class="sub-card">Carregando...</div></div>`;

  if (unsubCampanhas) unsubCampanhas();

  const ref = collection(db, "campanhas");
  const q = query(ref, orderBy("criadaEm", "desc"));

  unsubCampanhas = onSnapshot(q, (snap) => {
    const campanhas = [];
    snap.forEach((d) => campanhas.push({ id: d.id, ...d.data() }));

    area.innerHTML = "";

    const publicas = campanhas.filter(c => c.tipo === "publica");

    publicas.forEach((c) => {
      const jogadores = Array.isArray(c.jogadores) ? c.jogadores.length : 0;
      const div = document.createElement("div");
      div.className = "card";

      div.innerHTML = `
        <div class="titulo-card">${c.nome}</div>
        <div class="sub-card">Jogadores: ${jogadores}</div>
        <div class="sub-card">Código: ${c.id}</div>
        <button class="btn enabled" style="margin-top:10px;" onclick="clicarEntrarCampanha('${c.id}')">ENTRAR</button>
      `;
      area.appendChild(div);
    });

    if (publicas.length === 0) {
      area.innerHTML = `<div class="card"><div class="sub-card">Nenhuma campanha pública ainda.</div></div>`;
    }
  });
}

window.criarCampanhaAgora = async function () {
  const nome = document.getElementById("nomeNovaCamp").value.trim();
  const tipo = document.getElementById("tipoNovaCamp").value;

  if (!nome) return alert("Digite o nome da campanha.");

  const docRef = await addDoc(collection(db, "campanhas"), {
    nome,
    tipo,
    gmUid: userUID,
    criadaEm: serverTimestamp(),
    jogadores: []
  });

  alert("Campanha criada! Código: " + docRef.id);
};

window.entrarPorCodigo = async function () {
  const codigo = document.getElementById("codigoConvite").value.trim();
  if (!codigo) return alert("Digite o código.");

  const snap = await getDoc(doc(db, "campanhas", codigo));
  if (!snap.exists()) return alert("Campanha não encontrada.");

  clicarEntrarCampanha(codigo);
};

window.clicarEntrarCampanha = async function (campId) {
  const snap = await getDoc(doc(db, "campanhas", campId));
  if (!snap.exists()) return alert("Campanha não existe.");

  campanhaSelecionadaTemp = { id: snap.id, ...snap.data() };

  // precisa ter personagem online
  const personagens = await carregarPersonagensOnline();
  if (personagens.length === 0) {
    alert("Crie um personagem para participar.");
    return;
  }

  trocarTela("tela-escolher-personagem");
  renderEscolhaPersonagemOnline(personagens);
};

function renderEscolhaPersonagemOnline(personagens) {
  const div = document.getElementById("listaEscolhaPersonagem");
  div.innerHTML = "";

  personagens.forEach((item) => {
    const nome = item.ficha?.identidade?.personagem || "Sem nome";
    const data = item.criadoEm ? formatarDataBR(item.criadoEm) : "-";

    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="titulo-card">${nome}</div>
      <div class="sub-card">Criado em: ${data}</div>
      <button class="btn enabled" style="margin-top:10px;" onclick="confirmarEntradaCampanha('${item.id}')">
        USAR ESTE
      </button>
    `;
    div.appendChild(card);
  });
}

window.confirmarEntradaCampanha = async function (personagemId) {
  if (!campanhaSelecionadaTemp) return alert("Campanha inválida.");

  await updateDoc(doc(db, "campanhas", campanhaSelecionadaTemp.id), {
    jogadores: arrayUnion({
      uid: userUID,
      personagemId,
      entrouEm: Date.now()
    })
  });

  abrirDentroDaCampanha(campanhaSelecionadaTemp.id);
};

window.voltarCampanhas = function () {
  trocarTela("tela-campanhas");
};

window.sairCampanha = function () {
  campanhaAtualId = null;
  trocarTela("tela-campanhas");
};

/* =========================
   DENTRO DA CAMPANHA + ITENS GM
========================= */
let unsubCampanhaAtual = null;
let unsubItensCamp = null;

async function abrirDentroDaCampanha(campId) {
  campanhaAtualId = campId;
  trocarTela("tela-campanha");

  if (unsubCampanhaAtual) unsubCampanhaAtual();
  if (unsubItensCamp) unsubItensCamp();

  const campRef = doc(db, "campanhas", campId);

  unsubCampanhaAtual = onSnapshot(campRef, async (snap) => {
    if (!snap.exists()) return;

    const camp = { id: snap.id, ...snap.data() };

    document.getElementById("campNome").textContent = camp.nome;

    const jogadores = Array.isArray(camp.jogadores) ? camp.jogadores : [];
    document.getElementById("campInfoBox").innerHTML = `
      <div class="titulo-card">Código</div>
      <div class="sub-card">${camp.id}</div>
      <div class="sub-card">Jogadores: ${jogadores.length}</div>
    `;

    renderJogadoresCamp(jogadores);

    // GM area
    const gmArea = document.getElementById("gmArea");
    if (camp.gmUid === userUID) gmArea.style.display = "block";
    else gmArea.style.display = "none";
  });

  // itens da campanha
  const itensRef = collection(db, "campanhas", campId, "itens");
  unsubItensCamp = onSnapshot(query(itensRef, orderBy("criadoEm", "desc")), (snap) => {
    const lista = [];
    snap.forEach(d => lista.push({ id: d.id, ...d.data() }));
    renderItensGM(lista);
  });
}

function renderJogadoresCamp(jogadores) {
  const div = document.getElementById("listaJogadoresCamp");
  div.innerHTML = "";

  if (jogadores.length === 0) {
    div.innerHTML = `<div class="card"><div class="sub-card">Nenhum jogador ainda.</div></div>`;
    return;
  }

  jogadores.forEach((j) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="titulo-card">Jogador</div>
      <div class="sub-card">UID: ${String(j.uid).slice(0, 6)}</div>
      <div class="sub-card">Personagem: ${j.personagemId}</div>
    `;
    div.appendChild(card);
  });
}

window.gmCriarItem = async function () {
  if (!campanhaAtualId) return alert("Campanha inválida.");

  const nome = document.getElementById("gmItemNome").value.trim();
  const bonus = document.getElementById("gmItemBonus").value.trim();

  if (!nome) return alert("Digite o nome do item.");
  if (!bonus) return alert("Digite o bônus (ex: KI +40).");

  await addDoc(collection(db, "campanhas", campanhaAtualId, "itens"), {
    nome,
    bonus,
    criadoEm: Date.now()
  });

  document.getElementById("gmItemNome").value = "";
  document.getElementById("gmItemBonus").value = "";
};

function renderItensGM(lista) {
  const div = document.getElementById("gmListaItens");
  if (!div) return;

  if (lista.length === 0) {
    div.innerHTML = `<div class="card"><div class="sub-card">Nenhum item criado.</div></div>`;
    return;
  }

  div.innerHTML = "";

  lista.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="titulo-card">${item.nome}</div>
      <div class="sub-card">${item.bonus}</div>
      <button class="btn-small" onclick="equiparItemCampanha('${item.id}', '${item.nome}', '${item.bonus}')">EQUIPAR</button>
      <button class="btn-small" onclick="desequiparItemCampanha('${item.id}')">DESEQUIPAR</button>
    `;
    div.appendChild(card);
  });
}

function parseBonusTexto(txt) {
  // exemplo: "KI +40" ou "HP +10"
  const parts = txt.trim().split(" ");
  if (parts.length < 2) return null;

  const stat = parts[0].toUpperCase();
  const valor = Number(parts[1].replace("+", "").replace("-", ""));

  const sinal = txt.includes("-") ? -1 : 1;

  if (!["HP","MP","COS","KI","CK"].includes(stat)) return null;
  if (isNaN(valor)) return null;

  return { stat, valor: valor * sinal };
}

window.equiparItemCampanha = async function (id, nome, bonusTxt) {
  const bonus = parseBonusTexto(bonusTxt);
  if (!bonus) return alert("Bônus inválido. Use: KI +40");

  // evita duplicar
  if (personagemTemp.itensEquipados.find(x => x.id === id)) {
    alert("Já equipado.");
    return;
  }

  personagemTemp.itensEquipados.push({ id, nome, bonus: bonusTxt });

  personagemTemp.bonusMax[bonus.stat] += bonus.valor;

  recalcularRecursos();
  atualizarBarrasUI();

  await salvarAutoOnline();
  alert("Item equipado!");
};

window.desequiparItemCampanha = async function (id) {
  const achou = personagemTemp.itensEquipados.find(x => x.id === id);
  if (!achou) return alert("Esse item não está equipado.");

  const bonus = parseBonusTexto(achou.bonus);
  if (bonus) personagemTemp.bonusMax[bonus.stat] -= bonus.valor;

  personagemTemp.itensEquipados = personagemTemp.itensEquipados.filter(x => x.id !== id);

  recalcularRecursos();
  atualizarBarrasUI();

  await salvarAutoOnline();
  alert("Item desequipado!");
};

/* =========================
   EVENTOS
========================= */
function configurarEventos() {
  ["forca", "agilidade", "intelecto", "vigor", "aura"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", validarAtributos);
  });

  const fo = document.getElementById("filtroOficio");
  if (fo) fo.addEventListener("input", (e) => {
    const t = e.target.value.toLowerCase();
    renderOficios(OFICIOS.filter(o => o.nome.toLowerCase().includes(t)));
  });

  const fp = document.getElementById("filtroPericia");
  if (fp) fp.addEventListener("input", (e) => {
    const t = e.target.value.toLowerCase();
    renderPericias(PERICIAS.filter(p => p.nome.toLowerCase().includes(t)));
  });

  const fc = document.getElementById("filtroClasse");
  if (fc) fc.addEventListener("input", (e) => {
    const t = e.target.value.toLowerCase();
    renderClasses(CLASSES.filter(c => c.nome.toLowerCase().includes(t)));
  });

  const desc = document.getElementById("descricaoPersonagem");
  if (desc) desc.addEventListener("input", () => {
    document.getElementById("contDesc").textContent = desc.value.length;
    validarIdentidade();
  });

  ["nomeJogador", "nomePersonagem", "nomeCampanha"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", validarIdentidade);
  });
}

/* =========================
   INICIAR
========================= */
async function iniciarFirebaseLogin() {
  const status = document.getElementById("statusOnline");

  await signInAnonymously(auth);

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userUID = user.uid;
      status.textContent = "Online ✓ UID: " + userUID.slice(0, 6);

      renderPersonagensOnline();
    } else {
      status.textContent = "Offline";
    }
  });
}

renderOficios(OFICIOS);
renderPericias(PERICIAS);
renderClasses(CLASSES);

configurarEventos();
setTopoEtapa("identidade");
atualizarTopoEtapas();
iniciarFirebaseLogin();