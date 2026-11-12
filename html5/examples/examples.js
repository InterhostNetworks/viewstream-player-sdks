/* Helper for the example pages only. Your site does not need this file.
   It prints each example's code on the page, and reads your tenant and channel from ../kit.config.js. */
(function () {
  'use strict';
  var CDN = 'https://player.viewstream.co.il/';
  var KIT = window.VS_KIT || {};
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var HE = document.documentElement.lang === 'he';   /* the Hebrew pages in he/ share this file */
  /* On the web there is no kit.config.js to edit: the tenant and channel can come from the page address instead
     (?tenant=my-company&channel=main), which is what the small form of tenantForm() does. */
  var Q = new URLSearchParams(location.search);
  function slug(v, d) { return String(v || d || '').trim().replace(/[^A-Za-z0-9_-]/g, '').slice(0, 64); }
  var TENANT = slug(Q.get('tenant') || KIT.tenant).toLowerCase(), CHANNEL = slug(Q.get('channel') || KIT.channel, 'main');
  var NO_SOURCE = HE ? 'פתחו את העמוד דרך serve.py כדי לראות כאן את הקוד שלו.' : 'Open this page through serve.py to see its code here.';

  function attr(v) { return String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }
  function dash(k) { return k.replace(/[A-Z]/g, function (c) { return '-' + c.toLowerCase(); }); }
  function put(id, text) { var el = document.getElementById(id); if (el) { el.textContent = text; } }

  /* Prints the part of this page between the example:start and example:end comments, exactly as it is written. */
  function showSource(id) {
    fetch(location.href).then(function (r) { return r.text(); }).then(function (html) {
      var m = /<!-- example:start -->\s*\n([\s\S]*?)\n\s*<!-- example:end -->/.exec(html);
      put(id || 'code', m ? m[1] : NO_SOURCE);
    }, function () { put(id || 'code', NO_SOURCE); });
  }

  /* The HTML of a player tag: attrs become data-* attributes, options become data-options (JSON). */
  function tagHtml(attrs, options) {
    var h = '<script async src="' + CDN + 'embed.js"';
    Object.keys(attrs).forEach(function (k) {
      if (attrs[k] !== undefined && attrs[k] !== null && attrs[k] !== '') { h += '\n        data-' + dash(k) + '="' + attr(attrs[k]) + '"'; }
    });
    if (options && Object.keys(options).length) { h += "\n        data-options='" + JSON.stringify(options).replace(/&/g, '&amp;').replace(/'/g, '&#39;') + "'"; }
    return h + '><\/script>';
  }

  /* Adds a player tag to the page. This does the same as writing the tag in your HTML.
     hidden: options used on this page only and left out of the printed code (see quiet() below). */
  function playerTag(attrs, options, hidden) {
    var s = document.createElement('script'), all = {}, k;
    s.async = true;
    s.src = CDN + 'embed.js';
    Object.keys(attrs).forEach(function (key) {
      if (attrs[key] !== undefined && attrs[key] !== null && attrs[key] !== '') { s.dataset[key] = attrs[key]; }
    });
    for (k in options || {}) { all[k] = options[k]; }
    for (k in hidden || {}) { all[k] = hidden[k]; }
    if (Object.keys(all).length) { s.dataset.options = JSON.stringify(all); }
    document.body.appendChild(s);
    return tagHtml(attrs, options);
  }

  /* Your own content played from this kit must not count in your statistics, so viewing reports are turned off
     while the page runs on your computer. On your site, leave them on: do not copy this option. */
  function quiet() { return LOCAL ? { beacon: false } : {}; }

  /* Your tenant's public player configuration. It also names your CDN host (cdn_hostname). */
  function tenantConfig(tenant) {
    return fetch(CDN + 'player/config/' + encodeURIComponent(tenant) + '.json').then(function (r) {
      if (!r.ok) { throw new Error(HE ? 'ה-tenant "' + tenant + '" לא נמצא.' + (LOCAL ? ' בדקו את kit.config.js.' : '') : 'tenant "' + tenant + '" was not found.' + (LOCAL ? ' Check kit.config.js.' : '')); }
      return r.json();
    });
  }

  /* On the web: a two-field form that reloads the page with your tenant and channel. In the kit, kit.config.js does this. */
  function tenantForm(id) {
    var box = document.getElementById(id);
    if (!box || LOCAL) { return; }
    var f = document.createElement('form'), add = function (name, label, value, hint) {
      var l = document.createElement('label'), i = document.createElement('input');
      l.textContent = label + ' ';
      i.name = name; i.value = value; i.placeholder = hint; i.maxLength = 64; i.spellcheck = false; i.dir = 'ltr';
      l.appendChild(i); f.appendChild(l); f.appendChild(document.createTextNode(' '));
    };
    f.method = 'get'; f.className = 'tenantform';
    add('tenant', HE ? 'ה-tenant שלכם:' : 'Your tenant:', TENANT, 'my-company');
    add('channel', HE ? 'ערוץ:' : 'Channel:', TENANT ? CHANNEL : '', 'main');
    var b = document.createElement('button'); b.type = 'submit'; b.textContent = HE ? 'הצגה' : 'Show';
    f.appendChild(b);
    box.appendChild(f);
  }

  window.VSExamples = {
    cdn: CDN, kit: KIT, local: LOCAL, tenant: TENANT, channel: CHANNEL,
    put: put, showSource: showSource, tagHtml: tagHtml, playerTag: playerTag, quiet: quiet, tenantConfig: tenantConfig,
    tenantForm: tenantForm
  };
})();
