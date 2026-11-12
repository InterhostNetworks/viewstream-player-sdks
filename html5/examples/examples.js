/* Helper for the example pages only. Your site does not need this file.
   It prints each example's code on the page, and reads your tenant and channel from ../kit.config.js. */
(function () {
  'use strict';
  var CDN = 'https://player.viewstream.co.il/';
  var KIT = window.VS_KIT || {};
  var LOCAL = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

  function attr(v) { return String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }
  function dash(k) { return k.replace(/[A-Z]/g, function (c) { return '-' + c.toLowerCase(); }); }
  function put(id, text) { var el = document.getElementById(id); if (el) { el.textContent = text; } }

  /* Prints the part of this page between the example:start and example:end comments, exactly as it is written. */
  function showSource(id) {
    fetch(location.href).then(function (r) { return r.text(); }).then(function (html) {
      var m = /<!-- example:start -->\s*\n([\s\S]*?)\n\s*<!-- example:end -->/.exec(html);
      put(id || 'code', m ? m[1] : 'Open this page through serve.py to see its code here.');
    }, function () { put(id || 'code', 'Open this page through serve.py to see its code here.'); });
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
      if (!r.ok) { throw new Error('tenant "' + tenant + '" was not found. Check kit.config.js.'); }
      return r.json();
    });
  }

  window.VSExamples = {
    cdn: CDN, kit: KIT, local: LOCAL, tenant: String(KIT.tenant || '').trim(), channel: String(KIT.channel || 'main').trim(),
    put: put, showSource: showSource, tagHtml: tagHtml, playerTag: playerTag, quiet: quiet, tenantConfig: tenantConfig
  };
})();
