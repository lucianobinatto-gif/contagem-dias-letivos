// ============================================================================
// Contagem Regressiva de Dias Letivos + Memes Inspiradores para Professores
// ============================================================================

const STORAGE_KEY = 'painel_professor_dias_letivos_v1';

// Feriados nacionais e datas escolares padrão (2026)
const DEFAULT_HOLIDAYS = [
  { date: '2026-02-16', name: 'Carnaval (Recesso)' },
  { date: '2026-02-17', name: 'Carnaval' },
  { date: '2026-02-18', name: 'Quarta de Cinzas' },
  { date: '2026-04-03', name: 'Sexta-feira Santa' },
  { date: '2026-04-21', name: 'Tiradentes' },
  { date: '2026-05-01', name: 'Dia do Trabalho' },
  { date: '2026-06-04', name: 'Corpus Christi' },
  { date: '2026-09-07', name: 'Independência do Brasil' },
  { date: '2026-10-12', name: 'Nossa Sra. Aparecida' },
  { date: '2026-10-15', name: 'Dia do Professor (Recesso)' },
  { date: '2026-11-02', name: 'Finados' },
  { date: '2026-11-15', name: 'Proclamação da República' },
  { date: '2026-11-20', name: 'Dia da Consciência Negra' },
];

// Ilustrações SVG expressivas para os memes dos professores
const MEME_SVGS = {
  coffeeBattery: `
    <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#312e81"/>
          <stop offset="100%" stop-color="#1e1b4b"/>
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="url(#bg1)"/>
      <circle cx="300" cy="225" r="145" fill="#fbbf24" opacity="0.14"/>
      <!-- Quadro negro ao fundo -->
      <rect x="70" y="75" width="460" height="220" rx="12" fill="#143328" stroke="#92400e" stroke-width="8"/>
      <text x="105" y="135" fill="#a7f3d0" font-family="monospace" font-size="18" opacity="0.7">2x + 4 = FÉRIAS</text>
      <text x="360" y="145" fill="#fde68a" font-family="sans-serif" font-size="16" opacity="0.75">Silêncio, turma!</text>
      <!-- Caneca Gigante de Café com indicador de bateria -->
      <g transform="translate(215, 130)">
        <path d="M135 55 H165 A30 30 0 0 1 195 85 V125 A30 30 0 0 1 165 155 H135" fill="none" stroke="#ffffff" stroke-width="16" stroke-linecap="round"/>
        <rect x="10" y="30" width="135" height="165" rx="22" fill="#ffffff" stroke="#0f172a" stroke-width="6"/>
        <rect x="28" y="55" width="99" height="118" rx="10" fill="#451a03"/>
        <!-- Bateria verde dentro do café -->
        <rect x="42" y="130" width="71" height="32" rx="5" fill="#10b981"/>
        <rect x="42" y="92" width="71" height="32" rx="5" fill="#f59e0b"/>
        <text x="77" y="82" text-anchor="middle" fill="#fef08a" font-family="sans-serif" font-weight="bold" font-size="14">99% CAFÉ</text>
        <!-- Vapor -->
        <path d="M50 15 Q40 -5 55 -20" stroke="#fde68a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M80 10 Q70 -10 85 -25" stroke="#fde68a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M110 15 Q100 -5 115 -20" stroke="#fde68a" stroke-width="5" fill="none" stroke-linecap="round"/>
      </g>
    </svg>
  `,
  beachChalkboard: `
    <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="60%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#bae6fd"/>
        </linearGradient>
      </defs>
      <rect width="600" height="450" fill="url(#sky)"/>
      <!-- Sol brilhando -->
      <circle cx="480" cy="110" r="48" fill="#fde047"/>
      <circle cx="480" cy="110" r="62" fill="#fde047" opacity="0.3"/>
      <!-- Mar e Areia -->
      <path d="M0 280 Q150 265 300 280 T600 275 L600 450 L0 450 Z" fill="#0ea5e9"/>
      <path d="M0 325 Q220 300 600 335 L600 450 L0 450 Z" fill="#fde68a"/>
      <!-- Guarda-sol e Cadeira com Pilha de Provas virando aviãozinho -->
      <line x1="190" y1="355" x2="160" y2="175" stroke="#78350f" stroke-width="8" stroke-linecap="round"/>
      <path d="M70 195 Q160 110 255 180 Z" fill="#f43f5e" stroke="#ffffff" stroke-width="4"/>
      <!-- Professor(a) de óculos escuros relaxando -->
      <circle cx="290" cy="285" r="36" fill="#fed7aa" stroke="#0f172a" stroke-width="4"/>
      <rect x="262" y="272" width="24" height="15" rx="3" fill="#0f172a"/>
      <rect x="294" y="272" width="24" height="15" rx="3" fill="#0f172a"/>
      <line x1="286" y1="278" x2="294" y2="278" stroke="#0f172a" stroke-width="4"/>
      <path d="M275 302 Q290 315 306 302" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>
      <!-- Aviõezinhos de papel -->
      <polygon points="410,190 465,175 430,210 425,198" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
      <polygon points="350,150 395,138 368,168 362,158" fill="#ffffff" stroke="#0f172a" stroke-width="2.5"/>
    </svg>
  `,
  diarioHero: `
    <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="450" fill="#1e293b"/>
      <circle cx="300" cy="225" r="170" fill="#4f46e5" opacity="0.22"/>
      <!-- Pilha de cadernos/provas vs Computador com Diário Fechado -->
      <g transform="translate(150, 110)">
        <rect x="20" y="30" width="260" height="175" rx="14" fill="#0f172a" stroke="#94a3b8" stroke-width="6"/>
        <rect x="34" y="44" width="232" height="145" rx="6" fill="#10b981"/>
        <!-- Check gigante de diário entregue -->
        <circle cx="150" cy="116" r="46" fill="#ffffff"/>
        <path d="M128 116 L144 134 L176 98" fill="none" stroke="#059669" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M0 205 H300 L275 230 H25 Z" fill="#cbd5e1"/>
      </g>
      <!-- Estrelas ao redor -->
      <text x="100" y="150" font-size="38">✨</text>
      <text x="465" y="140" font-size="38">🏆</text>
      <text x="450" y="290" font-size="36">🎉</text>
      <text x="105" y="290" font-size="36">🙌</text>
    </svg>
  `,
  silentClassMiracle: `
    <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="450" fill="#0f172a"/>
      <!-- Feixe de luz celestial na sala de aula -->
      <polygon points="230,0 370,0 470,450 130,450" fill="#fde047" opacity="0.18"/>
      <rect x="110" y="85" width="380" height="180" rx="12" fill="#143328" stroke="#a16207" stroke-width="7"/>
      <text x="300" y="165" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="24">TURMA EM SILÊNCIO</text>
      <text x="300" y="202" text-anchor="middle" fill="#fde047" font-family="sans-serif" font-size="18">E FAZENDO A ATIVIDADE ✨</text>
      <!-- Professor(a) emocionado(a) -->
      <circle cx="300" cy="315" r="44" fill="#fde68a" stroke="#0f172a" stroke-width="5"/>
      <circle cx="283" cy="304" r="6" fill="#0f172a"/>
      <circle cx="317" cy="304" r="6" fill="#0f172a"/>
      <!-- Lágrima de emoção -->
      <path d="M324 314 Q330 326 324 332 Q318 326 324 314 Z" fill="#38bdf8"/>
      <path d="M282 332 Q300 346 318 332" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>
    </svg>
  `,
  mondayCountdown: `
    <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="450" fill="#3b0764"/>
      <!-- Folha de Calendário Rasgando -->
      <g transform="translate(175, 85)">
        <rect x="0" y="20" width="250" height="260" rx="20" fill="#ffffff" stroke="#0f172a" stroke-width="6"/>
        <path d="M0 40 A20 20 0 0 1 20 20 H230 A20 20 0 0 1 250 40 V85 H0 Z" fill="#f43f5e" stroke="#0f172a" stroke-width="6"/>
        <circle cx="65" cy="20" r="14" fill="#94a3b8" stroke="#0f172a" stroke-width="4"/>
        <circle cx="185" cy="20" r="14" fill="#94a3b8" stroke="#0f172a" stroke-width="4"/>
        <text x="125" y="63" text-anchor="middle" fill="#ffffff" font-family="sans-serif" font-weight="bold" font-size="24">SEGUNDAS</text>
        <text x="125" y="185" text-anchor="middle" fill="#0f172a" font-family="sans-serif" font-weight="900" font-size="78">TCHAU</text>
        <text x="125" y="235" text-anchor="middle" fill="#10b981" font-family="sans-serif" font-weight="bold" font-size="20">CONTAGEM ATIVA!</text>
      </g>
    </svg>
  `,
  seedPlanter: `
    <svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
      <rect width="600" height="450" fill="#064e3b"/>
      <circle cx="300" cy="230" r="150" fill="#10b981" opacity="0.2"/>
      <!-- Livro aberto com árvore do conhecimento florescendo -->
      <path d="M150 320 Q225 295 300 320 Q375 295 450 320 L450 355 Q375 330 300 355 Q225 330 150 355 Z" fill="#fef3c7" stroke="#0f172a" stroke-width="5"/>
      <path d="M295 320 L295 200 L305 200 L305 320 Z" fill="#78350f"/>
      <circle cx="300" cy="165" r="55" fill="#34d399"/>
      <circle cx="255" cy="190" r="40" fill="#10b981"/>
      <circle cx="345" cy="190" r="40" fill="#10b981"/>
      <text x="285" y="155" font-size="26">💡</text>
      <text x="245" y="195" font-size="22">⭐</text>
      <text x="335" y="195" font-size="22">🎓</text>
    </svg>
  `
};

// Galeria de Memes Inspiradores e Bem-Humorados
const MEMES = [
  {
    id: 1,
    category: 'reta-final',
    svgKey: 'beachChalkboard',
    topText: 'MEU CORPO ESTÁ NA SALA DE AULA',
    bottomText: 'MAS MINHA MENTE JÁ ESTÁ A {DIAS} DIAS LETIVOS DAQUI!',
    quote: '"Você atravessou reuniões, conselhos, pilhas de correções e imprevistos — e continuou fazendo a diferença na vida de cada aluno."',
    caption: '— Respire fundo: a linha de chegada já está visível!'
  },
  {
    id: 2,
    category: 'cafe',
    svgKey: 'coffeeBattery',
    topText: 'NÍVEL DE ENERGIA DO PROFESSOR HOJE:',
    bottomText: '98% CAFÉ, 2% CONTANDO OS {DIAS} DIAS LETIVOS',
    quote: '"Que nunca nos falte café quentinho na garrafa térmica nem orgulho da profissão que forma todas as outras."',
    caption: '— Saúde e paciência para a reta final!'
  },
  {
    id: 3,
    category: 'reta-final',
    svgKey: 'diarioHero',
    topText: 'SENSAÇÃO DE LANÇAR A ÚLTIMA NOTA NO DIÁRIO',
    bottomText: 'SÓ FALTAM {DIAS} DIAS LETIVOS PARA A PAZ MUNDIAL!',
    quote: '"Nenhum super-herói da ficção enfrenta 30 personalidades diferentes por horário e ainda sai sorrindo no recreio."',
    caption: '— Seu trabalho vale ouro!'
  },
  {
    id: 4,
    category: 'inspirador',
    svgKey: 'seedPlanter',
    topText: 'QUANDO AQUELE ALUNO QUE TINHA DIFICULDADE',
    bottomText: 'DIZ: "AGORA EU ENTENDI, PROF!" (VALEU O ANO INTEIRO)',
    quote: '"Ensinar é plantar sementes que muitas vezes florescem longe dos nossos olhos, mas sempre levam um pouco do nosso coração."',
    caption: '— Obrigado por não desistir de ninguém!'
  },
  {
    id: 5,
    category: 'reta-final',
    svgKey: 'mondayCountdown',
    topText: 'NÃO CONTE EM DIAS CORRIDOS...',
    bottomText: 'CONTE QUE SÓ FALTAM {SEGUNDAS} SEGUNDAS-FEIRAS!',
    quote: '"Dica pedagógica de sobrevivência: medir o fim do semestre em segundas-feiras reduz o cansaço psicológico em 80%!"',
    caption: '— Matemática afetiva do professor'
  },
  {
    id: 6,
    category: 'inspirador',
    svgKey: 'silentClassMiracle',
    topText: 'QUANDO A TURMA INTEIRA FICA EM SILÊNCIO',
    bottomText: 'E VOCÊ DESCONFIA QUE ESTÁ SONHANDO ACORDADO',
    quote: '"Mesmo nos dias mais barulhentos, sua voz guia futuros. Falta pouco para o merecido descanso: apenas {DIAS} dias letivos!"',
    caption: '— Continue firme, mestre!'
  },
  {
    id: 7,
    category: 'cafe',
    svgKey: 'coffeeBattery',
    topText: 'VOZ ROUCA, GIZ NA ROUPA E OLHEIRA DE FIM DE ANO',
    bottomText: 'MAS O SORRISO DE QUEM VENCEU MAIS UM ANO LETIVO!',
    quote: '"Cansaço de fim de ano é sinal de quem se entregou de verdade. Orgulhe-se de cada aula dada até aqui!"',
    caption: '— Faltam só {DIAS} dias letivos!'
  },
  {
    id: 8,
    category: 'inspirador',
    svgKey: 'seedPlanter',
    topText: 'ELES PODEM ESQUECER A FÓRMULA DA PROVA',
    bottomText: 'MAS NUNCA ESQUECERÃO COMO VOCÊ OS FEZ ACREDITAR NELES',
    quote: '"A educação transforma o mundo uma sala de aula por vez. Seu impacto vai muito além do boletim final."',
    caption: '— Homenagem a quem ensina com alma'
  }
];

// Estado da Aplicação
let state = {
  startDate: '2026-02-02',
  endDate: '2026-12-18',
  includeToday: true,
  countSaturdays: false,
  holidays: [...DEFAULT_HOLIDAYS],
  currentCategory: 'all',
  currentMemeIndex: 0,
  customTop: '',
  customBottom: '',
  customQuote: '',
  customImageDataUrl: null
};

// Carregar configurações salvas
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state = { ...state, ...parsed };
    }
  } catch (err) {
    console.warn('Não foi possível ler o localStorage:', err);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      startDate: state.startDate,
      endDate: state.endDate,
      includeToday: state.includeToday,
      countSaturdays: state.countSaturdays,
      holidays: state.holidays
    }));
  } catch (err) {
    console.warn('Não foi possível salvar no localStorage:', err);
  }
}

// Utilitários de Data (fuso local sem bugs de UTC)
function formatDateISO(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseDateISO(isoStr) {
  const [y, m, d] = isoStr.split('-').map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

function formatDateBR(isoStr) {
  const [y, m, d] = isoStr.split('-');
  return `${d}/${m}/${y}`;
}

function formatDateLongBR(isoStr) {
  const date = parseDateISO(isoStr);
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

function isHoliday(isoStr) {
  return state.holidays.some(h => h.date === isoStr);
}

function getHolidayName(isoStr) {
  const found = state.holidays.find(h => h.date === isoStr);
  return found ? found.name : null;
}

function isWeekend(dateObj) {
  const day = dateObj.getDay(); // 0 = Dom, 6 = Sáb
  if (day === 0) return true;
  if (day === 6 && !state.countSaturdays) return true;
  return false;
}

function isSchoolDay(dateObj) {
  const iso = formatDateISO(dateObj);
  if (isWeekend(dateObj)) return false;
  if (isHoliday(iso)) return false;
  return true;
}

// Cálculo completo dos dias letivos e métricas
function calculateCountdownMetrics() {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startObj = parseDateISO(state.startDate);
  const endObj = parseDateISO(state.endDate);

  // Data inicial para contar os dias restantes
  const iterStart = new Date(todayStart);
  if (!state.includeToday) {
    iterStart.setDate(iterStart.getDate() + 1);
  }

  let schoolDaysLeft = 0;
  let mondaysLeft = 0;
  let holidaysBetween = 0;
  const upcomingDays = [];

  if (endObj >= iterStart) {
    const cursor = new Date(iterStart);
    while (cursor <= endObj) {
      const iso = formatDateISO(cursor);
      const weekend = isWeekend(cursor);
      const holiday = isHoliday(iso);
      const school = !weekend && !holiday;

      if (school) {
        schoolDaysLeft++;
        if (cursor.getDay() === 1) {
          mondaysLeft++;
        }
      } else if (!weekend && holiday) {
        holidaysBetween++;
      }

      upcomingDays.push({
        iso,
        dateObj: new Date(cursor),
        isSchool: school,
        isHoliday: holiday,
        isWeekend: weekend,
        holidayName: getHolidayName(iso),
        isToday: formatDateISO(cursor) === formatDateISO(todayStart)
      });

      cursor.setDate(cursor.getDate() + 1);
    }
  }

  // Cálculo de progresso total do ano letivo (em dias letivos)
  let totalSchoolDaysInPeriod = 0;
  let completedSchoolDays = 0;
  if (endObj >= startObj) {
    const c = new Date(startObj);
    while (c <= endObj) {
      if (isSchoolDay(c)) {
        totalSchoolDaysInPeriod++;
        if (c < todayStart || (c.getTime() === todayStart.getTime() && !state.includeToday)) {
          completedSchoolDays++;
        }
      }
      c.setDate(c.getDate() + 1);
    }
  }

  const progressPercent = totalSchoolDaysInPeriod > 0
    ? Math.min(100, Math.max(0, Math.round((completedSchoolDays / totalSchoolDaysInPeriod) * 100)))
    : 100;

  return {
    schoolDaysLeft,
    mondaysLeft,
    holidaysBetween,
    coffeesLeft: schoolDaysLeft * 3,
    weeksLeft: (schoolDaysLeft / 5).toFixed(1).replace('.0', ''),
    progressPercent,
    completedSchoolDays,
    totalSchoolDaysInPeriod,
    upcomingDays
  };
}

// Atualiza o relógio em tempo real (dias corridos, horas, minutos, segundos)
function updateLiveClock() {
  const now = new Date();
  const [y, m, d] = state.endDate.split('-').map(Number);
  // Considera 18:00 do último dia letivo como o toque da sirene final!
  const targetTime = new Date(y, m - 1, d, 18, 0, 0, 0);
  const diffMs = targetTime - now;

  if (diffMs <= 0) {
    document.getElementById('calendar-days').textContent = '00';
    document.getElementById('clock-hours').textContent = '00';
    document.getElementById('clock-minutes').textContent = '00';
    document.getElementById('clock-seconds').textContent = '00';
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  document.getElementById('calendar-days').textContent = String(days).padStart(2, '0');
  document.getElementById('clock-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('clock-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('clock-seconds').textContent = String(seconds).padStart(2, '0');
}

// Renderiza toda a interface de contagem e calendário
function renderCountdown() {
  const metrics = calculateCountdownMetrics();
  const now = new Date();

  document.getElementById('today-display').textContent =
    `Hoje: ${now.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}`;

  const countEl = document.getElementById('school-days-count');
  countEl.textContent = metrics.schoolDaysLeft;

  const unitEl = document.getElementById('school-days-unit');
  unitEl.textContent = metrics.schoolDaysLeft === 1 ? 'DIA LETIVO' : 'DIAS LETIVOS';

  document.getElementById('target-date-label').textContent =
    `até ${formatDateLongBR(state.endDate)}`;

  // Mensagem de incentivo dinâmica conforme os dias restantes
  const encouragementEl = document.getElementById('hero-encouragement');
  const urgencyTextEl = document.getElementById('urgency-text');

  if (metrics.schoolDaysLeft === 0) {
    urgencyTextEl.textContent = '🎉 FÉRIAS LIBERADAS!';
    encouragementEl.textContent = 'PARABÉNS, PROFESSOR(A)! O último sinal tocou! Feche o diário, desligue os alarmes das 6h da manhã e aproveite cada segundo de descanso!';
  } else if (metrics.schoolDaysLeft <= 10) {
    urgencyTextEl.textContent = '🔥 Contagem Finalíssima!';
    encouragementEl.textContent = `Faltam só ${metrics.schoolDaysLeft} dias letivos! Já dá para ouvir o barulho das ondas e sentir o cheirinho de manhã sem despertador!`;
  } else if (metrics.schoolDaysLeft <= 25) {
    urgencyTextEl.textContent = '🏖️ Reta Final do Ano Letivo!';
    encouragementEl.textContent = `Respira fundo, hidrate a garganta e prepare o fechamento do bimestre: você já venceu ${metrics.progressPercent}% da jornada deste ano!`;
  } else {
    urgencyTextEl.textContent = '💪 Missão Docente em Andamento';
    encouragementEl.textContent = 'Um dia letivo de cada vez, um café por turno e a certeza de que seu trabalho transforma vidas todos os dias!';
  }

  // Barra de progresso
  document.getElementById('progress-percent').textContent =
    `${metrics.progressPercent}% concluído (${metrics.completedSchoolDays}/${metrics.totalSchoolDaysInPeriod} dias letivos)`;
  document.getElementById('progress-fill').style.width = `${metrics.progressPercent}%`;
  document.getElementById('progress-detail-left').textContent = `Início: ${formatDateBR(state.startDate)}`;

  // Métricas divertidas
  document.getElementById('mondays-left').textContent = metrics.mondaysLeft;
  document.getElementById('coffees-left').textContent = metrics.coffeesLeft;
  document.getElementById('weeks-left').textContent = metrics.weeksLeft;
  document.getElementById('holidays-between').textContent = metrics.holidaysBetween;

  renderHolidaysList();
  renderMiniCalendar(metrics.upcomingDays);
  renderMeme(metrics);
}

// Renderiza os chips de feriados no painel de configuração
function renderHolidaysList() {
  const listEl = document.getElementById('holiday-list');
  listEl.innerHTML = '';

  const sorted = [...state.holidays].sort((a, b) => a.date.localeCompare(b.date));
  sorted.forEach(item => {
    const li = document.createElement('li');
    li.className = 'holiday-chip';
    li.innerHTML = `
      <span>${formatDateBR(item.date)} • ${item.name}</span>
      <button type="button" title="Remover folga" data-date="${item.date}">×</button>
    `;
    li.querySelector('button').addEventListener('click', () => {
      state.holidays = state.holidays.filter(h => h.date !== item.date);
      saveState();
      renderCountdown();
      showToast(`Folga de ${formatDateBR(item.date)} removida.`);
    });
    listEl.appendChild(li);
  });
}

// Renderiza o Mapa Interativo da Reta Final
function renderMiniCalendar(upcomingDays) {
  const grid = document.getElementById('mini-calendar-grid');
  grid.innerHTML = '';

  if (upcomingDays.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; color:#059669; font-weight:700;">🎉 Nenhum dia letivo pendente neste período! Boas férias!</p>';
    return;
  }

  // Mostra até 60 dias para manter leve e visual
  const slice = upcomingDays.slice(0, 60);
  slice.forEach(day => {
    const div = document.createElement('div');
    const stateClass = day.isSchool ? 'is-school' : (day.isHoliday ? 'is-holiday' : 'is-weekend');
    div.className = `cal-day ${stateClass} ${day.isToday ? 'is-today' : ''}`;

    const weekdayShort = day.dateObj
      .toLocaleDateString('pt-BR', { weekday: 'short' })
      .replace('.', '');
    const dayMonth = day.dateObj.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

    let tagText = 'Letivo';
    if (day.isWeekend) tagText = 'Fim de sem.';
    if (day.isHoliday) tagText = day.holidayName || 'Recesso';

    div.innerHTML = `
      <span class="cal-weekday">${weekdayShort}</span>
      <span class="cal-date">${dayMonth}</span>
      <span class="cal-tag" title="${tagText}">${tagText}</span>
    `;

    div.addEventListener('click', () => {
      if (day.isWeekend) {
        showToast('Este dia já é fim de semana (ative "Contar sábados" nas configurações se for Sábado Letivo).');
        return;
      }
      if (isHoliday(day.iso)) {
        state.holidays = state.holidays.filter(h => h.date !== day.iso);
        showToast(`${dayMonth} voltou a ser Dia Letivo!`);
      } else {
        state.holidays.push({ date: day.iso, name: 'Recesso Escolar' });
        showToast(`🎉 ${dayMonth} marcado como Recesso / Folga!`);
      }
      saveState();
      renderCountdown();
    });

    grid.appendChild(div);
  });
}

// Filtragem e Renderização do Meme Inspirador
function getFilteredMemes() {
  if (state.currentCategory === 'all') return MEMES;
  return MEMES.filter(m => m.category === state.currentCategory);
}

function replacePlaceholders(str, metrics) {
  return str
    .replace(/\{DIAS\}/g, metrics.schoolDaysLeft)
    .replace(/\{SEGUNDAS\}/g, metrics.mondaysLeft);
}

function renderMeme(metrics = calculateCountdownMetrics()) {
  const list = getFilteredMemes();
  if (state.currentMemeIndex >= list.length) {
    state.currentMemeIndex = 0;
  }
  const current = list[state.currentMemeIndex] || MEMES[0];

  document.getElementById('meme-index-pill').textContent =
    `${state.currentMemeIndex + 1} / ${list.length}`;

  const svgHolder = document.getElementById('meme-svg-holder');
  const customImg = document.getElementById('meme-custom-img');

  if (state.customImageDataUrl) {
    svgHolder.classList.add('hidden');
    customImg.classList.remove('hidden');
    customImg.src = state.customImageDataUrl;
  } else {
    customImg.classList.add('hidden');
    svgHolder.classList.remove('hidden');
    svgHolder.innerHTML = MEME_SVGS[current.svgKey] || MEME_SVGS.coffeeBattery;
  }

  const topStr = state.customTop.trim()
    ? replacePlaceholders(state.customTop, metrics)
    : replacePlaceholders(current.topText, metrics);

  const bottomStr = state.customBottom.trim()
    ? replacePlaceholders(state.customBottom, metrics)
    : replacePlaceholders(current.bottomText, metrics);

  const quoteStr = state.customQuote.trim()
    ? replacePlaceholders(state.customQuote, metrics)
    : replacePlaceholders(current.quote, metrics);

  document.getElementById('meme-top-text').textContent = topStr;
  document.getElementById('meme-bottom-text').textContent = bottomStr;
  document.getElementById('meme-quote').textContent = quoteStr;
  document.getElementById('meme-caption').textContent = replacePlaceholders(current.caption, metrics);

  const badgeEl = document.getElementById('meme-corner-badge');
  badgeEl.innerHTML = metrics.schoolDaysLeft === 0
    ? '🏖️ <strong>FÉRIAS!</strong>'
    : `Faltam <strong>${metrics.schoolDaysLeft}</strong> dias letivos!`;
}

// Exporta um Card PNG (Meme + Contagem Regressiva) via Canvas
function downloadMemeCard() {
  const metrics = calculateCountdownMetrics();
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // Fundo Gradiente Escolar/Tropical
  const grad = ctx.createLinearGradient(0, 0, 1080, 1080);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#1e1b4b');
  grad.addColorStop(1, '#065f46');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1080);

  // Quadro da Contagem no Topo
  ctx.fillStyle = '#143328';
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.roundRect(70, 60, 940, 290, 28);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fde68a';
  ctx.font = 'bold 28px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BOLETIM OFICIAL DE SOBREVIVÊNCIA DOCENTE', 540, 125);

  ctx.fillStyle = '#fef08a';
  ctx.font = '900 115px "Fredoka", sans-serif';
  ctx.fillText(`FALTAM ${metrics.schoolDaysLeft} DIAS LETIVOS!`, 540, 245);

  ctx.fillStyle = '#a7f3d0';
  ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(
    `(${metrics.mondaysLeft} segundas-feiras • ~${metrics.coffeesLeft} cafés até ${formatDateBR(state.endDate)})`,
    540,
    308
  );

  // Caixa do Meme
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.roundRect(70, 390, 940, 580, 28);
  ctx.fill();

  const topText = document.getElementById('meme-top-text').textContent;
  const bottomText = document.getElementById('meme-bottom-text').textContent;
  const quoteText = document.getElementById('meme-quote').textContent;

  ctx.fillStyle = '#4f46e5';
  ctx.font = '800 26px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('🎭 MEME INSPIRADOR DO DIA PARA OS PROFESSORES:', 540, 455);

  ctx.fillStyle = '#0f172a';
  ctx.font = '900 40px Impact, "Arial Black", sans-serif';
  wrapCanvasText(ctx, topText, 540, 540, 840, 48);

  ctx.fillStyle = '#dc2626';
  ctx.font = '900 42px Impact, "Arial Black", sans-serif';
  wrapCanvasText(ctx, bottomText, 540, 665, 840, 50);

  // Frase Inspiradora no Rodapé do Card
  ctx.fillStyle = '#334155';
  ctx.font = 'italic 600 28px "Plus Jakarta Sans", sans-serif';
  wrapCanvasText(ctx, quoteText, 540, 815, 820, 38);

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('☕ Força, colegas! As férias estão chegando!', 540, 935);

  const link = document.createElement('a');
  link.download = `faltam-${metrics.schoolDaysLeft}-dias-letivos.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();

  showToast('📸 Card baixado! Pronto para mandar no grupo da escola.');
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

// Compartilhar no WhatsApp
function shareOnWhatsApp() {
  const metrics = calculateCountdownMetrics();
  const topText = document.getElementById('meme-top-text').textContent;
  const bottomText = document.getElementById('meme-bottom-text').textContent;
  const quoteText = document.getElementById('meme-quote').textContent;

  const msg =
    `📢 *BOLETIM DA SALA DOS PROFESSORES* ☕📚\n\n` +
    `⏳ Faltam exatamente *${metrics.schoolDaysLeft} DIAS LETIVOS* para as nossas férias (até ${formatDateBR(state.endDate)})!\n` +
    `📅 Só mais *${metrics.mondaysLeft} segundas-feiras*!\n` +
    `📈 Já concluímos *${metrics.progressPercent}%* do ano letivo!\n\n` +
    `😂 *Meme do Dia:*\n"${topText} — ${bottomText}"\n\n` +
    `💡 ${quoteText}`;

  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

// Sistema de Confete em Canvas
const confettiParticles = [];
let confettiAnimating = false;

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#fbbf24', '#10b981', '#4f46e5', '#f43f5e', '#38bdf8', '#a855f7'];
  for (let i = 0; i < 110; i++) {
    confettiParticles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 260,
      y: window.innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 16,
      vy: -(Math.random() * 14 + 5),
      size: Math.random() * 9 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 12
    });
  }

  if (!confettiAnimating) {
    confettiAnimating = true;
    requestAnimationFrame(stepConfetti);
  }
}

function stepConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.38; // gravidade
    p.rotation += p.vr;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
    ctx.restore();

    if (p.y > canvas.height + 30) {
      confettiParticles.splice(i, 1);
    }
  }

  if (confettiParticles.length > 0) {
    requestAnimationFrame(stepConfetti);
  } else {
    confettiAnimating = false;
  }
}

// Toast Notification
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, 3200);
}

// Inicialização dos Eventos
function init() {
  loadState();

  const startInput = document.getElementById('input-start-date');
  const endInput = document.getElementById('input-end-date');
  const includeTodayInput = document.getElementById('input-include-today');
  const countSaturdaysInput = document.getElementById('input-count-saturdays');

  startInput.value = state.startDate;
  endInput.value = state.endDate;
  includeTodayInput.checked = state.includeToday;
  countSaturdaysInput.checked = state.countSaturdays;

  startInput.addEventListener('change', (e) => {
    if (e.target.value) {
      state.startDate = e.target.value;
      saveState();
      renderCountdown();
    }
  });

  endInput.addEventListener('change', (e) => {
    if (e.target.value) {
      state.endDate = e.target.value;
      saveState();
      renderCountdown();
      showToast(`Último dia letivo atualizado para ${formatDateBR(state.endDate)}!`);
    }
  });

  includeTodayInput.addEventListener('change', (e) => {
    state.includeToday = e.target.checked;
    saveState();
    renderCountdown();
  });

  countSaturdaysInput.addEventListener('change', (e) => {
    state.countSaturdays = e.target.checked;
    saveState();
    renderCountdown();
  });

  // Adicionar Feriado / Recesso
  document.getElementById('btn-add-holiday').addEventListener('click', () => {
    const dateVal = document.getElementById('new-holiday-date').value;
    const nameVal = document.getElementById('new-holiday-name').value.trim() || 'Recesso Escolar';
    if (!dateVal) {
      showToast('Selecione uma data para adicionar a folga.');
      return;
    }
    if (!isHoliday(dateVal)) {
      state.holidays.push({ date: dateVal, name: nameVal });
      saveState();
      renderCountdown();
      showToast(`Folga "${nameVal}" adicionada!`);
    } else {
      showToast('Esta data já está na lista de folgas.');
    }
    document.getElementById('new-holiday-date').value = '';
    document.getElementById('new-holiday-name').value = '';
  });

  document.getElementById('btn-reset-holidays').addEventListener('click', () => {
    state.holidays = [...DEFAULT_HOLIDAYS];
    saveState();
    renderCountdown();
    showToast('Feriados nacionais restaurados!');
  });

  // Abas de Humor dos Memes
  document.querySelectorAll('.mood-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mood-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currentCategory = btn.dataset.category;
      state.currentMemeIndex = 0;
      renderMeme();
    });
  });

  // Navegação de Memes
  document.getElementById('btn-prev-meme').addEventListener('click', () => {
    const list = getFilteredMemes();
    state.currentMemeIndex = (state.currentMemeIndex - 1 + list.length) % list.length;
    renderMeme();
  });

  document.getElementById('btn-next-meme').addEventListener('click', () => {
    const list = getFilteredMemes();
    state.currentMemeIndex = (state.currentMemeIndex + 1) % list.length;
    renderMeme();
  });

  document.getElementById('btn-random-meme').addEventListener('click', () => {
    const list = getFilteredMemes();
    if (list.length > 1) {
      let nextIdx = state.currentMemeIndex;
      while (nextIdx === state.currentMemeIndex) {
        nextIdx = Math.floor(Math.random() * list.length);
      }
      state.currentMemeIndex = nextIdx;
    }
    renderMeme();
  });

  // Editor de Meme Personalizado
  document.getElementById('btn-toggle-editor').addEventListener('click', () => {
    const editor = document.getElementById('meme-editor');
    editor.classList.toggle('hidden');
  });

  document.getElementById('custom-top-input').addEventListener('input', (e) => {
    state.customTop = e.target.value;
    renderMeme();
  });

  document.getElementById('custom-bottom-input').addEventListener('input', (e) => {
    state.customBottom = e.target.value;
    renderMeme();
  });

  document.getElementById('custom-quote-input').addEventListener('input', (e) => {
    state.customQuote = e.target.value;
    renderMeme();
  });

  document.getElementById('custom-img-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) {
      state.customImageDataUrl = null;
      renderMeme();
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      state.customImageDataUrl = ev.target.result;
      renderMeme();
      showToast('Sua imagem foi aplicada ao meme!');
    };
    reader.readAsDataURL(file);
  });

  // Ações Extras
  document.getElementById('btn-download-meme').addEventListener('click', downloadMemeCard);
  document.getElementById('btn-share-whatsapp').addEventListener('click', shareOnWhatsApp);
  document.getElementById('btn-celebrate').addEventListener('click', () => {
    launchConfetti();
    showToast('🎉 Aguenta firme, professor(a)! As férias já estão logo ali!');
  });

  // Render inicial e relógio a cada segundo
  renderCountdown();
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
}

document.addEventListener('DOMContentLoaded', init);
