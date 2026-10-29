/* nav.js — 全ページ共通のナビゲーション／「他の事例」カード
   各ページの <head> に（この順で）:
     <script src="works.js" defer></script>
     <script src="tech.js" defer></script>
     <script src="nav.js" defer></script>
   ※ tech.js を入れ忘れたページでも、nav.js が自動で読み込みます。 */
(function () {
  var nav = document.getElementById('nav');
  var btn = document.getElementById('menuBtn');
  if (!nav) return;

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function isExt(w) { return w.source && w.source !== 'site'; }

  // ---- ハンバーガーボタン（古いページの個別スクリプトによる二重トグルを避けるため複製して置換）----
  if (btn) {
    var fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    btn = fresh;
    btn.setAttribute('aria-controls', 'nav');
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  function closeMenu() {
    nav.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
  nav.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  // ---- ナビ本体 ----
  function menuLinks(list) {
    return list.map(function (w) {
      var ext = isExt(w);
      return '<a href="' + esc(w.href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' +
             esc(w.title) + (ext ? ' ↗' : '') + '</a>';
    }).join('');
  }
  function menuGroup(label, href, list) {
    if (!list.length) return '<a href="' + href + '">' + label + '</a>';
    return '<div class="has-dropdown"><a href="' + href + '">' + label + '</a>' +
           '<div class="dropdown-menu">' + menuLinks(list) + '</div></div>';
  }

  // 現在のページ以外から n 件（一覧の並び順で現在ページの次から）
  function others(list, n) {
    var file = location.pathname.split('/').pop() || 'index.html';
    var cur = -1, out = [];
    list.forEach(function (w, i) { if (w.href === file) cur = i; });
    for (var k = 1; k <= list.length && out.length < n; k++) {
      var w = list[(cur + k + list.length) % list.length];
      if (w.href !== file) out.push(w);
    }
    return out;
  }
  // 技術検証：同じテーマ（group）を優先して n 件
  function othersTech(list, n) {
    var file = location.pathname.split('/').pop() || 'index.html';
    var me = null;
    list.forEach(function (w) { if (w.href === file) me = w; });
    var rest = others(list, list.length);
    if (!me || !me.group) return rest.slice(0, n);
    var same = rest.filter(function (w) { return w.group === me.group; });
    var diff = rest.filter(function (w) { return w.group !== me.group; });
    return same.concat(diff).slice(0, n);
  }
  function iconSvg(name) {
    var icons = window.ARANOVA_ICONS || {};
    return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (icons[name] || '') + '</svg>';
  }

  function workCard(w) {
    var tags = window.ARANOVA_TAGS || {}, sources = window.ARANOVA_SOURCES || {};
    var ext = isExt(w);
    var more = ext ? (sources[w.source] || '外部サイト') + 'で見る' : '詳細を見る';
    var tag = tags[w.tag] ? '<span class="tag' + (w.tag === 'camera' ? ' camera' : '') + '">' + esc(tags[w.tag]) + '</span>' : '';
    return '<article class="work-card"><div class="card-icon">' + iconSvg(w.icon) + '</div>' + tag +
      '<h3><a href="' + esc(w.href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(w.title) + '</a>' +
      (w.sub ? '<span class="card-sub">' + esc(w.sub) + '</span>' : '') + '</h3>' +
      '<p>' + esc(w.desc) + '</p><span class="card-more' + (ext ? ' external' : '') + '">' + more + '</span></article>';
  }
  function techCard(w) {
    return '<article class="service-card"><div class="card-icon">' + iconSvg(w.icon) + '</div>' +
      '<h3><a href="' + esc(w.href) + '">' + esc(w.title) + '</a>' +
      (w.sub ? '<span class="card-sub">' + esc(w.sub) + '</span>' : '') + '</h3>' +
      '<p>' + esc(w.desc) + '</p><span class="card-more">詳細を見る</span></article>';
  }

  // テーマ別の技術検証カード（2件・4件のグループは2列、それ以外は3列）
  function techGroupsHtml(list) {
    var groups = window.ARANOVA_TECH_GROUPS || {}, html = '', used = [];
    function block(title, items) {
      if (!items.length) return '';
      var cols = (items.length === 2 || items.length === 4) ? ' cols-2' : '';
      return '<div class="tech-group">' +
        (title ? '<h3 class="group-title">' + esc(title) + '</h3>' : '') +
        '<div class="services-grid' + cols + '">' + items.map(techCard).join('') + '</div></div>';
    }
    Object.keys(groups).forEach(function (key) {
      var items = list.filter(function (w) { return w.group === key; });
      items.forEach(function (w) { used.push(w); });
      html += block(groups[key].title, items);
    });
    var rest = list.filter(function (w) { return used.indexOf(w) < 0; });   // group 未設定は見出しなしで末尾
    html += block('', rest);
    return html;
  }

  function build() {
    var works = window.ARANOVA_WORKS || [], tech = window.ARANOVA_TECH || [];
    nav.innerHTML =
      '<a href="index.html">ホーム</a>' +
      '<a href="index.html#about">会社情報</a>' +
      menuGroup('技術検証', 'index.html#projects', tech) +
      menuGroup('活用事例', 'index.html#works', works) +
      '<a href="index.html#contact">お問い合わせ</a>';

    // 案例ページ下部：<div class="works-grid" id="otherWorks"></div>
    var ow = document.getElementById('otherWorks');
    if (ow && works.length) ow.innerHTML = others(works, 3).map(workCard).join('');
    // 首頁：<div id="techGroups"></div> にテーマ別（group）で技術検証カードを表示
    var tg = document.getElementById('techGroups');
    if (tg && tech.length) tg.innerHTML = techGroupsHtml(tech);
    // 技術検証ページ下部：<div class="services-grid" id="otherTech"></div>
    var ot = document.getElementById('otherTech');
    if (ot && tech.length) ot.innerHTML = othersTech(tech, 2).map(techCard).join('');
  }

  // tech.js が未読み込みのページは自動で読み込んでから構築
  if (window.ARANOVA_TECH) {
    build();
  } else {
    var s = document.createElement('script');
    s.src = 'tech.js';
    s.onload = build;
    s.onerror = build;
    document.head.appendChild(s);
  }
})();
