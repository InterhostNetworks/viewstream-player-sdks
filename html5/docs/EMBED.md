**English** | [עברית](EMBED.he.md)

# Putting the player on a page

In these examples, replace `<tenant>` with your ViewStream tenant, `<channel>` with your channel, and `<cdn-host>` with
your CDN hostname. Your hostname is the `cdn_hostname` value at
`https://player.viewstream.co.il/player/config/<tenant>.json`. You can also copy ready-made code from ViewStream
Studio: open a channel, clip or video and use **Embed & share**.

## Use the iframe by default

```html
<iframe src="https://player.viewstream.co.il/e/<tenant>/live/<channel>"
        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen
        style="aspect-ratio:16/9;width:100%;border:0"></iframe>
```

This is the recommended embed. ViewStream chooses the stream and the settings, so player updates and stream changes
reach your site without any change on your side.

The path is `/e/<tenant>/live/<channel>`, `/e/<tenant>/vod/<video id>` or `/e/<tenant>/clip/<clip id>`.

| Query option | Meaning |
|---|---|
| `autoplay=1` | Start muted |
| `lang=he`, `en`, `ru` or `ar` | Player language |
| `config=<name>` | A named player configuration |
| `start=<seconds>` | Start position. Not for live |

## Player tag, when the page must talk to the player

```html
<div id="player"></div>
<script async src="https://player.viewstream.co.il/embed.js"
        data-target="#player"
        data-src="https://<cdn-host>/live/<tenant>/<channel>/master.m3u8"
        data-tenant="<tenant>"
        data-lang="en"></script>
```

Use this only if your page must listen to player events or lay itself out around the player. Agree the use with
ViewStream first. The stream URL is then fixed in your page, so a stream change needs a change on your site, and
settings on the page override the configuration in Studio.

| Attribute | Meaning |
|---|---|
| `data-config` | A named player configuration |
| `data-skin` | A built-in skin (`classic`, `cinema`, `neon`, `glass`, `minimal`, `emoji`, `retro`) or a skin id from `/skins/` |
| `data-lang` | `he`, `en`, `ru` or `ar` |
| `data-autoplay="1"` with `data-muted="1"` | Autoplay. Browsers allow it only when muted |
| `data-aspect` | For example `16:9` |
| `data-width` | Maximum width in pixels |

The full list is in [OPTIONS.md](OPTIONS.md).

## Events

Listen on the player's box or any parent, because the events bubble.

| Event | `detail` | When |
|---|---|---|
| `vs:ready` | `{player, engine}` | The player was created. `player` is a Video.js player |
| `vs:error` | `{error}` | The loader failed |
| `vs:config` | `{theme, config}` | The configuration was applied |
| `vs:cinema` | `{on}` | Cinema mode changed |

```js
document.addEventListener('vs:ready', function (e) {
  var player = e.detail.player;
  player.on('play', function () { /* ... */ });
});
```

Events only reach your page with the player tag. Inside an iframe they stay in the iframe.

Standard Video.js events such as `play`, `pause` and `ended` work. Please read from the player, and don't change its
source or settings from your page.

## Streams

Streams are delivered as HLS with fMP4 segments. ViewStream chooses the streaming format, so build nothing that depends
on it.

## Ads (VAST)

Ads are turned on and their tags are set in your player configuration in ViewStream Studio. Nothing is needed on your
page. The player handles:

- VAST 4.x and VMAP 1.0, including wrappers (up to 5 hops) and ad pods
- Pre-roll on live; pre-, mid- and post-roll on video and catch-up
- Skip offset, click-through, tracking pixels and VAST error codes
- MP4 video creatives
- Ad failures: if an ad fails or doesn't start in time, the content plays

The workbench's two VAST buttons use ViewStream demo ads so you can design the ad bar.

## Consent and viewing reports

The player reports viewing to ViewStream. Keep this on in production, because your statistics depend on it. Only a
hashed, anonymous viewer ID is used, and none without consent.
