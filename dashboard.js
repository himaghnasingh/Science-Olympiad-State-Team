const SCHOOLS = [
  { key:'barr', name:'Barrington',       cls:'s-barr', bc:'b-barr', color:'var(--red)'    },
  { key:'whl',  name:'Wheeler',          cls:'s-whl',  bc:'b-whl',  color:'var(--blue)'   },
  { key:'mth',  name:'Mt Hope',          cls:'s-mth',  bc:'b-mth',  color:'var(--teal)'   },
  { key:'crw',  name:'Cranston West',    cls:'s-crw',  bc:'b-crw',  color:'var(--orange)' },
  { key:'smf',  name:'Smithfield',       cls:'s-smf',  bc:'b-smf',  color:'var(--purple)' },
  { key:'eg',   name:'East Greenwich',   cls:'s-eg',   bc:'b-eg',   color:'var(--green)'  },
  { key:'plg',  name:'Pilgrim',          cls:'s-plg',  bc:'b-plg',  color:'var(--pink)'   },
  { key:'mb',   name:'Moses Brown',      cls:'s-mb',   bc:'b-mb',   color:'var(--lime)'   },
  { key:'cumb', name:'Cumberland',       cls:'s-cumb', bc:'b-cumb', color:'var(--gold)'   },
  { key:'ns',   name:'North Smithfield', cls:'s-ns',   bc:'b-ns',   color:'#94a3b8'       },
  { key:'cls',  name:'Classical',        cls:'s-cls',  bc:'b-cls',  color:'#64748b'       },
];

const SC = {
  's-barr':'var(--red)',  's-whl':'var(--blue)',  's-mth':'var(--teal)',
  's-crw':'var(--orange)','s-smf':'var(--purple)','s-eg':'var(--green)',
  's-plg':'var(--pink)',  's-mb':'var(--lime)',   's-cumb':'var(--gold)',
  's-ns':'#94a3b8',       's-cls':'#64748b'
};

const EVENTS = [
  "Anatomy & Physiology","Astronomy","Boomilever","Bungee Drop","Chemistry Lab",
  "Circuit Lab","Codebusters","Designer Genes","Disease Detectives","Dynamic Planet",
  "Electric Vehicle","Engineering CAD","Entomology","Experimental Design","Forensics",
  "Helicopter","Hovercraft","Machines","Materials Science","Remote Sensing",
  "Robot Tour","Rocks & Minerals","Water Quality"
];

const RAW = [
  [5,3,2,8,7,9,11,6,1,4,10],[2,3,5,8,11,9,7,4,1,10,6],[3,7,5,6,8,9,2,10,1,11,4],
  [1,5,3,6,7,4,2,9,8,10,11],[5,1,8,7,3,6,10,4,2,11,9],[8,1,5,7,6,4,10,2,9,3,11],
  [1,2,3,6,4,10,9,7,5,8,11],[3,7,5,9,6,4,11,2,1,10,8],[4,9,7,6,3,2,8,10,1,5,11],
  [1,4,3,8,10,6,5,7,2,11,9],[1,4,5,6,7,8,9,10,2,3,11],[3,1,7,5,4,8,10,2,6,9,11],
  [6,2,5,4,1,8,3,7,11,9,10],[1,3,2,8,6,9,10,5,4,7,11],[1,2,6,10,5,11,7,9,4,8,3],
  [1,7,2,6,8,3,4,9,5,10,11],[1,5,3,2,6,8,4,9,7,10,11],[1,2,6,3,7,9,5,10,8,11,4],
  [5,8,2,1,3,6,7,10,9,11,4],[3,1,2,6,4,5,7,10,9,11,8],[1,3,4,5,2,6,9,10,7,8,11],
  [2,4,1,6,10,7,9,3,5,8,11],[2,1,7,9,5,8,6,3,4,11,10],
];

// Optimal grid: Cumberland improved, other schools bumped where displaced
const OPT_GRID = [
  [5,3,2,8,7,9,11,6,1,4,10],[2,3,5,8,11,9,7,4,1,10,6],[3,7,5,6,8,9,2,10,1,11,4],
  [1,6,4,7,8,5,2,9,3,10,11],[5,2,8,7,3,6,10,4,1,11,9],[9,1,6,8,7,5,10,2,4,3,11],
  [1,3,4,6,5,10,9,7,2,8,11],[3,7,5,9,6,4,11,2,1,10,8],[4,9,7,6,3,2,8,10,1,5,11],
  [2,4,3,8,10,6,5,7,1,11,9],[2,4,5,6,7,8,9,10,1,3,11],[4,1,7,6,5,8,10,2,3,9,11],
  [7,2,6,4,1,9,3,8,5,10,11],[1,4,3,8,6,9,10,5,2,7,11],[1,3,6,10,5,11,7,9,2,8,4],
  [1,7,2,6,8,4,5,9,3,10,11],[1,6,4,2,7,8,5,9,3,10,11],[1,2,7,4,8,9,6,10,3,11,5],
  [6,9,2,1,3,7,8,10,5,11,4],[3,1,2,7,5,6,8,10,4,11,9],[1,4,5,6,2,7,9,10,3,8,11],
  [3,5,1,6,10,7,9,4,2,8,11],[3,1,7,9,5,8,6,4,2,11,10],
];

const OPT = {
  "Anatomy & Physiology": { cur:1,  opt:1,  roi:'defend' },
  "Astronomy":            { cur:1,  opt:1,  roi:'defend' },
  "Boomilever":           { cur:1,  opt:1,  roi:'defend' },
  "Bungee Drop":          { cur:8,  opt:3,  roi:'high'   },
  "Chemistry Lab":        { cur:2,  opt:1,  roi:'med'    },
  "Circuit Lab":          { cur:9,  opt:4,  roi:'high'   },
  "Codebusters":          { cur:5,  opt:2,  roi:'high'   },
  "Designer Genes":       { cur:1,  opt:1,  roi:'defend' },
  "Disease Detectives":   { cur:1,  opt:1,  roi:'defend' },
  "Dynamic Planet":       { cur:2,  opt:1,  roi:'med'    },
  "Electric Vehicle":     { cur:2,  opt:1,  roi:'med'    },
  "Engineering CAD":      { cur:6,  opt:3,  roi:'med'    },
  "Entomology":           { cur:11, opt:5,  roi:'high'   },
  "Experimental Design":  { cur:4,  opt:2,  roi:'high'   },
  "Forensics":            { cur:4,  opt:2,  roi:'high'   },
  "Helicopter":           { cur:5,  opt:3,  roi:'med'    },
  "Hovercraft":           { cur:7,  opt:3,  roi:'high'   },
  "Machines":             { cur:8,  opt:3,  roi:'high'   },
  "Materials Science":    { cur:9,  opt:5,  roi:'high'   },
  "Remote Sensing":       { cur:9,  opt:4,  roi:'high'   },
  "Robot Tour":           { cur:7,  opt:3,  roi:'high'   },
  "Rocks & Minerals":     { cur:5,  opt:2,  roi:'med'    },
  "Water Quality":        { cur:4,  opt:2,  roi:'med'    },
};

const MEMBERS = {
  "Anatomy & Physiology": "Saha, Niru",
  "Astronomy":            "Brayden, Saanvi",
  "Boomilever":           "Himaghna, Shiven",
  "Bungee Drop":          "Sai, Anu",
  "Chemistry Lab":        "Saha, Brayden",
  "Circuit Lab":          "Sharvesh, Himaghna",
  "Codebusters":          "Brayden, Gayathri, Sharvesh",
  "Designer Genes":       "Sudeepa, Niru",
  "Disease Detectives":   "Himaghna, Shiven",
  "Dynamic Planet":       "Himaghna, Saanvi",
  "Electric Vehicle":     "Sai, Anu",
  "Engineering CAD":      "Sai, Gayathri",
  "Entomology":           "Rikin, Anu",
  "Experimental Design":  "Sai, Sudeepa, Shiven",
  "Forensics":            "Saha, Neha",
  "Helicopter":           "Rikin, Aahan",
  "Hovercraft":           "Rikin, Brayden",
  "Machines":             "Shiven, Sharvesh",
  "Materials Science":    "—",
  "Remote Sensing":       "Niru, Sudeepa",
  "Robot Tour":           "Sai",
  "Rocks & Minerals":     "Gayathri, Neha",
  "Water Quality":        "Sathwika, Aahan",
};

const ROSTER = {
  "Saha":     ["Anatomy & Physiology","Chemistry Lab","Forensics"],
  "Niru":     ["Anatomy & Physiology","Designer Genes","Remote Sensing"],
  "Brayden":  ["Astronomy","Chemistry Lab","Codebusters","Hovercraft"],
  "Saanvi":   ["Astronomy","Dynamic Planet"],
  "Himaghna": ["Boomilever","Circuit Lab","Disease Detectives","Dynamic Planet"],
  "Shiven":   ["Boomilever","Disease Detectives","Experimental Design","Machines"],
  "Sai":      ["Bungee Drop","Electric Vehicle","Engineering CAD","Experimental Design","Robot Tour"],
  "Anu":      ["Bungee Drop","Electric Vehicle","Entomology"],
  "Sharvesh": ["Circuit Lab","Codebusters","Machines"],
  "Gayathri": ["Codebusters","Engineering CAD","Rocks & Minerals"],
  "Sudeepa":  ["Designer Genes","Experimental Design","Remote Sensing"],
  "Rikin":    ["Entomology","Helicopter","Hovercraft"],
  "Neha":     ["Forensics","Rocks & Minerals"],
  "Aahan":    ["Helicopter","Water Quality"],
  "Sathwika": ["Water Quality"],
};

// Short column headers and colors for opt tables
const SHORT  = ['BAR','WHL','MTH','CRW','SMF','EG','PLG','MB','CUM','NS','CLS'];
const SCOLS  = ['s-barr','s-whl','s-mth','s-crw','s-smf','s-eg','s-plg','s-mb','s-cumb','s-ns','s-cls'].map(k => SC[k]);

// Derived constants
const totals   = SCHOOLS.map((_,i) => RAW.reduce((s,row) => s + row[i], 0));
const standings = SCHOOLS.map((s,i) => ({...s, total:totals[i], idx:i})).sort((a,b) => a.total - b.total);
const cumbIdx  = 8;
const cumbCur  = totals[cumbIdx];
const cumbOpt  = EVENTS.reduce((s,ev) => s + OPT[ev].opt, 0);

// ─────────────────────────────────────────
// RENDER: Standings cards
// ─────────────────────────────────────────
function renderStandings() {
  const row = document.getElementById('standingsRow');
  standings.forEach((s, rank) => {
    const isCumb = s.key === 'cumb';
    const d = document.createElement('div');
    d.className = `stand-card${isCumb ? ' is-cumb' : ''}`;
    d.style.setProperty('--sc', SC[s.cls]);
    d.innerHTML = `
      <div class="stand-rank">${rank + 1}</div>
      <div class="stand-name">${s.name}</div>
      <div class="stand-score">Score: <b>${s.total}</b></div>`;
    row.appendChild(d);
  });
}

// ─────────────────────────────────────────
// RENDER: Full standings table
// ─────────────────────────────────────────
function renderFullTable() {
  const t = document.getElementById('fullTable');
  t.innerHTML = `<thead><tr><th>#</th><th>School</th><th>Total Score</th><th>1st Place Finishes</th><th>Gap to 1st</th></tr></thead>`;
  const tb = document.createElement('tbody');
  const leader = standings[0].total;
  standings.forEach((s, rank) => {
    const fp  = RAW.filter(row => row[s.idx] === 1).length;
    const gap = s.total - leader;
    const tr  = document.createElement('tr');
    if (s.key === 'cumb') tr.className = 'ft-cumb-row';
    tr.innerHTML = `
      <td class="ft-rank" style="color:${rank < 3 ? SC[s.cls] : 'var(--muted)'}">${rank + 1}</td>
      <td class="ft-name" style="color:${SC[s.cls]}">${s.name}${s.key === 'cumb' ? ' ◀ us' : ''}</td>
      <td class="ft-total" style="color:${rank === 0 ? 'var(--gold)' : 'var(--text)'}">${s.total}</td>
      <td style="color:var(--text2)">${fp}</td>
      <td style="color:${gap === 0 ? 'var(--gold)' : 'var(--red)'}">${gap === 0 ? '—' : '+' + gap}</td>`;
    tb.appendChild(tr);
  });
  t.appendChild(tb);
}

// ─────────────────────────────────────────
// RENDER: Per-event bar chart
// ─────────────────────────────────────────
function renderEvChart() {
  const cont = document.getElementById('evChart');
  EVENTS.forEach((ev, ei) => {
    const row   = document.createElement('div');
    row.className = 'bar-row';
    const short = ev.length > 24 ? ev.substring(0, 22) + '…' : ev;
    let segs = '';
    SCHOOLS.forEach((s, si) => {
      const val = RAW[ei][si];
      const pct = (val / 11 * 100).toFixed(1);
      segs += `<div class="bar-seg ${s.bc}" style="width:0%" data-pct="${pct}"><span class="tt">${s.name}: ${val}</span></div>`;
    });
    const cv = RAW[ei][cumbIdx];
    row.innerHTML = `<div class="bar-event" title="${ev}">${short}</div><div class="bar-track">${segs}</div><div class="bar-cumb-val">${cv}</div>`;
    cont.appendChild(row);
  });

  const leg = document.getElementById('evLegend');
  SCHOOLS.forEach(s => {
    leg.innerHTML += `<div class="leg-item"><div class="leg-dot" style="background:${SC[s.cls]}"></div>${s.name}</div>`;
  });

  setTimeout(() => {
    document.querySelectorAll('.bar-seg').forEach(seg => { seg.style.width = seg.dataset.pct + '%'; });
  }, 400);
}

// ─────────────────────────────────────────
// RENDER: Optimization tables (all 11 schools)
// ─────────────────────────────────────────
function renderOptTable(id, mode) {
  const grid = mode === 'cur' ? RAW : OPT_GRID;
  const t    = document.getElementById(id);
  t.innerHTML = '';

  // Header row
  const th = document.createElement('thead');
  let hrow = `<tr><th style="min-width:140px">Event</th>`;
  SHORT.forEach((s, i) => {
    const isCumb = i === 8;
    hrow += `<th class="school-th" style="color:${SCOLS[i]};${isCumb ? 'font-weight:700' : ''};">${s}</th>`;
  });
  hrow += '</tr>';
  th.innerHTML = hrow;
  t.appendChild(th);

  const tb      = document.createElement('tbody');
  const curTots = SCHOOLS.map((_,i) => RAW.reduce((s,row) => s + row[i], 0));
  const optTots = SCHOOLS.map((_,i) => OPT_GRID.reduce((s,row) => s + row[i], 0));

  EVENTS.forEach((ev, ei) => {
    const row    = grid[ei];
    const curRow = RAW[ei];
    const tr     = document.createElement('tr');
    let cells = `<td class="ev-name" style="font-size:11px">${ev}</td>`;

    row.forEach((val, si) => {
      const isCumb = si === 8;
      const curVal = curRow[si];
      let cls = 'school-td td-same';
      let label = String(val);

      if (mode === 'opt') {
        if (val < curVal)      { cls = 'school-td td-up';     label = val + '▲'; }
        else if (val > curVal) { cls = 'school-td td-bumped'; label = val + '↓'; }
        if (isCumb) cls += ' td-cumb';
      } else {
        if (isCumb) cls = 'school-td td-cumb';
      }

      const rk = val === 1 ? 'rk1' : val <= 3 ? 'rk2' : '';
      cells += `<td class="${cls} ${rk}" style="${isCumb ? 'border-left:1px solid var(--border);border-right:1px solid var(--border);' : ''}">${label}</td>`;
    });

    tr.innerHTML = cells;
    tb.appendChild(tr);
  });

  // Totals row
  const tots   = mode === 'cur' ? curTots : optTots;
  const totRow = document.createElement('tr');
  totRow.className = 'totals-row';
  let totCells = `<td style="color:var(--text2);font-size:10px;letter-spacing:1px">TOTAL</td>`;

  tots.forEach((tot, si) => {
    const isCumb = si === 8;
    const cur    = curTots[si];
    const delta  = tot - cur;
    const cls    = isCumb && mode === 'opt' ? 't-cumb-win' : delta > 0 && mode === 'opt' ? 't-bumped' : '';
    const arrow  = mode === 'opt' && delta !== 0 ? (delta > 0 ? '↑' : '↓') : '';
    totCells += `<td class="${cls}" style="text-align:center;${isCumb ? 'border-left:1px solid var(--border);border-right:1px solid var(--border);' : ''}">${tot}${arrow}</td>`;
  });

  totRow.innerHTML = totCells;
  tb.appendChild(totRow);
  t.appendChild(tb);
}

// ─────────────────────────────────────────
// RENDER: Gauges
// ─────────────────────────────────────────
function renderGauges() {
  const maxH = 160;

  // Cumberland scenarios
  const scenarios = [
    { label:'Current\n(4th place)',    score:cumbCur, color:'var(--red)'   },
    { label:'Mid-Range\n(~2nd place)', score:75,      color:'var(--gold2)' },
    { label:'Optimal\n(1st place 🏆)', score:cumbOpt, color:'var(--green)' },
  ];
  const cg = document.getElementById('cumbGauge');
  scenarios.forEach(s => {
    const h   = Math.round((s.score / cumbCur) * maxH);
    const col = document.createElement('div');
    col.className = 'g-col';
    col.innerHTML = `<div class="g-score">${s.score} pts</div><div class="g-bar" style="background:${s.color};height:0;width:68px"></div><div class="g-label">${s.label}</div>`;
    cg.appendChild(col);
    setTimeout(() => { col.querySelector('.g-bar').style.height = h + 'px'; }, 600);
  });

  // Final projected standings (top 5, Cumberland shown at optimal)
  const top5   = standings.slice(0, 5);
  const fg     = document.getElementById('finalGauge');
  const scores = top5.map(s => s.key === 'cumb' ? cumbOpt : s.total);
  const maxF   = Math.max(...scores) * 1.08;

  top5.forEach((s, i) => {
    const score    = scores[i];
    const h        = Math.round((score / maxF) * maxH);
    const isUs     = s.key === 'cumb';
    const label    = isUs ? 'Cumberland\n(Optimized)' : s.name;
    const barColor = isUs ? 'var(--gold)' : SC[s.cls];
    const col      = document.createElement('div');
    col.className  = 'g-col';
    col.innerHTML  = `<div class="g-score" style="color:${barColor}">${score}</div><div class="g-bar" style="background:${barColor};height:0;width:68px"></div><div class="g-label">${label}</div>`;
    fg.appendChild(col);
    setTimeout(() => { col.querySelector('.g-bar').style.height = h + 'px'; }, 700);
  });
}

// ─────────────────────────────────────────
// RENDER: ROI / Priority grid
// ─────────────────────────────────────────
function renderROI() {
  const grid   = document.getElementById('roiGrid');
  const sorted = EVENTS.slice().sort((a,b) => (OPT[b].cur - OPT[b].opt) - (OPT[a].cur - OPT[a].opt));

  sorted.forEach(ev => {
    const m      = OPT[ev];
    const gain   = m.cur - m.opt;
    const bClass = { high:'badge-high', med:'badge-med', defend:'badge-defend' }[m.roi];
    const bLabel = { high:'High Priority', med:'Medium Priority', defend:'Defend Lead' }[m.roi];
    const rClass = v => v === 1 ? 'rk1' : v <= 3 ? 'rk2' : 'rk3';
    const card   = document.createElement('div');
    card.className = 'roi-card';
    card.innerHTML = `
      <div class="roi-card-header">
        <div class="roi-ev-name">${ev}${gain > 0 ? `<span class="gain-badge">▲ save ${gain} pts</span>` : ''}</div>
        <div class="roi-badge ${bClass}">${bLabel}</div>
      </div>
      <div class="roi-members">${MEMBERS[ev] || '—'}</div>
      <div class="roi-ranks">
        <div class="roi-ri"><div class="roi-ri-label">Current</div><div class="roi-ri-val ${rClass(m.cur)}">${m.cur}</div></div>
        <div class="roi-ri"><div class="roi-ri-label">Target</div><div class="roi-ri-val ${rClass(m.opt)}">${m.opt}</div></div>
        <div class="roi-ri"><div class="roi-ri-label">Δ pts</div><div class="roi-ri-val" style="color:${gain > 0 ? 'var(--green)' : 'var(--text2)'}">${gain > 0 ? '−' + gain : '0'}</div></div>
      </div>`;
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────
// RENDER: Roster
// ─────────────────────────────────────────
function renderRoster() {
  const grid = document.getElementById('rosterGrid');
  Object.entries(ROSTER).forEach(([name, events]) => {
    const card = document.createElement('div');
    card.className = 'roster-card';
    const tags = events.map(ev => `<div class="r-tag t-${OPT[ev] ? OPT[ev].roi : 'med'}">${ev}</div>`).join('');
    card.innerHTML = `<div class="roster-name">${name}</div><div class="roster-events">${tags}</div>`;
    grid.appendChild(card);
  });
}

// ─────────────────────────────────────────
// Scroll reveal
// ─────────────────────────────────────────
function setupReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ─────────────────────────────────────────
// Init
// ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderStandings();
  renderFullTable();
  renderEvChart();
  renderOptTable('curTable', 'cur');
  renderOptTable('optTable', 'opt');
  renderGauges();
  renderROI();
  renderRoster();
  setupReveal();
});
