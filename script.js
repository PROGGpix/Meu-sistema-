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
resDef: {
  RES: 0,
  DEF: 5
},
  recursosInicializados: false
};
function carregarResDefNaFicha() {
  if (!personagemTemp.resDef) {
    personagemTemp.resDef = { RES: 0, DEF: 5 };
  }

  const resInput = document.getElementById("resValor");
  const defInput = document.getElementById("defValor");

  if (resInput) resInput.value = personagemTemp.resDef.RES ?? 0;
  if (defInput) defInput.value = personagemTemp.resDef.DEF ?? 5;
}
function ativarEdicaoResDef() {
  const resInput = document.getElementById("resValor");
  const defInput = document.getElementById("defValor");

  if (resInput) {
    resInput.oninput = () => {
      personagemTemp.resDef.RES = Number(resInput.value || 0);
      salvarAutoFicha();
    };
  }

  if (defInput) {
    defInput.oninput = () => {
      personagemTemp.resDef.DEF = Number(defInput.value || 0);
      salvarAutoFicha();
    };
  }
}

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

function liberarEtapa(idx) {
  etapaLiberadaIndex = Math.max(etapaLiberadaIndex, idx);
  atualizarTopoEtapas();
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
    liberarEtapa(1);
  } else {
    btn.classList.remove("enabled");
  }
}

window.irParaOficio = function () {
  liberarEtapa(1);
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

  liberarEtapa(2);
}

window.irParaPericias = function () {
  liberarEtapa(2);
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
    liberarEtapa(3);
  } else {
    btn.classList.remove("enabled");
  }
}

window.irParaClasse = function () {
  liberarEtapa(3);
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

  liberarEtapa(4);
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
  liberarEtapa(4);
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
  const achou = fichas.find(f => f.id === id);

  if (!achou) {
    alert("Ficha não encontrada!");
    return;
  }

  const copia = JSON.parse(JSON.stringify(achou.ficha));
  const nomeOriginal = copia.identidade?.personagem || "Sem nome";
  copia.identidade.personagem = `${nomeOriginal} (cópia)`;

  fichas.push({
    id: gerarIdFicha(),
    criadoEm: Date.now(),
    ficha: copia
  });

  salvarListaFichas(fichas);

  alert("Ficha duplicada!");
  renderPersonagensSalvos();
};

window.deletarFicha = function (id) {
  const fichas = pegarFichasSalvas();
  const achou = fichas.find(f => f.id === id);

  if (!achou) {
    alert("Ficha não encontrada!");
    return;
  }

  const nome = achou.ficha?.identidade?.personagem || "Sem nome";
  const ok = confirm(`Deletar "${nome}"? Isso não pode ser desfeito.`);
  if (!ok) return;

  const novo = fichas.filter(f => f.id !== id);
  salvarListaFichas(novo);

  alert("Ficha deletada!");
  renderPersonagensSalvos();
};

window.compartilharFicha = async function (id) {
  const fichas = pegarFichasSalvas();
  const achou = fichas.find(f => f.id === id);

  if (!achou) {
    alert("Ficha não encontrada!");
    return;
  }

  const f = achou.ficha;

  const texto = `
🎲 Ficha RPG
Jogador: ${f.identidade?.jogador || "-"}
Personagem: ${f.identidade?.personagem || "-"}
Campanha: ${f.identidade?.campanha || "-"}
Ofício: ${f.oficio?.nome || "-"}
Classe: ${f.classe?.nome || "-"}
Perícias: ${(f.pericias || []).map(p => p.nome).join(", ") || "-"}

Atributos:
FOR ${f.atributos?.FOR ?? 0}
AGI ${f.atributos?.AGI ?? 0}
INT ${f.atributos?.INT ?? 0}
VIG ${f.atributos?.VIG ?? 0}
AUR ${f.atributos?.AUR ?? 0}

Descrição: ${f.identidade?.descricao || "(sem descrição)"}
`.trim();

  try {
    if (navigator.share) {
      await navigator.share({
        title: "Ficha do Personagem",
        text: texto
      });
    } else {
      await navigator.clipboard.writeText(texto);
      alert("Seu celular não suporta compartilhar direto. Copiei a ficha!");
    }
  } catch (e) {
    alert("Não deu pra compartilhar: " + e.message);
  }
};

/* =========================
   FICHA (ATRIBUTOS + BARRAS)
========================= */

function calcularStatus(atributos) {
  const FOR = Number(atributos.FOR || 0);
  const INT = Number(atributos.INT || 0);
  const VIG = Number(atributos.VIG || 0);
  const AUR = Number(atributos.AUR || 0);

  // FICHA BASE
  const baseHP = 25;
  const baseMP = 15;
  const baseCOS = 0;
  const baseKI = 0;
  const baseCK = 0;

  // REGRAS DO SEU SISTEMA:
  // +2 VIG = 20HP  -> +1 VIG = 10HP
  // +1 INT = 20MP
  // +1 INT + 1 AUR = 20 COS -> cada ponto vale 10
  // +2 FOR = 20KI -> +1 FOR = 10KI
  // +1 AUR = 10CK

  return {
    HP: baseHP + (VIG * 10),
    MP: baseMP + (INT * 20),
    COS: baseCOS + ((INT + AUR) * 10),
    KI: baseKI + (FOR * 10),
    CK: baseCK + (AUR * 10)
  };
}
function garantirRecursos() {
  personagemTemp.recursos = personagemTemp.recursos || {
    HP: { atual: 0, max: 0 },
    MP: { atual: 0, max: 0 },
    COS: { atual: 0, max: 0 },
    KI: { atual: 0, max: 0 },
    CK: { atual: 0, max: 0 }
  };
}

function atualizarMaximosPelosAtributos() {
  const max = calcularStatus(personagemTemp.atributos);

  personagemTemp.recursos.HP.max = max.HP;
  personagemTemp.recursos.MP.max = max.MP;
  personagemTemp.recursos.COS.max = max.COS;
  personagemTemp.recursos.KI.max = max.KI;
  personagemTemp.recursos.CK.max = max.CK;

  ["HP","MP","COS","KI","CK"].forEach((k) => {
    if (personagemTemp.recursos[k].atual > personagemTemp.recursos[k].max) {
      personagemTemp.recursos[k].atual = personagemTemp.recursos[k].max;
    }
    if (personagemTemp.recursos[k].atual < 0) personagemTemp.recursos[k].atual = 0;
  });
}

function atualizarBarrasFicha() {
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
}

function ativarEdicaoRecursos() {
  const binds = [
    { key: "HP", id: "hpAtual" },
    { key: "MP", id: "mpAtual" },
    { key: "COS", id: "cosAtual" },
    { key: "KI", id: "kiAtual" },
    { key: "CK", id: "ckAtual" }
  ];

  binds.forEach((b) => {
    const el = document.getElementById(b.id);
    if (!el) return;

    el.oninput = () => {
      let v = Number(el.value || 0);
      if (v < 0) v = 0;

      const max = personagemTemp.recursos[b.key].max;
      if (v > max) v = max;

      personagemTemp.recursos[b.key].atual = v;

      atualizarBarrasFicha();
      salvarAutoFicha();
    };
  });
}

window.alterarRecurso = function (nome, delta) {
  const r = personagemTemp.recursos[nome];
  if (!r) return;

  r.atual = Number(r.atual || 0) + delta;

  if (r.atual < 0) r.atual = 0;
  if (r.atual > r.max) r.atual = r.max;

  atualizarBarrasFicha();
  salvarAutoFicha();
};

window.setMax = function (nome) {
  const r = personagemTemp.recursos[nome];
  if (!r) return;

  r.atual = r.max;

  atualizarBarrasFicha();
  salvarAutoFicha();
};

function preencherAtributosFichaInputs() {
  document.getElementById("fichaFOR").value = personagemTemp.atributos.FOR ?? 0;
  document.getElementById("fichaAGI").value = personagemTemp.atributos.AGI ?? 0;
  document.getElementById("fichaINT").value = personagemTemp.atributos.INT ?? 0;
  document.getElementById("fichaVIG").value = personagemTemp.atributos.VIG ?? 0;
  document.getElementById("fichaAUR").value = personagemTemp.atributos.AUR ?? 0;
}

function salvarAutoFicha() {
  if (fichaAbertaId) {
    atualizarFichaSalvaNoLocalStorage(fichaAbertaId, personagemTemp);
    mostrarToastSalvo();
  }
}

function ativarEdicaoAtributosFicha() {
  ["FOR","AGI","INT","VIG","AUR"].forEach((key) => {
    const el = document.getElementById(`ficha${key}`);
    if (!el) return;

    el.oninput = () => {
      personagemTemp.atributos[key] = Number(el.value || 0);

      garantirRecursos();
      atualizarMaximosPelosAtributos();
      atualizarBarrasFicha();

      salvarAutoFicha();
    };
  });
}

function abrirFichaAtual() {
  document.getElementById("fJogador").textContent = personagemTemp.identidade?.jogador || "";
  document.getElementById("fPersonagem").textContent = personagemTemp.identidade?.personagem || "";
  document.getElementById("fOficio").textContent = personagemTemp.oficio?.nome || "";
  document.getElementById("fClasse").textContent = personagemTemp.classe?.nome || "";
  document.getElementById("fCampanha").textContent = personagemTemp.identidade?.campanha || "";

  const nomesPericias = (personagemTemp.pericias || []).map(p => p.nome).join(", ");
  document.getElementById("fPericias").textContent = nomesPericias;

  trocarTela("tela-ficha");

  preencherAtributosFichaInputs();
  ativarEdicaoAtributosFicha();
  carregarResDefNaFicha();
  ativarEdicaoResDef();
  garantirRecursos();
  atualizarMaximosPelosAtributos();

  if (!personagemTemp.recursosInicializados) {
    ["HP","MP","COS","KI","CK"].forEach((k) => {
      personagemTemp.recursos[k].atual = personagemTemp.recursos[k].max;
    });
    personagemTemp.recursosInicializados = true;
    salvarAutoFicha();
  }

  atualizarBarrasFicha();
  ativarEdicaoRecursos();
}

/* =========================
   MENU INFERIOR (FICHA)
========================= */

window.toggleMenuInferior = function () {
  document.getElementById("menuInferior").classList.toggle("ativo");
};

window.abrirAbaFicha = function (aba) {
  const painel = document.getElementById("painelAbaFicha");
  const titulo = document.getElementById("tituloAbaFicha");
  const conteudo = document.getElementById("conteudoAbaFicha");

  painel.classList.add("ativo");
  document.getElementById("menuInferior").classList.remove("ativo");

  if (aba === "atributos") {
    titulo.textContent = "Atributos";
    conteudo.innerHTML = `<div class="sub-card">Use os hexágonos acima para editar.</div>`;
    return;
  }

  if (aba === "oficios") {
    titulo.textContent = "Ofícios";
    conteudo.innerHTML = "";
    renderListaComMod(conteudo, "oficios", [personagemTemp.oficio].filter(Boolean));
    return;
  }

  if (aba === "pericias") {
    titulo.textContent = "Perícias";
    conteudo.innerHTML = "";
    renderListaComMod(conteudo, "pericias", personagemTemp.pericias || []);
    return;
  }

  if (aba === "habilidades") {
    titulo.textContent = "Habilidades";
    conteudo.innerHTML = "";
    const lista = (personagemTemp.classe?.habilidades || []).map(h => ({ nome: h, atributo: "Classe" }));
    renderListaComMod(conteudo, "habilidades", lista);
    return;
  }

  if (aba === "poderes") {
    titulo.textContent = "Poderes";
    conteudo.innerHTML = "";
    const lista = (personagemTemp.classe?.oficioPericias || []).map(p => ({ nome: p, atributo: "Classe" }));
    renderListaComMod(conteudo, "poderes", lista);
    return;
  }

  if (aba === "equipamentos") {
    titulo.textContent = "Equipamentos";
    conteudo.innerHTML = `
      <div class="sub-card">Adicione equipamentos abaixo:</div>
      <div class="campo" style="margin-top:10px;">
        <input id="novoEquip" placeholder="Ex: Espada longa +1" />
        <button class="btn enabled" style="margin-top:10px;" onclick="addEquipamento()">Adicionar</button>
      </div>
      <div id="listaEquip"></div>
    `;
    renderEquipamentos();
    return;
  }

  if (aba === "itens") {
    titulo.textContent = "Itens";
    conteudo.innerHTML = `
      <div class="sub-card">Adicione itens abaixo:</div>
      <div class="campo" style="margin-top:10px;">
        <input id="novoItem" placeholder="Ex: Poção de cura" />
        <button class="btn enabled" style="margin-top:10px;" onclick="addItem()">Adicionar</button>
      </div>
      <div id="listaItens"></div>
    `;
    renderItens();
    return;
  }
};

window.fecharAbaFicha = function () {
  document.getElementById("painelAbaFicha").classList.remove("ativo");
};

function renderListaComMod(container, tipo, lista) {
  if (!lista || lista.length === 0) {
    container.innerHTML = `<div class="card"><div class="sub-card">Nada aqui ainda.</div></div>`;
    return;
  }

  personagemTemp.mods = personagemTemp.mods || { oficios:{}, pericias:{}, habilidades:{}, poderes:{} };

  lista.forEach((item) => {
    const nome = item.nome;
    const atr = item.atributo || "";

    const modAtual = personagemTemp.mods[tipo]?.[nome] ?? 0;

    const linha = document.createElement("div");
    linha.className = "linha-mod";

    linha.innerHTML = `
      <div>
        <div class="nome">${nome}</div>
        <div class="tipo">${atr}</div>
      </div>

      <div class="mod-box">
        <span>+</span>
        <input type="number" value="${modAtual}" />
      </div>
    `;

    const input = linha.querySelector("input");
    input.addEventListener("input", () => {
      const valor = Number(input.value || 0);

      if (!personagemTemp.mods[tipo]) personagemTemp.mods[tipo] = {};
      personagemTemp.mods[tipo][nome] = valor;

      salvarAutoFicha();
    });

    container.appendChild(linha);
  });
}

/* =========================
   ITENS / EQUIPAMENTOS
========================= */

window.addEquipamento = function () {
  const inp = document.getElementById("novoEquip");
  if (!inp) return;

  const txt = inp.value.trim();
  if (!txt) return;

  personagemTemp.equipamentos = personagemTemp.equipamentos || [];
  personagemTemp.equipamentos.push(txt);

  inp.value = "";
  salvarAutoFicha();
  renderEquipamentos();
};

window.removerEquipamento = function (i) {
  personagemTemp.equipamentos.splice(i, 1);
  salvarAutoFicha();
  renderEquipamentos();
};

window.editarEquipamento = function (i) {
  const atual = personagemTemp.equipamentos?.[i];
  if (!atual) return;

  const novo = prompt("Editar equipamento:", atual);
  if (novo === null) return;

  const txt = novo.trim();
  if (!txt) return;

  personagemTemp.equipamentos[i] = txt;
  salvarAutoFicha();
  renderEquipamentos();
};

function renderEquipamentos() {
  const div = document.getElementById("listaEquip");
  if (!div) return;

  const lista = personagemTemp.equipamentos || [];

  if (lista.length === 0) {
    div.innerHTML = `<div class="card"><div class="sub-card">Nenhum equipamento.</div></div>`;
    return;
  }

  div.innerHTML = "";
  lista.forEach((eq, i) => {
    const linha = document.createElement("div");
    linha.className = "linha-simples";

    linha.innerHTML = `
      <div class="nome">${eq}</div>
      <div class="botoes-linha">
        <button class="btn-mini" onclick="editarEquipamento(${i})">✏️</button>
        <button class="btn-mini delete" onclick="removerEquipamento(${i})">🗑️</button>
      </div>
    `;

    div.appendChild(linha);
  });
}

window.addItem = function () {
  const inp = document.getElementById("novoItem");
  if (!inp) return;

  const txt = inp.value.trim();
  if (!txt) return;

  personagemTemp.itens = personagemTemp.itens || [];
  personagemTemp.itens.push(txt);

  inp.value = "";
  salvarAutoFicha();
  renderItens();
};

window.removerItem = function (i) {
  personagemTemp.itens.splice(i, 1);
  salvarAutoFicha();
  renderItens();
};

window.editarItem = function (i) {
  const atual = personagemTemp.itens?.[i];
  if (!atual) return;

  const novo = prompt("Editar item:", atual);
  if (novo === null) return;

  const txt = novo.trim();
  if (!txt) return;

  personagemTemp.itens[i] = txt;
  salvarAutoFicha();
  renderItens();
};

function renderItens() {
  const div = document.getElementById("listaItens");
  if (!div) return;

  const lista = personagemTemp.itens || [];

  if (lista.length === 0) {
    div.innerHTML = `<div class="card"><div class="sub-card">Nenhum item.</div></div>`;
    return;
  }

  div.innerHTML = "";
  lista.forEach((it, i) => {
    const linha = document.createElement("div");
    linha.className = "linha-simples";

    linha.innerHTML = `
      <div class="nome">${it}</div>
      <div class="botoes-linha">
        <button class="btn-mini" onclick="editarItem(${i})">✏️</button>
        <button class="btn-mini delete" onclick="removerItem(${i})">🗑️</button>
      </div>
    `;

    div.appendChild(linha);
  });
}

/* =========================
   EVENTOS
========================= */

function configurarEventos() {
  ["forca", "agilidade", "intelecto", "vigor", "aura"].forEach(id => {
    document.getElementById(id).addEventListener("input", validarAtributos);
  });

  document.getElementById("filtroOficio").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrado = OFICIOS.filter(o => o.nome.toLowerCase().includes(texto));
    renderOficios(filtrado);
  });

  document.getElementById("filtroPericia").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrado = PERICIAS.filter(p => p.nome.toLowerCase().includes(texto));
    renderPericias(filtrado);
  });

  document.getElementById("filtroClasse").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrado = CLASSES.filter(c => c.nome.toLowerCase().includes(texto));
    renderClasses(filtrado);
  });

  const desc = document.getElementById("descricaoPersonagem");
  desc.addEventListener("input", () => {
    document.getElementById("contDesc").textContent = desc.value.length;
    validarIdentidade();
  });

  ["nomeJogador", "nomePersonagem", "nomeCampanha"].forEach(id => {
    document.getElementById(id).addEventListener("input", validarIdentidade);
  });
}

/* =========================
   INICIAR
========================= */

renderOficios(OFICIOS);
renderPericias(PERICIAS);
renderClasses(CLASSES);
configurarEventos();
validarAtributos();
setTopoEtapa("atributos");
atualizarTopoEtapas();