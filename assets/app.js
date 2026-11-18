(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tema ---------- */
  const root = document.documentElement;
  try {
    const saved = localStorage.getItem('theme');
    if (saved) root.dataset.theme = saved;
  } catch (e) {}
  $('#themeToggle').addEventListener('click', () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = isDark ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  /* ---------- Contadores del hero ---------- */
  $('.stats div:nth-child(2) dt').dataset.count = DISEASES.length;
  const counters = $$('[data-count]');
  const runCounter = (el) => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = target + suffix; return; }
    const t0 = performance.now(), dur = 1200;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { runCounter(e.target); io.unobserve(e.target); } });
  });
  counters.forEach((c) => io.observe(c));

  /* ---------- Helpers ---------- */
  const diseasesOf = (organ) => DISEASES.filter((d) => d.organs.includes(organ));
  const organTag = (o) => `<span class="tag" style="--tc: var(--c-${o})">${ORGANS[o].name}</span>`;
  const typeTag = (t) => `<span class="tag type t-${t}">${TYPES[t]}</span>`;

  /* ---------- Mapa anatómico ---------- */
  const panel = $('#organPanel');
  const organEls = $$('#anatomy .organ');
  const emptyPanelHTML = panel.innerHTML;
  let activeOrgan = null;

  const setHighlight = (organ) => {
    organEls.forEach((g) => {
      g.classList.toggle('active', g.dataset.organ === organ);
      g.classList.toggle('dim', !!organ && g.dataset.organ !== organ);
    });
  };

  const renderChips = () => {
    $('#organChips').innerHTML = Object.entries(ORGANS)
      .map(([k, o]) => `<button class="chip" data-organ="${k}" style="--tc: var(--c-${k})">${o.name}</button>`)
      .join('');
    $$('#organChips .chip').forEach((b) => b.addEventListener('click', () => selectOrgan(b.dataset.organ)));
  };

  const selectOrgan = (key) => {
    if (activeOrgan === key) { key = null; }
    activeOrgan = key;
    setHighlight(key);
    if (!key) { panel.innerHTML = emptyPanelHTML; renderChips(); return; }
    const o = ORGANS[key];
    const list = diseasesOf(key);
    panel.innerHTML = `
      <div class="panel-content" style="--tc: var(--c-${key})">
        <button class="panel-back" aria-label="Volver">← Todos los órganos</button>
        <div class="panel-title"><span class="organ-dot"></span><h3>${o.name}</h3></div>
        <p>${o.func}</p>
        <ul class="facts">${o.facts.map((f) => `<li>${f}</li>`).join('')}</ul>
        <h4>${list.length ? `Enfermedades (${list.length})` : 'Enfermedades'}</h4>
        ${list.length
          ? `<div class="mini-list">${list.map((d) => `
              <button class="mini" data-id="${d.id}">
                <span>${d.name}</span>${typeTag(d.type)}
              </button>`).join('')}</div>`
          : `<p class="muted">Las enfermedades bucales son terreno de la odontología. Pero ojo: el reflujo crónico puede erosionar el esmalte dental.</p>`}
      </div>`;
    $('.panel-back', panel).addEventListener('click', () => selectOrgan(null));
    $$('.mini', panel).forEach((b) => b.addEventListener('click', () => openDisease(b.dataset.id)));
  };

  organEls.forEach((g) => {
    g.addEventListener('click', () => selectOrgan(g.dataset.organ));
    g.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOrgan(g.dataset.organ); }
    });
    g.addEventListener('mouseenter', () => { if (!activeOrgan) setHighlight(g.dataset.organ); });
    g.addEventListener('mouseleave', () => { if (!activeOrgan) setHighlight(null); });
  });
  renderChips();

  /* ---------- Recorrido ---------- */
  const range = $('#journeyRange');
  const card = $('#journeyCard');
  const fill = $('#journeyFill');
  const stopsEl = $('#journeyStops');
  stopsEl.innerHTML = JOURNEY.map((s, i) =>
    `<button class="stop" data-i="${i}" style="--tc: var(--c-${s.organ})"><span class="dot"></span><span class="lbl">${s.title}</span></button>`
  ).join('');
  const stops = $$('.stop', stopsEl);
  stops.forEach((b) => b.addEventListener('click', () => setStage(+b.dataset.i)));

  // Mini diagrama clonado para el recorrido
  const fig = $('#anatomy').cloneNode(true);
  fig.removeAttribute('id');
  fig.removeAttribute('role');
  $$('.organ', fig).forEach((g) => { g.removeAttribute('tabindex'); g.removeAttribute('role'); });
  const bolus = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  bolus.setAttribute('r', 7);
  bolus.setAttribute('class', 'bolus');
  fig.appendChild(bolus);
  $('#journeyFigure').appendChild(fig);
  const figOrgans = $$('.organ', fig);
  const stagePoints = [[150, 44], [156, 110], [214, 205], [150, 340], [228, 340], [152, 446]];

  let stage = 0;
  const setStage = (i) => {
    stage = Math.max(0, Math.min(JOURNEY.length - 1, i));
    range.value = stage;
    const s = JOURNEY[stage];
    fill.style.width = (stage / (JOURNEY.length - 1)) * 100 + '%';
    stops.forEach((b, j) => { b.classList.toggle('done', j <= stage); b.classList.toggle('current', j === stage); });
    card.style.setProperty('--tc', `var(--c-${s.organ})`);
    card.innerHTML = `
      <div class="jc-head">
        <span class="jc-step">Etapa ${stage + 1} de ${JOURNEY.length}</span>
        <span class="jc-time">⏱ ${s.time}</span>
      </div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
      <p class="jc-tip">💡 ${s.tip}</p>`;
    card.classList.remove('swap'); void card.offsetWidth; card.classList.add('swap');
    const [x, y] = stagePoints[stage];
    bolus.style.transform = `translate(${x}px, ${y}px)`;
    figOrgans.forEach((g) => {
      g.classList.toggle('active', g.dataset.organ === s.organ);
      g.classList.toggle('dim', g.dataset.organ !== s.organ);
    });
  };
  range.addEventListener('input', () => setStage(+range.value));
  $('#journeyPrev').addEventListener('click', () => { stopPlay(); setStage(stage - 1); });
  $('#journeyNext').addEventListener('click', () => { stopPlay(); setStage(stage + 1); });

  let timer = null;
  const playBtn = $('#journeyPlay');
  const stopPlay = () => { clearInterval(timer); timer = null; playBtn.textContent = '▶ Reproducir'; };
  playBtn.addEventListener('click', () => {
    if (timer) return stopPlay();
    if (stage === JOURNEY.length - 1) setStage(0);
    playBtn.textContent = '❚❚ Pausa';
    timer = setInterval(() => {
      if (stage >= JOURNEY.length - 1) return stopPlay();
      setStage(stage + 1);
    }, 2600);
  });

  setStage(0);

  /* ---------- Catálogo ---------- */
  const grid = $('#diseaseGrid');
  const search = $('#search');
  let fOrgan = 'all', fType = 'all';

  const organKeysWithDiseases = Object.keys(ORGANS).filter((k) => diseasesOf(k).length);
  $('#organFilter').innerHTML =
    `<button class="chip on" data-v="all">Todos</button>` +
    organKeysWithDiseases.map((k) => `<button class="chip" data-v="${k}" style="--tc: var(--c-${k})">${ORGANS[k].name}</button>`).join('');
  $('#typeFilter').innerHTML =
    `<button class="chip on" data-v="all">Todos los tipos</button>` +
    Object.entries(TYPES).map(([k, v]) => `<button class="chip" data-v="${k}">${v}</button>`).join('');

  const bindFilter = (sel, set) => {
    $$(sel + ' .chip').forEach((b) => b.addEventListener('click', () => {
      $$(sel + ' .chip').forEach((x) => x.classList.toggle('on', x === b));
      set(b.dataset.v); renderGrid();
    }));
  };
  bindFilter('#organFilter', (v) => (fOrgan = v));
  bindFilter('#typeFilter', (v) => (fType = v));

  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  const renderGrid = () => {
    const q = norm(search.value.trim());
    const list = DISEASES.filter((d) =>
      (fOrgan === 'all' || d.organs.includes(fOrgan)) &&
      (fType === 'all' || d.type === fType) &&
      (!q || norm([d.name, d.summary, ...d.symptoms, ...d.causes].join(' ')).includes(q))
    );
    $('#resultCount').textContent = `${list.length} ${list.length === 1 ? 'enfermedad' : 'enfermedades'}`;
    grid.innerHTML = list.length
      ? list.map((d, i) => `
        <button class="card" data-id="${d.id}" style="--tc: var(--c-${d.organs[0]}); --d:${i * 30}ms">
          <div class="card-top">${typeTag(d.type)}<span class="card-organ">${d.organs.map((o) => ORGANS[o].icon).join(' ')}</span></div>
          <h3>${d.name}</h3>
          <p>${d.summary}</p>
          <span class="card-more">Ver ficha →</span>
        </button>`).join('')
      : `<div class="empty">No encontramos coincidencias. Prueba con otro término 🔍</div>`;
    $$('.card', grid).forEach((c) => c.addEventListener('click', () => openDisease(c.dataset.id)));
  };
  search.addEventListener('input', renderGrid);
  renderGrid();

  /* ---------- Modal ---------- */
  const modal = $('#modal');
  const openDisease = (id) => {
    const d = DISEASES.find((x) => x.id === id);
    const tabs = [
      ['sintomas', 'Síntomas', `<ul class="checks">${d.symptoms.map((s) => `<li>${s}</li>`).join('')}</ul>`],
      ['causas', 'Causas y riesgo', `<ul class="checks">${d.causes.map((s) => `<li>${s}</li>`).join('')}</ul>`],
      ['diagnostico', 'Diagnóstico', `<p>${d.diagnosis}</p>`],
      ['tratamiento', 'Tratamiento', `<p>${d.treatment}</p>`],
    ];
    $('#modalBody').innerHTML = `
      <div class="m-head" style="--tc: var(--c-${d.organs[0]})">
        <div class="m-tags">${typeTag(d.type)}${d.organs.map(organTag).join('')}</div>
        <h2 id="modalTitle">${d.name}</h2>
        <p class="m-sum">${d.summary}</p>
      </div>
      <div class="tabs" role="tablist">
        ${tabs.map(([k, l], i) => `<button role="tab" class="tab ${i ? '' : 'on'}" data-t="${k}" aria-selected="${!i}">${l}</button>`).join('')}
      </div>
      ${tabs.map(([k, , html], i) => `<div class="tabpanel" data-p="${k}" ${i ? 'hidden' : ''}>${html}</div>`).join('')}
      <div class="m-fact"><strong>¿Sabías que…?</strong> ${d.fact}</div>`;
    $$('.tab', modal).forEach((t) => t.addEventListener('click', () => {
      $$('.tab', modal).forEach((x) => { x.classList.toggle('on', x === t); x.setAttribute('aria-selected', x === t); });
      $$('.tabpanel', modal).forEach((p) => (p.hidden = p.dataset.p !== t.dataset.t));
    }));
    modal.showModal();
  };
  $('#modalClose').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });

  /* ---------- Alarmas ---------- */
  $('#alarmGrid').innerHTML = ALARMS.map((a) => `
    <button class="alarm" aria-expanded="false">
      <span class="a-icon">${a.icon}</span>
      <span class="a-title">${a.title}</span>
      <span class="a-why">${a.why}</span>
    </button>`).join('');
  $$('.alarm').forEach((b) => b.addEventListener('click', () => {
    const open = b.classList.toggle('open');
    b.setAttribute('aria-expanded', open);
  }));

  /* ---------- Quiz ---------- */
  const box = $('#quizBox');
  let qi = 0, score = 0;
  const renderQ = () => {
    if (qi >= QUIZ.length) {
      const pct = Math.round((score / QUIZ.length) * 100);
      const msg = pct === 100 ? '¡Perfecto! Eres un experto digestivo 🏆' : pct >= 70 ? '¡Muy bien! Tu intestino estaría orgulloso 💪' : 'Buen intento. Repasa las fichas y vuelve a probar 📚';
      box.innerHTML = `
        <div class="q-result">
          <div class="ring" style="--p:${pct}"><span>${score}/${QUIZ.length}</span></div>
          <h3>${msg}</h3>
          <button class="btn primary" id="qRestart">Volver a jugar</button>
        </div>`;
      $('#qRestart').addEventListener('click', () => { qi = 0; score = 0; renderQ(); });
      return;
    }
    const item = QUIZ[qi];
    box.innerHTML = `
      <div class="q-progress"><span style="width:${(qi / QUIZ.length) * 100}%"></span></div>
      <p class="q-count">Pregunta ${qi + 1} de ${QUIZ.length}</p>
      <h3 class="q-text">“${item.q}”</h3>
      <div class="q-actions">
        <button class="q-btn myth" data-a="false">Mito</button>
        <button class="q-btn real" data-a="true">Realidad</button>
      </div>
      <div class="q-feedback" hidden></div>`;
    $$('.q-btn', box).forEach((b) => b.addEventListener('click', () => {
      const ok = (b.dataset.a === 'true') === item.a;
      if (ok) score++;
      $$('.q-btn', box).forEach((x) => {
        x.disabled = true;
        if ((x.dataset.a === 'true') === item.a) x.classList.add('correct');
        else if (x === b) x.classList.add('wrong');
      });
      const fb = $('.q-feedback', box);
      fb.hidden = false;
      fb.className = 'q-feedback ' + (ok ? 'ok' : 'ko');
      fb.innerHTML = `<strong>${ok ? '¡Correcto!' : 'No exactamente.'}</strong> Es ${item.a ? 'realidad' : 'un mito'}. ${item.e}
        <button class="btn primary small" id="qNext">${qi === QUIZ.length - 1 ? 'Ver resultado' : 'Siguiente'} →</button>`;
      $('#qNext').addEventListener('click', () => { qi++; renderQ(); });
    }));
  };
  renderQ();

  /* ---------- Revelado al hacer scroll ---------- */
  const rev = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } });
  }, { threshold: 0.12 });
  $$('.section-head, .map-wrap, .journey, .filters, .alarm-grid, .quiz').forEach((el) => { el.classList.add('reveal'); rev.observe(el); });
})();
