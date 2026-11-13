
const INITIAL_VIEW = new URLSearchParams(location.search).get('view') || 'picks';

/* ---------------- static assets ---------------- */
const TEAMS = {
  ARI:['Arizona Cardinals','#97233F'],ATL:['Atlanta Falcons','#A71930'],BAL:['Baltimore Ravens','#241773'],BUF:['Buffalo Bills','#00338D'],
  CAR:['Carolina Panthers','#0085CA'],CHI:['Chicago Bears','#0B162A'],CIN:['Cincinnati Bengals','#FB4F14'],CLE:['Cleveland Browns','#311D00'],
  DAL:['Dallas Cowboys','#003594'],DEN:['Denver Broncos','#C2410C'],DET:['Detroit Lions','#0076B6'],GB:['Green Bay Packers','#203731'],
  HOU:['Houston Texans','#03202F'],IND:['Indianapolis Colts','#002C5F'],JAX:['Jacksonville Jaguars','#006778'],KC:['Kansas City Chiefs','#E31837'],
  LAC:['Los Angeles Chargers','#0080C6'],LAR:['Los Angeles Rams','#003594'],LV:['Las Vegas Raiders','#2A2A2A'],MIA:['Miami Dolphins','#008E97'],
  MIN:['Minnesota Vikings','#4F2683'],NE:['New England Patriots','#002244'],NO:['New Orleans Saints','#2A2A2A'],NYG:['New York Giants','#0B2265'],
  NYJ:['New York Jets','#125740'],PHI:['Philadelphia Eagles','#004C54'],PIT:['Pittsburgh Steelers','#2B2B2B'],SF:['San Francisco 49ers','#AA0000'],
  SEA:['Seattle Seahawks','#002244'],TB:['Tampa Bay Buccaneers','#D50A0A'],TEN:['Tennessee Titans','#4B92DB'],WAS:['Washington Commanders','#5A1414']
};
const BOOKS = {draftkings:'DraftKings',fanduel:'FanDuel',betmgm:'BetMGM',fanatics:'Fanatics',bet365:'bet365',hardrockbet:'Hard Rock Bet',thescorebet:'theScore Bet',espnbet:'theScore Bet'};
const WARN = {
  MISSING_PROJECTION:'Incomplete projection data, so V3 cannot fully evaluate this prop.',
  PHASE3_PROJECTION_CONTEXT_MISSING:'Incomplete projection data, so V3 cannot fully evaluate this prop.',
  PROJECTION_INTEGRITY_PHASE3_PROJECTION_CONTEXT_MISSING:'Incomplete projection data, so V3 cannot fully evaluate this prop.',
  TD_PROJECTION_INCOMPLETE:'Incomplete touchdown projection data.',
  PHASE3_RISK_CONTEXT_MISSING:'Risk checks incomplete, so V3 cannot fully clear this prop.',
  PROJECTION_INTEGRITY_PHASE3_RISK_CONTEXT_MISSING:'Risk checks incomplete, so V3 cannot fully clear this prop.',
  PLAYER_QUESTIONABLE:'Questionable: confirm the player is active before betting.',
  PLAYER_DOUBTFUL:'Doubtful: capped at WATCH.',
  PLAYER_STATUS_NOT_VERIFIED:'Player status not verified.',
  PROJECTED_QB_RUSH_ROLE_BELOW_MIN:'Light projected QB rushing role for an Over.',
  PROJECTED_QB_ROLE_BELOW_MIN:'Light projected passing workload for an Over.',
  PROJECTED_RECEIVING_ROLE_BELOW_MIN:'Light projected receiving role for an Over.',
  PROJECTED_RUSH_ROLE_BELOW_MIN:'Light projected rushing role for an Over.',
  PROJECTED_TD_ROLE_BELOW_MIN:'Light projected scoring role.',
  ROLE_STATUS_ROLE_DECLINING:'Recent usage is lower than his earlier role.',
  ROLE_STATUS_ROLE_EXPANDING:'Recent usage is higher than his earlier role.',
  ROLE_STATUS_ROLE_SHIFT:'Role has shifted from last season.',
  LONGSHOT_RESEARCH_ONLY:'Longshot Plus is research only.',
  LOWER_RISK_PARLAY_LEG_ONLY:'Lower Risk parlay leg, not a standalone bet.',
  REAL_COMBINATION_PRICE_REQUIRED:'Check the real combined parlay price.',
  VERIFY_PRICE:'Captured price may be stale; verify before betting.',
  VERIFY_PRICE_STALE:'Captured price may be stale; verify before betting.',
  RAW_MODEL_P_CONTEXT_MISMATCH:'Model probability differs from the rebuilt risk context.',
  MULTIPLE_PRIOR_ROWS_REVIEW:'Multiple prior-season rows matched; review.'
};
const WARN_TAG = {
  MISSING_PROJECTION:['No projection','g'],PHASE3_PROJECTION_CONTEXT_MISSING:['No projection','g'],PROJECTION_INTEGRITY_PHASE3_PROJECTION_CONTEXT_MISSING:['No projection','g'],
  TD_PROJECTION_INCOMPLETE:['TD data incomplete','g'],PHASE3_RISK_CONTEXT_MISSING:['Risk incomplete','g'],PROJECTION_INTEGRITY_PHASE3_RISK_CONTEXT_MISSING:['Risk incomplete','g'],
  PLAYER_QUESTIONABLE:['Questionable',''],PLAYER_DOUBTFUL:['Doubtful',''],PLAYER_STATUS_NOT_VERIFIED:['Status unverified','g'],
  PROJECTED_QB_RUSH_ROLE_BELOW_MIN:['Light role',''],PROJECTED_QB_ROLE_BELOW_MIN:['Light role',''],PROJECTED_RECEIVING_ROLE_BELOW_MIN:['Light role',''],
  PROJECTED_RUSH_ROLE_BELOW_MIN:['Light role',''],PROJECTED_TD_ROLE_BELOW_MIN:['Light role',''],ROLE_STATUS_ROLE_DECLINING:['Role ↓',''],
  ROLE_STATUS_ROLE_EXPANDING:['Role ↑','ok'],ROLE_STATUS_ROLE_SHIFT:['Role shift',''],LONGSHOT_RESEARCH_ONLY:['Research','g'],
  LOWER_RISK_PARLAY_LEG_ONLY:['Parlay leg','g'],REAL_COMBINATION_PRICE_REQUIRED:['Check parlay price','g'],VERIFY_PRICE:['Verify price',''],VERIFY_PRICE_STALE:['Verify price','']
};
const REASON = {
  STRAIGHT_S1_HIGHLIGHT_AND_BET_VALUE_PASS:'S1 Highlight and the official V3 BET value/price gate both pass.',
  STRAIGHT_HIGHLIGHT_BUT_BET_GATE_NOT_MET_LEAN_PASS:'S1 Highlight, but the BET value/price gate is not met, so it stays a LEAN.',
  STRAIGHT_LEAN_PRICE_VALUE_PASS:'Positive V3 value at this price, below the full BET conditions.',
  STRAIGHT_V3_PRICE_VALUE_GATE_FAIL:'The current price does not offer enough V3 value.',
  STRAIGHT_NOT_PREFERRED_VALIDATED_LINE:'Valid line, but another line is preferred for this player and market.',
  STRAIGHT_ROLE_RISK_CONTEXT_REVIEW:'Preferred line, but role/risk context needs review.',
  DOUBTFUL_STATUS_CAP_WATCH:'Player is Doubtful, so the status is capped at WATCH.',
  LOWER_RISK_V2_GATE_FAIL:'Does not meet the Lower Risk qualification gate.',
  LOWER_RISK_SUNDAY_TOP9_PARLAY_LEG_RESEARCH:'Sunday Top 9 Lower Risk parlay leg.',
  LOWER_RISK_SINGLE_GAME_RESEARCH_ONLY:'Lower Risk candidate on a single-game slate; research only.',
  LOWER_RISK_PLAYER_DEDUPED:'Another Lower Risk line for this player ranked higher.',
  LOWER_RISK_OUTSIDE_SUNDAY_TOP9:'Qualified Lower Risk leg outside the Sunday Top 9.',
  LOWER_RISK_DOUBTFUL_WATCH:'Lower Risk leg, but the player is Doubtful.',
  LONGSHOT_PLUS_J1_RESEARCH_ONLY:'Longshot Plus candidate, research only in this production version.',
  LONGSHOT_PLUS_RISK_CONTEXT_REVIEW:'Longshot Plus candidate; risk context needs review.',
  LONGSHOT_PLUS_RESEARCH_NOT_PREFERRED:'Longshot candidate evaluated, but another line is preferred.',
  NO_PRODUCTION_FAMILY_SELECTION:'Evaluated, but no production family selected this line.',
  HARD_PLAYER_AVAILABILITY_BLOCK:'Player is out or inactive.',
  NO_USABLE_MARKET:'No usable market price.',
  MISSING_PROJECTION:'No projection for this player and market.',
  TD_PROJECTION_INCOMPLETE:'Touchdown projection incomplete.'
};

/* ---------------- state ---------------- */
const S = {
  core:null, props:null, propsLoading:false, propsError:'',
  view:'picks', game:'', analyst:false,
  open:{}, folds:{straights:true},
  pf:{chip:'all',q:'',market:'ALL',game:'ALL',status:'ALL',pos:'ALL',book:'ALL',fam:'ALL',dir:'ALL',more:false},
  sort:{key:'rec',dir:-1}, limit:100, openRow:-1,
  period:'season', panel:'', rankPop:'STRAIGHT_ACTIONABLE', rankDim:'week', brPop:'STRAIGHT_ACTIONABLE', brDim:'week',
  auPop:'TRACKED', auRes:'ALL', auLimit:75, au:null, auLoading:false,
  hiPop:'S1', hiWeek:'ALL', hiLimit:60, showOfficial:false,
  wlf:'open', wlOpen:{},
  players:null, playersLoading:false, playersError:false, pc:null, shop:{}, slip:[], slipOpen:false
};
try { S.analyst = localStorage.getItem('nflp_analyst') === '1'; } catch (e) {}

/* ---------------- helpers ---------------- */
const $ = id => document.getElementById(id);
const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const isNum = v => typeof v === 'number' && isFinite(v);
const pct = (v, d) => isNum(v) ? (v * 100).toFixed(d == null ? 1 : d) + '%' : '—';
const odd = v => isNum(v) ? (v > 0 ? '+' + Math.round(v) : '−' + Math.abs(Math.round(v))) : '—';
const sev = v => isNum(v) ? (v >= 0 ? '+' : '−') + (Math.abs(v) * 100).toFixed(1) + '%' : '—';
const n1 = v => isNum(v) ? v.toFixed(1) : '—';
const comma = v => isNum(v) ? v.toLocaleString('en-US') : '—';
const evCls = v => isNum(v) ? (v >= 0 ? 'pos' : 'neg') : 'dim';
const TZ = 'America/Chicago';
const fmt = (ms, opts) => { if (!isNum(ms)) return '—'; try { return new Date(ms).toLocaleString('en-US', Object.assign({timeZone: TZ}, opts)); } catch (e) { return new Date(ms).toLocaleString(); } };
const fmtMin = (m, opts) => isNum(m) ? fmt(m * 60000, opts) : '—';
const dayTime = ms => fmt(ms, {weekday:'short', hour:'numeric', minute:'2-digit'});
const fullTime = ms => fmt(ms, {weekday:'short', month:'short', day:'numeric', hour:'numeric', minute:'2-digit'});
const clock = ms => fmt(ms, {hour:'numeric', minute:'2-digit', timeZoneName:'short'});
const book = b => BOOKS[String(b || '').toLowerCase().replace(/[^a-z0-9]/g, '')] || b || '';
const team = t => { const x = TEAMS[String(t || '').toUpperCase()]; return {code: t || '', name: x ? x[0] : (t || ''), color: x ? x[1] : '#2A3846'}; };
// ESPN's dark-background logo set first; the standard logo if a dark one is missing.
const logoCode = t => { const c = String(t || '').toLowerCase(); return c === 'was' ? 'wsh' : c; };
const logoUrl = t => t ? 'https://a.espncdn.com/i/teamlogos/nfl/500-dark/' + logoCode(t) + '.png' : '';
const logoUrlStd = t => t ? 'https://a.espncdn.com/i/teamlogos/nfl/500/' + logoCode(t) + '.png' : '';
window.logoErr = function (im, fb) {
  if (im.src.indexOf('/500-dark/') >= 0) { im.src = im.src.replace('/500-dark/', '/500/'); return; }
  if (fb) { const t = team(fb), px = im.getAttribute('data-px') || 24; im.outerHTML = '<span class="lfb" style="width:' + px + 'px;height:' + px + 'px;background:' + t.color + '">' + esc(t.code) + '</span>'; }
  else im.remove();
};
function logo(t, size) {
  const tm = team(t), px = {xs:20, sm:24, md:30, lg:64}[size] || 24;
  if (!t) return '';
  return '<img class="logo ' + size + '" src="' + esc(logoUrl(t)) + '" alt="' + esc(tm.code) + '" loading="lazy" data-px="' + px + '" onerror="logoErr(this,\'' + esc(tm.code) + '\')">';
}
const SIL = '<svg width="100" height="112" viewBox="0 0 100 112" aria-hidden="true"><circle cx="50" cy="40" r="23" fill="rgba(232,238,242,.22)"/><path d="M6 112c2-29 20-43 44-43s42 14 44 43z" fill="rgba(232,238,242,.22)"/></svg>';
const STAR = '<svg class="star" width="14" height="14" viewBox="0 0 24 24" role="img" aria-label="S1 Highlight"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" fill="#E8B64C"/></svg>';
const CHEV = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AA8B4" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
const LOCK = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>';

const U = v => String(v || '').toUpperCase();
const isLR = c => U(c.fam) === 'LOWER_RISK' || U(c.uc).indexOf('LOWER_RISK') >= 0;
const isJ1 = c => U(c.fam) === 'LONGSHOT_PLUS' && U(c.el) === 'RESEARCH_ONLY';
const isHL = c => U(c.hl) === 'HIGHLIGHT';
const isPref = c => U(c.fam) === 'STRAIGHT' && U(c.el) === 'ELIGIBLE_PREFERRED';
const isAct = c => isPref(c) && (U(c.st) === 'BET' || U(c.st) === 'LEAN');
function status(c) {
  const s = U(c.st);
  if (s === 'BET') return ['bet', 'BET'];
  if (s === 'LEAN') return ['lean', 'LEAN'];
  if (s === 'WATCH' && isJ1(c)) return ['res', 'RESEARCH'];
  if (s === 'WATCH' && isLR(c)) return ['leg', 'PARLAY LEG'];
  if (s === 'WATCH') return ['watch', 'WATCH'];
  if (s === 'UNAVAILABLE') return ['no', 'UNAVAILABLE'];
  if (!isNum(c.hp)) return ['nm', 'NOT MODELED'];
  return ['no', 'NO BET'];
}
const pill = c => { const s = status(c); return '<span class="st ' + s[0] + '">' + s[1] + '</span>'; };
const slateName = s => { const t = U(s); return t.indexOf('LONDON') >= 0 ? 'London' : t.indexOf('THU') >= 0 ? 'Thursday' : (t.indexOf('SUN') >= 0 && t.indexOf('NIGHT') >= 0) ? 'Sun night' : t.indexOf('SUN') >= 0 ? 'Sun main' : t.indexOf('MON') >= 0 ? 'Monday' : 'Slate'; };
const slateShort = s => { const t = U(s); return t.indexOf('THU') >= 0 ? 'Thu' : t.indexOf('MON') >= 0 ? 'Mon' : t.indexOf('NIGHT') >= 0 ? 'Sun night' : t.indexOf('LATE') >= 0 ? 'Sun late' : t.indexOf('EARLY') >= 0 ? 'Sun early' : t.indexOf('LONDON') >= 0 ? 'London' : (s || ''); };
const sigLetter = c => isLR(c) ? 'L1' : isJ1(c) ? 'J1' : 'S1';
const dirWord = d => { const t = U(d); return t === 'OVER' ? 'Over' : t === 'UNDER' ? 'Under' : t === 'YES' ? 'Yes' : t === 'NO' ? 'No' : (d || ''); };
const mkt = m => String(m || '').replace('Receiving Yards', 'Receiving Yds').replace('Rushing Yards', 'Rushing Yds').replace('Passing Yards', 'Passing Yds');
const propLabel = c => { const d = U(c.dr); if (d === 'YES' || d === 'NO') return mkt(c.m) + (d === 'NO' ? ' · No' : ''); return dirWord(c.dr) + ' ' + (isNum(c.ln) ? c.ln : '') + ' ' + mkt(c.m); };
function warnList(w) { const seen = {}, out = []; String(w || '').split('|').map(x => x.trim()).filter(Boolean).forEach(code => { const t = WARN[code] || code.replace(/_/g, ' ').toLowerCase().replace(/^./, x => x.toUpperCase()); if (!seen[t]) { seen[t] = 1; out.push(t); } }); return out; }
function warnTags(w) { const seen = {}, out = []; String(w || '').split('|').map(x => x.trim()).filter(Boolean).forEach(code => { const t = WARN_TAG[code]; if (t && !seen[t[0]]) { seen[t[0]] = 1; out.push('<span class="tag ' + t[1] + '">' + esc(t[0]) + '</span>'); } }); return out.join(''); }
const reason = r => REASON[r] || String(r || '').replace(/_/g, ' ').toLowerCase().replace(/^./, x => x.toUpperCase());

/* ---------------- data loading ---------------- */
function call(fn, args, ok, fail) {
  const parts = {nflpBoardGetCore:'core',nflpBoardGetProps:'props',nflpBoardGetPlayers:'players',nflpBoardGetAudit:'audit',nflpBoardGetLive:'live'};
  if (!Object.prototype.hasOwnProperty.call(parts, fn)) { fail(new Error('Unsupported dashboard request.')); return; }
  const cb = 'nfl_cb_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  const tag = document.createElement('script');
  let done = false;
  const clean = () => { clearTimeout(timer); tag.remove(); delete window[cb]; };
  const reject = message => { if (done) return; done = true; clean(); fail(new Error(message)); };
  const timer = setTimeout(() => reject('The data request timed out. Check your connection, publish the updated 12_V3_Board.gs as a new version, and verify access is set to Anyone.'), 60000);
  window[cb] = reply => {
    if (done) return; done = true; clean();
    if (!reply || !reply.ok || typeof reply.data !== 'string') { fail(new Error(reply && reply.error || 'Invalid dashboard response.')); return; }
    try { ok(reply.data); } catch (err) { fail(err); }
  };
  tag.onerror = () => reject('Could not load dashboard data. Check your connection and Apps Script deployment: new version, Execute as Me, access Anyone.');
  try {
    const u = new URL(window.NFL_ENDPOINT);
    u.searchParams.set('nfl_api','1'); u.searchParams.set('part',parts[fn]);
    u.searchParams.set('callback',cb);u.searchParams.set('_',Date.now());
    if (parts[fn] === 'audit') u.searchParams.set('query',JSON.stringify(args && args[0] || {}));
    tag.src = u.href; document.head.appendChild(tag);
  } catch (err) { reject('The configured Apps Script URL is invalid.'); }
}
function loadCore() {
  call('nflpBoardGetCore', [], s => {
    try { S.core = JSON.parse(s); } catch (e) { return showError(e); }
    if (!S.game && S.core.games.length) {
      const next = S.core.games.find(g => !g.frozen) || S.core.games[0];
      S.game = next.id;
    }
    render();
    loadProps();
    loadPlayers();
    loadLive(S.tab === 'live');
  }, showError);
}
function loadProps(cb) {
  if (S.props || S.propsLoading) { if (cb && S.props) cb(); return; }
  S.propsLoading = true;
  call('nflpBoardGetProps', [], s => {
    S.propsLoading = false;
    try { S.props = decodeProps(JSON.parse(s)); } catch (e) { S.propsError = String(e.message || e); }
    if (S.view === 'props' || (S.view === 'games' && S.folds['g-all'])) render();
    if (S.slip.length) slipRefresh();
    if (cb) cb();
  }, e => { S.propsLoading = false; S.propsError = String(e && e.message || e); if (S.view === 'props') render(); });
}
function decodeProps(enc) {
  const keys = Object.keys(enc.cols), out = new Array(enc.n);
  for (let i = 0; i < enc.n; i++) {
    const o = {i: i};
    for (let j = 0; j < keys.length; j++) {
      const k = keys[j], d = enc.dicts[k];
      let v = enc.cols[k][i];
      if (d) v = v < 0 ? null : d[v];
      if (v !== null && v !== undefined) o[k] = v;
    }
    out[i] = o;
  }
  return out;
}
function showError(e) {
  $('main').innerHTML = '<div class="errbox"><b>The board could not load.</b><pre>' + esc(e && e.message ? e.message : e) +
    '</pre><button class="ghost" type="button" data-act="retry">Try again</button></div>';
}

/* ---------------- shell ---------------- */
/* ================= Layout: Today · Live · Explore · Results ================= */
const TABS = {today: 1, live: 1, explore: 1, results: 1};
const EX_SUBS = [['games', 'Games'], ['props', 'All props'], ['picks', 'Full picks']];
const RE_SUBS = [['performance', 'Performance'], ['portfolio', 'Portfolio'], ['system', 'System']];
Object.assign(S, {tab: 'today', exSub: 'games', reSub: 'performance', tf: 'all', live: null, liveErr: '', liveLoading: false,
  tdMode: 'game', sortB: 'rank', sortT: 'rank', sortP: 'price', sortG: 'price'});
try { const t = JSON.parse(localStorage.getItem('nflp_today') || '{}'); ['tdMode', 'sortB', 'sortT', 'sortP', 'sortG'].forEach(k => { if (typeof t[k] === 'string') S[k] = t[k]; }); } catch (e) {}
function saveToday() { try { localStorage.setItem('nflp_today', JSON.stringify({tdMode: S.tdMode, sortB: S.sortB, sortT: S.sortT, sortP: S.sortP, sortG: S.sortG})); } catch (e) {} }
function setTab(t) {
  if (!TABS[t]) t = 'today';
  S.tab = t;
  S.view = t === 'explore' ? S.exSub : t === 'results' ? S.reSub : t;
  $('sheet').classList.remove('open');
  render();
  window.scrollTo(0, 0);
  if (S.view === 'props') loadProps();
  if (t === 'live') loadLive(true); else if (t === 'today') loadLive(false);
}
function setView(v) {
  if (TABS[v]) return setTab(v);
  if (EX_SUBS.some(x => x[0] === v)) { S.exSub = v; if (v === 'games') S.gameOpen = false; return setTab('explore'); }
  if (RE_SUBS.some(x => x[0] === v)) { S.reSub = v; return setTab('results'); }
  return setTab('today');
}
const subtabs = (tab, cur, opts) => '<div class="subt" role="tablist" aria-label="' + esc(tab) + '">' + opts.map(o =>
  '<button type="button" role="tab" aria-selected="' + (o[0] === cur) + '" class="' + (o[0] === cur ? 'on' : '') + '" data-act="sub" data-for="' + tab + '" data-v="' + o[0] + '">' + esc(o[1]) + '</button>').join('') + '</div>';

/* ---- people: ESPN cut-out headshots, Sleeper photo as the fallback ---- */
const nkey = v => String(v || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\b(jr|sr|ii|iii|iv)\b/g, '').replace(/[^a-z0-9]/g, '');
const tcode = v => { const r = String(v || '').toUpperCase().replace(/[^A-Z]/g, ''); return ({JAC: 'JAX', WSH: 'WAS', LA: 'LAR'})[r] || r; };
const ESPN_HS = id => 'https://a.espncdn.com/i/headshots/nfl/players/full/' + encodeURIComponent(id) + '.png';
const SIL_CUT = '<svg viewBox="0 0 40 46" aria-hidden="true"><circle cx="20" cy="13" r="8.5" fill="rgba(232,238,242,.55)"/><path d="M3 46c0-10 7.5-17.5 17-17.5S37 36 37 46z" fill="rgba(232,238,242,.35)"/></svg>';
function livePlayer(p, tm) { return S.live && S.live.players ? S.live.players[nkey(p) + '|' + tcode(tm)] || null : null; }
function espnFor(p, tm) {
  const id = (S.core.espn || {})[nkey(p) + '|' + tcode(tm)] || (livePlayer(p, tm) || {}).id;
  return id ? ESPN_HS(id) : '';
}
function sleeperFor(p, tm) {
  const k = nkey(p), t = tcode(tm), cards = S.core.cards;
  for (const id in cards) { const c = cards[id]; if (c.hs && tcode(c.tm) === t && nkey(c.p) === k) return c.hs; }
  return '';
}
function cut(p, tm, fb, size) {
  const t = team(tm), src = espnFor(p, tm), f = fb || sleeperFor(p, tm);
  const img = src ? '<img src="' + esc(src) + '" alt=""' + (f ? ' data-fb="' + esc(f) + '"' : '') + ' loading="lazy" onerror="cutErr(this)">'
    : f ? '<img class="sq" src="' + esc(f) + '" alt="" loading="lazy" onerror="cutErr(this)">' : cutLogo(tm);
  return '<span class="cut ' + (size || '') + '" data-tm="' + esc(tm || '') + '"><span class="tile" style="background:linear-gradient(180deg,' + t.color + ',' + t.color + '38)"></span>' + img + '</span>';
}
const cutLogo = tm => '<img class="lgf" src="' + esc(logoUrl(tm)) + '" alt="" loading="lazy" onerror="logoErr(this)">';
window.cutErr = function (im) {
  const fb = im.getAttribute('data-fb');
  if (fb) { im.removeAttribute('data-fb'); im.classList.add('sq'); im.src = fb; return; }
  const box = im.closest('.cut'), tm = box && box.getAttribute('data-tm');
  im.outerHTML = tm ? cutLogo(tm) : SIL_CUT;
};
/* Team-logo tile, used in place of a small headshot on Today. */
function tlogo(tm, size) {
  const t = team(tm);
  return '<span class="tlg ' + (size || '') + '" style="background:linear-gradient(180deg,' + t.color + '66,' + t.color + '14)"><img src="' + esc(logoUrl(tm)) + '" alt="' + esc(t.code) + '" loading="lazy" onerror="logoErr(this)"></span>';
}
/* Official grades for this week's V3 straights (from the locked tracked rows). */
const GRADE = {WIN: 'W', LOSS: 'L', VOID: 'V', PUSH: 'P'};
let GMAP = null, GCORE = null;
function gradeOf(p, dr, ln, m) {
  if (GCORE !== S.core) {
    GCORE = S.core; GMAP = {};
    const wk = S.core.meta.week;
    (S.core.tracked || []).forEach(r => { if (r[0] === wk && GRADE[r[16]]) GMAP[nkey(r[5]) + '|' + U(r[6]) + '|' + r[7] + '|' + U(r[8])] = {g: GRADE[r[16]], a: r[17]}; });
  }
  return GMAP[nkey(p) + '|' + U(dr) + '|' + ln + '|' + U(m)] || null;
}
/* Result or live status shown next to a pick on Today. */
const gradeChip = (g, a) => GRADED[g] ? '<span class="lvchip ' + GRADED[g][1] + '">' + (isNum(a) ? esc(a) + ' · ' : '') + GRADED[g][0] + '</span>' : '';
function rowStatus(pk, e, g, a) {
  if (g) return gradeChip(g, a);
  const lg = liveGame(gameOf(e));
  if (!lg || lg.state === 'pre') return '';
  const pr = progress(pk, lg);
  return '<span class="lvchip ' + pr.cls + '">' + (pr.cur === null ? '' : esc(pr.cur) + ' · ') + esc(pr.status) + '</span>';
}
function ticketStatus(x) {
  if (x.res) return gradeChip(x.res);
  const pr = x.legs.map(l => { const lg = liveGame(gameOf(l.e)); return lg && lg.state !== 'pre' ? progress(Object.assign({dr: 'OVER'}, l), lg).cls : (l.g === 'W' ? 'hit' : l.g === 'L' ? 'miss' : 'wait'); });
  if (pr.every(c => c === 'wait')) return '';
  const hit = pr.filter(c => c === 'hit').length;
  return pr.indexOf('miss') >= 0 ? '<span class="lvchip miss">Lost</span>' : '<span class="lvchip ' + (hit === pr.length ? 'hit' : 'pace') + '">' + hit + ' of ' + pr.length + ' hit</span>';
}

/* ---- this week's picks, every list, as one set of items ---- */
const KIND = {bet: ['Bet', 'k-bet'], lean: ['Lean', 'k-lean'], top: ['Top 10', 'k-top'], par: ['Parlay', 'k-par'], sgp: ['SGP', 'k-sgp']};
function weekItems() {
  const cards = S.core.cards, sec = S.core.sections, lr = S.core.lr && S.core.lr.current, out = [];
  sec.straights.forEach((k, r) => { const c = cards[k]; if (c) out.push({kind: U(c.st) === 'BET' ? 'bet' : 'lean', e: c.e, t: c.t, c: c, k: k, r: r}); });
  if (lr) {
    lr.card.forEach((s, i) => out.push({kind: 'top', e: s.e, t: s.t, s: s, i: i, r: i}));
    lr.sgps.forEach((x, i) => out.push({kind: 'sgp', e: x.e, t: x.legs[0] && x.legs[0].t, x: x, i: i, r: i}));
    lr.parlays.forEach((x, i) => out.push({kind: 'par', e: x.legs[0].e, x: x, i: i, r: i}));
  }
  return out;
}
const tfOk = (it, tf) => tf === 'all' || (tf === 'bets' && (it.kind === 'bet' || it.kind === 'lean')) || (tf === 'top' && it.kind === 'top') || (tf === 'par' && (it.kind === 'par' || it.kind === 'sgp'));
const ticketDec = x => x.legs.reduce((d, l) => d * decOf(l.o), 1);
const surname = p => String(p || '').replace(/\s+(Jr\.?|Sr\.?|II|III|IV)$/i, '').split(' ').slice(-1)[0];
const MSHORT = {'RECEPTIONS': 'rec', 'RECEIVING YARDS': 'rec yds', 'RUSHING YARDS': 'rush yds', 'PASSING YARDS': 'pass yds', 'PASSING ATTEMPTS': 'att', 'PASSING COMPLETIONS': 'comp'};
const legShort = l => surname(l.p) + ' ' + Math.ceil(l.ln) + '+ ' + (MSHORT[U(l.m)] || mkt(l.m).toLowerCase());
const gameOf = e => (S.core.games || []).find(g => g.id === e) || null;

/* ---- 3.0 look: Primetime frame, round team badges, Signal charts ---- */
const TEAM2 = {ARI:'#FFB612',ATL:'#C9CED1',BAL:'#9E7C0C',BUF:'#C60C30',CAR:'#BFC0BF',CHI:'#C83803',CIN:'#101820',CLE:'#FF3C00',DAL:'#869397',DEN:'#FB4F14',DET:'#B0B7BC',GB:'#FFB612',
  HOU:'#A71930',IND:'#A2AAAD',JAX:'#D7A22A',KC:'#FFB81C',LAC:'#FFC20E',LAR:'#FFA300',LV:'#A5ACAF',MIA:'#FC4C02',MIN:'#FFC62F',NE:'#C60C30',NO:'#D3BC8D',NYG:'#A71930',
  NYJ:'#E8EEF2',PHI:'#A5ACAF',PIT:'#FFB612',SF:'#B3995D',SEA:'#69BE28',TB:'#FF7900',TEN:'#C8102E',WAS:'#FFB612'};
function badge(t, px) {
  if (!t) return '';
  const tm = team(t), ring = TEAM2[U(t)] || '#2A3946';
  return '<span class="bdg" style="width:' + px + 'px;height:' + px + 'px;--tc:' + tm.color + ';--tr:' + ring + ';font-size:' + Math.round(px * 0.36) + 'px"><img src="' + esc(logoUrl(t)) + '" alt="' + esc(tm.code) + '" loading="lazy" onerror="bdgErr(this)"></span>';
}
window.bdgErr = function (im) {
  if (im.src.indexOf('/500-dark/') >= 0) { im.src = im.src.replace('/500-dark/', '/500/'); return; }
  const b = im.parentNode; if (!b) return; b.classList.add('txt'); b.textContent = im.alt;
};
const nick = t => { const n = team(t).name.split(' '); return n[n.length - 1]; };
const skew = (txt, cls) => '<span class="kbug ' + (cls || '') + '"><span>' + txt + '</span></span>';
const gameTag = e => { const g = gameOf(e); return g ? g.away + ' at ' + g.home : ''; };
const shortTime = t => U(fmt(t, {weekday: 'short'})) + ' ' + fmt(t, {hour: 'numeric', minute: '2-digit'});
function gameLine(es) {
  const gs = es.map(gameOf).filter((g, i, a) => g && a.indexOf(g) === i).sort((a, b) => (a.t || 0) - (b.t || 0));
  return gs.length ? '<div class="kgl">' + gs.map(g => '<span>' + esc(g.away + ' at ' + g.home) + ' · ' + esc(dayTime(g.t)) + '</span>').join('<span class="td-gsep">+</span>') + '</div>' : '';
}
function kTag(it) {
  const L = {bet: 'BET', lean: 'LEAN', top: 'TOP 10', sgp: 'SGP', par: 'PARLAY'}[it.kind];
  const r = it.c ? (it.c.wr ? ' #' + it.c.wr : '') : it.s ? ' #' + (it.i + 1) : '';
  return '<span class="kchip ' + KIND[it.kind][1] + '">' + L + r + '</span>';
}
/* LR_FLOOR_V1 shadow challenger would drop this pick (book receptions line 0.5). */
const fcChip = l => l && l.fc ? '<span class="kchip k-fc" title="Floor challenger drops this pick: the book\'s receptions line is 0.5, priced for one catch at most.">Floor cut</span>' : '';
const oddsBox = (o, sub) => '<span class="kodds">' + skew('<b>' + odd(o) + '</b>') + (sub ? '<i>' + esc(sub) + '</i>' : '') + '</span>';
function tdRow(it, withGame) {
  const gl = withGame ? gameLine([it.e]) : '';
  if (it.c) {
    const c = it.c, gr = gradeOf(c.p, c.dr, c.ln, c.m) || {};
    return '<div class="krow pcopen" role="button" tabindex="0" aria-label="' + esc('Open player view: ' + c.p) + '"' + pcAttrs(c.pid, c.m, c.dr, it.k) + '>' + badge(c.tm, 38) +
      '<div class="kmid"><div class="knm"><b>' + esc(c.p) + '</b>' + kTag(it) + rowStatus(c, c.e, gr.g, gr.a) + '</div><div class="kln">' + esc(propLabel(c)) + ' · ' + esc([c.pos, book(c.bk)].filter(Boolean).join(' · ')) + '</div>' + gl + '</div>' +
      oddsBox(c.o, 'V3 ' + pct(c.hp, 0)) + '</div>';
  }
  if (it.s) {
    const s = it.s;
    return '<div class="krow pcopen" role="button" tabindex="0" aria-label="' + esc('Open player view: ' + s.p) + '"' + pcAttrs(s.pid, s.m, 'OVER', '') + '>' + badge(s.tm, 38) +
      '<div class="kmid"><div class="knm"><b>' + esc(s.p) + '</b>' + kTag(it) + fcChip(s) + rowStatus(Object.assign({dr: 'OVER'}, s), s.e, s.g, s.a) + '</div><div class="kln">' + esc(lrMarket(s)) + ' · ' + esc([s.pos, book(s.bk)].filter(Boolean).join(' · ')) + '</div>' + gl + '</div>' +
      oddsBox(s.o, 'Score ' + Math.round(s.score)) + '</div>';
  }
  return ticketBlock(it, withGame);
}
function ticketBlock(it, withGame) {
  const x = it.x, sg = it.kind === 'sgp', D = ticketDec(x), price = sg ? 1 + (D - 1) * 0.9 : D, locked = x.legs.some(l => l.locked);
  const head = '<div class="kt-h">' + skew(sg ? 'Same-game parlay' : '2-leg parlay', 'grn') + ticketStatus(x) + '<span class="kt-p">' + odd(amOf(price)) + (sg ? '<i>est. book</i>' : '') + '</span></div>';
  const legs = x.legs.map(l => '<div class="kt-l">' + badge(l.tm, 30) + '<div class="kmid"><div class="knm"><b>' + esc(l.p) + '</b>' + fcChip(l) + (l.g ? gradeChip(l.g, l.a) : '') + '</div><div class="kln">' +
    esc(Math.ceil(l.ln) + '+ ' + (MSHORT[U(l.m)] || mkt(l.m).toLowerCase())) + (!sg ? ' · ' + esc(gameTag(l.e)) : '') + '</div></div><span class="kt-o">' + odd(l.o) + '</span></div>').join('');
  const btn = locked ? '<div class="kt-lock">' + LOCK + ' Locked at kickoff</div>' : '<button type="button" class="kt-load" data-act="lr-load" data-t="' + (sg ? 'g' : 'p') + '" data-i="' + it.i + '">Load into my parlay</button>';
  return '<div class="kt">' + head + legs + btn + '</div>';
}
function gameBand(g) {
  const lg = liveGame(g), live = lg && lg.state !== 'pre';
  const mid = live ? lg.as + '–' + lg.hs + ' · ' + (lg.state === 'in' ? liveClock(lg) : 'FINAL') : shortTime(g.t);
  const v = vegasShort(g).replace(/^ · /, '');
  return '<div class="kg-h"><i style="background:' + team(g.away).color + '"></i>' + badge(g.away, 32) + '<b class="kg-n"><span class="nf">' + esc(nick(g.away)) + '</span><span class="na">' + esc(g.away) + '</span></b>' +
    skew(esc(mid), 'sm' + (lg && lg.state === 'in' ? ' live' : '')) + '<b class="kg-n r"><span class="nf">' + esc(nick(g.home)) + '</span><span class="na">' + esc(g.home) + '</span></b>' + badge(g.home, 32) + '<i style="background:' + team(g.home).color + '"></i></div>' +
    (v || g.frozen ? '<div class="kg-v">' + esc([v, g.frozen ? 'Locked at kickoff' : ''].filter(Boolean).join(' · ')) + '</div>' : '');
}
const cdText = t => {
  let s = Math.max(0, Math.round((t - Date.now()) / 1000));
  const d = Math.floor(s / 86400); s %= 86400;
  const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60, p = v => String(v).padStart(2, '0');
  return d ? d + 'd ' + h + 'h ' + p(m) + 'm' : h + ':' + p(m) + ':' + p(x);
};
setInterval(() => { const el = document.getElementById('cdown'); if (el) el.textContent = cdText(Number(el.dataset.t)); }, 1000);
function lastWeekCells() {
  const P = S.core.perf && S.core.perf.season, R = S.core.lr && S.core.lr.record;
  const wk = P && !P.withheld ? (P.weeks || []).filter(x => x.s && isNum(x.s.u) && x.s.record) : [];
  const v = wk[wk.length - 1];
  const cell = (lab, rec, u) => '<div class="wb-c"><span>' + esc(lab) + '</span><b>' + esc(rec) + ' <em class="' + (u >= 0 ? 'pos' : 'neg') + '">' + lrU(u) + '</em></b></div>';
  const a = v ? cell('V3 Bets & Leans · Week ' + v.w, String(v.s.record).replace(/-/g, '–'), v.s.u) : '<div class="wb-c"><span>V3 Bets &amp; Leans</span><b class="mut">No graded week yet</b></div>';
  let b;
  const fw = R && (R.weeks || []).filter(w => w.card && w.card.n);
  if (fw && fw.length) { const w = fw[fw.length - 1]; b = cell('Top 10 · Week ' + w.week, lrRec(w.card), w.card.units); }
  else if (R && R.backtest && R.backtest.byWeek && R.backtest.byWeek.length) { const w = R.backtest.byWeek[R.backtest.byWeek.length - 1]; b = cell('Top 10 · W' + w.week + ' backtest', w.card[0] + '–' + w.card[1], w.card[2]); }
  else b = '<div class="wb-c"><span>Top 10</span><b class="mut">—</b></div>';
  return a + b;
}
function weekBoard(games, n) {
  const now = Date.now(), live = games.map(g => ({g: g, lg: liveGame(g)})).filter(x => x.lg && x.lg.state === 'in');
  const next = games.find(g => isNum(g.t) && g.t > now);
  let top;
  if (live.length) {
    const x = live[0];
    top = '<div class="wb-mu">' + badge(x.g.away, 32) + badge(x.g.home, 32) + '</div><div class="wb-k"><span>Live now' + (live.length > 1 ? ' · ' + live.length + ' games' : '') + '</span><b>' + esc(x.g.away + ' ' + x.lg.as + ' · ' + x.g.home + ' ' + x.lg.hs) + '</b></div>' +
      '<button type="button" class="kbug live big" data-view="live"><span>' + esc(liveClock(x.lg)) + '</span></button>';
  } else if (next) {
    top = '<div class="wb-mu">' + badge(next.away, 32) + badge(next.home, 32) + '</div><div class="wb-k"><span>Next kickoff</span><b>' + esc(next.away + ' at ' + next.home + ' · ' + fmt(next.t, {weekday: 'short'})) + '</b></div>' +
      '<span class="kbug grn big"><span id="cdown" data-t="' + next.t + '">' + cdText(next.t) + '</span></span>';
  } else top = '<div class="wb-k"><span>Week ' + esc(S.core.meta.week) + '</span><b>All games are final</b></div>';
  const box = (id, v, lab) => '<button type="button" class="wb-n' + (S.tf === id ? ' on' : '') + '" data-act="tf" data-v="' + id + '"><b>' + v + '</b><span>' + lab + '</span></button>';
  return '<section class="wb"><div class="wb-top">' + top + '</div><div class="wb-ns">' + box('bets', n.bets, 'Bets') + box('top', n.top, 'Top 10') + box('par', n.par, 'Parlays') + box('res', n.res, 'Research') + '</div>' +
    '<div class="wb-last">' + lastWeekCells() + '</div></section>';
}
function lowerThird(games, total) {
  const now = Date.now(), live = games.filter(g => { const lg = liveGame(g); return lg && lg.state === 'in'; }).length;
  const next = games.find(g => isNum(g.t) && g.t > now);
  const left = live ? live + (live === 1 ? ' game' : ' games') + ' in progress' : next ? fmt(next.t, {weekday: 'long'}) + ' kicks off ' + fmt(next.t, {hour: 'numeric', minute: '2-digit'}) : 'Week ' + S.core.meta.week + ' complete';
  return '<div class="klt"><i></i><span>' + esc(left) + '</span><b>' + total + ' picks</b></div>';
}
const itemKick = it => it.x ? Math.min.apply(null, it.x.legs.map(l => (gameOf(l.e) || {}).t || Infinity)) : ((gameOf(it.e) || {}).t || Infinity);
const itemDec = it => it.c ? decOf(it.c.o) : it.s ? decOf(it.s.o) : it.kind === 'sgp' ? 1 + (ticketDec(it.x) - 1) * 0.9 : ticketDec(it.x);
const itemHit = it => it.c ? it.c.hp : it.s ? it.s.hp : it.x.legs.reduce((p, l) => p * (isNum(l.hp) ? l.hp : NaN), 1);
const num0 = v => isNum(v) ? v : -Infinity;
function sortItems(list, how) {
  const by = {rank: (a, b) => a.r - b.r, price: (a, b) => num0(itemDec(b)) - num0(itemDec(a)) || a.r - b.r, odds: (a, b) => num0(itemDec(b)) - num0(itemDec(a)) || a.r - b.r,
    hit: (a, b) => num0(itemHit(b)) - num0(itemHit(a)) || a.r - b.r, ev: (a, b) => num0(b.c && b.c.ev) - num0(a.c && a.c.ev) || a.r - b.r,
    ko: (a, b) => itemKick(a) - itemKick(b) || a.r - b.r}[how] || ((a, b) => a.r - b.r);
  return list.slice().sort(by);
}
const SORTS = {
  sortB: [['rank', 'Signal rank'], ['odds', 'Best odds'], ['hit', 'V3 hit'], ['ev', 'V3 EV'], ['ko', 'Kickoff']],
  sortT: [['rank', 'Rank'], ['odds', 'Best odds'], ['hit', 'V3 hit'], ['ko', 'Kickoff']],
  sortG: [['price', 'Best price'], ['hit', 'V3 hit'], ['ko', 'Kickoff']],
  sortP: [['price', 'Best price'], ['hit', 'V3 hit'], ['ko', 'Kickoff']]
};
const sortBar = key => '<div class="td-sort" role="group" aria-label="Sort"><span>Sort</span>' + SORTS[key].map(o =>
  '<button type="button" class="' + (S[key] === o[0] ? 'on' : '') + '" aria-pressed="' + (S[key] === o[0]) + '" data-act="tdsort" data-k="' + key + '" data-v="' + o[0] + '">' + o[1] + '</button>').join('') + '</div>';
function listSection(title, sub, key, its) {
  if (!its.length) return '';
  return '<section class="kg klist"><div class="ksh">' + skew(esc(title), 'grn') + '<span class="ksub">' + esc(sub) + '</span>' + sortBar(key) + '</div>' +
    sortItems(its, S[key]).map(it => tdRow(it, true)).join('') + '</section>';
}
function crossParlays(its) {
  return listSection('Cross-game parlays', its.length + ' two-leg parlays · legs from different games', 'sortP', its);
}
const kday = txt => '<div class="kday">' + skew(esc(txt)) + '<i></i></div>';
function viewToday() {
  const items = weekItems(), games = (S.core.games || []).slice().sort((a, b) => (a.t || 0) - (b.t || 0));
  const s = S.core.sections, lr = S.core.lr && S.core.lr.current;
  const n = {bets: items.filter(x => x.kind === 'bet' || x.kind === 'lean').length, top: items.filter(x => x.kind === 'top').length,
    par: items.filter(x => x.kind === 'par' || x.kind === 'sgp').length, res: s.lowerRisk.length + s.longshot.length + s.watch.length};
  const chip = (id, lab) => '<button type="button" class="ktab' + (S.tf === id ? ' on' : '') + '" data-act="tf" data-v="' + id + '"><span>' + lab + '</span></button>';
  const mode = (id, lab) => '<button type="button" class="ktab mode' + (S.tdMode === id ? ' on' : '') + '" data-act="tdmode" data-v="' + id + '"><span>' + lab + '</span></button>';
  let main = lowerThird(games, n.bets + n.top + n.par) + weekBoard(games, n) +
    '<div class="kctl"><div class="ktabs">' + chip('all', 'All ' + (n.bets + n.top + n.par)) + chip('bets', 'Bets ' + n.bets) + chip('top', 'Top 10') + chip('par', 'Parlays ' + n.par) + '</div>' +
    (S.tf === 'res' ? '<div class="ktabs two">' + chip('all', 'Back to picks') + '<span></span></div>' : '<div class="ktabs two">' + mode('game', 'By game') + mode('list', 'By list') + '</div>') + '</div>';
  if (S.tf === 'res') {
    main += kday('Research') + '<div class="td-research">' + viewWatchlist() +
      fold('lr', 'Lower Risk · Sunday Top 9', 'Alternate-line parlay legs ranked by L1. Check the real combined parlay price before using one.', s.lowerRisk.length, () => grid(s.lowerRisk) || '<div class="empty">No Lower Risk legs this week.</div>') +
      fold('j1', 'Longshot Plus · J1 Top 20', 'Research candidates ranked by J1. Tracked for learning, never a production BET or LEAN.', s.longshot.length, () => grid(s.longshot) || '<div class="empty">No Longshot Plus research candidates.</div>') +
      fold('watch', 'Watch', 'Straights waiting on price, status or data. Not official picks.', s.watch.length, () => grid(s.watch) || '<div class="empty">Nothing on watch right now.</div>') +
      viewLadder() +
      (lr && lr.next && lr.next.length ? fold('lr-next', 'Light-role · next on the list', 'Players ranked just below the top 10 (not part of the test).', lr.next.length, () =>
        '<div class="lpair lrcard">' + lr.next.map((x, i) => lrCardLine(x, i, x.rank)).join('') + '</div>') : '') + '</div>';
  } else if (S.tdMode === 'list') {
    const shown = items.filter(x => tfOk(x, S.tf)), of = k => shown.filter(x => k.indexOf(x.kind) >= 0);
    const b = of(['bet', 'lean']), nb = b.filter(x => x.kind === 'bet').length;
    main += listSection('V3 Bets & Leans', b.length + ' straights · ' + nb + ' BET · ' + (b.length - nb) + ' LEAN', 'sortB', b) +
      listSection('Top 10 · light-role', 'Under-the-radar score · one prop per player', 'sortT', of(['top'])) +
      listSection('Same-game parlays', of(['sgp']).length + ' tickets · combined odds less 10%', 'sortG', of(['sgp'])) +
      crossParlays(of(['par']));
    if (!shown.length) main += '<div class="empty">Nothing in this list on the current board.</div>';
  } else {
    const byE = {}, shown = items.filter(x => tfOk(x, S.tf));
    shown.filter(x => x.kind !== 'par').forEach(x => (byE[x.e] || (byE[x.e] = [])).push(x));
    const order = {bet: 0, lean: 1, top: 2, sgp: 3};
    let last = '';
    games.forEach(function (g) {
      const its = byE[g.id];
      if (!its || !its.length) return;
      its.sort((a, b) => order[a.kind] - order[b.kind] || a.r - b.r);
      const day = fmt(g.t, {weekday: 'long'});
      if (day !== last) { main += kday(day); last = day; }
      main += '<section class="kg">' + gameBand(g) + its.map(it => tdRow(it)).join('') + '</section>';
    });
    const cross = shown.filter(x => x.kind === 'par');
    if (cross.length) main += kday('All games') + crossParlays(cross);
    if (!shown.length) main += '<div class="empty">Nothing in this list on the current board.</div>';
  }
  return '<div class="today"><div class="td-main">' + main + '</div><aside class="td-rail">' + liveRail(items, games) + '</aside></div>';
}

/* ---- live stats ---- */
function loadLive(force) {
  if (S.liveLoading) return;
  if (!force && !liveWindow()) return;
  S.liveLoading = true;
  call('nflpBoardGetLive', [], s => {
    S.liveLoading = false;
    try {
      const j = typeof s === 'string' ? JSON.parse(s) : s;
      if (j && j.ok === false) {
        /* Keep the last good scores on screen and say why this read failed; the next poll retries. */
        S.liveErr = 'ESPN feed did not answer' + (j.err ? ' (' + j.err + ')' : '') + '. Retrying.';
        if (!S.live || !(S.live.games || []).length) S.live = j;
      } else { S.live = j; S.liveErr = ''; recordHistory(); }
    } catch (e) { S.liveErr = 'Live stats could not be read.'; }
    if (S.tab === 'live' || S.tab === 'today') render();
  }, e => { S.liveLoading = false; S.liveErr = String(e && e.message || e); if (S.tab === 'live') render(); });
}
function liveWindow() {
  const now = Date.now();
  return (S.core && S.core.games || []).some(g => isNum(g.t) && g.t <= now + 10 * 60000 && g.t >= now - 5 * 3600000);
}
setInterval(() => { if (!document.hidden && S.core && (S.tab === 'live' || S.tab === 'today')) loadLive(false); }, 45000);
function liveGame(g) {
  if (!S.live || !S.live.games || !g) return null;
  const a = tcode(g.away), h = tcode(g.home);
  return S.live.games.find(x => x.away === a && x.home === h) || null;
}
const liveClock = lg => lg.period > 4 ? 'OT ' + lg.clock : 'Q' + lg.period + ' ' + lg.clock;
function gameFrac(lg) {
  if (!lg || lg.state === 'pre') return 0;
  if (lg.state === 'post' || lg.done) return 1;
  if (lg.period > 4) return 1;
  const m = String(lg.clock || '0:00').split(':'), left = (Number(m[0]) || 0) + (Number(m[1]) || 0) / 60;
  return Math.max(0, Math.min(1, ((lg.period - 1) * 15 + (15 - left)) / 60));
}
function statFor(m, st) {
  if (!st) return null;
  const s = st.s || {}, M = U(m), z = v => isNum(v) ? v : 0;
  if (M === 'RECEIVING YARDS') return z(s.rcy);
  if (M === 'RECEPTIONS') return z(s.rec);
  if (M === 'RUSHING YARDS') return z(s.ry);
  if (M === 'PASSING YARDS') return z(s.py);
  if (M === 'PASSING ATTEMPTS') return z(s.pa);
  if (M === 'PASSING COMPLETIONS') return z(s.pc);
  if (M === 'ANYTIME TD' || M === 'TOTAL TDS') return z(s.rtd) + z(s.rctd);
  if (M === 'RUSH + REC YARDS' || M === 'RUSHING + RECEIVING YARDS') return z(s.ry) + z(s.rcy);
  return null;
}
const GRADED = {W: ['Won', 'hit'], L: ['Lost', 'miss'], V: ['Void', 'wait'], P: ['Push', 'wait']};
function progress(pk, lg) {
  const pr = progressLive(pk, lg), G = GRADED[pk.g];
  if (!G) return pr;
  if (pr.cur === null && isNum(pk.a)) { pr.cur = pk.a; const ln = U(pk.dr) === 'YES' || U(pk.dr) === 'NO' ? 0.5 : pk.ln, sc = Math.max((Math.floor(ln) + 1) * 1.3, pk.a * 1.05, 1); pr.fill = Math.min(1, pk.a / sc); pr.tick = Math.min(1, ln / sc); pr.left = 'Graded'; }
  pr.status = G[0]; pr.cls = G[1]; pr.right = 'Final';
  return pr;
}
function progressLive(pk, lg) {
  const st = livePlayer(pk.p, pk.tm), cur = statFor(pk.m, st) ?? (lg && lg.state !== 'pre' ? 0 : null);
  const D = U(pk.dr), over = D === 'OVER' || D === 'YES', ln = D === 'YES' || D === 'NO' ? 0.5 : pk.ln;
  if (!lg || lg.state === 'pre' || cur === null || !isNum(ln)) return {status: 'Not started', cls: 'wait', cur: null, fill: 0, tick: 0, left: lg ? dayTime(lg.t) : '', right: ''};
  const f = gameFrac(lg), done = lg.state === 'post' || lg.done, pace = f > 0.08 ? cur / f : null;
  const need = Math.floor(ln) + 1;
  let status, cls;
  if (over) {
    if (cur > ln) { status = 'Hit'; cls = 'hit'; }
    else if (done) { status = 'Missed'; cls = 'miss'; }
    else if (D === 'YES') { status = 'Waiting'; cls = 'wait'; }
    else if (isNum(pace) && pace > ln) { status = 'On pace'; cls = 'pace'; }
    else { status = 'Behind'; cls = 'behind'; }
  } else {
    if (cur > ln) { status = 'Missed'; cls = 'miss'; }
    else if (done) { status = 'Hit'; cls = 'hit'; }
    else if (!isNum(pace) || pace <= ln) { status = 'On pace'; cls = 'pace'; }
    else { status = 'Behind'; cls = 'behind'; }
  }
  const scale = Math.max(need * 1.3, cur * 1.05, 1);
  const yn = D === 'YES' || D === 'NO';
  const left = yn ? (cur > 0 ? 'Scored' : done ? 'No touchdown' : 'No touchdown yet') : over ? (cur > ln ? 'Cleared' : (need - cur) + ' more needed') : (cur > ln ? 'Over by ' + n1(cur - ln) : n1(ln - cur) + ' to spare');
  const right = done ? 'Final' : yn ? liveClock(lg) : isNum(pace) ? 'Pace ' + (pace >= 10 ? Math.round(pace) : n1(pace)) : 'Line ' + ln;
  return {status: status, cls: cls, cur: cur, fill: Math.min(1, cur / scale), tick: Math.min(1, ln / scale), left: left, right: right};
}
function trackedIn(eid) {
  const out = [];
  weekItems().forEach(function (it) {
    if (it.c && it.e === eid) { const gr = gradeOf(it.c.p, it.c.dr, it.c.ln, it.c.m) || {}; out.push({p: it.c.p, tm: it.c.tm, pid: it.c.pid, m: it.c.m, dr: it.c.dr, ln: it.c.ln, o: it.c.o, kind: it.kind, k: it.k, g: gr.g, a: gr.a}); }
    if (it.s && it.e === eid) out.push({p: it.s.p, tm: it.s.tm, pid: it.s.pid, m: it.s.m, dr: 'OVER', ln: it.s.ln, o: it.s.o, kind: 'top', rank: it.i + 1, g: it.s.g, a: it.s.a});
    if (it.x && it.kind === 'sgp' && it.e === eid) it.x.legs.forEach(l => out.push({p: l.p, tm: l.tm, pid: l.pid, m: l.m, dr: 'OVER', ln: l.ln, o: l.o, kind: 'sgp', g: l.g, a: l.a}));
    if (it.x && it.kind === 'par') it.x.legs.forEach(l => { if (l.e === eid) out.push({p: l.p, tm: l.tm, pid: l.pid, m: l.m, dr: 'OVER', ln: l.ln, o: l.o, kind: 'par', g: l.g, a: l.a}); });
  });
  S.slip.forEach(l => { if (l.e === eid) out.push({p: l.p, tm: l.tm, pid: l.pid, m: l.m, dr: l.dr, ln: l.ln, o: Number(String(l.o).replace('−', '-')), kind: 'slip'}); });
  const seen = {};
  return out.filter(x => { const k = x.pid + '|' + x.m + '|' + x.ln + '|' + x.kind; if (seen[k]) return false; seen[k] = true; return true; });
}
const KIND2 = Object.assign({slip: ['My parlay', 'k-par']}, KIND);
/* Stat history for the live charts: one point per refresh, kept on this device for the current week. */
let LH = {wk: null, d: {}};
try { const t = JSON.parse(localStorage.getItem('nflp_lh') || 'null'); if (t && t.d) LH = t; } catch (e) {}
const lhKey = (eid, pk) => eid + '|' + pk.pid + '|' + pk.m;
function recordHistory() {
  if (!S.live || !S.core) return;
  const wk = S.core.meta.week;
  if (LH.wk !== wk) LH = {wk: wk, d: {}};
  (S.core.games || []).forEach(function (g) {
    const lg = liveGame(g);
    if (!lg || lg.state === 'pre') return;
    const f = Math.round(gameFrac(lg) * 1000) / 1000;
    trackedIn(g.id).forEach(function (pk) {
      const cur = statFor(pk.m, livePlayer(pk.p, pk.tm));
      if (!isNum(cur)) return;
      const k = lhKey(g.id, pk), a = LH.d[k] || (LH.d[k] = []), last = a[a.length - 1];
      if (last && f <= last[0]) { last[1] = Math.max(last[1], cur); return; }
      a.push([f, cur]);
      if (a.length > 160) a.splice(1, 1);
    });
  });
  try { localStorage.setItem('nflp_lh', JSON.stringify(LH)); } catch (e) {}
}
/* Play-by-play steps for one pick: [[gameFraction, runningTotal, label], ...] from the server's event string. */
const EV_D = {r: y => ({ra: 1, ry: y}), c: y => ({rec: 1, rcy: y, tg: 1}), i: () => ({tg: 1}), P: y => ({pc: 1, pa: 1, py: y}), A: () => ({pa: 1}), X: () => ({pa: 1, int: 1})};
const nI = v => Number.isInteger(v) ? String(v) : n1(v);
const EV_L = {r: 'carry', c: 'catch', i: 'target', P: 'completion', A: 'incompletion', X: 'interception'};
function playSteps(pk, f) {
  const st = livePlayer(pk.p, pk.tm);
  if (!st || !st.e) return null;
  const acc = {}, out = [];
  let prev = statFor(pk.m, {s: acc}) || 0;
  String(st.e).split('|').forEach(function (x) {
    const a = x.split(' '), fn = EV_D[a[1]];
    if (!fn || a.length < 3) return;
    const t = Math.min(1, (Number(a[0]) || 0) / 3600);
    if (t > f + 0.001) return;
    const td = /t$/.test(a[2]), y = Number(String(a[2]).replace('t', '')) || 0, d = fn(y);
    if (td) { if (a[1] === 'r') d.rtd = 1; else if (a[1] === 'c') d.rctd = 1; else if (a[1] === 'P') d.ptd = 1; }
    Object.keys(d).forEach(k => { acc[k] = (acc[k] || 0) + d[k]; });
    const v = statFor(pk.m, {s: acc});
    if (!isNum(v) || v === prev) return;
    const q = Math.min(5, Math.floor((Number(a[0]) || 0) / 900) + 1), left = 900 - (Number(a[0]) || 0) % 900;
    out.push([t, v, (q > 4 ? 'OT' : 'Q' + q) + ' ' + Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0') + ' · ' + EV_L[a[1]] + (v > prev ? ' +' : ' ') + nI(v - prev) + (td ? ', TD' : '') + ' → ' + nI(v)]);
    prev = v;
  });
  return out;
}
function liveChart(pk, eid, lg, pr, h) {
  const D = U(pk.dr), ln = D === 'YES' || D === 'NO' ? 0.5 : pk.ln, f = gameFrac(lg), cur = isNum(pr.cur) ? pr.cur : 0;
  if (!isNum(ln)) return '';
  const steps = playSteps(pk, f);
  const lo = Math.min(0, ...(steps || []).map(s => s[1])), top = Math.max(ln * 1.25, cur * 1.1, ...(steps || []).map(s => s[1] * 1.1), 1);
  const y = v => (h - 3 - (v - lo) / (top - lo) * (h - 10)).toFixed(1), X = v => (Math.min(1, v) * 300).toFixed(1);
  const col = {hit: '#3DDC97', pace: '#3DDC97', behind: '#FF8A73', miss: '#5D6E7C', wait: '#5D6E7C'}[pr.cls] || '#3DDC97';
  const ln1 = (x1, y1, x2, y2, st) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" ' + st + ' vector-effect="non-scaling-stroke"/>';
  let path, dots = '';
  if (steps) {
    /* Flat between plays, a jump at each one; a final jump if the box score is ahead of the plays read so far. */
    let v = 0, d = 'M0,' + y(0);
    steps.forEach(function (s) { d += ' H' + X(s[0]) + ' V' + y(s[1]); v = s[1]; });
    if (cur !== v) d += ' H' + X(f) + ' V' + y(cur);
    d += ' H' + X(f);
    path = '<path d="' + d + '" fill="none" stroke="' + col + '" stroke-width="2.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>';
    dots = steps.map(s => '<line x1="' + X(s[0]) + '" y1="' + y(s[1]) + '" x2="' + X(s[0]) + '" y2="' + y(s[1]) + '" stroke="' + col + '" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-stroke"><title>' + esc(s[2]) + '</title></line>').join('');
  } else {
    /* Older feed without plays: points saved on this device at each refresh. */
    const hist = ((LH.d || {})[lhKey(eid, pk)] || []).filter(p => p[0] < f);
    path = '<polyline points="' + [[0, 0]].concat(hist, [[f, cur]]).map(p => X(p[0]) + ',' + y(p[1])).join(' ') + '" fill="none" stroke="' + col + '" stroke-width="2.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>';
  }
  const last = steps && steps.length ? steps[steps.length - 1][2] : '';
  return '<svg class="kch" viewBox="0 0 300 ' + h + '" preserveAspectRatio="none" role="img" aria-label="' + esc(pk.p + ': ' + cur + ' so far against a line of ' + ln + (steps ? ', ' + steps.length + ' plays' + (last ? '; last: ' + last : '') : '')) + '" style="height:' + h + 'px">' +
    [75, 150, 225].map(x => ln1(x, 2, x, h - 3, 'stroke="#16212B"')).join('') +
    ln1(0, y(ln), 300, y(ln), 'stroke="#ECF1F4" stroke-dasharray="2 3"') +
    ln1(0, y(0), 300, y(ln), 'stroke="#33465A" stroke-width="1.5" stroke-dasharray="5 4"') +
    ln1(0, y(0), 300, y(0), 'stroke="#24323F"') + path + dots + '</svg>';
}
function liveRow(pk, lg, compact, eid) {
  const pr = progress(pk, lg), label = KIND2[pk.kind][0] + (pk.rank ? ' #' + pk.rank : '');
  const D = U(pk.dr), ln = D === 'YES' || D === 'NO' ? 'TD' : pk.ln;
  const started = lg && lg.state !== 'pre';
  return '<div class="klv' + (compact ? ' sm' : '') + '"><div class="klv-t">' + badge(pk.tm, compact ? 30 : 38) +
    '<div class="kmid"><div class="knm"><b>' + esc(pk.p) + '</b></div><div class="kln">' + esc(label + ' · ' + propLabel(pk)) + '</div></div>' +
    '<div class="klv-n"><b>' + (pr.cur === null ? '—' : esc(pr.cur)) + '</b><span class="lv-st ' + pr.cls + '">' + esc(pr.status) + '</span></div></div>' +
    (started && eid ? liveChart(pk, eid, lg, pr, compact ? 44 : 64) + '<div class="klv-ax"><span>Q1</span><span>Q2</span><span>Q3</span><span>Q4</span></div>' : '') +
    '<div class="lv-sub"><span>' + esc(pr.left) + '</span><span>' + esc((pr.right ? pr.right + ' · ' : '') + 'Line ' + ln) + '</span></div></div>';
}
function liveMini(pk, lg) {
  const pr = progress(pk, lg), label = KIND2[pk.kind][0] + (pk.rank ? ' #' + pk.rank : '');
  return '<div class="kmini">' + badge(pk.tm, 30) + '<div class="kmid"><div class="knm"><b>' + esc(pk.p) + '</b></div><div class="kln">' + esc(label + ' · ' + propLabel(pk)) + '</div></div>' +
    '<div class="klv-n"><b>' + (pr.cur === null ? '—' : esc(pr.cur)) + '</b><span class="lv-st ' + pr.cls + '">' + esc(pr.status) + '</span></div></div>';
}
function liveScore(g, lg, big) {
  const st = lg.state === 'in' ? liveClock(lg) : lg.state === 'post' ? 'FINAL' : shortTime(g.t);
  return '<div class="ksb' + (big ? ' big' : '') + '"><i style="background:' + team(g.away).color + '"></i>' + badge(g.away, big ? 48 : 32) +
    '<b class="' + (lg.as >= lg.hs ? '' : 'mut') + '">' + esc(lg.as) + '</b>' + skew(esc(st), lg.state === 'in' ? 'grn' : '') +
    '<b class="' + (lg.hs >= lg.as ? '' : 'mut') + '">' + esc(lg.hs) + '</b>' + badge(g.home, big ? 48 : 32) + '<i style="background:' + team(g.home).color + '"></i></div>' +
    (lg.state === 'in' && lg.dd ? '<div class="ksb-dd">' + esc((lg.poss ? lg.poss + ' ball · ' : '') + lg.dd) + '</div>' : '');
}
function ticketsLive() {
  const lr = S.core.lr && S.core.lr.current;
  if (!lr) return '';
  const ts = lr.parlays.map((x, i) => ({x: x, lab: '2-leg parlay', i: i})).concat(lr.sgps.map((x, i) => ({x: x, lab: 'Same-game parlay', i: i})));
  const live = ts.filter(t => t.x.legs.some(l => { const lg = liveGame(gameOf(l.e)); return lg && lg.state !== 'pre'; }));
  if (!live.length) return '';
  return kday('Parlays in play') + '<div class="lv-grid">' + live.map(function (t) {
    const legs = t.x.legs.map(l => ({l: l, pr: progress(Object.assign({dr: 'OVER'}, l), liveGame(gameOf(l.e)))}));
    const hit = legs.filter(z => z.pr.cls === 'hit').length, dead = legs.some(z => z.pr.cls === 'miss');
    return '<section class="kg kt-live"><div class="kt-h">' + skew(esc(t.lab), 'grn') + '<span class="lv-st ' + (dead ? 'miss' : hit === legs.length ? 'hit' : 'pace') + '">' + (dead ? 'Lost' : hit + ' of ' + legs.length + ' hit') + '</span><span class="kt-p">' + odd(amOf(ticketDec(t.x))) + '</span></div>' +
      legs.map(z => '<div class="lv-leg">' + badge(z.l.tm, 26) + '<span class="lv-ln">' + esc(legShort(z.l)) + '</span><div class="kseg">' + segs(z.pr) + '</div><span class="lv-st ' + z.pr.cls + '">' + esc((z.pr.cur === null ? '' : z.pr.cur + ' · ') + z.pr.status) + '</span></div>').join('') + '</section>';
  }).join('') + '</div>';
}
function segs(pr) {
  const n = Math.round(pr.fill * 10), t = Math.round(pr.tick * 10);
  let h = '';
  for (let i = 0; i < 10; i++) h += '<i class="' + (i < n ? pr.cls : '') + (i === t - 1 ? ' ln' : '') + '"></i>';
  return h;
}
function liveTicker(games) {
  let on = 0, settled = 0;
  games.forEach(g => { const lg = liveGame(g); if (!lg || lg.state === 'pre') return; const n = trackedIn(g.id).length; if (lg.state === 'in') on += n; else settled += n; });
  const now = Date.now(), next = games.find(g => isNum(g.t) && g.t > now);
  return '<div class="ktick">' + skew('Ticker', 'grn') + '<span>' + on + ' picks live · ' + settled + ' settled' + (next ? ' · next kickoff ' + esc(dayTime(next.t)) : '') + '</span></div>';
}
function viewLive() {
  const games = (S.core.games || []).slice().sort((a, b) => (a.t || 0) - (b.t || 0));
  let h = '<div class="khdr"><h2>Live</h2><span class="mut">' + (S.live ? 'Updated ' + esc(clock(S.live.at)) + ' · refreshes every 45 sec' : S.liveLoading ? 'Loading scores…' : '') + '</span></div>';
  if (S.liveErr) h += '<div class="warnbar"><div>Live stats unavailable: ' + esc(S.liveErr) + '</div></div>';
  const rows = games.map(g => ({g: g, lg: liveGame(g)}));
  const inPlay = rows.filter(x => x.lg && x.lg.state === 'in'), finals = rows.filter(x => x.lg && x.lg.state === 'post'), next = rows.filter(x => !x.lg || x.lg.state === 'pre');
  h += '<div class="lv-grid">';
  if (!inPlay.length) h += '<div class="empty">No games in progress right now.' + (next.length ? ' Next kickoff: ' + esc(next[0].g.away + ' at ' + next[0].g.home + ', ' + dayTime(next[0].g.t)) + '.' : '') + '</div>';
  inPlay.forEach(function (x) {
    const pk = trackedIn(x.g.id);
    h += '<section class="kg">' + liveScore(x.g, x.lg, true) + (pk.length ? pk.map(p => liveRow(p, x.lg, false, x.g.id)).join('') : '<div class="lv-none">None of your picks are in this game.</div>') + '</section>';
  });
  h += '</div>' + ticketsLive();
  if (finals.length) h += kday('Final') + '<div class="lv-grid">' + finals.map(x => { const pk = trackedIn(x.g.id);
    const hit = pk.filter(p => progress(p, x.lg).cls === 'hit').length;
    return '<section class="kg">' + liveScore(x.g, x.lg, false) + (pk.length ? '<div class="lv-fsum">' + hit + ' of ' + pk.length + ' hit</div>' + pk.map(p => liveMini(p, x.lg)).join('') : '<div class="lv-none">No picks in this game.</div>') + '</section>'; }).join('') + '</div>';
  if (next.length) h += kday('Up next') + '<div class="knext">' + next.map(x => { const n = trackedIn(x.g.id).length;
    return '<div class="knx">' + badge(x.g.away, 28) + badge(x.g.home, 28) + '<div><b>' + esc(x.g.away + ' at ' + x.g.home) + '</b><span>' + esc(dayTime(x.g.t)) + (n ? ' · ' + n + (n === 1 ? ' pick' : ' picks') : '') + '</span></div></div>'; }).join('') + '</div>';
  return h + liveTicker(games);
}
function liveRail(items, games) {
  let h = '';
  const inPlay = games.map(g => ({g: g, lg: liveGame(g)})).filter(x => x.lg && x.lg.state === 'in');
  if (inPlay.length) {
    const x = inPlay[0], pk = trackedIn(x.g.id);
    h += '<section class="kg"><div class="ksh">' + skew('Live now' + (inPlay.length > 1 ? ' · ' + inPlay.length + ' games' : ''), 'red') + '</div>' + liveScore(x.g, x.lg, false) +
      pk.slice(0, 3).map(p => liveRow(p, x.lg, true, x.g.id)).join('') + '<button type="button" class="td-more" data-view="live">Open Live</button></section>';
  }
  const cross = items.filter(i => i.kind === 'par');
  if (cross.length) h += '<section class="kg">' + ticketBlock(sortItems(cross, 'price')[0], true) + '</section>';
  const now = Date.now(), next = games.filter(g => !(g.t <= now)).slice(0, 5);
  if (next.length) h += '<section class="kg"><div class="ksh">' + skew('Up next') + '</div>' + next.map(g => { const n = items.filter(i => i.e === g.id).length;
    return '<div class="knx row">' + badge(g.away, 26) + badge(g.home, 26) + '<div><b>' + esc(g.away + ' at ' + g.home) + '</b><span>' + esc(dayTime(g.t)) + (n ? ' · ' + n + (n === 1 ? ' pick' : ' picks') : '') + '</span></div></div>'; }).join('') + '</section>';
  const R = S.core.lr && S.core.lr.record;
  if (R && R.total) {
    const T = R.total, B = (R.backtest || {}).total || {};
    const c = (o, b) => o && o.n ? lrRec(o) : b ? b.w + '–' + b.l : '—';
    const lab = T.card && T.card.n ? 'Forward test' : 'Backtest W4–9';
    h += '<section class="kg"><div class="ksh">' + skew('Light-role') + '<span class="ksub">' + lab + '</span></div><div class="krec"><div><b>' + c(T.card, B.card) + '</b><span>Top 10</span></div><div><b>' + c(T.parlays, B.parlays) + '</b><span>Parlays</span></div><div><b>' + c(T.sgps, B.sgps) + '</b><span>Same-game</span></div></div>' +
      '<button type="button" class="td-more" data-view="performance">All results</button></section>';
  }
  return h;
}


function render() {
  document.querySelectorAll('[data-view]').forEach(b => b.classList.toggle('on', !b.classList.contains('brand') && (b.dataset.view === S.tab || (!TABS[b.dataset.view] && b.dataset.view === S.view))));
  document.querySelectorAll('[data-act="mode"]').forEach(b => b.classList.toggle('on', (b.dataset.m === 'analyst') === S.analyst));
  $('sheetMode').textContent = S.analyst ? 'Simple view' : 'Analyst view';
  if (S.core && $('wkbug')) $('wkbug').firstChild.textContent = 'Week ' + S.core.meta.week;
  const anyLive = !!(S.live && S.live.games && S.live.games.some(g => g.state === 'in'));
  document.querySelectorAll('[data-view="live"]').forEach(b => b.classList.toggle('islive', anyLive));
  if (!S.core) return;
  const full = S.tab === 'explore' || S.tab === 'results';
  $('strip').innerHTML = full ? strip() : stripWarn();
  const v = S.view;
  renderSlip();
  let body = v === 'today' ? viewToday() : v === 'live' ? viewLive() : v === 'games' ? viewGames() : v === 'props' ? viewProps() : v === 'performance' ? viewPerf() :
    v === 'portfolio' ? viewPortfolio() : v === 'system' ? viewSystem() : viewPicks();
  if (S.tab === 'explore') body = subtabs('explore', S.exSub, EX_SUBS) + body;
  else if (S.tab === 'results') body = subtabs('results', S.reSub, RE_SUBS) + body;
  $('main').innerHTML = body;
}
function stripWarn() {
  const m = S.core.meta;
  return m.buildState && m.buildState !== 'V3_READY' ? '<div class="warnbar"><div>Build state: ' + esc(m.buildState) + (m.buildStage ? ' · ' + esc(m.buildStage) : '') + '. The board shows the last successful build.</div></div>' : '';
}
function strip() {
  const m = S.core.meta, c = m.counts;
  let h = '<div class="strip"><div class="stripin"><span class="wk">WEEK ' + esc(m.week) + '</span><span>NFL ' + esc(m.season) + '</span>' +
    '<span><b>' + c.straights + '</b> Straights</span><span><b>' + c.lowerRisk + '</b> Lower Risk legs</span>' +
    '<span><b>' + c.games + '</b> games</span><span><b>' + comma(c.props) + '</b> props evaluated</span>' +
    '<span>Board built <b>' + esc(dayTime(m.lastBuild)) + '</b></span></div></div>';
  if (m.buildState && m.buildState !== 'V3_READY') h += '<div class="warnbar"><div>Build state: ' + esc(m.buildState) + (m.buildStage ? ' · ' + esc(m.buildStage) : '') + '. The board shows the last successful build.</div></div>';
  return h;
}

/* ---------------- cards ---------------- */
function card(k, ctx) {
  const c = S.core.cards[k];
  if (!c) return '';
  const t = team(c.tm), lr = isLR(c), j1 = isJ1(c), straight = U(c.fam) === 'STRAIGHT';
  const rank = ctx === 'game' ? (c.gr ? '#' + c.gr + ' GAME' : '') : (c.wr ? '#' + c.wr + ' ' + (lr ? 'L1 ' : j1 ? 'J1 ' : '') + 'WEEK' : '');
  const open = !!S.open[k];
  const hs = c.hs ? '<img src="' + esc(c.hs) + '" alt="" loading="lazy" onerror="this.parentNode.innerHTML=SIL">' : SIL;
  const meta = [c.tm, c.pos, c.op ? 'vs ' + c.op : '', slateShort(c.sl)].filter(Boolean).join(' · ');
  const ranks = ctx === 'game'
    ? slateName(c.sl) + ' <b>' + (c.sr ? '#' + c.sr : '—') + '</b> · Week <b>' + (c.wr ? '#' + c.wr : '—') + '</b>'
    : 'Game <b>' + (c.gr ? '#' + c.gr : '—') + '</b> · ' + slateName(c.sl) + ' <b>' + (c.sr ? '#' + c.sr : '—') + '</b>';
  return '<article class="card' + (U(c.st) === 'BET' ? ' isbet' : '') + '">' +
    '<div class="hero pcopen" role="button" tabindex="0" aria-label="' + esc('Open player view: ' + c.p) + '"' + pcAttrs(c.pid, c.m, c.dr, k) + ' style="background:linear-gradient(100deg,' + t.color + ' 0%,' + t.color + ' 24%,#10171F 70%)">' +
      '<img class="wm" src="' + esc(logoUrl(c.tm)) + '" alt="" loading="lazy" onerror="logoErr(this)">' +
      '<div class="rk">' + (rank ? '<span class="rkb">' + rank + '</span>' : '') + pill(c) + '</div>' +
      '<div class="hs">' + hs + '</div>' +
      '<div class="id"><div class="nm">' + esc(c.p) + '</div><div class="meta">' + esc(meta) + '</div></div>' +
    '</div>' +
    '<div class="line"><div class="prop">' + esc(propLabel(c)) + '</div><div class="odds"><b>' + odd(c.o) + '</b><span>' + esc(book(c.bk)) + '</span></div></div>' +
    '<div class="kpis">' +
      '<div class="k"><b class="' + (isNum(c.hp) ? 'pos' : 'dim') + '">' + pct(c.hp) + '</b><span>Est. hit</span></div>' +
      '<div class="k"><b>' + n1(c.sg) + (straight && isHL(c) ? STAR : '') + '</b><span>' + sigLetter(c) + ' Signal</span></div>' +
      '<div class="k"><b class="' + evCls(c.ev) + '">' + sev(c.ev) + '</b><span>V3 EV</span></div>' +
    '</div>' + lineStrip(c) +
    (lr ? '<div class="fnote">Parlay leg. Check the real combined price.</div>' : '') +
    (j1 ? '<div class="fnote res">Research only. Not a production BET or LEAN.</div>' : '') +
    '<div class="cf"><span>' + (straight ? 'Bet to <b>' + odd(c.bb) + '</b> BET · <b>' + odd(c.bl) + '</b> LEAN' : ranks) + '</span>' +
      '<span class="cfb"><button class="more" type="button"' + pcAttrs(c.pid, c.m, c.dr, k) + '>Player</button><button class="more" type="button" data-act="card" data-k="' + esc(k) + '" aria-expanded="' + open + '">' + (open ? 'Less' : 'Details') + '</button></span></div>' +
    (straight ? '<div class="cf" style="padding-top:0;margin-top:0"><span>' + ranks + '</span></div>' : '') +
    (open ? '<div class="det">' + details(c, S.core.ladders[c.gk] || [], c.i) + '</div>' : '') +
  '</article>';
}
function details(c, ladder, selfIndex) {
  const an = S.analyst, straight = U(c.fam) === 'STRAIGHT';
  const tile = (label, v) => '<div class="tile"><b>' + esc(v == null || v === '' ? '—' : v) + '</b><span>' + esc(label) + '</span></div>';
  let h = '<div class="tiles">' +
    tile('Projection', isNum(c.sp) ? c.sp : '—') + tile('Player status', c.ps || '—') +
    tile('Odds captured', fmtMin(c.oc, {weekday:'short', hour:'numeric', minute:'2-digit'})) +
    tile('Line', (c.lt || '') + (isNum(c.ml) ? ' · main ' + c.ml : '')) +
    tile('Family', String(c.fam || '—').replace(/_/g, ' ')) + tile('Eligibility', String(c.el || '—').replace(/_/g, ' ')) +
    (!straight && (isNum(c.bb) || isNum(c.bl)) ? tile('Straight price ref.', odd(c.bb) + ' / ' + odd(c.bl)) : '') +
    (an ? tile('Raw model P', pct(c.rp)) + tile('Market P', pct(c.mp)) + tile('Adverse P', pct(c.ap)) + tile('Robustness', pct(c.rb)) +
      tile('Role confidence', pct(c.rc)) + tile('Role status', String(c.rs || '—').replace(/_/g, ' ')) + tile('Projection source', c.src || '—') +
      tile('Projection captured', fmtMin(c.pc, {weekday:'short', hour:'numeric', minute:'2-digit'})) : '') +
    '</div>';
  h += '<div class="dl">Why</div><div class="why">' + esc(reason(c.rsn)) + '</div>';
  const w = warnList(c.w);
  if (w.length) h += '<div class="dl">Context</div><div class="ctx">' + w.map(x => '<div>' + esc(x) + '</div>').join('') + '</div>';
  if (an && (c.rsn || c.w)) h += '<div class="dl">Codes</div><div class="why mut" style="font-size:12px;overflow-wrap:anywhere">' + esc([c.rsn, c.w].filter(Boolean).join(' · ')) + '</div>';
  if (ladder && ladder.length > 1) {
    h += '<div class="dl">Line ladder · ' + esc(dirWord(c.dr) + ' ' + c.m) + '</div><div class="lwrap"><table class="ladder"><thead><tr><th>Line</th><th>Book</th><th>Odds</th><th>Est. hit</th><th>V3 EV</th><th>Signal</th></tr></thead><tbody>' +
      ladder.map(x => '<tr class="' + (x.i === selfIndex ? 'self' : '') + '"><td>' + esc(x.ln) + ' <span class="dim">' + esc(x.lt || '') + '</span></td><td>' + esc(book(x.bk)) + '</td><td>' + odd(x.o) + '</td><td>' + pct(x.hp) + '</td><td class="' + evCls(x.ev) + '">' + sev(x.ev) + '</td><td>' + n1(x.sg) + '</td></tr>').join('') +
      '</tbody></table></div>';
  }
  return h;
}
const grid = keys => keys.length ? '<div class="grid">' + keys.map(k => card(k, S.view === 'games' ? 'game' : 'week')).join('') + '</div>' : '';
function fold(id, title, desc, count, body) {
  const open = !!S.folds[id];
  return '<button class="fold' + (open ? ' open' : '') + '" type="button" data-act="fold" data-id="' + esc(id) + '" aria-expanded="' + open + '"><span class="t">' + esc(title) + '</span><span class="d">' + esc(desc) + '</span>' +
    (count != null ? '<span class="c">' + esc(count) + '</span>' : '') + CHEV + '</button>' + (open ? '<div class="foldbody">' + body() + '</div>' : '');
}

/* ---------------- Player view (game logs, matchup, role, model range) ---------------- */
const MKT_ORDER = ['Passing Yards', 'Passing Attempts', 'Passing Completions', 'Rushing Yards', 'Receiving Yards', 'Receptions', 'Anytime TD', 'Total TDs'];
const MKT_SHORT = {'Passing Yards':'Pass yds', 'Passing Attempts':'Pass att', 'Passing Completions':'Completions', 'Rushing Yards':'Rush yds', 'Receiving Yards':'Rec yds', 'Receptions':'Receptions', 'Anytime TD':'Anytime TD', 'Total TDs':'Total TDs'};
const isTD = m => /TD/i.test(String(m || ''));
const ord = n => { const s = ['th', 'st', 'nd', 'rd'], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); };
const num = (v, d) => isNum(v) ? (Math.round(v * Math.pow(10, d || 0)) / Math.pow(10, d || 0)).toString() : '—';
const short = v => isNum(v) ? (Math.abs(v) >= 100 ? Math.round(v) : Math.round(v * 10) / 10).toString() : '—';
const signed = v => isNum(v) ? (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) : '—';
function plNk(pid) { return S.players && S.players.idx ? S.players.idx[pid] || '' : ''; }
function plHist(pid, m) { const nk = plNk(pid); return nk && S.players.hist[nk] && S.players.hist[nk][m] ? S.players.hist[nk][m].filter(x => x[0] < Number(S.core.meta.week) || !S.core.meta.week) : []; }
function plFc(pid, m) {
  const x = S.players && S.players.fc ? S.players.fc[pid + '|' + m] : null;
  return x ? {f: x[0], c: x[1], mu: x[2], n: x[3], b: x[4]} : null;
}
function fcWhere(x, ln) {
  if (!isNum(ln)) return '';
  return ln < x.f ? 'below his floor' : ln < x.mu ? 'between his floor and projection' : ln === x.mu ? 'right on his projection' : ln <= x.c ? 'between his projection and ceiling' : 'above his ceiling';
}
// 1 = that side cashed against that week's main line, 0 = lost, null = push.
function hitOf(row, dr) {
  const a = row[3], ln = row[2], d = U(dr);
  if (!isNum(a) || !isNum(ln) || a === ln) return null;
  const over = a > ln;
  return d === 'UNDER' || d === 'NO' ? (over ? 0 : 1) : (over ? 1 : 0);
}
function l3(pid, m, dr) {
  const h = plHist(pid, m).slice(-3);
  if (!h.length) return null;
  const hits = h.map(r => hitOf(r, dr));
  return {rows: h, hits: hits, n: hits.filter(x => x !== null).length, w: hits.filter(x => x === 1).length};
}
function l3dots(pid, m, dr) {
  if (!S.players) return '<span class="dim">' + (S.playersError ? '—' : '…') + '</span>';
  const x = l3(pid, m, dr);
  if (!x) return '<span class="dim">—</span>';
  const tip = x.rows.map(r => 'W' + r[0] + ' ' + r[3] + ' vs ' + r[2]).join(' · ');
  return '<span class="l3" title="' + esc(tip) + '" aria-label="' + esc(dirWord(dr) + ' hit ' + x.w + ' of last ' + x.rows.length + ': ' + tip) + '">' +
    x.hits.map(h => '<i class="' + (h === 1 ? 'h' : h === 0 ? 'm' : 'p') + '"></i>').join('') + '<b>' + x.w + '/' + x.rows.length + '</b></span>';
}
// Idea A: floor, projection, ceiling and the line on every Straight card.
function lineStrip(c) {
  if (!S.players || U(c.fam) !== 'STRAIGHT' || !isNum(c.ln) || isTD(c.m)) return '';
  const x = plFc(c.pid, c.m), l = l3(c.pid, c.m, c.dr);
  if (!x && !l) return '';
  let h = '<div class="lvr">';
  if (x) {
    const max = Math.max(x.c * 1.3, c.ln * 1.15, x.mu * 1.3) || 1, P = v => Math.max(0, Math.min(100, v / max * 100)).toFixed(1) + '%';
    h += '<div class="lvt" role="img" aria-label="' + esc('Floor ' + short(x.f) + ', projection ' + short(x.mu) + ', ceiling ' + short(x.c) + ', line ' + c.ln) + '">' +
      '<i class="ax"></i><i class="bd" style="left:' + P(x.f) + ';width:calc(' + P(x.c) + ' - ' + P(x.f) + ')"></i>' +
      '<i class="tk ln" style="left:' + P(c.ln) + '"></i><i class="pj" style="left:' + P(x.mu) + '"></i></div>' +
      '<div class="lvl"><span>Floor <b>' + short(x.f) + '</b></span><span class="b">Proj <b>' + short(x.mu) + '</b></span><span>Ceiling <b>' + short(x.c) + '</b></span><span class="g">Line <b>' + esc(c.ln) + '</b></span>' +
      (l ? '<span>L' + l.rows.length + ' ' + l3dots(c.pid, c.m, c.dr) + '</span>' : '') + '</div>';
  } else {
    h += '<div class="lvl"><span class="g">Line <b>' + esc(c.ln) + '</b></span>' + (isNum(c.sp) ? '<span class="b">Proj <b>' + short(c.sp) + '</b></span>' : '') + '<span>L' + l.rows.length + ' ' + l3dots(c.pid, c.m, c.dr) + '</span></div>';
  }
  return h + '</div>';
}
function pcAttrs(pid, m, dr, k) {
  return ' data-act="pc" data-pid="' + esc(pid || '') + '" data-m="' + esc(m || '') + '" data-dr="' + esc(dr || '') + '" data-k="' + esc(k || '') + '"';
}
function pcRows(pid) {
  if (S.props) return S.props.filter(r => r.pid === pid);
  return Object.keys(S.core.cards).map(k => S.core.cards[k]).filter(c => c.pid === pid);
}
function pcHeadline(rows, m, k, dr) {
  const inM = rows.filter(r => r.m === m);
  if (!inM.length) return null;
  if (k && S.core.cards[k] && S.core.cards[k].m === m) {
    const c = S.core.cards[k];
    return inM.find(r => r.i === c.i) || c;
  }
  const by = (list) => list.slice().sort((a, b) => (isNum(b.sg) ? b.sg : -1) - (isNum(a.sg) ? a.sg : -1))[0];
  const sameDir = dr ? inM.filter(r => r.dr === dr) : [];
  return by(inM.filter(isAct)) || by(sameDir.filter(isPref)) || by(inM.filter(isPref)) ||
    by(inM.filter(r => U(r.fam) === 'STRAIGHT')) || inM.find(r => U(r.lt) === 'MAIN' && (U(r.dr) === 'OVER' || U(r.dr) === 'YES')) || inM[0];
}
const DEF_LABELS = {
  qbru:['QB rush yds allowed / g'], ruyd:['Rush yds allowed / g'], ypc:['Yds per carry allowed'], rutd:['Rush TD allowed / g', 2],
  pprrb:['RB PPR pts allowed / g'], pprwr:['WR PPR pts allowed / g'], pprte:['TE PPR pts allowed / g'], pprqb:['QB PPR pts allowed / g'],
  teyd:['TE rec yds allowed / g'], wryd:['WR rec yds allowed / g'], rbrec:['RB catches allowed / g'], wrrec:['WR catches allowed / g'],
  terec:['TE catches allowed / g'], payd:['Pass yds allowed / g'], ypa:['Yds per pass att allowed'], rtg:['Opp. passer rating'],
  press:['Pressure rate', 'pct'], att:['Pass att allowed / g'], plays:['Plays faced / g'], comp:['Completions allowed / g'],
  cmpPct:['Completion % allowed', 'pct'], pts:['Points allowed / g'], patd:['Pass TD allowed / g', 2]
};
function defKeys(m, pos) {
  const p = U(pos);
  if (m === 'Rushing Yards') return p === 'QB' ? ['qbru', 'ruyd', 'ypc'] : ['ruyd', 'ypc', 'rutd', 'pprrb'];
  if (m === 'Receiving Yards') return p === 'TE' ? ['teyd', 'payd', 'ypa'] : p === 'RB' ? ['rbrec', 'payd', 'pprrb'] : ['wryd', 'payd', 'ypa'];
  if (m === 'Receptions') return [p === 'TE' ? 'terec' : p === 'RB' ? 'rbrec' : 'wrrec', 'comp', 'cmpPct'];
  if (m === 'Passing Yards') return ['payd', 'ypa', 'rtg', 'press'];
  if (m === 'Passing Attempts') return ['att', 'plays', 'press'];
  if (m === 'Passing Completions') return ['comp', 'cmpPct', 'att'];
  return ['pts', 'rutd', 'patd', p === 'QB' ? 'pprqb' : p === 'RB' ? 'pprrb' : p === 'TE' ? 'pprte' : 'pprwr'];
}
const ROLE_LABELS = {
  g:['Games'], att:['Pass att / g'], payd:['Pass yds / g'], cmpg:['Completions / g'], cmpPct:['Completion %', 'pct'], patd:['Pass TD'], int:['INT'],
  ypa:['Yds per att'], ruatt:['Rush att / g'], ruyd:['Rush yds / g'], rutd:['Rush TD'], dsgn:['Designed rush rate', 'pct'], scr:['Scramble rate', 'pct'],
  snap:['Snap share', 'pct'], ypc:['Yds per carry'], tar:['Targets / g'], rec:['Catches / g'], recyd:['Rec yds / g'], td:['Total TD'],
  rzatt:['Red-zone carries'], rte:['Routes / g'], tgt:['Target share', 'pct'], rztar:['Red-zone targets']
};
function roleKeys(tab, m) {
  if (tab === 'QB') {
    if (m === 'Rushing Yards') return ['ruatt', 'ruyd', 'rutd', 'dsgn', 'scr', 'g'];
    if (m === 'Passing Completions') return ['cmpg', 'cmpPct', 'att', 'g'];
    if (m === 'Passing Attempts') return ['att', 'cmpg', 'payd', 'g'];
    if (isTD(m)) return ['patd', 'rutd', 'ruatt', 'g'];
    return ['payd', 'att', 'ypa', 'patd', 'int', 'g'];
  }
  if (tab === 'RB') {
    if (m === 'Rushing Yards') return ['snap', 'ruatt', 'ruyd', 'ypc', 'rutd', 'g'];
    if (isTD(m)) return ['td', 'rzatt', 'ruatt', 'snap', 'g'];
    return ['snap', 'tar', 'rec', 'recyd', 'g'];
  }
  if (isTD(m)) return ['td', 'rztar', 'tar', 'snap', 'g'];
  return ['snap', 'rte', 'tar', 'rec', 'recyd', 'tgt', 'g'];
}
const statVal = (v, kind) => kind === 'pct' ? pct(v) : isNum(kind) ? num(v, kind) : short(v);
function pcStat(label, val, sub) { return '<div class="pcst"><span>' + esc(label) + '</span><b>' + esc(val) + (sub ? '<em>' + esc(sub) + '</em>' : '') + '</b></div>'; }
function pcVegasChips(tm, op) {
  const V = S.core.vegas && S.core.vegas.teams ? S.core.vegas.teams : null;
  const v = V ? V[tm] : null, o = V && op ? V[op] : null;
  if (!v) return '';
  const fav = isNum(v.sp) && v.sp < 0 ? tm + ' ' + signed(v.sp) : isNum(v.sp) && v.sp > 0 && op ? op + ' ' + signed(-v.sp) : isNum(v.sp) ? 'Pick’em' : '';
  return (fav ? '<span class="chip2">Spread <b>' + esc(fav) + '</b></span>' : '') +
    (isNum(v.ou) ? '<span class="chip2">Total <b>' + esc(v.ou) + '</b></span>' : '') +
    (isNum(v.tt) ? '<span class="chip2">' + esc(tm) + ' team total <b>' + esc(v.tt) + '</b></span>' : '') +
    (o && isNum(o.tt) ? '<span class="chip2">' + esc(op) + ' team total <b>' + esc(o.tt) + '</b></span>' : '');
}
function pcView() {
  const pc = S.pc, rows = pcRows(pc.pid);
  const base = (pc.k && S.core.cards[pc.k]) || rows[0] || {};
  const markets = MKT_ORDER.filter(m => rows.some(r => r.m === m)).concat(Array.from(new Set(rows.map(r => r.m))).filter(m => m && MKT_ORDER.indexOf(m) < 0));
  if (!pc.m || markets.indexOf(pc.m) < 0) pc.m = markets[0] || pc.m;
  const c = pcHeadline(rows, pc.m, pc.k, pc.dr) || base;
  const t = team(c.tm || base.tm), g = (S.core.games || []).find(x => x.id === c.e) || null;
  const anyCard = Object.keys(S.core.cards).map(k => S.core.cards[k]).find(x => x.pid === pc.pid && x.hs);
  const hs = anyCard ? '<img src="' + esc(anyCard.hs) + '" alt="" loading="lazy" onerror="this.parentNode.innerHTML=SIL">' : SIL;
  const home = g ? g.home === c.tm : null;
  const where = c.op ? (home === false ? '@ ' : 'vs ') + c.op : '';
  const meta = [c.pos, t.name, where, g ? dayTime(g.t) : ''].filter(Boolean).join(' · ');
  let h = '<div class="pchero" style="background:linear-gradient(100deg,' + t.color + ' 0%,' + t.color + ' 26%,var(--panel) 74%)">' +
    '<img class="wm" src="' + esc(logoUrl(c.tm)) + '" alt="" loading="lazy" onerror="logoErr(this)">' +
    '<button class="pcx" type="button" data-act="pc-close" aria-label="Close player view"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>' +
    '<div class="hs">' + hs + '</div><div class="pcid"><h2 id="pcTitle">' + esc(c.p || base.p || '') + '</h2><div class="meta">' + esc(meta) + '</div></div></div>';
  h += '<div class="pcbody">';
  const chips = pcVegasChips(c.tm, c.op) + (c.ps ? '<span class="chip2">Status <b>' + esc(String(c.ps).replace(/_/g, ' ').toLowerCase().replace(/^./, x => x.toUpperCase())) + '</b></span>' : '');
  if (chips) h += '<div class="pcchips">' + chips + '</div>';
  if (markets.length > 1) {
    h += '<div class="pctabs" role="tablist" aria-label="Markets">' + markets.map(m => {
      const hl = pcHeadline(rows, m, pc.k, pc.dr) || {};
      const st = U(hl.st), tag = isAct(hl) ? '<i>' + st + '</i>' : '';
      return '<button type="button" role="tab" aria-selected="' + (m === pc.m) + '" class="' + (m === pc.m ? 'on' : '') + '" data-act="pc-m" data-m="' + esc(m) + '">' + esc(MKT_SHORT[m] || m) + tag + (isAct(hl) && isHL(hl) ? STAR : '') + '</button>';
    }).join('') + '</div>';
  }
  if (!S.props) h += '<div class="pcnote">Loading this player’s other markets…</div>';
  // The line V3 is judging for this market.
  const straight = U(c.fam) === 'STRAIGHT';
  h += '<div class="pcpick"><div class="line"><div class="prop">' + esc(propLabel(c)) + '<small>' + pill(c) +
    (U(c.lt) === 'ALT' ? '<span>Alt line' + (isNum(c.ml) ? ' · main ' + esc(c.ml) : '') + '</span>' : U(c.lt) === 'MAIN' ? '<span>Main line</span>' : '') + '</small></div>' +
    '<div class="odds"><b>' + odd(c.o) + '</b><span>' + esc(book(c.bk)) + '</span></div></div>' +
    '<div class="kpis k4"><div class="k"><b class="' + (isNum(c.hp) ? 'pos' : 'dim') + '">' + pct(c.hp) + '</b><span>Est. hit</span></div>' +
    '<div class="k"><b>' + n1(c.sg) + (straight && isHL(c) ? STAR : '') + '</b><span>' + sigLetter(c) + ' Signal</span></div>' +
    '<div class="k"><b class="' + evCls(c.ev) + '">' + sev(c.ev) + '</b><span>V3 EV</span></div>' +
    '<div class="k"><b>' + odd(c.bl) + '</b><span>Lean to' + (isNum(c.bb) ? ' · BET ' + odd(c.bb) : '') + '</span></div></div>' +
    (isNum(c.ev) && c.ev >= 0 && !isAct(c) && isNum(c.rp) && isNum(c.mp) && guardHeld(c.rp - c.mp) ? '<div class="sheld" style="margin:0 16px 14px">' + guardText(c.rp, c.mp) + '</div>' : '') + '</div>';
  if (!S.players) {
    h += S.playersError ? '<div class="note warn">Game logs and matchup could not load. Reload the page to try again.</div>' : '<div class="loading" style="margin:8px 0">Loading game logs and matchup…</div>';
    return h + '</div>';
  }
  // Against the line.
  const hist = plHist(pc.pid, pc.m), dr = c.dr || 'OVER';
  const curLine = U(c.lt) === 'MAIN' ? c.ln : isNum(c.ml) ? c.ml : c.ln;
  if (hist.length) {
    const vals = [].concat(hist.map(r => r[3]), hist.map(r => r[2]), hist.map(r => r[4]).filter(isNum), [curLine, c.ln, c.sp].filter(isNum));
    const max = Math.max.apply(null, vals.concat([1])) * 1.08;
    const P = v => Math.max(0, Math.min(100, v / max * 100)).toFixed(1) + '%';
    const rowsH = hist.map(r => {
      const hit = hitOf(r, dr), side = r[3] > r[2] ? 'OVER' : r[3] < r[2] ? 'UNDER' : 'PUSH';
      return '<div class="gl"><div class="w">W' + r[0] + ' ' + esc(r[1] || '') + '<small>Main ' + esc(r[2]) + (r[5] === 2 ? ' · V2' : '') + '</small></div>' +
        '<div class="trk"><i class="fl ' + (hit === 1 ? 'h' : hit === 0 ? 'm' : 'p') + '" style="width:' + P(Math.max(0, r[3])) + '"></i><i class="mk" style="left:' + P(r[2]) + '"></i>' + (isNum(r[4]) ? '<i class="pj" style="left:' + P(r[4]) + '"></i>' : '') + '</div>' +
        '<div class="v"><b class="' + (hit === 1 ? 'pos' : hit === 0 ? 'neg' : '') + '">' + esc(r[3]) + '</b><span class="tg ' + (hit === 1 ? 'h' : hit === 0 ? 'm' : 'p') + '">' + side + '</span></div></div>';
    }).join('');
    const now = '<div class="gl now"><div class="w">W' + esc(S.core.meta.week) + ' ' + esc(c.op || '') + '<small>This week · ' + esc(curLine) + '</small></div>' +
      '<div class="trk"><i class="mk" style="left:' + P(curLine) + '"></i>' + (isNum(c.ln) && c.ln !== curLine ? '<i class="mk g" style="left:' + P(c.ln) + '"></i>' : '') + (isNum(c.sp) ? '<i class="pj" style="left:' + P(c.sp) + '"></i>' : '') + '</div>' +
      '<div class="v"><span class="mut" style="font-size:12px">' + (g && g.frozen ? 'Locked' : esc(g ? dayTime(g.t) : '')) + '</span></div></div>';
    const n = hist.filter(r => hitOf(r, dr) !== null).length, w = hist.filter(r => hitOf(r, dr) === 1).length;
    const sorted = hist.map(r => r[3]).sort((a, b) => a - b), mid = sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
    const verb = U(dr) === 'UNDER' || U(dr) === 'NO' ? 'Stayed under' : 'Went over';
    h += '<section class="pcsec"><div class="pcsh"><h3>Against the line</h3><span>' + esc(MKT_SHORT[pc.m] || pc.m) + ' · main line each week</span></div><div class="pcpanel">' + rowsH + now +
      '<div class="pckey"><span><i class="sw" style="background:var(--ink)"></i>Main line</span>' + (isNum(c.ln) && c.ln !== curLine ? '<span><i class="sw" style="background:var(--gold)"></i>This line ' + esc(c.ln) + '</span>' : '') +
      '<span><i class="pjk"></i>V3 projection</span><span><i class="sw h"></i>' + esc(dirWord(dr)) + ' cashed</span></div>' +
      '<p class="pcnote">' + esc(verb) + ' the main line in <b>' + w + ' of ' + n + '</b>' + (hist.length ? ' · median result <b>' + esc(short(mid)) + '</b>' : '') + '.' +
      (hist.some(r => r[5] === 2) ? ' Weeks ' + esc((S.players.v2Weeks || []).join(', ')) + ' come from the V2 ledger (lines and results only).' : '') + '</p></div></section>';
  } else {
    h += '<section class="pcsec"><div class="pcsh"><h3>Against the line</h3></div><div class="pcpanel"><p class="pcnote" style="margin:0">No graded main lines for this player and market yet this season.</p></div></section>';
  }
  h += shopSection(c, rows);
  // This week's floor and ceiling.
  const x = isTD(pc.m) ? null : plFc(pc.pid, pc.m);
  if (x) {
    const max = Math.max(x.c * 1.3, (c.ln || 0) * 1.15, (curLine || 0) * 1.15);
    const P = v => Math.max(0, Math.min(100, v / max * 100)).toFixed(1) + '%';
    const step = max > 200 ? 100 : max > 80 ? 40 : max > 40 ? 20 : max > 16 ? 10 : max > 8 ? 4 : 2;
    const ticks = [];
    for (let v = 0; v <= max; v += step) ticks.push('<span style="left:' + P(v) + '">' + v + '</span>');
    const basis = x.b === 'mix' ? 'how much his results have swung over his last ' + x.n + ' games, steadied with V3’s model spread while the sample is small'
      : x.b === 'log' ? 'how much his results have swung over his last ' + x.n + ' games'
      : 'V3’s model spread (not enough graded games for his own yet)';
    h += '<section class="pcsec"><div class="pcsh"><h3>Floor and ceiling</h3><span>This week · middle half of outcomes</span></div><div class="pcpanel">' +
      '<div class="fc3"><div><b>' + short(x.f) + '</b><span>Floor</span></div><div><b class="b">' + short(x.mu) + '</b><span>Projection</span></div><div><b>' + short(x.c) + '</b><span>Ceiling</span></div>' +
      (isNum(c.ln) ? '<div><b class="g">' + esc(c.ln) + '</b><span>This line</span></div>' : '') + '</div>' +
      '<div class="rng" role="img" aria-label="' + esc('Floor ' + short(x.f) + ', projection ' + short(x.mu) + ', ceiling ' + short(x.c) + ', line ' + c.ln) + '"><i class="ax"></i>' +
      '<i class="bd" style="left:' + P(x.f) + ';width:calc(' + P(x.c) + ' - ' + P(x.f) + ')"></i>' +
      (isNum(curLine) && curLine !== c.ln ? '<i class="tk" style="left:' + P(curLine) + ';background:var(--ink)"></i>' : '') +
      (isNum(c.ln) ? '<i class="tk" style="left:' + P(c.ln) + ';background:var(--gold)"></i>' : '') + '<i class="pj" style="left:' + P(x.mu) + '"></i></div>' +
      '<div class="rticks">' + ticks.join('') + '</div>' +
      (isNum(curLine) && curLine !== c.ln ? '<div class="pckey"><span><i class="sw" style="background:var(--ink)"></i>Main line <b>' + esc(curLine) + '</b></span></div>' : '') +
      '<p class="pcnote">' + (isNum(c.ln) ? 'The ' + esc(c.ln) + ' line is <b>' + esc(fcWhere(x, c.ln)) + '</b>. ' : '') +
      'Built from this week’s projection' + (c.op ? ' vs ' + esc(c.op) : '') + ' and ' + esc(basis) + '. About half of games should land between the floor and ceiling; the Performance page tracks whether they do.</p>' +
      (function () { const e = shopEstimate(shopCurve(pc.pid, pc.m, 'OVER'), curLine); return e && guardHeld(Math.abs(e.gap)) && Math.abs(e.gap) > 0.10 ?
        '<div class="sheld" style="margin-top:10px">Careful: this projection is far from where the market sets him (main line ' + esc(curLine) + ' vs projection ' + short(x.mu) + '; model ' + pct(e.rp) + ' vs market ' + pct(e.mp) + ' on the over). When they disagree this much, the market has usually been closer, so treat this floor and ceiling as the projection’s view, not V3’s.</div>' : ''; })() +
      '</div></section>';
  }
  // Matchup + role.
  const D = S.players.def && c.op ? S.players.def[c.op] : null;
  const role = S.players.role ? S.players.role[plNk(pc.pid)] : null;
  if (D || role) {
    h += '<div class="pctwo">';
    if (D) {
      const n = S.players.defN || 32;
      h += '<section class="pcsec"><div class="pcsh"><h3>Matchup</h3><span>' + esc(c.op) + ' defense · season</span></div><div class="pcpanel">' +
        defKeys(pc.m, c.pos).filter(k => D[k]).map(k => pcStat(DEF_LABELS[k][0], statVal(D[k][0], DEF_LABELS[k][1]), D[k][1] <= Math.ceil(n / 2) ? ord(D[k][1]) + ' most of ' + n : ord(n - D[k][1] + 1) + ' fewest of ' + n)).join('') + '</div></section>';
    }
    if (role) {
      h += '<section class="pcsec"><div class="pcsh"><h3>Role</h3><span>Season to date</span></div><div class="pcpanel">' +
        roleKeys(role.tab, pc.m).filter(k => isNum(role.s[k])).map(k => pcStat(ROLE_LABELS[k][0], statVal(role.s[k], ROLE_LABELS[k][1]))).join('') +
        (isNum(c.rc) ? pcStat('V3 role confidence', pct(c.rc, 0)) : '') + '</div></section>';
    }
    h += '</div>';
  }
  // Why + watchlist history.
  const wl = S.core.watchlist && S.core.watchlist.entries ? S.core.watchlist.entries.find(e => e.pid === pc.pid && e.m === c.m && e.dr === c.dr && e.e === c.e) : null;
  h += '<section class="pcsec"><div class="pcsh"><h3>Why this call</h3>' + (wl ? '<span>On the watchlist</span>' : '') + '</div><div class="pcpanel">' +
    '<p class="pcnote" style="margin:0">' + esc(reason(c.rsn)) + '</p>' +
    (warnList(c.w).length ? '<div class="ctx" style="margin-top:8px">' + warnList(c.w).map(x => '<div>' + esc(x) + '</div>').join('') + '</div>' : '') +
    (wl ? '<p class="pcnote">' + esc(wlNow(wl)) + ' First seen ' + esc(wlWhen(wl.firstAt)) + ' as ' + esc(wlAs(wl.snaps[0])) + '; ' + (wl.snaps.length - 1 ? (wl.snaps.length - 1) + ' change' + (wl.snaps.length > 2 ? 's' : '') + ' since' : 'no changes since') + '.</p>' : '') +
    '</div></section>';
  h += '<div class="pcfoot">' + esc([S.players.defTab ? 'Matchup and role: Source Mirror (' + S.players.defTab + ')' : '', S.core.vegas && S.core.vegas.tab ? 'lines: ' + S.core.vegas.tab : ''].filter(Boolean).join(' · ')) + '</div>';
  return h + '</div>';
}
function renderPC() {
  const box = $('pc');
  if (!S.pc) { box.classList.remove('open'); box.innerHTML = ''; document.body.classList.remove('pc-open'); return; }
  const scroll = box.querySelector('.pcd') ? box.querySelector('.pcd').scrollTop : 0;
  box.innerHTML = '<div class="pcscrim" data-act="pc-close"></div><aside class="pcd" role="dialog" aria-modal="true" aria-labelledby="pcTitle"><div class="grab" aria-hidden="true"></div>' + pcView() + '</aside>';
  box.classList.add('open');
  document.body.classList.add('pc-open');
  box.querySelector('.pcd').scrollTop = scroll;
}
function openPC(pid, m, dr, k) {
  if (!pid) return;
  S.pc = {pid: pid, m: m || '', dr: dr || '', k: k || ''};
  renderPC();
  const d = $('pc').querySelector('.pcd');
  if (d) { d.scrollTop = 0; const x = d.querySelector('.pcx'); if (x) x.focus({preventScroll: true}); }
  loadProps(() => { if (S.pc) renderPC(); });
}
function loadPlayers() {
  if (S.players || S.playersLoading) return;
  S.playersLoading = true;
  call('nflpBoardGetPlayers', [], s => {
    S.playersLoading = false;
    try { S.players = JSON.parse(s); } catch (e) { S.players = null; S.playersError = true; return; }
    if (S.view === 'props') refreshTable(); else if (S.view === 'picks' || S.view === 'games') render();
    if (S.pc) renderPC();
  }, () => { S.playersLoading = false; S.playersError = true; if (S.view === 'props') refreshTable(); if (S.pc) renderPC(); });
}

/* ---------------- Floor / ceiling check (Performance) ---------------- */
function fcTile(F) {
  if (!F) return '';
  const t = F.total || {n: 0};
  const p = v => t.n ? (100 * v / t.n).toFixed(1) + '%' : '—';
  let h = '<section class="sec"><div class="sh"><div><h3>Floor / ceiling check</h3><p>How often results landed between the player view’s floor and ceiling, saved before kickoff. About half is the target. Tracking started Week ' + esc(F.since) + '.</p></div></div>';
  if (!t.n) return h + '<div class="note">No graded games yet. The first results show up once this week’s games are graded. (Set-up check on Weeks 4–5: 50.3% inside, 24.7% below the floor, 25.0% above the ceiling.)</div></section>';
  h += '<div class="ptiles"><div class="ptile"><div class="tl">Inside floor–ceiling</div><div class="tv">' + p(t.inside) + '</div><div class="ts"><b>' + comma(t.n) + '</b> player stats graded · target about 50%</div></div>' +
    '<div class="ptile"><div class="tl">Below the floor</div><div class="tv">' + p(t.below) + '</div><div class="ts">Target about 25%</div></div>' +
    '<div class="ptile"><div class="tl">Above the ceiling</div><div class="tv">' + p(t.above) + '</div><div class="ts">Target about 25%</div></div></div>';
  const row = (label, o) => '<tr><td class="wrap"><b>' + esc(label) + '</b></td><td class="r num">' + o.n + '</td><td class="r num">' + (100 * o.inside / o.n).toFixed(1) + '%</td><td class="r num">' + (100 * o.below / o.n).toFixed(1) + '%</td><td class="r num">' + (100 * o.above / o.n).toFixed(1) + '%</td></tr>';
  h += fold('fc-detail', 'By week and market', 'Where results landed, split out.', null, () =>
    tbl('<thead><tr><th>Group</th><th class="r">Graded</th><th class="r">Inside</th><th class="r">Below floor</th><th class="r">Above ceiling</th></tr></thead><tbody>' +
      F.weeks.map(w => row('Week ' + w.week, w)).join('') + F.markets.map(m => row(m.market, m)).join('') + '</tbody>'));
  return h + '</section>';
}


/* ---------------- Shop this line (price check for any sportsbook) ---------------- */
// V3's estimate is about the player clearing a line, not about a book. Your price from any book
// decides the EV. Nothing here is saved to the locked record or changes a model value.
const SHOP_BET_EV = 0.02;
const decOf = a => isNum(a) && Math.abs(a) >= 100 ? (a > 0 ? 1 + a / 100 : 1 + 100 / -a) : NaN;
const amOf = d => isNum(d) && d > 1 ? (d >= 2 ? Math.round((d - 1) * 100) : -Math.round(100 / (d - 1))) : NaN;
function parseOdds(v) {
  const n = Number(String(v == null ? '' : v).trim().replace(/[−–]/g, '-').replace('+', ''));
  return isFinite(n) && Math.abs(n) >= 100 ? n : NaN;
}
// V3's Straight rule only trusts a line when the raw model is at most 3 points more bullish than the
// market (STRAIGHT_POSITIVE_RAW_EDGE_MAX in the model). The board applies the same rule everywhere.
const GUARD_GAP = 0.03;
const GUARD_HISTORY = [[0.03, 'up to 3 pts', '+9.3%', 62], [0.06, '3–6 pts', '+1.8%', 89], [0.10, '6–10 pts', '−3.5%', 141], [9, '10+ pts', '−8.1%', 515]];
const guardHeld = gap => isNum(gap) && gap > GUARD_GAP + 1e-9;
function guardText(rp, mp) {
  if (!isNum(rp) || !isNum(mp)) return '';
  const gap = rp - mp, b = GUARD_HISTORY.find(x => gap <= x[0] + 1e-9) || GUARD_HISTORY[3];
  return 'V3 doesn’t trust this one: its raw model says ' + pct(rp) + ' and the market says ' + pct(mp) + ', a ' + (gap * 100).toFixed(1) +
    '-point gap. V3 only makes a pick when the gap is 3 points or less. In Weeks 4–6, lines with a ' + b[1] + ' gap returned ' + b[2] + ' (' + b[3] + ' lines). The EV above is on paper only.';
}
function shopKey(pid, m) { return pid + '|' + m; }
function shopState(c) {
  const k = shopKey(c.pid, c.m);
  if (!S.shop[k]) S.shop[k] = {rows: [{bk: '', dr: c.dr || 'OVER', ln: isNum(c.ln) ? String(c.ln) : '', o: '', bo: ''}]};
  return S.shop[k];
}
// V3's priced points for one direction: line -> median Est. hit across books at that line.
function shopCurve(pid, m, dr) {
  const by = {};
  pcRows(pid).forEach(r => {
    if (r.m !== m || r.dr !== dr || !isNum(r.ln) || !isNum(r.hp)) return;
    (by[r.ln] || (by[r.ln] = [])).push(r);
  });
  return Object.keys(by).map(Number).sort((a, b) => a - b).map(ln => {
    const xs = by[ln].map(r => r.hp).sort((a, b) => a - b), mid = xs.length >> 1;
    const hp = xs.length % 2 ? xs[mid] : (xs[mid - 1] + xs[mid]) / 2;
    const sg = Math.max.apply(null, by[ln].map(r => isNum(r.sg) ? r.sg : -1));
    const bestRow = by[ln].filter(r => isNum(r.o)).sort((a, b) => decOf(b.o) - decOf(a.o))[0] || null;
    const med = k => { const v = by[ln].map(r => r[k]).filter(isNum).sort((a, b) => a - b), q = v.length >> 1; return v.length ? (v.length % 2 ? v[q] : (v[q - 1] + v[q]) / 2) : NaN; };
    const rp = med('rp'), mp = med('mp');
    return {ln: ln, hp: hp, sg: sg >= 0 ? sg : null, n: by[ln].length, o: bestRow ? bestRow.o : null, bk: bestRow ? bestRow.bk : '',
      rp: rp, mp: mp, gap: isNum(rp) && isNum(mp) ? rp - mp : NaN};
  });
}
function shopEstimate(curve, ln) {
  if (!curve.length || !isNum(ln)) return null;
  const lo = curve[0], hi = curve[curve.length - 1];
  if (ln < lo.ln || ln > hi.ln) return {out: true, lo: lo.ln, hi: hi.ln};
  for (let i = 0; i < curve.length; i++) {
    if (curve[i].ln === ln) return {hp: curve[i].hp, sg: curve[i].sg, exact: true, rp: curve[i].rp, mp: curve[i].mp, gap: curve[i].gap};
    if (i < curve.length - 1 && ln > curve[i].ln && ln < curve[i + 1].ln) {
      const a = curve[i], b = curve[i + 1], t = (ln - a.ln) / (b.ln - a.ln), lerp = k => isNum(a[k]) && isNum(b[k]) ? a[k] + (b[k] - a[k]) * t : NaN;
      return {hp: a.hp + (b.hp - a.hp) * t, exact: false, between: [a.ln, b.ln], rp: lerp('rp'), mp: lerp('mp'), gap: lerp('gap')};
    }
  }
  return null;
}
function shopCalc(c, row) {
  const ln = Number(String(row.ln).trim()), o = parseOdds(row.o), bo = Number(String(row.bo || '').replace('%', '').trim()) || 0;
  if (!String(row.ln).trim() || !isFinite(ln)) return {msg: 'Enter the line'};
  const est = shopEstimate(shopCurve(c.pid, c.m, row.dr), ln);
  if (!est) return {msg: 'V3 has no estimate for this side'};
  if (est.out) return {msg: 'V3 priced ' + est.lo + '–' + est.hi + ' only'};
  const out = {hp: est.hp, sg: est.sg, exact: est.exact, between: est.between, rp: est.rp, mp: est.mp, gap: est.gap, held: guardHeld(est.gap),
    leanTo: amOf(1 / est.hp), betTo: amOf((1 + SHOP_BET_EV) / est.hp), whole: Math.abs(ln - Math.round(ln)) < 1e-9};
  if (!isNum(o)) { out.msg = 'Enter the odds'; return out; }
  let dec = decOf(o);
  if (bo > 0) dec = 1 + (dec - 1) * (1 + bo / 100);
  out.dec = dec; out.eff = amOf(dec); out.be = 1 / dec; out.ev = est.hp * dec - 1;
  out.verdict = out.ev < 0 ? 'pass' : out.held ? 'held' : out.ev >= SHOP_BET_EV ? 'bet' : 'lean';
  return out;
}
function shopOut(c, i) {
  const st = shopState(c), x = shopCalc(c, st.rows[i]);
  const ref = isNum(x.hp) ? '<span class="sref">V3 hit <b>' + pct(x.hp) + '</b>' + (x.exact ? '' : ' <i>(between ' + x.between.join(' and ') + ')</i>') +
    ' · LEAN at <b>' + odd(x.leanTo) + '</b> or better · BET value at <b>' + odd(x.betTo) + '</b> or better</span>' : '';
  if (x.msg) return '<div class="sres"><span class="sv none">' + esc(x.msg) + '</span>' + ref + '</div>';
  const V = {bet: ['bet', 'BET value'], lean: ['lean', 'LEAN value'], pass: ['pass', 'Pass'], held: ['held', 'Held back']}[x.verdict];
  return '<div class="sres"><span class="sv ' + V[0] + '">' + V[1] + '</span>' +
    '<span class="snum">EV <b class="' + evCls(x.ev) + '">' + sev(x.ev) + '</b></span>' +
    '<span class="snum">Break-even <b>' + pct(x.be) + '</b></span>' +
    (Number(String(st.rows[i].bo || '').replace('%', '')) > 0 ? '<span class="snum">Boosted <b>' + odd(x.eff) + '</b></span>' : '') + ref +
    (x.whole ? '<span class="sref">Whole-number line: a push refunds your stake.</span>' : '') +
    (x.held ? '<span class="sheld">' + guardText(x.rp, x.mp) + '</span>' : '') +
    '<button class="ghost sadd" type="button" data-act="slip-add" data-i="' + i + '">+ Add to parlay</button></div>';
}
function shopBest(c) {
  const st = shopState(c);
  let best = -1, bev = -Infinity;
  st.rows.forEach((r, i) => { const x = shopCalc(c, r); if (isNum(x.ev) && !x.held && x.ev > bev) { bev = x.ev; best = i; } });
  return st.rows.length > 1 ? best : -1;
}
function shopRowHtml(c, i, best) {
  const r = shopState(c).rows[i], td = isTD(c.m);
  const dirs = td ? [['YES', 'Yes'], ['NO', 'No']] : [['OVER', 'Over'], ['UNDER', 'Under']];
  const f = (name, val, ph, mode, cls) => '<label class="sf ' + (cls || '') + '"><span>' + esc(ph) + '</span><input data-shop="' + name + '" data-i="' + i + '" value="' + esc(val || '') + '" inputmode="' + mode + '" autocomplete="off" placeholder="' + esc(ph === 'Book' ? 'Any book' : ph === 'Boost %' ? '0' : '') + '"></label>';
  return '<div class="srow' + (i === best ? ' best' : '') + '" id="srow-' + i + '">' +
    '<div class="sin">' + f('bk', r.bk, 'Book', 'text', 'w') +
    '<label class="sf"><span>Side</span><select data-shop="dr" data-i="' + i + '">' + dirs.map(d => '<option value="' + d[0] + '"' + (U(r.dr) === d[0] ? ' selected' : '') + '>' + d[1] + '</option>').join('') + '</select></label>' +
    f('ln', r.ln, 'Line', 'decimal') + f('o', r.o, 'Odds', 'text') + f('bo', r.bo, 'Boost %', 'decimal') +
    (shopState(c).rows.length > 1 ? '<button class="sdel" type="button" data-act="shop-del" data-i="' + i + '" aria-label="Remove this offer">×</button>' : '') + '</div>' +
    '<div id="sout-' + i + '">' + shopOut(c, i) + '</div>' + (i === best ? '<span class="sbest">Best of these</span>' : '') + '</div>';
}
function shopSection(c, rows) {
  if (!c || !c.pid || !c.m) return '';
  const st = shopState(c), best = shopBest(c);
  const curve = shopCurve(c.pid, c.m, c.dr || 'OVER');
  const ladder = curve.length ? '<div class="sladder"><span class="mut">V3 priced ' + esc(dirWord(c.dr || 'OVER')) + ' · tap a line to price it (V3 hit · LEAN-at odds; dashed = V3 doesn’t trust it):</span> ' + curve.map(p => '<button type="button" class="sl' + (p.ln === c.ln ? ' on' : '') + (guardHeld(p.gap) && 1 / p.hp > 0 ? ' held' : '') + '" data-act="shop-fill" data-ln="' + p.ln + '" title="Add ' + esc(dirWord(c.dr || 'OVER') + ' ' + p.ln) + ' with V3’s captured price"><b>' + p.ln + '</b> ' + pct(p.hp, 0) + ' · ' + odd(amOf(1 / p.hp)) + '</button>').join('') + '</div>' : '';
  return '<section class="pcsec" id="shop"><div class="pcsh"><h3>Shop this line</h3><span>Any sportsbook · estimates from the ' + esc(dayTime(S.core.meta.lastBuild)) + ' run</span></div><div class="pcpanel">' +
    '<p class="pcnote" style="margin:0 0 10px">Type an offer you can get anywhere (Fanatics, bet365, a boost…). V3’s chance he clears that line stays the same at every book; your price decides the EV. LEAN value = EV 0%+, BET value = +2%+. <b>Held back</b> = positive on paper, but V3’s model and the market disagree by more than 3 points, so V3 wouldn’t make it a pick. An official BET also needs the S1 Highlight (Signal 80+).</p>' +
    '<div id="shopRows">' + st.rows.map((r, i) => shopRowHtml(c, i, best)).join('') + '</div>' +
    '<button class="ghost" type="button" data-act="shop-add" style="margin-top:10px">+ Add another offer</button>' + ladder +
    '<p class="pcnote">If the line has moved a lot since that run, run the sheet again first so V3’s estimate reflects the current market. Price checks aren’t saved to the locked record.</p></div></section>';
}
function shopCurrentCard() {
  if (!S.pc) return null;
  const rows = pcRows(S.pc.pid);
  return pcHeadline(rows, S.pc.m, S.pc.k, S.pc.dr);
}
function shopRefresh(i) {
  const c = shopCurrentCard();
  if (!c) return;
  const best = shopBest(c);
  shopState(c).rows.forEach((r, j) => {
    const row = $('srow-' + j);
    if (!row) return;
    row.classList.toggle('best', j === best);
    const tag = row.querySelector('.sbest');
    if (j === best && !tag) row.insertAdjacentHTML('beforeend', '<span class="sbest">Best of these</span>');
    if (j !== best && tag) tag.remove();
    if (j === i || i == null) { const o = $('sout-' + j); if (o) o.innerHTML = shopOut(c, j); }
  });
}


/* ---------------- Parlay builder (2 legs suggested, 3 max) ---------------- */
// Parlay EV = product of (V3 hit x decimal odds) - 1, treating legs from different games as independent.
// A book's own parlay price can be typed in; same-game legs are flagged because they move together.
const SLIP_MAX = 3;
try { const sv = JSON.parse(localStorage.getItem('nflp_slip') || '[]'); if (Array.isArray(sv)) S.slip = sv.slice(0, SLIP_MAX); } catch (e) {}
function slipSave() { try { localStorage.setItem('nflp_slip', JSON.stringify(S.slip)); } catch (e) {} }
function slipEst(l) { return S.props ? shopEstimate(shopCurve(l.pid, l.m, l.dr), Number(l.ln)) : null; }
function slipHp(l) {
  const est = slipEst(l);
  if (est && isNum(est.hp)) return est.hp;
  return isNum(l.hp) ? l.hp : NaN;
}
function slipDec(l) {
  let d = decOf(parseOdds(l.o));
  const bo = Number(String(l.bo || '').replace('%', '')) || 0;
  if (isNum(d) && bo > 0) d = 1 + (d - 1) * (1 + bo / 100);
  return d;
}
function slipAdd(leg) {
  if (S.slip.length >= SLIP_MAX) { slipToast('A parlay here holds ' + SLIP_MAX + ' legs at most.'); return; }
  if (S.slip.some(x => x.pid === leg.pid && x.m === leg.m && x.dr === leg.dr && String(x.ln) === String(leg.ln))) { slipToast('That leg is already in your parlay.'); return; }
  S.slip.push(leg); slipSave(); renderSlip(); slipToast('Added: ' + leg.p + ' ' + dirWord(leg.dr) + ' ' + leg.ln + ' ' + mkt(leg.m));
}
let slipToastT = null;
function slipToast(msg) {
  const f = $('slipfab'); if (!f) return;
  let t = f.querySelector('.stoast');
  if (!t) { f.insertAdjacentHTML('beforeend', '<div class="stoast" role="status"></div>'); t = f.querySelector('.stoast'); }
  t.textContent = msg; t.classList.add('on');
  clearTimeout(slipToastT); slipToastT = setTimeout(() => t.classList.remove('on'), 2200);
}
function slipPos(l) { if (l.pos) return U(l.pos); const r = pcRows(l.pid).find(x => x.pos); return r ? U(r.pos) : ''; }
const flipDir = d => U(d) === 'UNDER' || U(d) === 'NO';
// Same-game links: phi between the two "went over" results from this season's games; sign flips for an Under/No leg.
function slipLinks(legs) {
  const T = S.players && S.players.sgp ? S.players.sgp : {};
  const out = [];
  for (let i = 0; i < legs.length; i++) for (let j = i + 1; j < legs.length; j++) {
    const a = legs[i], b = legs[j];
    if (!a.l.e || a.l.e !== b.l.e) continue;
    const rel = a.l.pid === b.l.pid ? 'P' : a.l.tm && a.l.tm === b.l.tm ? 'T' : 'O';
    const ka = slipPos(a.l) + ' ' + a.l.m, kb = slipPos(b.l) + ' ' + b.l.m;
    const hit = T[rel + '|' + (ka <= kb ? ka + '|' + kb : kb + '|' + ka)];
    let phi = hit ? hit[0] : 0;
    if (flipDir(a.l.dr) !== flipDir(b.l.dr)) phi = -phi;
    let pij = NaN;
    if (isNum(a.hp) && isNum(b.hp)) {
      pij = a.hp * b.hp + phi * Math.sqrt(a.hp * (1 - a.hp) * b.hp * (1 - b.hp));
      pij = Math.max(Math.max(0, a.hp + b.hp - 1), Math.min(pij, Math.min(a.hp, b.hp)));
    }
    out.push({i: i, j: j, rel: rel, phi: phi, n: hit ? hit[1] : 0, known: !!hit, pij: pij});
  }
  return out;
}
function slipCalc() {
  const legs = S.slip.map(l => { const est = slipEst(l); return {l: l, hp: slipHp(l), dec: slipDec(l), rp: est ? est.rp : NaN, mp: est ? est.mp : NaN, held: !!(est && guardHeld(est.gap))}; });
  const ok = legs.length > 0 && legs.every(x => isNum(x.hp) && isNum(x.dec));
  const D = ok ? legs.reduce((a, x) => a * x.dec, 1) : NaN;
  const ind = ok ? legs.reduce((a, x) => a * x.hp, 1) : NaN;
  const links = slipLinks(legs), sgp = links.length > 0;
  let ph = ind;
  if (ok && sgp) {
    links.forEach(k => { ph *= k.pij / (legs[k.i].hp * legs[k.j].hp); });
    ph = Math.max(0, Math.min(ph, Math.min.apply(null, links.map(k => k.pij))));
  }
  const bookOdds = parseOdds(S.slipBook || '');
  const hasBook = isNum(bookOdds);
  const Dbook = hasBook ? decOf(bookOdds) : D;
  const ev = ok && (!sgp || hasBook) ? ph * Dbook - 1 : NaN;
  return {legs: legs, ok: ok, held: legs.some(y => y.held), D: D, Dbook: Dbook, ph: ph, ind: ind, ev: ev, sgp: sgp, links: links, usingBook: hasBook, fair: ok && ph > 0 ? amOf(1 / ph) : NaN};
}
function slipFab() {
  const n = S.slip.length, x = slipCalc();
  return n ? '<button class="sfab" type="button" data-act="slip-open" aria-label="Open your parlay"><b>' + (x.sgp ? 'Same-game parlay' : 'Parlay') + '</b><span>' + n + ' leg' + (n > 1 ? 's' : '') + (x.ok && (!x.sgp || x.usingBook) ? ' · ' + odd(amOf(x.Dbook)) : '') + '</span>' +
    (x.ok && isNum(x.ev) ? '<i class="' + (x.ev >= 0 ? 'pos' : 'neg') + '">' + sev(x.ev) + '</i>' : x.ok && x.sgp ? '<i>fair ' + odd(x.fair) + '</i>' : '') + '</button>' : '';
}
function slipLegRes(x) {
  const ev = isNum(x.hp) && isNum(x.dec) ? x.hp * x.dec - 1 : NaN;
  return (isNum(x.hp) ? 'V3 hit <b>' + pct(x.hp) + '</b>' : '<span class="neg">V3 has no estimate for this line</span>') +
    (isNum(x.dec) ? ' · ' + odd(amOf(x.dec)) + (Number(String(x.l.bo || '').replace('%', '')) > 0 ? ' boosted' : '') : ' · <span class="mut">enter odds</span>') +
    (isNum(ev) ? ' · leg EV <b class="' + evCls(ev) + '">' + sev(ev) + '</b>' + (ev < 0 ? ' <span class="drag">below break-even on its own</span>' : '') : '') +
    (x.held ? '<div class="sheld" style="margin-top:6px">Held back: ' + guardText(x.rp, x.mp).replace(/^V3 doesn’t trust this one: /, '') + '</div>' : '');
}
function slipLinkText(x, k) {
  const a = x.legs[k.i].l, b = x.legs[k.j].l;
  const who = (a.pid === b.pid ? esc(a.p) + ': ' + esc(MKT_SHORT[a.m] || a.m) + ' + ' + esc(MKT_SHORT[b.m] || b.m)
    : esc(a.p) + ' ' + esc(MKT_SHORT[a.m] || a.m) + ' + ' + esc(b.p) + ' ' + esc(MKT_SHORT[b.m] || b.m));
  if (!k.known) return '<li>' + who + ': <span class="mut">not enough past games of this pair type; treated as unrelated.</span></li>';
  const how = k.phi > 0.05 ? '<b class="pos">help each other</b>' : k.phi < -0.05 ? '<b class="neg">work against each other</b>' : '<b>barely related</b>';
  return '<li>' + who + ': as bet, these ' + how + ' (link ' + (k.phi >= 0 ? '+' : '−') + Math.abs(k.phi).toFixed(2) + ', ' + comma(k.n) + ' past pairs).</li>';
}
function slipTotals(x) {
  if (!S.slip.length) return '<div class="empty">No legs yet. In a player view, use “+ Add to parlay” under Shop this line, or load a research pair from the Picks page.</div>';
  const needBook = x.sgp && !x.usingBook;
  let h = '<div class="stot"><div><b>' + (!x.ok ? '—' : needBook ? odd(x.fair) : odd(amOf(x.Dbook))) + '</b><span>' + (needBook ? 'Fair SGP price' : x.usingBook ? 'Book price' : 'Combined odds') + '</span></div>' +
    '<div><b>' + (x.ok ? pct(x.ph) : '—') + '</b><span>V3 parlay hit' + (x.sgp ? ' (linked)' : '') + '</span></div>' +
    '<div><b class="' + (isNum(x.ev) ? evCls(x.ev) : '') + '">' + (isNum(x.ev) ? sev(x.ev) : '—') + '</b><span>Est. EV' + (x.usingBook ? ' at book price' : '') + '</span></div></div>';
  const verdict = !x.ok ? ['none', 'Fill in every leg'] : needBook ? ['none', 'Enter the book’s SGP price'] : x.ev < 0 ? ['pass', 'No value'] : x.held ? ['held', 'Value on paper only'] : ['lean', 'Value parlay'];
  h += '<div class="sverd"><span class="sv ' + verdict[0] + '">' + verdict[1] + '</span>' + (x.ok && !needBook ? (x.Dbook >= 2 ? '<span class="sv plus">Plus odds</span>' : '<span class="sv none">Minus odds</span>') : '') + '</div>';
  if (x.sgp) {
    h += '<div class="slink"><div class="dl">Same-game links</div><ul>' + x.links.map(k => slipLinkText(x, k)).join('') + '</ul>' +
      (x.ok ? '<p>Treated as unrelated, the parlay hits <b>' + pct(x.ind) + '</b>. With the links: <b>' + pct(x.ph) + '</b>. ' +
        (needBook ? 'Books price same-game parlays their own way, so type the SGP price they show you. It needs to be better than <b>' + odd(x.fair) + '</b> to have value.' :
          'The book’s SGP price ' + odd(amOf(x.Dbook)) + ' vs a fair price of ' + odd(x.fair) + '.') + '</p>' : '') +
      '<p class="mut">Links come from how often each pair type cleared their main lines together this season, scaled down when the sample is small. They’re an approximation for alt lines.</p></div>';
  }
  const notes = [];
  if (x.ok && x.held) notes.push('At least one leg is held back (V3’s model and the market disagree by more than 3 points), so this parlay’s EV leans on numbers V3 itself doesn’t trust.');
  if (S.slip.length === 3) notes.push('3 legs: in Weeks 4–6, 2-leg parlays of +EV lowered lines did better than 3-leg ones.');
  if (x.ok && x.legs.some(l => l.hp * l.dec < 1) && !x.sgp) notes.push('A leg below its break-even lowers the whole parlay. Swap it or find a better price.');
  return h + notes.map(n => '<div class="note warn" style="margin-top:8px">' + esc(n) + '</div>').join('');
}
function slipView() {
  const x = slipCalc();
  let h = '<div class="slh"><h2>Your parlay</h2><button class="pcx" type="button" data-act="slip-close" aria-label="Close parlay">' +
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><div class="slb">';
  h += x.legs.map((y, i) => '<div class="sleg"><div class="slt"><b>' + esc(y.l.p) + '</b> <span class="mut">' + esc([y.l.tm, y.l.op ? 'vs ' + y.l.op : ''].filter(Boolean).join(' · ')) + '</span>' +
    '<button class="sdel" type="button" data-act="slip-del" data-i="' + i + '" aria-label="Remove leg">×</button></div>' +
    '<div class="slp">' + esc(dirWord(y.l.dr) + ' ' + y.l.ln + ' ' + mkt(y.l.m)) + '</div>' +
    '<div class="sin2"><label class="sf"><span>Book</span><input data-slip="bk" data-i="' + i + '" value="' + esc(y.l.bk || '') + '" placeholder="Any book" autocomplete="off"></label>' +
    '<label class="sf"><span>Odds</span><input data-slip="o" data-i="' + i + '" value="' + esc(y.l.o || '') + '" inputmode="text" autocomplete="off"></label>' +
    '<label class="sf"><span>Boost %</span><input data-slip="bo" data-i="' + i + '" value="' + esc(y.l.bo || '') + '" placeholder="0" inputmode="decimal" autocomplete="off"></label></div>' +
    '<div class="slr" id="slr-' + i + '">' + slipLegRes(y) + '</div></div>').join('');
  if (S.slip.length) h += '<label class="sf sbook"><span>' + (x.sgp ? 'Book’s same-game parlay price (needed)' : 'Book’s parlay price (optional)') + '</span><input data-slip="book" value="' + esc(S.slipBook || '') + '" placeholder="e.g. +245" autocomplete="off"></label>';
  h += '<div id="slt">' + slipTotals(x) + '</div>';
  if (S.slip.length) h += '<div class="slact">' + (S.slip.length < SLIP_MAX ? '<span class="mut">Add legs from any player view.</span>' : '<span class="mut">Full: ' + SLIP_MAX + ' legs.</span>') + '<button class="ghost" type="button" data-act="slip-clear">Clear parlay</button></div>';
  h += '<p class="pcnote">V3 hit for each leg comes from your latest run (' + esc(dayTime(S.core.meta.lastBuild)) + '). Legs from different games are treated as independent; legs from the same game use this season’s same-game links. This is a price check, not an official pick, and it isn’t saved to the locked record.</p></div>';
  return h;
}
function renderSlip() {
  const f = $('slipfab'); if (!f) return;
  const toast = f.querySelector('.stoast');
  f.innerHTML = slipFab(); if (toast) f.appendChild(toast);
  const w = $('slip');
  if (S.slipOpen && S.core) { w.innerHTML = '<div class="pcscrim" data-act="slip-close"></div><aside class="slipd" role="dialog" aria-modal="true" aria-label="Your parlay">' + slipView() + '</aside>'; w.classList.add('open'); }
  else { w.classList.remove('open'); w.innerHTML = ''; }
}
function slipRefresh() {
  const x = slipCalc();
  x.legs.forEach((y, i) => { const el = $('slr-' + i); if (el) el.innerHTML = slipLegRes(y); });
  const t = $('slt'); if (t) t.innerHTML = slipTotals(x);
  const lb = document.querySelector('.sbook span'); if (lb) lb.textContent = x.sgp ? 'Book’s same-game parlay price (needed)' : 'Book’s parlay price (optional)';
  const f = $('slipfab'); if (f) { const toast = f.querySelector('.stoast'); f.innerHTML = slipFab(); if (toast) f.appendChild(toast); }
}

/* ---------------- Lowered-line 2-leg parlays (research) ---------------- */
function ladderLegLine(l) {
  return '<div class="lleg"><div><b>' + esc(l.p) + '</b> <span class="mut">' + esc([l.tm, l.pos].filter(Boolean).join(' · ')) + '</span>' + (l.locked ? ' <span class="mut">· locked</span>' : '') +
    '<div class="mut" style="font-size:12px">' + esc(dirWord(l.dr) + ' ' + l.ln + ' ' + mkt(l.m)) + ' <span class="dim">(preferred line ' + esc(l.anchor) + ')</span></div></div>' +
    '<div class="r"><b>' + odd(l.o) + '</b><span class="mut" style="display:block;font-size:11px">' + esc(book(l.bk)) + ' · V3 ' + pct(l.hp, 0) + ' · EV ' + sev(l.ev) + '</span></div></div>';
}
function viewLadder() {
  const L = S.core.ladder;
  if (!L || !L.current) return '';
  const c = L.current;
  const body = function () {
    let h = '<p class="mut" style="font-size:13px;margin:0 0 10px">Research only, never a BET or LEAN. For each preferred Straight, the line 10–30% easier with the best V3 value, kept only when V3 rates it +EV at that price. Then paired best-first, one leg per game, at +100 or better. Locked rule; Week ' + esc(L.record ? L.record.firstForwardWeek : 7) + ' is the first week of the forward test.</p>';
    if (!c.pairs.length) h += '<div class="empty">No qualifying pairs on the current board.</div>';
    h += c.pairs.map((pr, i) => {
      const a = c.legs[pr[0]], b = c.legs[pr[1]], D = decOf(a.o) * decOf(b.o), ev = a.hp * decOf(a.o) * b.hp * decOf(b.o) - 1;
      return '<div class="lpair"><div class="lph"><span class="sv plus">' + odd(amOf(D)) + '</span><span class="mut">V3 parlay hit ' + pct(a.hp * b.hp) + ' · est. EV <b class="' + evCls(ev) + '">' + sev(ev) + '</b></span>' +
        '<button class="ghost" type="button" data-act="slip-load" data-i="' + i + '">Load into my parlay</button></div>' + ladderLegLine(a) + ladderLegLine(b) + '</div>';
    }).join('');
    if (c.unpaired.length) h += '<div class="dl" style="margin-top:14px">Qualifying legs without a partner</div>' + c.unpaired.map(i => '<div class="lpair solo">' + ladderLegLine(c.legs[i]) + '</div>').join('');
    return h;
  };
  return fold('ladder', 'Lowered-line parlays · research', '2-leg parlays of easier alt lines V3 rates +EV. Tracked for learning, not official picks.', c.pairs.length, body);
}
function ladderTile() {
  const R = S.core.ladder && S.core.ladder.record;
  if (!R) return '';
  const f = R.forward, i = R.insample;
  const roi = o => o.n ? sev(o.units / o.n) : '—';
  const u = v => (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(2) + 'u';
  let h = '<section class="sec"><div class="sh"><div><h3>Lowered-line parlays · research</h3><p>The locked 2-leg rule, graded from the locked ledger. Weeks 4–6 were used to design it, so only Week ' + esc(R.firstForwardWeek) + ' onward counts as a real test.</p></div></div>' +
    '<div class="ptiles"><div class="ptile"><div class="tl">Forward test</div><div class="tv">' + f.w + '–' + f.l + '</div><div class="ts">' + (f.n ? '<b>' + u(f.units) + '</b> · ROI ' + roi(f) + ' · legs ' + f.legsW + '–' + f.legsL : 'Starts once Week ' + esc(R.firstForwardWeek) + ' is graded') + '</div></div>' +
    '<div class="ptile"><div class="tl">Progress to a verdict</div><div class="tv">' + f.weeks + '/' + R.minWeeks + '</div><div class="ts">weeks · <b>' + f.n + '/' + R.minDecisions + '</b> parlays (your challenger bar)</div></div>' +
    '<div class="ptile"><div class="tl">Design weeks (in-sample)</div><div class="tv">' + i.w + '–' + i.l + '</div><div class="ts"><b>' + u(i.units) + '</b> · ROI ' + roi(i) + ' · legs ' + i.legsW + '–' + i.legsL + '</div></div></div>';
  if (R.weeks.length) h += fold('ladder-weeks', 'By week', 'Parlays, record and units per week.', R.weeks.length, () =>
    tbl('<thead><tr><th>Week</th><th class="r">Parlays</th><th class="r">Record</th><th class="r">Units</th><th class="r">Avg price</th><th class="r">Legs</th></tr></thead><tbody>' +
      R.weeks.map(w => '<tr><td>W' + w.week + (w.insample ? ' <span class="mut">design</span>' : '') + '</td><td class="r num">' + w.n + '</td><td class="r num">' + w.w + '–' + w.l + (w.v ? '–' + w.v + 'V' : '') + '</td><td class="r num ' + (w.units >= 0 ? 'pos' : 'neg') + '">' + u(w.units) + '</td><td class="r num">' + odd(w.avgPrice) + '</td><td class="r num">' + w.legsW + '–' + w.legsL + '</td></tr>').join('') + '</tbody>'));
  return h + '</section>';
}

/* ---------------- Light-role receivers (research forward test) ---------------- */
const lrU = v => isNum(v) ? (v >= 0 ? '+' : '−') + Math.abs(v).toFixed(2) + 'u' : '—';
const lrRec = o => o ? o.w + '–' + o.l + (o.v ? '–' + o.v + 'V' : '') : '—';
const lrRes = g => g ? '<span class="lrres ' + esc(g) + '">' + esc(g === 'V' ? 'VOID' : g === 'P' ? 'PUSH' : g) + '</span>' : '';
const lrMarket = l => dirWord('OVER') + ' ' + l.ln + ' ' + mkt(l.m);
function lrLegLine(l, extra) {
  const tag = l.kind === 'milestone' ? 'milestone · ' + Math.round(l.ln / l.ml * 100) + '% of ' + l.ml + ' main' : 'main line';
  return '<div class="lleg"><div><b' + pcAttrs(l.pid, l.m, 'OVER', '') + ' style="cursor:pointer">' + esc(l.p) + '</b> <span class="mut">' + esc([l.tm, l.pos].filter(Boolean).join(' · ')) + '</span>' +
    (l.locked ? ' <span class="mut">· ' + LOCK + ' locked</span>' : '') + lrRes(l.g) + fcChip(l) +
    '<div class="mut" style="font-size:12px">' + esc(lrMarket(l)) + ' <span class="dim">(' + esc(tag) + ')</span>' + (isNum(l.a) ? ' · actual <b>' + esc(l.a) + '</b>' : '') + (extra || '') + '</div></div>' +
    '<div class="r"><b>' + odd(l.o) + '</b><span class="mut" style="display:block;font-size:11px">' + esc(book(l.bk)) + (isNum(l.hp) ? ' · V3 ' + pct(l.hp, 0) : '') + '</span></div></div>';
}
function lrCardLine(s, i, label) {
  const why = [isNum(s.cleared) ? 'cleared ' + Math.round(s.cleared * 100) + '% of ' + s.games + ' games' : 'no earlier games', isNum(s.avg) ? 'avg ' + s.avg : '', isNum(s.ou) ? 'O/U ' + s.ou : ''].filter(Boolean).join(' · ');
  return '<div class="lleg"><div style="display:flex;align-items:center"><span class="lrrank">' + (label || i + 1) + '</span><div><b' + pcAttrs(s.pid, s.m, 'OVER', '') + ' style="cursor:pointer">' + esc(s.p) + '</b> <span class="mut">' + esc([s.tm, s.pos].filter(Boolean).join(' · ')) + (s.op ? ' vs ' + esc(s.op) : '') + '</span>' +
    (s.locked ? ' <span class="mut">· ' + LOCK + ' locked</span>' : '') + lrRes(s.g) + fcChip(s) +
    '<div class="mut" style="font-size:12px">' + esc(lrMarket(s)) + (isNum(s.a) ? ' · actual <b>' + esc(s.a) + '</b>' : '') + '</div>' +
    '<div class="dim" style="font-size:11px">Score ' + esc(Math.round(s.score)) + ' · ' + esc(why) + '</div></div></div>' +
    '<div class="r"><b>' + odd(s.o) + '</b><span class="mut" style="display:block;font-size:11px">' + esc(book(s.bk)) + '</span></div></div>';
}
function lrTicket(t, i, kind) {
  const D = t.legs.reduce((d, l) => d * decOf(l.o), 1);
  const est = kind === 'g' ? 1 + (D - 1) * 0.9 : D;
  const hp = t.legs.reduce((p, l) => p * (isNum(l.hp) ? l.hp : NaN), 1);
  const head = kind === 'g' ? '<span class="sv plus">' + odd(amOf(D)) + '</span><span class="mut">combined · est. book price <b>' + odd(amOf(est)) + '</b>' + (isNum(hp) ? ' · V3 hit ' + pct(hp, 0) : '') + '</span>'
    : '<span class="sv plus">' + odd(amOf(D)) + '</span><span class="mut">' + t.legs.length + ' legs' + (isNum(hp) ? ' · V3 hit ' + pct(hp, 0) : '') + '</span>';
  const res = t.res ? lrRes(t.res) + (t.res === 'W' || t.res === 'L' ? ' <span class="mut">' + lrU(t.units) + '</span>' : '') : '';
  const lockedAny = t.legs.some(l => l.locked);
  return '<div class="lpair"><div class="lph">' + head + res +
    (lockedAny || i < 0 ? '' : '<button class="ghost" type="button" data-act="lr-load" data-t="' + kind + '" data-i="' + i + '">Load into my parlay</button>') + '</div>' +
    t.legs.map(l => lrLegLine(l)).join('') + '</div>';
}
function viewLightRole() {
  const L = S.core.lr;
  if (!L || !L.current) return '';
  const c = L.current, R = L.record || {}, B = R.backtest || {}, T = R.total || {}, BT = B.total || {};
  const tile = (title, f, b, unit) => '<div class="ptile"><div class="tl">' + title + '</div><div class="tv">' + (f && f.n ? lrRec(f) : '—') + '</div>' +
    '<div class="ts">' + (f && f.n ? '<b>' + lrU(f.units) + '</b> · ROI ' + sev(f.units / f.n) + ' · since Week ' + esc(R.firstForwardWeek) : 'Forward test starts Week ' + esc(R.firstForwardWeek)) + '</div>' +
    '<div class="lrbt">Backtest W' + esc(B.weeks || '4-9') + ': ' + (b ? lrRec(b) + ' · ' + lrU(b.units) + ' · ROI ' + sev(b.units / b.n) : '—') + '</div></div>';
  let h = '<section class="sec" id="light-role"><div class="sh"><div><h2>Light-role list · forward test</h2>' +
    '<p>Research only, never a BET or LEAN. Overs on receivers V3 tags with a light receiving role. Each game\'s picks lock at its kickoff; the record counts from Week ' + esc(R.firstForwardWeek) + '.</p></div></div>' +
    '<div class="ptiles">' + tile('Top 10 straights', T.card, BT.card) + tile('2-leg parlays', T.parlays, BT.parlays) + tile('Same-game parlays', T.sgps, BT.sgps) + '</div>';
  h += '<div class="dl" style="margin-top:18px">Week ' + esc(c.week) + ' · top 10 straights</div>' +
    '<p class="mut" style="font-size:12px;margin:2px 0 6px">Ranked by the under-the-radar score: rarely cleared this line before, season average below it, lower game total. One prop per player, main line, ' + esc(c.pool) + ' players in the group.</p>' +
    (c.card.length ? '<div class="lpair lrcard">' + c.card.map((s, i) => lrCardLine(s, i)).join('') + '</div>' : '<div class="empty">No light-role receivers on the board yet.</div>');
  h += '<div style="margin-top:14px"></div>' + fold('lr-parlays', '2-leg parlays', 'WR and TE only, none of the top 10. DraftKings/FanDuel milestone line near 70% of the main line, or a main line at −130 or shorter. Different games, +100 or better.', c.parlays.length,
    () => c.parlays.length ? c.parlays.map((t, i) => lrTicket(t, i, 'p')).join('') : '<div class="empty">No qualifying pairs on the current board.</div>');
  h += fold('lr-sgps', 'Same-game parlays', 'Same legs, one per game, at most two from one team. Graded at the combined price less 10%. Load one into your parlay and type the book\'s real same-game price to check it.', c.sgps.length,
    () => c.sgps.length ? c.sgps.map((t, i) => lrTicket(t, i, 'g')).join('') : '<div class="empty">No qualifying same-game parlays on the current board.</div>');
  h += lrFloorBlock(L);
  if (c.next && c.next.length) h += fold('lr-next', 'Next on the list', 'Players ranked just below the top 10 (not part of the test).', c.next.length, () =>
    '<div class="lpair lrcard">' + c.next.map((s, i) => lrCardLine(s, i, s.rank)).join('') + '</div>');
  return h + '</section>';
}
function lrTile() {
  const R = S.core.lr && S.core.lr.record;
  if (!R) return '';
  const B = R.backtest || {}, T = R.total || {};
  const cell = o => o && (o.n || o.pending) ? lrRec(o) + ' <span class="' + (o.units >= 0 ? 'pos' : 'neg') + '">' + lrU(o.units) + '</span>' + (o.pending ? ' <span class="mut">· ' + o.pending + ' pending</span>' : '') : '—';
  const bcell = a => a ? a[0] + '–' + a[1] + ' <span class="' + (a[2] >= 0 ? 'pos' : 'neg') + '">' + lrU(a[2]) + '</span>' : '—';
  const most = Math.max(T.card ? T.card.weeks : 0, T.parlays ? T.parlays.weeks : 0);
  let h = '<section class="sec"><div class="sh"><div><h3>Light-role list · forward test</h3><p>Rule ' + esc(R.rule) + ', locked before Week ' + esc(R.firstForwardWeek) + '. Weeks ' + esc(B.weeks || '4-9') + ' were used to find it, so only Week ' + esc(R.firstForwardWeek) + ' onward is a real test. Progress: ' + most + '/' + esc(R.minWeeks) + ' weeks, ' + (T.card ? T.card.n : 0) + '/' + esc(R.minDecisions) + ' straights.</p></div></div>';
  const rows = (R.weeks || []).map(w => '<tr><td>W' + w.week + '</td><td class="r num">' + cell(w.card) + '</td><td class="r num">' + cell(w.parlays) + '</td><td class="r num">' + cell(w.sgps) + '</td></tr>').join('');
  const brows = (B.byWeek || []).map(w => '<tr class="dim"><td>W' + w.week + ' <span class="mut">backtest</span></td><td class="r num">' + bcell(w.card) + '</td><td class="r num">' + bcell(w.parlays) + '</td><td class="r num">' + bcell(w.sgps) + '</td></tr>').join('');
  h += tbl('<thead><tr><th>Week</th><th class="r">Top 10</th><th class="r">2-leg parlays</th><th class="r">Same-game</th></tr></thead><tbody>' + (rows || '<tr><td colspan="4" class="mut">No forward weeks graded yet.</td></tr>') + brows + '</tbody>');
  h += lrFloorCompare(S.core.lr);
  return h + '</section>';
}
/* LR_FLOOR_V1 shadow challenger: same rule minus players whose book receptions line is 0.5. */
function lrFloorCompare(L) {
  const F = L && L.floor;
  if (!F) return '';
  const R = L.record || {}, T = R.total || {}, B = (R.backtest || {}).total || {}, FT = (F.record || {}).total || {}, FB = (F.backtest || {}).total || {};
  const cell = (o, bt) => o && o.n ? lrRec(o) + ' <span class="' + (o.units >= 0 ? 'pos' : 'neg') + '">' + lrU(o.units) + '</span>' : bt && bt.n ? '<span class="dim">' + lrRec(bt) + ' ' + lrU(bt.units) + ' bt</span>' : '—';
  const row = (name, k) => '<tr><td>' + name + '</td><td class="r num">' + cell(T[k], B[k]) + '</td><td class="r num">' + cell(FT[k], FB[k]) + '</td></tr>';
  return '<div class="dl" style="margin-top:16px">Floor challenger · ' + esc(F.rule) + '</div>' +
    '<p class="mut" style="font-size:12px;margin:2px 0 6px">Shadow test from Week ' + esc(R.firstForwardWeek) + ': the same rule after dropping players whose book receptions line is 0.5. It never changes the live list. "bt" = Weeks 4–9 backtest, shown until forward weeks are graded. Both graded the same way: a player missing from the box score counts as 0 unless he was ruled out.</p>' +
    tbl('<thead><tr><th></th><th class="r">Live rule</th><th class="r">Floor rule</th></tr></thead><tbody>' + row('Top 10', 'card') + row('2-leg parlays', 'parlays') + row('Same-game', 'sgps') + '</tbody>');
}
function lrFloorBlock(L) {
  const F = L && L.floor;
  if (!F || !F.current) return '';
  const c = F.current, cut = (L.current.card || []).filter(s => s.fc).length;
  return '<div style="margin-top:14px"></div>' + lrFloorCompare(L) +
    fold('lr-floor', 'Floor challenger picks this week', (cut ? cut + ' of this week\'s top 10 would be cut. ' : 'None of this week\'s top 10 would be cut. ') + 'Its own top 10, parlays and same-game parlays, built and locked the same way.', c.card.length + c.parlays.length + c.sgps.length,
      () => (c.card.length ? '<div class="lpair lrcard">' + c.card.map((s, i) => lrCardLine(s, i)).join('') + '</div>' : '<div class="empty">No picks.</div>') +
        (c.parlays.length ? '<div class="dl" style="margin-top:12px">2-leg parlays</div>' + c.parlays.map(t => lrTicket(t, -1, 'p')).join('') : '') +
        (c.sgps.length ? '<div class="dl" style="margin-top:12px">Same-game parlays</div>' + c.sgps.map(t => lrTicket(t, -1, 'g')).join('') : ''));
}

/* ---------------- Units by week (Performance) ---------------- */
function unitsTile(P) {
  const wk = (P.weeks || []).filter(x => x.s && isNum(x.s.u));
  if (!wk.length) return '';
  const tot = wk.reduce((a, x) => a + x.s.u, 0), mx = Math.max.apply(null, wk.map(x => Math.abs(x.s.u)).concat([1]));
  return '<section class="sec"><div class="sh"><div><h3>Units by week</h3><p>Official BET / LEAN calls, flat 1 unit at each locked price.</p></div>' +
    '<div class="utot ' + (tot >= 0 ? 'pos' : 'neg') + '">' + (tot >= 0 ? '+' : '−') + Math.abs(tot).toFixed(2) + 'u</div></div>' +
    '<div class="ubox"><div class="ubars" style="grid-template-columns:repeat(' + wk.length + ',minmax(0,1fr))">' + wk.map(x => {
      const hgt = Math.abs(x.s.u) / mx * 40, up = x.s.u >= 0;
      return '<div class="ucol" role="img" aria-label="' + esc('Week ' + x.w + ': ' + x.s.record + ', ' + (up ? '+' : '−') + Math.abs(x.s.u).toFixed(2) + ' units') + '">' +
        '<i class="ub ' + (up ? 'pos' : 'neg') + '" style="' + (up ? 'bottom:50%' : 'top:50%') + ';height:' + hgt.toFixed(1) + '%"></i>' +
        '<span class="uv ' + (up ? 'pos' : 'neg') + '" style="' + (up ? 'bottom:calc(50% + ' + hgt.toFixed(1) + '% + 4px)' : 'top:calc(50% + ' + hgt.toFixed(1) + '% + 4px)') + '">' + (up ? '+' : '−') + Math.abs(x.s.u).toFixed(2) + 'u</span></div>';
    }).join('') + '<i class="uzero"></i></div>' +
    '<div class="ulab" style="grid-template-columns:repeat(' + wk.length + ',minmax(0,1fr))">' + (function () { let r = 0; return wk.map(x => { r += x.s.u; return '<div><b>Week ' + x.w + '</b>' + recd(x.s.record) + '<span class="' + (r >= 0 ? 'pos' : 'neg') + '">' + (r >= 0 ? '+' : '−') + Math.abs(r).toFixed(2) + 'u to date</span></div>'; }).join(''); })() + '</div></div></section>';
}

/* ---------------- Vegas lines on Games ---------------- */
function vegasPair(g) {
  const V = S.core.vegas && S.core.vegas.teams ? S.core.vegas.teams : null;
  return V ? {a: V[g.away] || null, h: V[g.home] || null} : null;
}
function vegasShort(g) {
  const v = vegasPair(g);
  if (!v || !v.h || !isNum(v.h.sp)) return '';
  const fav = v.h.sp < 0 ? g.home + ' ' + signed(v.h.sp) : v.h.sp > 0 ? g.away + ' ' + signed(-v.h.sp) : 'Pick’em';
  return ' · ' + fav + (isNum(v.h.ou) ? ' · O/U ' + v.h.ou : '');
}
function vegasRow(g) {
  const v = vegasPair(g);
  if (!v || (!v.a && !v.h)) return '';
  const a = v.a || {}, hm = v.h || {};
  const sp = isNum(hm.sp) ? hm.sp : isNum(a.sp) ? -a.sp : null;
  const fav = sp === null ? '—' : sp < 0 ? g.home + ' ' + signed(sp) : sp > 0 ? g.away + ' ' + signed(-sp) : 'Pick’em';
  const ml = (t, x) => isNum(x.ml) ? t + ' ' + (x.ml > 0 ? '+' : '−') + Math.abs(x.ml) : '';
  return '<div class="vgrid" aria-label="Sportsbook lines">' +
    '<div><b>' + esc(fav) + '</b><span>Spread</span></div>' +
    '<div><b>' + esc(isNum(hm.ou) ? hm.ou : isNum(a.ou) ? a.ou : '—') + '</b><span>Total</span></div>' +
    '<div><b>' + esc(isNum(a.tt) ? a.tt : '—') + '<small>' + esc(g.away) + '</small> · ' + esc(isNum(hm.tt) ? hm.tt : '—') + '<small>' + esc(g.home) + '</small></b><span>Team totals</span></div>' +
    '<div><b class="sm">' + esc([ml(g.away, a), ml(g.home, hm)].filter(Boolean).join(' · ') || '—') + '</b><span>Moneyline</span></div></div>';
}

/* ---------------- Picks ---------------- */
function viewPicks() {
  const s = S.core.sections, cards = S.core.cards;
  const bets = s.straights.filter(k => U(cards[k].st) === 'BET').length;
  let h = '<section class="sec"><div class="sh"><div><h2>Straights</h2><p>Ranked by weekly Signal (S1) · ' + s.straights.length + ' actionable · ' + bets + ' BET · ' + (s.straights.length - bets) + ' LEAN</p></div>' +
    '<div class="legend"><span>' + STAR + 'S1 Highlight = Signal 80+</span><span><span class="st lean">LEAN</span>positive value at this price</span><span><span class="st bet">BET</span>Highlight + value gate</span><span>Bet to = worst price that still qualifies</span></div></div>' +
    (s.straights.length ? grid(s.straights) : '<div class="empty">No actionable Straights on the current board.</div>') + '</section>';
  h += viewWatchlist();
  h += viewLightRole();
  h += '<section class="sec"><div class="sh"><div><h2>Also on the board</h2></div></div>' +
    fold('lr', 'Lower Risk · Sunday Top 9', 'Alternate-line parlay legs ranked by L1. Check the real combined parlay price before using one.', s.lowerRisk.length, () => grid(s.lowerRisk) || '<div class="empty">No Lower Risk legs this week.</div>') +
    fold('j1', 'Longshot Plus · J1 Top 20', 'Research candidates ranked by J1. Tracked for learning, never a production BET or LEAN.', s.longshot.length, () => grid(s.longshot) || '<div class="empty">No Longshot Plus research candidates.</div>') +
    fold('watch', 'Watch', 'Straights waiting on price, status or data. Not official picks.', s.watch.length, () => grid(s.watch) || '<div class="empty">Nothing on watch right now.</div>') +
    viewLadder() +
    '</section>';
  return h;
}


/* ---------------- Watchlist ---------------- */
const WL_STATE = {
  PLAY: ['play', 'PLAY NOW'], WAIT_PRICE: ['wait', 'WAIT FOR PRICE'], LINE_MOVED: ['wait', 'LINE MOVED'],
  COOLED: ['cool', 'MODEL COOLED'], OFF_BOARD: ['cool', 'OFF THE BOARD'], OUT: ['out', 'OUT'],
  LOCKED_PLAY: ['lplay', 'LOCKED · PLAY'], LOCKED_PASS: ['lpass', 'LOCKED · NO PLAY']
};
const wlLast = e => e.snaps[e.snaps.length - 1];
const wlState = e => e.locked ? e.locked.state : wlLast(e).state;
const wlOpenState = st => ['PLAY', 'WAIT_PRICE', 'LINE_MOVED', 'COOLED', 'OFF_BOARD', 'OUT'].indexOf(st) >= 0;
const wlMkt = (e, ln) => dirWord(e.dr) + (U(e.m) === 'ANYTIME TD' ? '' : ' ' + (isNum(ln) ? ln : '')) + ' ' + mkt(e.m);
const wlPrice = sn => sn && isNum(sn.o) ? odd(sn.o) + (sn.bk ? ' ' + book(sn.bk) : '') : '—';
const wlWhen = ms => fmt(ms, {weekday:'short', hour:'numeric', minute:'2-digit'});
const wlSnapWhen = (e, sn) => /^LOCKED/.test(sn.state) && e.t ? 'Kickoff ' + wlWhen(e.t) : wlWhen(sn.at);
const wlAs = sn => sn.state === 'PLAY' ? 'a ' + (sn.rec || 'LEAN') : (WL_STATE[sn.state] || ['', sn.state])[1].toLowerCase();
function wlNow(e) {
  const s = wlLast(e), st = wlState(e), first = e.snaps[0];
  if (st === 'PLAY') return (s.rec || 'LEAN') + ' · ' + wlMkt(e, s.ln) + ' at ' + wlPrice(s) + (isNum(s.bl) ? ' · bet to ' + odd(s.bl) : '');
  if (st === 'WAIT_PRICE') return 'Need ' + odd(s.bl) + ' or better on ' + wlMkt(e, s.ln) + ' · best found ' + wlPrice(s);
  if (st === 'LINE_MOVED') return 'Was ' + wlMkt(e, e.refLine) + ' · now ' + wlMkt(e, s.ln) + ' at ' + wlPrice(s) + (isNum(s.bl) ? ' · need ' + odd(s.bl) + ' or better' : '');
  if (st === 'OUT') return 'Player status: ' + (s.ps || 'out') + '.';
  if (st === 'OFF_BOARD') return 'No lines posted for this right now.';
  if (st === 'COOLED') {
    const bits = [];
    if (s.pref && isNum(s.s1)) bits.push('Signal ' + n1(e.peak) + ' → ' + n1(s.s1));
    else bits.push('no longer a Straight candidate');
    if (isNum(first.sp) && isNum(s.sp) && first.sp !== s.sp) bits.push('projection ' + first.sp + ' → ' + s.sp);
    return 'No longer a pick · ' + bits.join(' · ') + (isNum(s.o) ? ' · now ' + wlMkt(e, s.ln) + ' ' + wlPrice(s) : '');
  }
  if (st === 'LOCKED_PLAY') return 'Locked at kickoff as ' + (s.rec || 'LEAN') + ' · ' + wlMkt(e, s.ln) + ' ' + wlPrice(s);
  return 'Locked at kickoff, not a play' + (isNum(s.o) ? ' · last ' + wlMkt(e, s.ln) + ' ' + wlPrice(s) : '');
}
function wlCompare(e) {
  const a = e.snaps[0], b = wlLast(e);
  const rows = [
    ['Status', x => x.state === 'PLAY' ? (x.rec || 'LEAN') : (WL_STATE[x.state] || ['', x.state])[1]],
    ['Line', x => isNum(x.ln) ? dirWord(e.dr) + ' ' + x.ln : '—'],
    ['Price', x => wlPrice(x)],
    ['Bet to (LEAN)', x => isNum(x.bl) ? odd(x.bl) : '—'],
    ['Projection', x => isNum(x.sp) ? String(x.sp) : '—'],
    ['Est. hit', x => pct(x.hp)],
    ['V3 EV', x => sev(x.ev)],
    ['Signal', x => isNum(x.s1) ? n1(x.s1) : '—'],
    ['Player status', x => x.ps || '—']
  ];
  return '<table class="wcmp"><thead><tr><th></th><th>First seen · ' + esc(wlWhen(a.at)) + '</th><th>' + (e.locked ? 'At lock · ' + esc(e.t ? 'kickoff ' + wlWhen(e.t) : wlWhen(b.at)) : 'Now · ' + esc(wlWhen(b.at))) + '</th></tr></thead><tbody>' +
    rows.map(r => { const va = r[1](a), vb = r[1](b); return '<tr><td class="mut">' + esc(r[0]) + '</td><td>' + esc(va) + '</td><td class="' + (va !== vb ? 'chg' : '') + '">' + esc(vb) + '</td></tr>'; }).join('') + '</tbody></table>';
}
function wlWhy(e) {
  const a = e.snaps[0], b = wlLast(e), out = [];
  if (a.state === b.state && e.snaps.length === 1) return '';
  if (isNum(a.ln) && isNum(b.ln) && a.ln !== b.ln) out.push('The line moved from ' + a.ln + ' to ' + b.ln + '.');
  if (isNum(a.o) && isNum(b.o) && a.o !== b.o && a.ln === b.ln) out.push('The price moved from ' + odd(a.o) + ' to ' + odd(b.o) + '.');
  if (isNum(a.sp) && isNum(b.sp) && Math.abs(a.sp - b.sp) >= 0.1) out.push('The projection moved from ' + a.sp + ' to ' + b.sp + (b.src && b.src !== a.src ? ' (new projection tab: ' + b.src + ')' : '') + '.');
  if (a.pref && !b.pref) out.push('V3 stopped treating this as a preferred Straight.');
  if (isNum(a.s1) && isNum(b.s1) && Math.abs(a.s1 - b.s1) >= 5) out.push('Signal went from ' + n1(a.s1) + ' to ' + n1(b.s1) + '.');
  if ((a.ps || '') !== (b.ps || '') && b.ps) out.push('Player status is now ' + b.ps + '.');
  return out.length ? '<div class="wlwhy"><b>What changed:</b> ' + esc(out.join(' ')) + '</div>' : '';
}
function wlRow(e) {
  const st = wlState(e), c = WL_STATE[st] || ['cool', st], open = !!S.wlOpen[e.key], g = (S.core.games || []).find(x => x.id === e.e);
  const first = e.snaps[0];
  const av = e.hs ? '<img src="' + esc(e.hs) + '" alt="" loading="lazy" onerror="this.parentNode.innerHTML=SIL">' : SIL;
  return '<div class="wl"><button class="wlrow" type="button" data-act="wl" data-k="' + esc(e.key) + '" aria-expanded="' + open + '">' +
    '<span class="wlav" style="background:' + team(e.tm).color + '">' + av + '</span>' +
    '<span class="wlmain"><span class="wlname">' + esc(e.p) + ' <span class="mut">' + esc([e.tm, e.pos].filter(Boolean).join(' · ')) + '</span> <span class="mut">' + esc(wlMkt(e, null).replace(/\s+/g, ' ')) + '</span></span>' +
    '<span class="wlnow" style="display:block">' + esc(wlNow(e)) + '</span>' +
    '<span class="wlsince" style="display:block">' + (g ? esc(g.away + ' @ ' + g.home + ' · ' + dayTime(g.t)) + ' · ' : '') + 'first seen ' + esc(wlWhen(e.firstAt)) + ' as ' + esc(wlAs(first)) + (isNum(first.ln) ? ', ' + esc(dirWord(e.dr) + ' ' + first.ln + ' ' + wlPrice(first)) : '') + '</span></span>' +
    '<span class="wlside"><span class="ws ' + c[0] + '">' + c[1] + '</span>' + CHEV + '</span></button>' +
    (open ? '<div class="wldet">' + wlWhy(e) + wlCompare(e) +
      '<ul class="wtl">' + e.snaps.map(sn => '<li><span>' + esc(wlSnapWhen(e, sn)) + '</span><span><b>' + esc(sn.state === 'PLAY' ? (sn.rec || 'LEAN') : (WL_STATE[sn.state] || ['', sn.state])[1]) + '</b> · ' + esc(isNum(sn.ln) ? dirWord(e.dr) + ' ' + sn.ln + ' ' + wlPrice(sn) : 'no line') + (isNum(sn.s1) ? ' · Signal ' + n1(sn.s1) : '') + (isNum(sn.sp) ? ' · proj ' + sn.sp : '') + '</span></li>').join('') + '</ul>' +
      '<div class="wlnote">Bet to is for that exact line. A different line needs its own price.</div>' +
      '<button class="ghost" type="button" style="margin-top:10px"' + pcAttrs(e.pid, e.m, e.dr, '') + '>Player view · ' + esc(e.p) + '</button></div>' : '') + '</div>';
}
function viewWatchlist() {
  const W = S.core.watchlist;
  let h = '<section class="sec" id="watchlist"><div class="sh"><div><h2>Watchlist</h2><p>Every preferred Straight that was a LEAN or BET, or reached Signal ' + 50 + '+, on any run this week. They stay here until kickoff, so you can see what changed and shop the price yourself.</p></div></div>';
  if (!W || !W.entries) return h + '<div class="empty">The watchlist starts with the next model run.</div></section>';
  const all = W.entries;
  const cnt = f => all.filter(f).length;
  const F = {
    open: ['Open', e => wlOpenState(wlState(e))],
    wait: ['Waiting', e => ['WAIT_PRICE', 'LINE_MOVED'].indexOf(wlState(e)) >= 0],
    cooled: ['Cooled', e => ['COOLED', 'OFF_BOARD', 'OUT'].indexOf(wlState(e)) >= 0],
    locked: ['Locked', e => !!e.locked],
    all: ['All', e => true]
  };
  h += '<div class="wlbar" role="group" aria-label="Watchlist filter">' + Object.keys(F).map(k => '<button class="chip' + (S.wlf === k ? ' on' : '') + '" type="button" data-act="wlf" data-f="' + k + '"><b>' + cnt(F[k][1]) + '</b>' + F[k][0] + '</button>').join('') +
    '<span class="mut" style="font-size:12px;margin-left:auto">' + W.runs.length + ' model run' + (W.runs.length === 1 ? '' : 's') + ' this week · last ' + esc(wlWhen(W.runs[W.runs.length - 1].at)) + '</span></div>';
  const list = all.filter(F[S.wlf] ? F[S.wlf][1] : F.open[1]);
  h += list.length ? '<div class="wlist">' + list.map(wlRow).join('') + '</div>' : '<div class="empty">Nothing here right now.</div>';
  return h + '</section>';
}

/* ---------------- Games ---------------- */
function viewGames() {
  const games = (S.core.games || []).slice().sort((a, b) => (a.t || 0) - (b.t || 0));
  if (!games.length) return '<div class="empty" style="margin-top:30px">No games published yet.</div>';
  if (S.gameOpen) { const g = games.find(x => x.id === S.game); if (g) return gamePage(g); }
  const items = weekItems();
  let h = '', last = '';
  games.forEach(function (g) {
    const day = fmt(g.t, {weekday: 'long'});
    if (!last) { h += '<div class="kgts">'; last = day; }
    const n = items.filter(i => i.e === g.id && i.kind !== 'par').length, lg = liveGame(g);
    const right = lg && lg.state === 'in' ? '<span class="lv-st pace">' + esc(lg.as + '–' + lg.hs + ' · ' + liveClock(lg)) + '</span>' : lg && lg.state === 'post' ? '<span class="mut">Final ' + esc(lg.as + '–' + lg.hs) + '</span>' :
      '<span class="' + (n ? 'pos' : 'dim') + '">' + (n ? n + (n === 1 ? ' pick' : ' picks') : 'No picks') + '</span>';
    h += '<button type="button" class="kgt" data-act="game" data-id="' + esc(g.id) + '" aria-label="' + esc('Open ' + team(g.away).name + ' at ' + team(g.home).name) + '">' +
      '<div class="kgt-h"><i style="background:' + team(g.away).color + '"></i><div class="kgt-m"><div>' + badge(g.away, 40) + '<b>' + esc(g.away) + '</b></div><span>AT</span><div>' + badge(g.home, 40) + '<b>' + esc(g.home) + '</b></div></div><i style="background:' + team(g.home).color + '"></i></div>' +
      '<div class="kgt-f"><span>' + esc(dayTime(g.t)) + '</span>' + right + '</div></button>';
  });
  return '<div class="kgames">' + h + '</div></div>';
}
function gamePage(g) {
  const a = team(g.away), hm = team(g.home), sec = g.sections, lg = liveGame(g);
  const items = weekItems().filter(i => i.e === g.id && i.kind !== 'par');
  const mid = lg && lg.state !== 'pre' ? lg.as + '–' + lg.hs + ' · ' + (lg.state === 'in' ? liveClock(lg) : 'FINAL') : fullTime(g.t);
  let h = '<section class="kgp"><i class="l" style="background:' + a.color + '"></i><i class="r" style="background:' + hm.color + '"></i>' +
    '<div class="kgp-top"><button type="button" class="kback" data-act="game-back" aria-label="Back to all games"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg></button>' +
    skew(esc(mid), lg && lg.state === 'in' ? 'grn' : '') + '</div>' +
    '<div class="kgp-mu"><div>' + badge(g.away, 62) + '<b>' + esc(nick(g.away)) + '</b></div><span>AT</span><div>' + badge(g.home, 62) + '<b>' + esc(nick(g.home)) + '</b></div></div>' +
    '<div class="kgp-s">' + (g.frozen ? LOCK + ' Locked at kickoff · last pre-kickoff build ' + esc(fullTime(g.builtAt)) : 'Pregame · refreshes each build until kickoff') + '</div></section>' + vegasRow(g);
  h += '<div class="kgp-tabs"><span class="on">Picks · ' + items.length + '</span><button type="button" data-act="game-props" data-id="' + esc(g.id) + '">All props · ' + comma(g.all) + '</button></div>';
  [g.away, g.home].forEach(function (t) {
    const its = items.filter(i => i.kind !== 'sgp' && (i.c ? i.c.tm : i.s.tm) === t).sort((x, y) => ({bet: 0, lean: 1, top: 2}[x.kind] - {bet: 0, lean: 1, top: 2}[y.kind]) || x.r - y.r);
    h += '<section class="kg"><div class="kteam"><i style="background:' + team(t).color + '"></i>' + badge(t, 28) + '<b>' + esc(team(t).name) + '</b><span>' + (its.length ? its.length + (its.length === 1 ? ' pick' : ' picks') : 'No picks') + '</span></div>' +
      (its.length ? its.map(it => tdRow(it)).join('') : '<div class="lv-none">No V3 or Top 10 picks for this team.</div>') + '</section>';
  });
  items.filter(i => i.kind === 'sgp').forEach(it => { h += '<section class="kg">' + ticketBlock(it) + '</section>'; });
  h += kday('More in this game') +
    fold('g-review', 'Preferred review', 'Lines V3 chose to judge for each player and market that don\'t clear the price gate. Ranked by Signal.', sec.review.length, () => grid(sec.review) || '<div class="empty">None.</div>') +
    fold('g-lr', 'Lower Risk legs', 'Easier alternate lines for parlays. Check the combined price.', sec.lowerRisk.length, () => grid(sec.lowerRisk) || '<div class="empty">None.</div>') +
    fold('g-j1', 'Longshot Plus · J1 top 5', 'Research only.', sec.longshot.length, () => grid(sec.longshot) || '<div class="empty">None.</div>') +
    fold('g-watch', 'Watch', 'Waiting on price, status or data.', sec.watch.length, () => grid(sec.watch) || '<div class="empty">None.</div>') +
    (S.core.watchlist && S.core.watchlist.entries ? (function () { const wl = S.core.watchlist.entries.filter(e => e.e === g.id);
      return fold('g-wl-' + g.id, 'Watchlist', 'Preferred Straights V3 has liked in this game this week, with what changed since.', wl.length, () => wl.length ? '<div class="wlist">' + wl.map(wlRow).join('') + '</div>' : '<div class="empty">None this week.</div>'); })() : '') +
    '<button class="fold" type="button" data-act="game-props" data-id="' + esc(g.id) + '"><span class="t">Every prop in this game</span><span class="d">Opens All props filtered to ' + esc(g.away + ' @ ' + g.home) + '.</span><span class="c">' + comma(g.all) + '</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9AA8B4" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg></button>';
  return '<div class="kgpage">' + h + '</div>';
}
/* Results header: cumulative units chart and one tile per list. */
function resultsTop(all) {
  const P = all.season;
  if (!P || P.withheld) return '';
  const wk = (P.weeks || []).filter(x => x.s && isNum(x.s.u));
  let cum = 0;
  const pts = wk.map(x => { cum += x.s.u; return {w: x.w, c: cum, u: x.s.u, rec: x.s.record}; });
  let chart = '';
  if (pts.length) {
    const lo = Math.min(0, ...pts.map(p => p.c)), hi = Math.max(0.5, ...pts.map(p => p.c)), W = 320, H = 120;
    const X = i => (i + 0.5) * W / pts.length, Y = v => (H - 10 - (v - lo) / (hi - lo) * (H - 22)).toFixed(1);
    const line = pts.map((p, i) => X(i).toFixed(1) + ',' + Y(p.c)).join(' ');
    chart = '<svg class="kch big" viewBox="0 0 ' + W + ' ' + H + '" preserveAspectRatio="none" role="img" aria-label="' + esc('Cumulative units by week, ' + lrU(cum) + ' after week ' + pts[pts.length - 1].w) + '">' +
      '<line x1="0" y1="' + Y(0) + '" x2="' + W + '" y2="' + Y(0) + '" stroke="#24323F" vector-effect="non-scaling-stroke"/>' +
      '<polygon points="' + X(0).toFixed(1) + ',' + Y(0) + ' ' + line + ' ' + X(pts.length - 1).toFixed(1) + ',' + Y(0) + '" fill="' + (cum >= 0 ? 'rgba(61,220,151,.12)' : 'rgba(255,138,115,.12)') + '"/>' +
      '<polyline points="' + line + '" fill="none" stroke="' + (cum >= 0 ? '#3DDC97' : '#FF8A73') + '" stroke-width="2.5" stroke-linejoin="round" vector-effect="non-scaling-stroke"/></svg>' +
      '<div class="kch-x" style="grid-template-columns:repeat(' + pts.length + ',minmax(0,1fr))">' + pts.map(p => '<span>W' + p.w + '<em class="' + (p.u >= 0 ? 'pos' : 'neg') + '">' + lrU(p.u) + '</em></span>').join('') + '</div>';
  }
  const o = P.official.all, R = S.core.lr && S.core.lr.record, T = R ? R.total || {} : {}, B = R && R.backtest ? R.backtest.total || {} : {};
  const tile = (name, rec, u, sub, col) => '<section class="krt"><i style="background:' + col + '"></i><div><span>' + esc(name) + '</span><b>' + esc(rec) + ' <em class="' + (isNum(u) ? (u >= 0 ? 'pos' : 'neg') : 'dim') + '">' + (isNum(u) ? lrU(u) : '') + '</em></b><small>' + esc(sub) + '</small></div></section>';
  const lrT = (name, k, col) => T[k] && T[k].n ? tile(name, lrRec(T[k]), T[k].units, 'Forward test · ' + T[k].weeks + (T[k].weeks === 1 ? ' week' : ' weeks'), col) :
    B[k] ? tile(name, B[k].w + '–' + B[k].l, B[k].units, 'Backtest W4–9 · forward test pending', col) : tile(name, '—', null, 'No data yet', col);
  return '<section class="kg kres"><div class="ksh">' + skew('V3 Bets & Leans · cumulative units', 'grn') + '<span class="ksub">Season to date</span></div>' +
    '<div class="kres-b"><div class="kres-h"><b class="' + (isNum(o.u) && o.u < 0 ? 'neg' : 'pos') + '">' + (isNum(o.u) ? lrU(o.u) : '—') + '</b><span><em>' + esc(o.w + '–' + o.l) + '</em> ' + pct(o.hit) + '</span></div>' + (chart || '<div class="lv-none">No graded weeks yet.</div>') + '</div></section>' +
    '<div class="krts">' + tile('V3 Bets & Leans', o.w + '–' + o.l, o.u, 'Season · ' + o.n + ' graded', '#3DDC97') + lrT('Top 10', 'card', '#E8B64C') + lrT('2-leg parlays', 'parlays', '#ECF1F4') + lrT('Same-game', 'sgps', '#5D6E7C') + '</div>';
}

/* ---------------- All props ---------------- */
const STAT_ORDER = {'BET':0,'LEAN':1,'PARLAY LEG':2,'RESEARCH':3,'WATCH':4,'NO BET':5,'UNAVAILABLE':6,'NOT MODELED':7};
const CHIPS = [['all', 'All'], ['act', 'Actionable'], ['review', 'Preferred review'], ['ev', '+EV at captured price'], ['ctx', 'Has context flags']];
function chipCount(id) {
  const c = S.core.meta.counts;
  return id === 'all' ? c.props : id === 'act' ? c.actionable : id === 'review' ? c.review : id === 'ev' ? c.positiveEV : c.withContext;
}
function propsFiltered() {
  const f = S.pf, q = f.q.trim().toLowerCase();
  const rows = S.props.filter(r => {
    if (f.chip === 'act' && !isAct(r)) return false;
    if (f.chip === 'review' && !(isPref(r) && !isAct(r))) return false;
    if (f.chip === 'ev' && !(isNum(r.ev) && r.ev > 0)) return false;
    if (f.chip === 'ctx' && !r.w) return false;
    if (f.market !== 'ALL' && r.m !== f.market) return false;
    if (f.game !== 'ALL' && r.e !== f.game) return false;
    if (f.status !== 'ALL' && status(r)[1] !== f.status) return false;
    if (f.pos !== 'ALL' && (r.pos || '—') !== f.pos) return false;
    if (f.book !== 'ALL' && r.bk !== f.book) return false;
    if (f.fam !== 'ALL' && (r.fam || 'OTHER') !== f.fam) return false;
    if (f.dir !== 'ALL' && r.dr !== f.dir) return false;
    if (q && [r.p, r.tm, r.op, r.m, book(r.bk), r.pos].join(' ').toLowerCase().indexOf(q) < 0) return false;
    return true;
  });
  const k = S.sort.key, d = S.sort.dir;
  if (k === 'rec') { rows.sort((a, b) => (STAT_ORDER[status(a)[1]] - STAT_ORDER[status(b)[1]]) || ((isNum(b.sg) ? b.sg : -1) - (isNum(a.sg) ? a.sg : -1))); return rows; }
  const val = r => k === 'st' ? STAT_ORDER[status(r)[1]] : k === 'p' ? (r.p || '') : k === 'm' ? (r.m || '') + (r.ln || 0) : r[k];
  rows.sort((a, b) => {
    const x = val(a), y = val(b);
    const xn = typeof x === 'number', yn = typeof y === 'number';
    if (xn || yn) { if (!xn && !yn) return 0; if (!xn) return 1; if (!yn) return -1; return (x - y) * d; }
    return String(x).localeCompare(String(y)) * d;
  });
  return rows;
}
function opts(list, cur, all) { return '<option value="ALL">' + esc(all) + '</option>' + list.map(x => '<option value="' + esc(x[0]) + '"' + (x[0] === cur ? ' selected' : '') + '>' + esc(x[1]) + '</option>').join(''); }
function viewProps() {
  const f = S.pf;
  let h = '<section class="sec"><div class="sh"><div><h2>All props</h2><p>Every line V3 evaluated, including the ones it rejects. Tap a row for the reasoning and the other lines. Signal is scored within each family (S1, L1, J1), so compare it within a family.</p></div></div>' +
    '<div class="chips" role="group" aria-label="Quick filters">' + CHIPS.map(c => '<button class="chip' + (f.chip === c[0] ? ' on' : '') + '" type="button" data-act="chip" data-q="' + c[0] + '"><b>' + comma(chipCount(c[0])) + '</b>' + c[1] + '</button>').join('') + '</div>';
  if (!S.props) {
    h += S.propsError ? '<div class="errbox">All props could not load.<pre>' + esc(S.propsError) + '</pre><button class="ghost" type="button" data-act="retry-props">Try again</button></div>'
      : '<div class="loading">Loading ' + comma(S.core.meta.counts.props) + ' props…</div>';
    return h + '</section>';
  }
  const uniq = key => Array.from(new Set(S.props.map(r => r[key]).filter(Boolean))).sort();
  const markets = uniq('m').map(x => [x, x]);
  const games = S.core.games.map(g => [g.id, g.away + ' @ ' + g.home]);
  const statuses = ['BET', 'LEAN', 'PARLAY LEG', 'RESEARCH', 'WATCH', 'NO BET', 'NOT MODELED', 'UNAVAILABLE'].map(x => [x, x]);
  h += '<div class="filters">' +
    '<label class="search"><span class="vh">Search props</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A8996" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg><input id="q" type="search" data-f="q" value="' + esc(f.q) + '" placeholder="Player, team, market, sportsbook"></label>' +
    '<label><span class="vh">Market</span><select class="sel" data-f="market">' + opts(markets, f.market, 'All markets') + '</select></label>' +
    '<label><span class="vh">Game</span><select class="sel" data-f="game">' + opts(games, f.game, 'All games') + '</select></label>' +
    '<label><span class="vh">Status</span><select class="sel" data-f="status">' + opts(statuses, f.status, 'All statuses') + '</select></label>' +
    '<label><span class="vh">Sort</span><select class="sel" data-f="sort">' + [['rec', 'Sort: Recommended'], ['sg', 'Sort: Signal'], ['hp', 'Sort: Est. hit'], ['ev', 'Sort: V3 EV'], ['o', 'Sort: Odds'], ['p', 'Sort: Player']].map(x => '<option value="' + x[0] + '"' + (S.sort.key === x[0] ? ' selected' : '') + '>' + x[1] + '</option>').join('') + '</select></label>' +
    '<button class="sel" type="button" data-act="more-filters" aria-expanded="' + f.more + '">More filters' + (['pos', 'book', 'fam', 'dir'].filter(k => f[k] !== 'ALL').length ? ' · ' + ['pos', 'book', 'fam', 'dir'].filter(k => f[k] !== 'ALL').length : '') + '</button>' +
    '</div>';
  if (f.more) {
    h += '<div class="filters">' +
      '<label><span class="vh">Position</span><select class="sel" data-f="pos">' + opts(uniq('pos').map(x => [x, x]), f.pos, 'All positions') + '</select></label>' +
      '<label><span class="vh">Sportsbook</span><select class="sel" data-f="book">' + opts(uniq('bk').map(x => [x, book(x)]), f.book, 'All sportsbooks') + '</select></label>' +
      '<label><span class="vh">Family</span><select class="sel" data-f="fam">' + opts([['STRAIGHT', 'Straight'], ['LOWER_RISK', 'Lower Risk'], ['LONGSHOT_PLUS', 'Longshot Plus'], ['OTHER', 'Other']], f.fam, 'All families') + '</select></label>' +
      '<label><span class="vh">Direction</span><select class="sel" data-f="dir">' + opts(uniq('dr').map(x => [x, dirWord(x)]), f.dir, 'All directions') + '</select></label>' +
      '<button class="ghost" type="button" data-act="clear-filters">Clear filters</button></div>';
  }
  h += '<div id="ptable">' + propsTable() + '</div></section>';
  return h;
}
function th(label, key, cls) {
  const on = S.sort.key === key;
  return '<th class="' + (cls || '') + (on ? ' sorted' : '') + '"><button type="button" data-act="sort" data-key="' + key + '">' + esc(label) + (on ? (S.sort.dir < 0 ? ' ↓' : ' ↑') : '') + '</button></th>';
}
function propsTable() {
  const rows = propsFiltered(), shown = rows.slice(0, S.limit), an = S.analyst;
  let h = '<div class="resinfo"><span>' + comma(rows.length) + ' lines' + (rows.length > shown.length ? ' · showing ' + comma(shown.length) : '') + '</span>' +
    (S.pf.game !== 'ALL' ? '<button class="ghost" type="button" data-act="clear-game">Show all games</button>' : '') + '</div>';
  if (!rows.length) return h + '<div class="empty" style="margin-top:10px">No props match these filters.</div>';
  const cols = an ? 13 : 9;
  h += '<div class="box"><table class="pt' + (an ? ' an' : '') + '"><thead><tr>' + th('Player', 'p') + th('Prop', 'm') + '<th class="c-l3h">Last 3</th>' + th('Odds', 'o', 'r') + th('Est. hit', 'hp', 'r') + th('V3 EV', 'ev', 'r') + th('Signal', 'sg', 'r') +
    (an ? th('Proj.', 'sp', 'r') + th('Raw P', 'rp', 'r') + th('Market P', 'mp', 'r') + th('Role conf.', 'rc', 'r') : '') + th('Status', 'st') + '<th>Context</th></tr></thead><tbody>';
  shown.forEach(r => {
    const open = S.openRow === r.i;
    h += '<tr class="row' + (open ? ' open' : '') + '" data-act="row" data-i="' + r.i + '" tabindex="0" aria-expanded="' + open + '">' +
      '<td class="c-player"><div class="pl">' + logo(r.tm, 'xs') + '<b>' + esc(r.p) + '</b><span class="mut">' + esc(r.pos || '') + '</span></div></td>' +
      '<td class="c-prop"><span class="nw">' + esc(propLabel(r)) + '</span></td>' +
      '<td class="c-l3">' + l3dots(r.pid, r.m, r.dr) + '</td>' +
      '<td class="c-odds r"><span class="num">' + odd(r.o) + '</span><span class="sub nw">' + esc(book(r.bk)) + '</span></td>' +
      '<td class="c-hit r num ' + (isNum(r.hp) ? '' : 'dim') + '">' + pct(r.hp) + '</td>' +
      '<td class="c-ev r num ' + evCls(r.ev) + '">' + sev(r.ev) + '</td>' +
      '<td class="c-sig r num ' + (isNum(r.sg) ? '' : 'dim') + '">' + n1(r.sg) + (U(r.fam) === 'STRAIGHT' && isHL(r) ? ' ' + STAR : '') + '</td>' +
      (an ? '<td class="c-an r num">' + n1(r.sp) + '</td><td class="c-an r num">' + pct(r.rp) + '</td><td class="c-an r num">' + pct(r.mp) + '</td><td class="c-an r num">' + pct(r.rc) + '</td>' : '') +
      '<td class="c-status">' + pill(r) + '</td>' +
      '<td class="c-metrics"><span class="mut">Est. hit</span> <b>' + pct(r.hp) + '</b> · <span class="mut">EV</span> <b class="' + evCls(r.ev) + '">' + sev(r.ev) + '</b> · <span class="mut">Signal</span> <b>' + n1(r.sg) + '</b>' + (S.players && l3(r.pid, r.m, r.dr) ? ' · <span class="mut">Last 3</span> ' + l3dots(r.pid, r.m, r.dr) : '') + '</td>' +
      '<td class="c-ctx">' + (warnTags(r.w) || '<span class="dim">—</span>') + '</td></tr>';
    if (open) {
      const gk = r.pid + '|' + r.m + '|' + r.dr;
      const ladder = S.props.filter(x => x.pid === r.pid && x.m === r.m && x.dr === r.dr).sort((a, b) => (a.ln || 0) - (b.ln || 0));
      h += '<tr class="prow"><td colspan="' + cols + '"><button class="ghost pvbtn" type="button"' + pcAttrs(r.pid, r.m, r.dr, '') + '>Player view · ' + esc(r.p) + '</button>' + details(r, ladder, r.i) + '</td></tr>';
    }
  });
  h += '</tbody></table></div>';
  if (rows.length > shown.length) h += '<button class="ghost showmore" type="button" data-act="more-rows">Show 100 more</button>';
  return h;
}

/* ---------------- Performance ---------------- */
const POP_LABEL = {STRAIGHT_ACTIONABLE:'Actionable Straights · BET + LEAN',STRAIGHT_HIGHLIGHT:'S1 Highlights · all preferred',STRAIGHT_PREFERRED:'All preferred S1 Straights',LOWER_RISK_TOP9:'Lower Risk · Sunday Top 9 legs',LOWER_RISK_TRACKED:'Lower Risk · all forward-test candidates',LONGSHOT_J1:'Longshot Plus · J1 research'};
const DIM_LABEL = {week:'Week',slate:'Slate',game:'Game',market:'Market',position:'Position',direction:'Direction',price:'Price band',probability:'Est. hit band',ev:'V3 EV band',score:'Signal band',recommendation:'Recommendation',highlight:'Highlight'};
function lastCell(s) {
  if (s.mode === 'leg') return '<span class="mut">Leg hit only</span>';
  if (s.mode === 'diagnostic') return '<span class="mut">Diagnostic</span>';
  if (s.missingPrice) return '<span class="mut">Prices incomplete</span>';
  return isNum(s.roi) ? '<span class="num ' + (s.roi >= 0 ? 'pos' : 'neg') + '">' + sev(s.roi) + '</span>' : '—';
}
function sumRow(label, s) {
  return '<tr><td class="wrap"><b>' + esc(label) + '</b></td><td class="r num ph">' + s.n + '</td><td class="r num">' + recd(s.record) + '</td><td class="r num">' + pct(s.hit) + '</td><td class="r num ph">' + odd(s.avg) + '</td><td class="r">' + lastCell(s) + '</td></tr>';
}
const sumHead = first => '<thead><tr><th>' + esc(first) + '</th><th class="r ph">Graded</th><th class="r">Record</th><th class="r">Hit rate</th><th class="r ph">Avg price</th><th class="r">Hyp. ROI / use</th></tr></thead>';
const tbl = inner => '<div class="box"><table class="dt">' + inner + '</table></div>';
const tblc = inner => '<div class="box"><table class="dt cmp">' + inner + '</table></div>';
const famName = f => ({STRAIGHT:'Straight', LOWER_RISK:'Lower Risk', LONGSHOT_PLUS:'Longshot Plus', OTHER:'Other'})[f] || String(f || '').replace(/_/g, ' ');
const recd = r => esc(r).replace(/-/g, '–');
function viewPerf() {
  const all = S.core.perf, P = all[S.period];
  let h = '<section class="sec"><div class="sh"><div><h2>Performance</h2><p>Graded results of the BET / LEAN calls V3 locked in before kickoff.</p></div>' +
    '<div class="seg" role="group" aria-label="Results period"><button type="button" data-act="period" data-p="season" class="' + (S.period === 'season' ? 'on' : '') + '">Season to date</button><button type="button" data-act="period" data-p="week" class="' + (S.period === 'week' ? 'on' : '') + '">Week ' + esc(S.core.meta.week) + '</button></div></div>';
  if (P.withheld) {
    h += '<div class="note bad"><b>Results withheld: the data needs review.</b><br>' + esc(P.issues.slice(0, 6).join(' | ')) + (P.issueCount > 6 ? ' (and ' + (P.issueCount - 6) + ' more)' : '') + '</div></section>';
    return h + panelsSection(P, true);
  }
  h = h.replace('</div></div>', '</div></div>' + (S.period === 'season' ? '</section>' + resultsTop(all) + '<section class="sec">' : ''));
  const o = P.official.all;
  const offTotal = P.markets.straight.total.frozen, offPending = Math.max(0, offTotal - P.markets.straight.total.graded);
  const be = isNum(o.avg) ? (o.avg < 0 ? -o.avg / (-o.avg + 100) : 100 / (o.avg + 100)) : null;
  h += '<div class="ptiles">' +
    '<div class="ptile hero2"><div class="tl">Official record</div><div class="tv">' + o.w + '–' + o.l + '</div><div class="ts"><b>' + o.n + '</b> graded' + (o.p ? ' · ' + o.p + ' push' : '') + (o.v ? ' · ' + o.v + ' void' : '') + '</div></div>' +
    '<div class="ptile"><div class="tl">Hit rate</div><div class="tv ' + (isNum(o.hit) && be !== null && o.hit >= be ? 'pos' : '') + '">' + pct(o.hit) + '</div>' +
      (isNum(o.hit) && be !== null ? '<div class="bar" role="img" aria-label="' + pct(o.hit) + ' hit rate against ' + pct(be) + ' break-even"><i style="width:' + Math.min(100, o.hit * 100) + '%"></i><u style="left:' + (be * 100) + '%"></u></div><div class="ts">Break-even at the ' + odd(o.avg) + ' average price is <b>' + pct(be) + '</b></div>' : '<div class="ts">No settled calls yet</div>') + '</div>' +
    '<div class="ptile"><div class="tl">Hypothetical ROI</div><div class="tv ' + (isNum(o.roi) ? (o.roi >= 0 ? 'pos' : 'neg') : '') + '">' + sev(o.roi) + '</div><div class="ts">Flat 1 unit at each locked price</div></div>' +
    '<div class="ptile"><div class="tl">Official calls pending</div><div class="tv">' + comma(offPending) + '</div><div class="ts">of ' + comma(offTotal) + ' locked BET / LEAN calls; left out until they settle</div></div>' +
    '</div>';
  ((S.core.meta.snapshot || {}).warnings || []).forEach(w => { h += '<div class="note warn">' + esc(w) + '</div>'; });
  h += '</section>';
  if (S.period === 'season') h += fcTile(S.core.fcCheck) + ladderTile() + lrTile();
  h += '<section class="sec"><div class="sh"><div><h3>By recommendation</h3></div></div>' +
    tbl(sumHead('Call') + '<tbody>' + sumRow('All official', P.official.all) + sumRow('BET', P.official.bet) + sumRow('LEAN', P.official.lean) + '</tbody>') +
    fold('off-list', 'Every official call', 'The original locked recommendations, oldest week first.', P.officialList.length, () =>
      tbl('<thead><tr><th>Week</th><th>Player / selection</th><th>Status</th><th class="r">Locked price</th><th>Result</th></tr></thead><tbody>' +
        P.officialList.map(x => '<tr><td>W' + x[0] + '</td><td class="wrap"><b>' + esc(x[1]) + '</b> ' + esc(dirWord(x[2]) + ' ' + x[3] + ' ' + x[4]) + '</td><td>' + esc(x[5]) + '</td><td class="r num">' + odd(x[6]) + '</td><td class="' + resCls(x[7]) + '">' + esc(x[7]) + '</td></tr>').join('') + '</tbody>')) +
    '</section>';
  const al = P.allLines;
  h += '<section class="sec split"><div class="diag"><div class="tl">Every line V3 evaluated · diagnostic only</div>' +
    '<div class="drow"><div><b>' + comma(P.rows) + '</b><span>Locked</span></div><div><b>' + comma(P.graded) + '</b><span>Graded</span></div><div><b>' + comma(al.w) + '–' + comma(al.l) + '</b><span>Line record' + (al.v ? ' · ' + comma(al.v) + ' void' : '') + '</span></div></div>' +
    '<p>Includes rejected lines and several alternate lines per player that move together, so this isn\'t a betting record.</p></div>' +
    '<div class="diag"><div class="tl">How the estimate is built</div><div class="drow"><div><b>25 / 75</b><span>Raw model / market</span></div></div>' +
    '<p>Signal (S1) ranks Straights. The official Est. hit and the locked price decide BET or LEAN.</p></div></section>';
  return h + panelsSection(P, false);
}
const resCls = g => g === 'WIN' ? 'res-w' : g === 'LOSS' ? 'res-l' : 'res-o';
const PANELS = [
  ['markets', 'Record by prop type', 'W–L and win % per market'],
  ['toprank', '#1 rank tracker', 'Top Straight per game, slate and week'],
  ['signal', 'Signal & action splits', 'BET, Highlight LEAN, regular LEAN'],
  ['rank', 'Rank performance', 'Do higher ranks win more?'],
  ['breakdown', 'Breakdown explorer', 'By market, price, probability, game…'],
  ['calibration', 'Calibration', 'Predicted vs actual hit rate'],
  ['audit', 'Audit trail', 'Every locked call and its result'],
  ['research', 'Archived S1 / L1 / J1 studies', 'Weeks 1–3 research, kept separate'],
  ['coverage', 'Coverage & definitions', 'What each number means, and its limits']
];
function panelsSection(P, withheld) {
  const list = withheld ? PANELS.filter(p => p[0] === 'research' || p[0] === 'coverage') : PANELS;
  let h = '<section class="sec"><div class="sh"><div><h3>Go deeper</h3><p>Each opens below. Nothing here changes the record above.</p></div></div><div class="plist">' +
    list.map(p => '<button class="pbtn' + (S.panel === p[0] ? ' on' : '') + '" type="button" data-act="panel" data-id="' + p[0] + '" aria-expanded="' + (S.panel === p[0]) + '"><div><b>' + esc(p[1]) + '</b><span>' + esc(p[2]) + '</span></div>' + CHEV + '</button>').join('') + '</div>';
  if (S.panel) h += '<div class="panel" id="panel">' + panel(S.panel, P) + '</div>';
  const m = S.core.meta;
  h += '</section><div class="method"><span><b>Probability</b> ' + esc(m.probabilityVersion) + '</span><span><b>Rules</b> ' + esc(m.ruleVersion) + '</span><span><b>Production</b> ' + esc(m.productionVersion) + '</span><span>ROI is hypothetical, not actual wagers.</span></div>';
  return h;
}
function selectBox(id, label, map, cur) {
  return '<label>' + esc(label) + '<select class="sel" data-p="' + id + '">' + Object.keys(map).map(k => '<option value="' + k + '"' + (k === cur ? ' selected' : '') + '>' + esc(map[k]) + '</option>').join('') + '</select></label>';
}
function panel(id, P) {
  if (id === 'markets') {
    const mt = (rep, kind) => tblc('<thead><tr><th>Prop type</th><th class="r">Locked</th><th class="r">Graded</th><th class="r">W–L</th><th class="r">Push</th><th class="r">Void</th><th class="r">Win %</th></tr></thead><tbody>' +
      rep.rows.concat([rep.total]).map((s, i, a) => '<tr class="' + (i === a.length - 1 ? 'tot' : '') + '"><td><b>' + esc(s.market) + '</b></td><td class="r num">' + s.frozen + '</td><td class="r num">' + s.graded + '</td><td class="r num">' + s.w + '–' + s.l + '</td><td class="r num">' + s.p + '</td><td class="r num">' + s.v + '</td><td class="r num">' + pct(s.hit) + '</td></tr>').join('') + '</tbody>');
    return '<h3>Record by prop type</h3><p>Win % = WIN ÷ (WIN + LOSS). Pushes and voids are counted separately. A dash means no settled sample, not 0%.</p>' +
      '<div class="two"><div><h4>Official Straight · BET / LEAN</h4>' + mt(P.markets.straight) + '</div><div><h4>Lower Risk · Sunday Top 9 legs</h4>' + mt(P.markets.lowerRisk) + '<p class="mut" style="font-size:12px">Leg hit rate, not parlay-ticket win rate or ROI.</p></div></div>';
  }
  if (id === 'toprank') {
    const c = (label, t) => { const s = t.pref.s, a = t.act.s;
      return '<div class="rcard"><div class="tl">' + label + ' #1</div><div class="tv">' + (s.n ? recd(s.record) : '—') + '</div><div class="ts"><b>' + pct(s.hit) + '</b> · preferred S1 · ' + s.n + ' graded of ' + t.pref.total + (t.pref.pending ? ' · ' + t.pref.pending + ' pending' : '') + '</div>' +
        '<div class="act2"><b>Actionable:</b> ' + (a.n ? recd(a.record) + ' · ' + pct(a.hit) + ' · ' + (a.missingPrice ? 'ROI unavailable' : sev(a.roi) + ' hyp. ROI') : 'no graded BET/LEAN #1 yet') + '</div></div>'; };
    return '<h3>#1 rank tracker</h3><p>How the top-ranked Straight did in each game, slate window and week. Week rank is rebuilt from locked Signal scores only.</p>' +
      '<div class="rcards">' + c('Game', P.topRank.game) + c('Slate', P.topRank.slate) + c('Week', P.topRank.week) + '</div>';
  }
  if (id === 'signal') {
    return '<h3>Signal & action splits</h3><p>BET and LEAN are price/action labels; Highlight is ranking strength. Lower Risk is leg outcomes only.</p>' +
      tbl(sumHead('Population') + '<tbody>' + P.signal.map(x => sumRow(x.label, x.s)).join('') + '</tbody>');
  }
  if (id === 'rank') {
    const R = P.rank[S.rankPop][S.rankDim];
    return '<h3>Rank performance</h3><p>Do higher-ranked plays beat lower-ranked ones? Game and slate ranks are the locked fields; week rank is rebuilt from locked Signal scores.</p>' +
      '<div class="pctl">' + selectBox('rankPop', 'Population', POP_LABEL, S.rankPop) + selectBox('rankDim', 'Ranking level', {game:'Game rank', slate:'Slate rank', week:'Week rank'}, S.rankDim) + '</div>' +
      '<div class="two"><div><h4>Exact rank</h4>' + tbl(sumHead('Rank') + '<tbody>' + R.exact.map(x => sumRow(x.label, x.s)).join('') + '</tbody>') + '</div>' +
      '<div><h4>Cumulative top-N</h4>' + tbl(sumHead('Window') + '<tbody>' + R.top.map(x => sumRow(x.label, x.s)).join('') + '</tbody>') + '</div></div>';
  }
  if (id === 'breakdown') {
    const B = P.breakdown[S.brPop];
    const rows = B[S.brDim] || [];
    return '<h3>Breakdown explorer</h3><p>Where V3 is winning or losing. Small samples are shown with their size, not hidden.</p>' +
      '<div class="pctl">' + selectBox('brPop', 'Population', POP_LABEL, S.brPop) + selectBox('brDim', 'Break down by', DIM_LABEL, S.brDim) + '<span class="mut" style="font-size:12px;align-self:center">' + B.n + ' graded</span></div>' +
      (rows.length ? tbl(sumHead(DIM_LABEL[S.brDim]) + '<tbody>' + rows.map(x => sumRow(x.label, x.s)).join('') + '</tbody>') : '<div class="empty">No graded rows in this population yet.</div>');
  }
  if (id === 'calibration') {
    const cr = (label, m) => '<tr><td><b>' + esc(label) + '</b></td><td class="r num">' + m.n + '</td><td class="r num">' + pct(m.avg) + '</td><td class="r num">' + pct(m.actual) + '</td><td class="r num ' + (isNum(m.gap) ? (Math.abs(m.gap) <= 0.03 ? 'pos' : 'neg') : '') + '">' + (isNum(m.gap) ? (m.gap >= 0 ? '+' : '−') + Math.abs(m.gap * 100).toFixed(1) + ' pts' : '—') + '</td><td class="r num">' + (isNum(m.brier) ? m.brier.toFixed(4) : '—') + '</td><td class="r num">' + (isNum(m.logloss) ? m.logloss.toFixed(4) : '—') + '</td></tr>';
    const head = f => '<thead><tr><th>' + f + '</th><th class="r">N</th><th class="r">Avg predicted</th><th class="r">Actual</th><th class="r">Actual − pred.</th><th class="r">Brier</th><th class="r">Log loss</th></tr></thead>';
    return '<h3>Calibration</h3><p>Same graded preferred-Straight population for each probability layer. This measures calibration, not betting returns.</p>' +
      tbl(head('Probability layer') + '<tbody>' + P.calibration.layers.map(x => cr(x.label, x.m)).join('') + '</tbody>') +
      '<h4 style="margin:18px 0 8px">Official Est. hit by band · actionable Straights</h4>' +
      tbl(head('Band') + '<tbody>' + P.calibration.bands.map(x => cr(x.label, x.m)).join('') + '</tbody>');
  }
  if (id === 'audit') return auditPanel(P);
  if (id === 'research') return researchPanel();
  if (id === 'coverage') return coveragePanel(P);
  return '';
}
const AUDIT_POPS = {TRACKED:'Tracked / surfaced signals', STRAIGHT:'All Straight evaluations', LOWER_RISK:'All Lower Risk evaluations', LONGSHOT_PLUS:'All Longshot Plus evaluations', OTHER:'Other evaluations', ALL:'Every locked evaluation'};
function auditRowsLocal() {
  const wk = S.core.meta.week;
  return S.core.tracked.filter(r => (S.period === 'season' || r[0] === wk) && (S.auRes === 'ALL' || r[16] === S.auRes));
}
function auditPanel(P) {
  let rows, total, loading = false;
  if (S.auPop === 'TRACKED') { const all = auditRowsLocal(); total = all.length; rows = all.slice(0, S.auLimit); }
  else {
    const key = [S.period, S.auPop, S.auRes, S.auLimit].join('|');
    if (!S.au || S.au.key !== key) {
      loading = true;
      if (!S.auLoading) {
        S.auLoading = true;
        call('nflpBoardGetAudit', [{period: S.period, population: S.auPop, result: S.auRes, offset: 0, limit: S.auLimit}], s => {
          S.auLoading = false; S.au = Object.assign(JSON.parse(s), {key: key}); if (S.view === 'performance') render();
        }, e => { S.auLoading = false; S.au = {key: key, error: String(e && e.message || e), rows: [], total: 0}; render(); });
      }
      rows = []; total = 0;
    } else { rows = S.au.rows; total = S.au.total; }
  }
  let h = '<h3>Audit trail</h3><p>Every locked prediction as it stood before kickoff, with its verified result. Ranks are game / slate / week; for a week still in progress, week rank only covers games already locked.</p>' +
    '<div class="pctl">' + selectBox('auPop', 'Rows', AUDIT_POPS, S.auPop) + selectBox('auRes', 'Result', {ALL:'All results', WIN:'WIN', LOSS:'LOSS', PUSH:'PUSH', VOID:'VOID', PENDING:'PENDING'}, S.auRes) +
    '<span class="ev f" style="align-self:center">OFFICIAL LOCKED FORWARD RECORD</span></div>';
  if (loading) return h + '<div class="loading" style="padding:30px 0">Loading audit rows…</div>';
  if (S.au && S.au.error && S.auPop !== 'TRACKED') return h + '<div class="note bad">' + esc(S.au.error) + '</div>';
  h += '<div class="resinfo" style="margin-top:0"><span>' + comma(total) + ' rows' + (total > rows.length ? ' · showing ' + rows.length : '') + '</span></div>' +
    tbl('<thead><tr><th>Week · slate</th><th class="ph">Ranks</th><th>Player / selection</th><th class="ph">Family · status</th><th class="r ph">Signal</th><th class="r">Est. hit</th><th class="r ph">V3 EV</th><th class="r">Price</th><th>Result</th><th class="ph">Locked</th></tr></thead><tbody>' +
      rows.map(r => '<tr><td>W' + r[0] + ' · ' + esc(slateShort(r[1])) + '</td><td class="num ph">' + (r[2] || '—') + ' / ' + (r[3] || '—') + ' / ' + (r[4] || '—') + '</td><td class="wrap"><b>' + esc(r[5]) + '</b> ' + esc(dirWord(r[6]) + ' ' + r[7] + ' ' + r[8]) + '</td>' +
        '<td class="ph">' + esc(famName(r[9])) + ' · ' + esc(r[10] || '—') + (r[11] ? ' ' + STAR : '') + '</td><td class="r num ph">' + n1(r[12]) + '</td><td class="r num">' + pct(r[13]) + '</td><td class="r num ph ' + evCls(r[14]) + '">' + sev(r[14]) + '</td><td class="r num">' + odd(r[15]) + '</td>' +
        '<td class="' + resCls(r[16]) + '">' + esc(r[16]) + (r[17] !== null && r[17] !== undefined ? ' · ' + esc(r[17]) : '') + '</td><td class="mut ph">' + esc(fmtMin(r[18], {weekday:'short', hour:'numeric', minute:'2-digit'})) + '</td></tr>').join('') + '</tbody>');
  if (total > rows.length) h += '<button class="ghost showmore" type="button" data-act="audit-more">Show 75 more</button>';
  return h;
}
function researchPanel() {
  const hv = S.core.histValidation, hd = S.core.histDetail;
  const fam = {S1:'S1 · Straight ranking', L1:'L1 · Lower Risk parlay-leg ranking', J1:'J1 · Longshot Plus research'};
  let h = '<h3>Archived S1 / L1 / J1 studies</h3><p>Candidate research from before V3 went live. Never added to the official record above.</p>';
  ['S1', 'L1', 'J1'].forEach(k => {
    const rs = hv.filter(r => r.pop === k).sort((a, b) => a.week - b.week);
    if (!rs.length) return;
    h += '<h4 style="margin:16px 0 8px">' + fam[k] + '</h4>' + tbl('<thead><tr><th>Week · scope</th><th class="r">Pool</th><th class="r">Top 10</th><th class="r">Top-10 hit</th><th class="r">Study outcome</th></tr></thead><tbody>' +
      rs.map(r => '<tr><td>W' + r.week + ' · ' + (/PARTIAL/i.test(r.scope) ? 'partial forward' : /RETRO/i.test(r.scope) ? 'retrospective' : esc(r.scope)) + '</td><td class="r num">' + comma(r.pool) + '</td><td class="r num">' + comma(r.top10) + '</td><td class="r num">' + pct(r.hit) + '</td><td class="r">' + (k === 'L1' ? '<span class="mut">Leg hit only</span>' : '<span class="num">' + sev(r.roi) + '</span>') + '</td></tr>').join('') + '</tbody>');
  });
  if (!S.core.histDetailOk) return h + '<div class="note bad">Archived line-level detail failed its checksum and is withheld.</div>';
  const rows = hd.filter(r => String(r.Population).toUpperCase() === S.hiPop && (S.hiWeek === 'ALL' || String(r.Week) === S.hiWeek)).sort((a, b) => a.Week - b.Week || a.Rank - b.Rank);
  const rec = n => { const x = rows.filter(r => r.Rank <= n), w = x.filter(r => String(r.Grade).toUpperCase() === 'WIN').length, l = x.filter(r => String(r.Grade).toUpperCase() === 'LOSS').length; return '<tr><td><b>Top ' + n + '</b></td><td class="r num">' + (w + l) + '</td><td class="r num">' + w + '–' + l + '</td><td class="r num">' + (w + l ? pct(w / (w + l)) : '—') + '</td></tr>'; };
  const scope = r => { const x = hv.find(v => v.pop === String(r.Population).toUpperCase() && v.week === Number(r.Week)); const s = x ? x.scope : ''; return /RETRO/i.test(s) ? '<span class="ev r">RETROSPECTIVE</span>' : /PARTIAL/i.test(s) ? '<span class="ev p">PARTIAL FORWARD</span>' : '<span class="ev x">RESEARCH</span>'; };
  const shown = rows.slice(0, S.hiLimit);
  h += '<h4 style="margin:22px 0 8px">Line-level selections</h4><div class="pctl">' + selectBox('hiPop', 'Family', {S1:'S1 · Straight', L1:'L1 · Lower Risk', J1:'J1 · Longshot Plus'}, S.hiPop) +
    selectBox('hiWeek', 'Week', {ALL:'All archived weeks', '1':'Week 1', '2':'Week 2', '3':'Week 3'}, S.hiWeek) + '</div>' +
    tbl('<thead><tr><th>Window</th><th class="r">N</th><th class="r">Record</th><th class="r">Hit rate</th></tr></thead><tbody>' + [1, 3, 5, 10, 20].map(rec).join('') + '</tbody>') +
    '<div style="height:12px"></div>' +
    tbl('<thead><tr><th>Evidence</th><th>Week · rank</th><th class="r">Score</th><th>Player / selection</th><th class="r">Price</th><th>Grade</th><th class="r">V1 P / EV</th><th class="r">Adverse P</th><th class="r">Robust.</th></tr></thead><tbody>' +
      shown.map(r => '<tr><td>' + scope(r) + '</td><td>W' + r.Week + ' · #' + r.Rank + '</td><td class="r num">' + n1(r.Score) + '</td><td class="wrap"><b>' + esc(r.Player) + '</b> ' + esc(r.Team) + ' · ' + esc(dirWord(r.Direction) + ' ' + r.Line + ' ' + r.Market) + '</td><td class="r num">' + odd(r.Odds) + '</td><td class="' + resCls(String(r.Grade).toUpperCase()) + '">' + esc(r.Grade) + '</td><td class="r num">' + pct(r.V1P) + ' / ' + sev(r.V1EV) + '</td><td class="r num">' + pct(r.AdverseP) + '</td><td class="r num">' + pct(r.Robustness) + '</td></tr>').join('') + '</tbody>');
  if (rows.length > shown.length) h += '<button class="ghost showmore" type="button" data-act="hist-more">Show 60 more</button>';
  return h + '<p class="mut" style="font-size:12px;margin-top:12px">Weeks 1–2 are retrospective rule-development data. Week 3 is a partial forward sample. L1 leg hit rate does not establish parlay profitability.</p>';
}
function coveragePanel(P) {
  const d = (t, x) => '<div><b>' + esc(t) + '</b><p>' + esc(x) + '</p></div>';
  return '<h3>Coverage & definitions</h3><p>What this page can prove, and what it refuses to invent.</p><div class="defs">' +
    d('Forward locked evidence', comma(P.graded) + ' graded locked evaluations in this period. Closed weeks are checked against the week archive (counts, decision IDs and the archive digest) on every refresh.') +
    d('Archived validation', comma(S.core.histDetail.length) + ' S1/L1/J1 line-level rows from the archived validation workbook, checksum-verified before display.') +
    d('Lower Risk parlay ROI', 'Not available until real combination prices and outcomes are recorded. Leg hit rate is never shown as parlay profitability.') +
    d('Hypothetical ROI', 'Flat 1 unit at each locked captured price. Not actual wagers.') +
    d('VOID', 'Excluded from hit rate and ROI. Either a verified sportsbook void, or a conservative exclusion when the box score could not verify participation.') +
    d('BET', 'Actionable Straight clearing the S1 Highlight requirement and the official V3 EV/price gate.') +
    d('Highlight LEAN', 'S1 ≥ 80 but the BET gate was not met at the locked price. Highlight is ranking strength, not a wager instruction.') +
    d('Game / Slate / Week rank', 'Game and slate ranks are locked fields. Week rank is rebuilt from locked Signal scores within each family and week; outcomes never affect rank.') +
    d('Small samples', 'Shown with their size. Isolated splits are not reasons to change locked rules.') +
    '</div>';
}

/* ---------------- Portfolio / System ---------------- */
function viewPortfolio() {
  const rows = S.core.portfolio;
  return '<section class="sec"><div class="sh"><div><h2>Portfolio</h2><p>Tracked wagers. V3 never builds parlay tickets for you.</p></div></div>' +
    (rows.length ? tbl('<thead><tr><th>Player</th><th>Prop</th><th>Model price</th><th>Bet price</th><th class="r">Stake</th><th>Status</th><th>Grade</th><th class="r">Profit</th></tr></thead><tbody>' +
      rows.map(r => '<tr><td><b>' + esc(r.player) + '</b></td><td>' + esc(r.prop) + '</td><td>' + esc(r.model) + '</td><td>' + esc(r.bet || '—') + '</td><td class="r num">' + esc(r.stake || '—') + '</td><td>' + esc(r.status) + '</td><td class="' + resCls(r.grade) + '">' + esc(r.grade) + '</td><td class="r num">' + esc(r.profit) + '</td></tr>').join('') + '</tbody>')
      : '<div class="empty">No tracked wagers yet. Rows added to the PORTFOLIO sheet show up here.</div>') + '</section>';
}
function viewSystem() {
  const m = S.core.meta, c = m.counts, sn = m.snapshot || {};
  const ok = v => v === 'PASS' || v === 'V3_READY' || v === 'DIRECT_SGO';
  const card2 = (label, v) => '<div class="ptile"><div class="tl">' + esc(label) + '</div><div class="tv" style="font-size:26px;' + (ok(v) ? 'color:var(--mint)' : '') + '">' + esc(v || '—') + '</div></div>';
  const kv = (k, v) => '<tr><td>' + esc(k) + '</td><td>' + esc(v == null || v === '' ? '—' : v) + '</td></tr>';
  return '<section class="sec"><div class="sh"><div><h2>System</h2><p>Operational health of the last build and of this page.</p></div></div>' +
    '<div class="syst">' + card2('Build state', m.buildState) + card2('Autonomous source', m.autonomyStatus) + card2('Phase 3', m.phase3Status) + card2('Phase 4', m.phase4Status) + card2('Odds mode', m.oddsMode) + card2('Grading', m.p5Grade) + '</div>' +
    '<div class="box" style="margin-top:16px"><table class="kv"><tbody>' +
      kv('Season / week', m.season + ' / ' + m.week) + kv('Last successful build', fullTime(m.lastBuild)) + kv('Last freeze', fullTime(m.lastFreeze)) + kv('Last closed week', m.lastClosedWeek) +
      kv('Projection tabs', m.projectionTabs) + kv('Source players', c.sourcePlayers) + kv('Props evaluated', comma(c.props)) + kv('Missing-projection rows', comma(c.missingProjection)) +
      kv('Locked decision rows', comma(c.frozen)) + kv('Versions', [m.productionVersion, m.probabilityVersion, m.ruleVersion, m.version].join(' · ')) +
      kv('Page data built', fullTime(sn.builtAt) + (isNum(sn.seconds) ? ' · ' + sn.seconds + 's' : '')) + kv('Page data size', 'All props ' + sn.propsKB + ' KB · player view ' + (sn.playersKB != null ? sn.playersKB : '—') + ' KB · audit files ' + sn.auditKB + ' KB') + kv('Sportsbook lines tab', S.core.vegas && S.core.vegas.tab ? S.core.vegas.tab : 'not found for this week') +
      kv('Data fingerprint', sn.fingerprint) + kv('Warnings', (sn.warnings || []).join(' | ')) +
    '</tbody></table></div></section>';
}

/* ---------------- events ---------------- */
document.addEventListener('click', e => {
  const v = e.target.closest('[data-view]');
  if (v) { setView(v.dataset.view); return; }
  const a = e.target.closest('[data-act]');
  if (!a) return;
  const act = a.dataset.act;
  if (act === 'pc') { openPC(a.dataset.pid, a.dataset.m, a.dataset.dr, a.dataset.k); return; }
  if (act === 'pc-m') { S.pc.m = a.dataset.m; S.pc.k = ''; renderPC(); return; }
  if (act === 'pc-close') { S.pc = null; renderPC(); return; }
  if (act === 'shop-add') { const c = shopCurrentCard(); if (!c) return; const st = shopState(c), last = st.rows[st.rows.length - 1] || {};
    st.rows.push({bk: '', dr: last.dr || c.dr || 'OVER', ln: last.ln || '', o: '', bo: ''}); renderPC();
    const ins = document.querySelectorAll('#shopRows .srow:last-child input'); if (ins[0]) ins[0].focus(); return; }
  if (act === 'shop-fill') { const c = shopCurrentCard(); if (!c) return; const ln = Number(a.dataset.ln);
    const p = shopCurve(c.pid, c.m, c.dr || 'OVER').find(x => x.ln === ln) || {};
    const st = shopState(c), row = {bk: p.bk ? book(p.bk) : '', dr: c.dr || 'OVER', ln: String(ln), o: isNum(p.o) ? (p.o > 0 ? '+' + p.o : String(p.o)) : '', bo: ''};
    const blank = st.rows.findIndex(r => !String(r.o).trim());
    if (blank >= 0) st.rows[blank] = row; else st.rows.push(row);
    renderPC(); const el = document.getElementById('shop'); if (el) el.scrollIntoView({block: 'nearest'}); return; }
  if (act === 'slip-add') { const c = shopCurrentCard(); if (!c) return; const r = shopState(c).rows[Number(a.dataset.i)], x = shopCalc(c, r);
    slipAdd({pid: c.pid, p: c.p, tm: c.tm, op: c.op, pos: c.pos, e: c.e, m: c.m, dr: r.dr, ln: Number(r.ln), o: r.o, bo: r.bo, bk: r.bk, hp: x.hp}); return; }
  if (act === 'slip-open') { S.slipOpen = true; renderSlip(); return; }
  if (act === 'slip-close') { S.slipOpen = false; renderSlip(); return; }
  if (act === 'slip-del') { S.slip.splice(Number(a.dataset.i), 1); slipSave(); renderSlip(); return; }
  if (act === 'slip-clear') { S.slip = []; S.slipBook = ''; slipSave(); S.slipOpen = false; renderSlip(); return; }
  if (act === 'lr-load') { const c = S.core.lr.current, t = (a.dataset.t === 'g' ? c.sgps : c.parlays)[Number(a.dataset.i)];
    if (!t) return;
    S.slip = t.legs.map(l => ({pid: l.pid, p: l.p, tm: l.tm, op: l.op, pos: l.pos, e: l.e, m: l.m, dr: 'OVER', ln: l.ln, o: isNum(l.o) ? (l.o > 0 ? '+' + l.o : String(l.o)) : '', bo: '', bk: book(l.bk), hp: l.hp}));
    S.slipBook = ''; slipSave(); S.slipOpen = true; renderSlip(); return; }
  if (act === 'slip-load') { const c = S.core.ladder.current, pr = c.pairs[Number(a.dataset.i)];
    S.slip = pr.map(j => { const l = c.legs[j]; return {pid: l.pid, p: l.p, tm: l.tm, op: l.op, pos: l.pos, e: l.e, m: l.m, dr: l.dr, ln: l.ln, o: isNum(l.o) ? (l.o > 0 ? '+' + l.o : String(l.o)) : '', bo: '', bk: book(l.bk), hp: l.hp}; });
    S.slipBook = ''; slipSave(); S.slipOpen = true; renderSlip(); return; }
  if (act === 'shop-del') { const c = shopCurrentCard(); if (!c) return; shopState(c).rows.splice(Number(a.dataset.i), 1); renderPC(); return; }
  if (act === 'sub') { if (a.dataset.for === 'explore') { S.exSub = a.dataset.v; if (a.dataset.v === 'games') S.gameOpen = false; } else S.reSub = a.dataset.v; setTab(a.dataset.for); return; }
  if (act === 'tf') { S.tf = a.dataset.v; render(); return; }
  if (act === 'tdmode') { S.tdMode = a.dataset.v; saveToday(); render(); return; }
  if (act === 'tdsort') { S[a.dataset.k] = a.dataset.v; saveToday(); render(); return; }
  if (act === 'card') { const k = a.dataset.k; S.open[k] = !S.open[k]; render(); return; }
  if (act === 'wl') { const k = a.dataset.k; S.wlOpen[k] = !S.wlOpen[k]; render(); return; }
  if (act === 'wlf') { S.wlf = a.dataset.f; render(); return; }
  if (act === 'fold') { const id = a.dataset.id; S.folds[id] = !S.folds[id]; render(); return; }
  if (act === 'game') { S.game = a.dataset.id; S.gameOpen = true; S.folds['g-review'] = S.folds['g-lr'] = S.folds['g-j1'] = S.folds['g-watch'] = false; render(); window.scrollTo(0, 0); return; }
  if (act === 'game-back') { S.gameOpen = false; render(); window.scrollTo(0, 0); return; }
  if (act === 'game-props') { S.pf = Object.assign({}, S.pf, {chip:'all', game:a.dataset.id}); S.limit = 100; S.openRow = -1; setView('props'); return; }
  if (act === 'chip') { S.pf.chip = a.dataset.q; S.limit = 100; S.openRow = -1; render(); return; }
  if (act === 'sort') { const k = a.dataset.key; S.sort = {key:k, dir: S.sort.key === k ? -S.sort.dir : (k === 'p' || k === 'm' || k === 'st' ? 1 : -1)}; refreshTable(); return; }
  if (act === 'row') { const i = Number(a.dataset.i); S.openRow = S.openRow === i ? -1 : i; refreshTable(); return; }
  if (act === 'more-rows') { S.limit += 100; refreshTable(); return; }
  if (act === 'more-filters') { S.pf.more = !S.pf.more; render(); return; }
  if (act === 'clear-filters') { S.pf = Object.assign({}, S.pf, {q:'', market:'ALL', game:'ALL', status:'ALL', pos:'ALL', book:'ALL', fam:'ALL', dir:'ALL', chip:'all'}); S.limit = 100; render(); return; }
  if (act === 'clear-game') { S.pf.game = 'ALL'; render(); return; }
  if (act === 'period') { S.period = a.dataset.p; S.au = null; render(); return; }
  if (act === 'panel') { S.panel = S.panel === a.dataset.id ? '' : a.dataset.id; render(); const p = $('panel'); if (p) p.scrollIntoView({behavior:'smooth', block:'start'}); return; }
  if (act === 'audit-more') { S.auLimit += 75; render(); return; }
  if (act === 'hist-more') { S.hiLimit += 60; render(); return; }
  if (act === 'mode') { setMode(a.dataset.m === 'analyst'); return; }
  if (act === 'mode-toggle') { setMode(!S.analyst); $('sheet').classList.remove('open'); return; }
  if (act === 'guide') { $('guide').classList.add('open'); $('sheet').classList.remove('open'); return; }
  if (act === 'guide-close') { $('guide').classList.remove('open'); return; }
  if (act === 'sheet') { $('sheet').classList.toggle('open'); return; }
  if (act === 'retry') { $('main').innerHTML = '<div class="loading">Loading this week\'s board…</div>'; loadCore(); return; }
  if (act === 'retry-props') { S.propsError = ''; render(); loadProps(); return; }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { $('guide').classList.remove('open'); if (S.slipOpen) { S.slipOpen = false; renderSlip(); } else if (S.pc) { S.pc = null; renderPC(); } }
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('tr.row, .hero.pcopen, .td-row.pcopen, .krow.pcopen')) { e.preventDefault(); e.target.click(); }
});
$('guide').addEventListener('click', e => { if (e.target === $('guide')) $('guide').classList.remove('open'); });
let qTimer = null;
document.addEventListener('input', e => {
  if (e.target.dataset && e.target.dataset.slip) {
    const k = e.target.dataset.slip;
    if (k === 'book') S.slipBook = e.target.value;
    else { const l = S.slip[Number(e.target.dataset.i)]; if (l) l[k] = e.target.value; }
    slipSave(); slipRefresh(); return;
  }
  if (e.target.dataset && e.target.dataset.shop) {
    const c = shopCurrentCard(); if (!c) return;
    const i = Number(e.target.dataset.i), row = shopState(c).rows[i];
    if (row) { row[e.target.dataset.shop] = e.target.value; shopRefresh(i); }
    return;
  }
  if (e.target.dataset && e.target.dataset.f === 'q') {
    clearTimeout(qTimer);
    const val = e.target.value;
    qTimer = setTimeout(() => { S.pf.q = val; S.limit = 100; S.openRow = -1; refreshTable(); }, 180);
  }
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.dataset && (t.dataset.shop || t.dataset.slip)) return;
  if (t.dataset.f && t.dataset.f !== 'q') {
    if (t.dataset.f === 'sort') S.sort = {key: t.value, dir: t.value === 'p' ? 1 : -1};
    else S.pf[t.dataset.f] = t.value;
    S.limit = 100; S.openRow = -1;
    render();
    return;
  }
  if (t.dataset.p) {
    S[t.dataset.p] = t.value;
    if (t.dataset.p.indexOf('au') === 0) { S.auLimit = 75; S.au = null; }
    if (t.dataset.p.indexOf('hi') === 0) S.hiLimit = 60;
    render();
  }
});
function refreshTable() { const box = $('ptable'); if (box && S.props) box.innerHTML = propsTable(); else render(); }
function setMode(an) { S.analyst = an; try { localStorage.setItem('nflp_analyst', an ? '1' : '0'); } catch (e) {} render(); }

setView(!INITIAL_VIEW || INITIAL_VIEW === 'picks' ? 'today' : INITIAL_VIEW);
loadCore();

// A full reload keeps the separately loaded dashboard sections in sync.
document.getElementById('home-refresh').onclick = () => location.reload();
let homeHiddenAt = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) homeHiddenAt = Date.now();
  else if (homeHiddenAt && Date.now() - homeHiddenAt > 30 * 60 * 1000) location.reload();
});
