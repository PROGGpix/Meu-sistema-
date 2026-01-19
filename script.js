/* =========================
   DADOS
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
  {
    nome: "Mago",
    bonus: ["HP: -15", "MP: +25"],
    habilidades: [
      "Magia básica: ataque balístico comum do elemento natural. Dano: 1d6 + elemento. Custo: 12MP."
    ],
    oficioPericias: [
      "Estudioso (INT): +1 em aprendizado",
      "Consumidor (INT): consumir cristais de mana recupera mana"
    ]
  },
  {
    nome: "Cavaleiro",
    bonus: ["HP: +25", "CA: +5", "KI: +5"],
    habilidades: [
      "Esgrima: permite adicionar KI no dano de espadas de uma mão",
      "Contra-ataque: durante um ataque recebido pode rodar 1d20 para contra-atacar"
    ],
    oficioPericias: [
      "Nobreza: +1 dado em carisma"
    ]
  },
  {
    nome: "Cavaleiro Sagrado",
    bonus: ["HP: +35", "MP: X", "COS: +25"],
    habilidades: [
      "Perde magia e passa a usar Cosmo, potencializando corpo a corpo e abrindo habilidades do zodíaco"
    ],
    oficioPericias: [
      "Nobre: +3 em Carisma/PRE",
      "Devoção: deve servir a uma divindade"
    ]
  },
  {
    nome: "Bárbaro",
    bonus: ["HP: +10", "MP: -15", "CK: +5"],
    habilidades: [
      "Pele de ferro: Custo 3CK, +5 CA",
      "Fúria: Custo 3CK, +3 dano"
    ],
    oficioPericias: [
      "Lenhador: pode adicionar KI em ataques com machados",
      "Brutamontes: +4 itens carregados"
    ]
  },
  {
    nome: "Samurai",
    bonus: ["KI: +15", "Dês: +2D", "MP: -10"],
    habilidades: [
      "Vem X1: duelo usando somente d20, vencedor dá dano completo e recupera vida/mana",
      "IAI: segura ataque 1 rodada e desfere golpe crítico. Custo: 5 KI"
    ],
    oficioPericias: [
      "Espadachim/Samurai: usar KI em ataques com espadas japonesas",
      "Flautista espiritual: músicas suaves acalmam. +3 Car"
    ]
  },
  {
    nome: "Monje",
    bonus: ["HP: +10", "CK: +10", "Cos: +5"],
    habilidades: [
      "Punho pesado: dano do soco +5",
      "Arte marcial: utiliza KI nos golpes corpo a corpo",
      "Desvio linear: 1d10(AGI) contra ataque. Se superar, muda direção/anula crítico"
    ],
    oficioPericias: [
      "Versátil: descansar em qualquer lugar e recuperar vida",
      "Treinamento ardiloso: resiste situações extremas"
    ]
  },
  {
    nome: "Elegante",
    bonus: ["AGI: +3D", "MP: +15", "KI: X"],
    habilidades: [
      "Elegância pedrilhante: adiciona 1/4 do MP no dano físico",
      "Voto de lealdade: pacto mestre/servo ganha habilidade do alvo"
    ],
    oficioPericias: [
      "Mordomo: vem com as perícias cozinheiro e nobre LV5"
    ]
  },
  {
    nome: "Ceifeiro",
    bonus: ["HP: +25 ou AGI+2D", "MP+15"],
    habilidades: [
      "Pelas sombras: nuvem de fumaça + ataque furtivo",
      "Cura: cura 1d10HP"
    ],
    oficioPericias: [
      "Biólogo (INT): analisa ponto vital e dá crítico na próxima rodada",
      "Herbalista (INT): conhecimento de ervas e plantas venenosas"
    ]
  },
  {
    nome: "Bruxo",
    bonus: ["HP: -10", "MP: +30", "VIG=0 (-5)"],
    habilidades: [
      "Retroceder mana: após derrotar inimigo, 1d2 crit = mana perdida recuperada",
      "Paranoia: ganha vantagem em luta"
    ],
    oficioPericias: [
      "Estudioso (INT): +1 aprendizado",
      "Encantamento: pode encantar itens com o elemento dominado"
    ]
  },
  {
    nome: "Arcano",
    bonus: ["HP: +25", "MP: +10", "LG: +40"],
    habilidades: [
      "Necessário: ser divindade ou abençoado pela luz/divino",
      "Ark✴️: Custo(LG) 1d20, Rodadas 1d6, INT +2. Regenera +5HP por rodada. +20 dano vs demônios",
      "Arka: Custo(LG) 1d20, Tempo 1d6, Dano 12 por rodada (24 vs demônios). Esfera de luz"
    ],
    oficioPericias: [
      "Artesão(INT): Lv1 1d10+1",
      "Encanto arcano(PRE): Lv1 1d10+1",
      "Religião(PRE): Lv2 1d10+2"
    ]
  },
  {
    nome: "Obscuro",
    bonus: ["HP: +15", "MP: +15", "DK: +40"],
    habilidades: [
      "Necessário: ser demônio ou meio demônio",
      "Escuridão✴️: Custo(DK) 1d20. +5 RES, +5 testes FOR/AGI, +30 CK (custa sanidade)",
      "Casulo da morte: Custo(DK) 3d10, Dano 3d20"
    ],
    oficioPericias: [
      "Poder(PRE): Lv1 1d10+1",
      "Artesão sombrio(INT): Lv1 1d10+1"
    ]
  },
  {
    nome: "Fabricante",
    bonus: ["HP: +10", "+2D INT"],
    habilidades: [
      "Lábia: teste AUR para negociar/enganar",
      "Análise: teste INT/Misticismo ou Conhecimento para qualidade"
    ],
    oficioPericias: [
      "Ferreiro(FOR): LV1 = 1d10+1",
      "Minerador(FOR): LV1 = 1d10+1"
    ]
  },
  {
    nome: "Contratante Espiritual",
    bonus: ["MP: +35", "RES: -5"],
    habilidades: [
      "Contratante Espiritual: Poder(AUR) 1d10",
      "Atração Pixie (Passiva)"
    ],
    oficioPericias: [
      "Poder(AUR): 1d10",
      "Aura(AUR): 1d10"
    ]
  },
  {
    nome: "Caçador Apurado",
    bonus: ["AGI: +3D", "RES: -2"],
    habilidades: [
      "Ponto fixo: Custo(CK) 20. Concentrar 1 rodada = crítico",
      "Tiro múltiplo(3): Custo(CK) 15. Três tiros"
    ],
    oficioPericias: [
      "Pontaria(AGI)",
      "Caçador(AGI)"
    ]
  },
  {
    nome: "Cantor Andarilho",
    bonus: ["AUR: +3D", "CK +40"],
    habilidades: [
      "Ritmo acelerado: (FOR)+5 (AGI)+5 em um alvo",
      "Expertise: Custo(CK) 25. Aprende uma perícia para usar 1 vez"
    ],
    oficioPericias: [
      "Seduzir(AUR): 1/10",
      "Carisma(AUR): 1/10"
    ]
  }
];

/* =========================
   LOCALSTORAGE
========================= */

const STORAGE_KEY = "meuSistemaRPG_fichas";

function gerarIdFicha() {
  return "ficha_" + Date.now() + "_" + Math.floor(Math.random() * 99999);
}

function pegarFichasSalvas() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function salvarListaFichas(fichas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fichas));
}

function salvarFichaNoLocalStorage(ficha) {
  const fichas = pegarFichasSalvas();
  const novoId = gerarIdFicha();

  fichas.push({
    id: novoId,
    criadoEm: Date.now(),
    ficha
  });

  salvarListaFichas(fichas);
  return novoId;
}

function atualizarFichaSalvaNoLocalStorage(id, fichaAtualizada) {
  const fichas = pegarFichasSalvas();
  const idx = fichas.findIndex(f => f.id === id);
  if (idx === -1) return;

  fichas[idx].ficha = fichaAtualizada;
  salvarListaFichas(fichas);
}

/* =========================
   TOAST
========================= */

let toastTimeout = null;

function mostrarToastSalvo() {
  const el = document.getElementById("toastSalvo");
  if (!el) return;

  el.classList.add("ativo");

  if (toastTimeout) clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    el.classList.remove("ativo");
  }, 900);
}

/* =========================
   ESTADO
========================= */

let fichaAbertaId = null;

let personagemTemp = {
  atributos: { FOR: 0, AGI: 0, INT: 0, VIG: 0, AUR: 0 },
  oficio: null,
  pericias: [],
  classe: null,
  identidade: {
    jogador: "",
    personagem: "",
    descricao: "",
    campanha: ""
  },
  mods: {
    oficios: {},
    pericias: {},
    habilidades: {},
    poderes: {}
  },
  equipamentos: [],
  itens: [],
  recursos: {
    HP: { atual: 0, max: 0 },
    MP: { atual: 0, max: 0 },
    COS: { atual: 0, max: 0 },
    KI: { atual: 0, max: 0 },
    CK: { atual: 0, max: 0 }
  },
  recursosInicializados: false
};

/* =========================
   ETAPAS TOPO
========================= */

const ETAPAS = ["atributos", "oficio", "pericias", "classe", "identidade"];
let etapaLiberadaIndex = 0;

function atualizarTopoEtapas() {
  ETAPAS.forEach((nomeEtapa, i) => {
    const el = document.getElementById(`etapaTopo-${nomeEtapa}`);
    if (!el) return;

    if (i <= etapaLiberadaIndex) el.classList.remove("bloqueada");
    else el.classList.add("bloqueada");
  });
}

window.irEtapa = function (nomeEtapa) {
  const idx = ETAPAS.indexOf(nomeEtapa);
  if (idx === -1) return;
  if (idx > etapaLiberadaIndex) return;

  if (nomeEtapa === "atributos") {
    trocarTela("etapa-atributos");
    setTopoEtapa("atributos");
  }

  if (nomeEtapa === "oficio") {
    trocarTela("etapa-oficio");
    setTopoEtapa("oficio");
  }

  if (nomeEtapa === "pericias") {
    trocarTela("etapa-pericias");
    setTopoEtapa("pericias");
  }

  if (nomeEtapa === "classe") {
    trocarTela("etapa-classe");
    setTopoEtapa("classe");
  }

  if (nomeEtapa === "identidade") {
    trocarTela("etapa-identidade");
    setTopoEtapa("identidade");
    renderPersonagensSalvos();
  }
};

/* =========================
   TELAS
========================= */

function trocarTela(id) {
  document.querySelectorAll(".tela").forEach(t => t.classList.remove("ativa"));
  document.getElementById(id).classList.add("ativa");
}

function setTopoEtapa(etapa) {
  const ids = ["atributos", "oficio", "pericias", "classe", "identidade"];
  ids.forEach(e => document.getElementById(`etapaTopo-${e}`).classList.remove("ativa"));
  document.getElementById(`etapaTopo-${etapa}`).classList.add("ativa");
}

/* =========================
   ATRIBUTOS
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

  if (ok) {
    btn.classList.add("enabled");
    etapaLiberadaIndex = Math.max(etapaLiberadaIndex, 1);
    atualizarTopoEtapas();
  } else {
    btn.classList.remove("enabled");
  }
}

window.irParaOficio = function () {
  trocarTela("etapa-oficio");
  setTopoEtapa("oficio");
};

/* =========================
   OFÍCIO
========================= */

function renderOficios(lista) {
  const container = document.getElementById("listaOficios");
  container.innerHTML = "";

  lista.forEach((o) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="titulo-card">${o.nome}</div>
      <div class="sub-card">${o.atributo}</div>
    `;

    div.onclick = () => selecionarOficio(o, div);
    container.appendChild(div);
  });
}

function selecionarOficio(oficio, cardEl) {
  personagemTemp.oficio = oficio;

  document.querySelectorAll("#listaOficios .card").forEach(c => c.classList.remove("selecionado"));
  cardEl.classList.add("selecionado");

  const btn = document.getElementById("btnProximoOficio");
  btn.disabled = false;
  btn.classList.add("enabled");

  etapaLiberadaIndex = Math.max(etapaLiberadaIndex, 2);
  atualizarTopoEtapas();
}

window.irParaPericias = function () {
  trocarTela("etapa-pericias");
  setTopoEtapa("pericias");
};

/* =========================
   PERÍCIAS
========================= */

function renderPericias(lista) {
  const container = document.getElementById("listaPericias");
  container.innerHTML = "";

  lista.forEach((p) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="titulo-card">${p.nome}</div>
      <div class="sub-card">${p.atributo}</div>
    `;

    div.onclick = () => togglePericia(p, div);
    container.appendChild(div);
  });
}

function togglePericia(pericia, cardEl) {
  const existe = personagemTemp.pericias.find(p => p.nome === pericia.nome);

  if (existe) {
    personagemTemp.pericias = personagemTemp.pericias.filter(p => p.nome !== pericia.nome);
    cardEl.classList.remove("selecionado");
  } else {
    personagemTemp.pericias.push(pericia);
    cardEl.classList.add("selecionado");
  }

  const ok = personagemTemp.pericias.length >= 1;
  const btn = document.getElementById("btnProximoPericias");
  btn.disabled = !ok;

  if (ok) {
    btn.classList.add("enabled");
    etapaLiberadaIndex = Math.max(etapaLiberadaIndex, 3);
    atualizarTopoEtapas();
  } else {
    btn.classList.remove("enabled");
  }
}

window.irParaClasse = function () {
  trocarTela("etapa-classe");
  setTopoEtapa("classe");
};

/* =========================
   CLASSE
========================= */

function renderClasses(lista) {
  const container = document.getElementById("listaClasses");
  container.innerHTML = "";

  lista.forEach((c) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="titulo-card">${c.nome}</div>
      <div class="sub-card">Toque para ver detalhes</div>
    `;

    div.onclick = () => selecionarClasse(c, div);
    container.appendChild(div);
  });
}

function selecionarClasse(classe, cardEl) {
  personagemTemp.classe = classe;

  document.querySelectorAll("#listaClasses .card").forEach(c => c.classList.remove("selecionado"));
  cardEl.classList.add("selecionado");

  mostrarDetalhesClasse(classe);

  const btn = document.getElementById("btnProximoClasse");
  btn.disabled = false;
  btn.classList.add("enabled");

  etapaLiberadaIndex = Math.max(etapaLiberadaIndex, 4);
  atualizarTopoEtapas();
}

function mostrarDetalhesClasse(classe) {
  const div = document.getElementById("detalhesClasse");

  div.innerHTML = `
    <h3>${classe.nome}</h3>
    <p><b>Bônus:</b></p>
    <ul>${classe.bonus.map(b => `<li>${b}</li>`).join("")}</ul>

    <p><b>Habilidades:</b></p>
    <ul>${classe.habilidades.map(h => `<li>${h}</li>`).join("")}</ul>

    <p><b>Ofício/Perícias:</b></p>
    <ul>${classe.oficioPericias.map(o => `<li>${o}</li>`).join("")}</ul>
  `;
}

window.irParaIdentidade = function () {
  trocarTela("etapa-identidade");
  setTopoEtapa("identidade");
  renderPersonagensSalvos();
};

/* =========================
   IDENTIDADE
========================= */

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

window.finalizarPersonagem = function () {
  fichaAbertaId = salvarFichaNoLocalStorage(personagemTemp);
  alert("Personagem salvo!");
  abrirFichaAtual();
};

window.voltarParaInicio = function () {
  location.reload();
};

/* =========================
   LISTA DE SALVOS (IDENTIDADE)
========================= */

document.addEventListener("click", (e) => {
  document.querySelectorAll(".menu-acoes").forEach(menu => {
    const card = menu.closest(".card");
    if (card && !card.contains(e.target)) {
      menu.classList.remove("ativo");
    }
  });
});

function formatarDataBR(timestamp) {
  const d = new Date(timestamp);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();
  const hora = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${hora}:${min}`;
}

function renderPersonagensSalvos() {
  const container = document.getElementById("listaSalvos");
  if (!container) return;

  const fichas = pegarFichasSalvas();

  if (fichas.length === 0) {
    container.innerHTML = `
      <div class="card">
        <div class="sub-card">Nenhum personagem salvo ainda.</div>
      </div>
    `;
    return;
  }

  const ordenado = [...fichas].sort((a, b) => b.criadoEm - a.criadoEm);
  container.innerHTML = "";

  ordenado.forEach((item) => {
    const nome = item.ficha?.identidade?.personagem || "Sem nome";
    const data = item.criadoEm ? formatarDataBR(item.criadoEm) : "-";

    const div = document.createElement("div");
    div.className = "card card-salvo";

    div.innerHTML = `
      <div class="card-topo">
        <div>
          <div class="titulo-card">${nome}</div>
          <div class="sub-card">Criado em: ${data}</div>
        </div>

        <button class="btn-gear" onclick="toggleMenuAcoes(event, '${item.id}')">⚙️</button>
      </div>

      <div class="menu-acoes" id="menu-${item.id}">
        <button class="acao-item" onclick="duplicarFicha('${item.id}')">
          <span>Duplicar</span> <span class="icone">📄</span>
        </button>

        <button class="acao-item" onclick="compartilharFicha('${item.id}')">
          <span>Compartilhar</span> <span class="icone">📤</span>
        </button>

        <button class="acao-item deletar" onclick="deletarFicha('${item.id}')">
          <span>Deletar</span> <span class="icone">🗑️</span>
        </button>
      </div>

      <button class="btn enabled" style="margin-top:10px;" onclick="acessarFichaSalva('${item.id}')">
        ACESSAR
      </button>
    `;

    container.appendChild(div);
  });
}

window.toggleMenuAcoes = function (event, id) {
  event.stopPropagation();

  document.querySelectorAll(".menu-acoes").forEach(m => m.classList.remove("ativo"));

  const menu = document.getElementById(`menu-${id}`);
  if (!menu) return;

  menu.classList.toggle("ativo");
};

window.acessarFichaSalva = function (id) {
  const fichas = pegarFichasSalvas();
  const achou = fichas.find(f => f.id === id);

  if (!achou) {
    alert("Ficha não encontrada!");
    return;
  }

  fichaAbertaId = id;
  personagemTemp = achou.ficha;

  abrirFichaAtual();
};

window.duplicarFicha = function (id) {
  const fichas = pegarFichasSalvas();
  const achou = f