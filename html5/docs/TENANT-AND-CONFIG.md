**English** | [עברית](TENANT-AND-CONFIG.he.md)

# Connecting your tenant and configuring features

This page takes you from the sample content to your own channel, and shows where each player feature is turned on or
off. The pages in `examples/` and `configurator.html` let you try every step.

## 1. Your tenant

Your **tenant** is your organization's short name in ViewStream, for example `my-company`. Every address the player
uses carries it. You can read it, and the short name of each channel, in any embed code that ViewStream Studio gives
you: open a channel, clip or video, use **Embed & share**, and look at the address `/e/<tenant>/live/<channel>`.

Put both in `kit.config.js`:

```js
window.VS_KIT = {
  tenant: 'my-company',
  channel: 'main'
};
```

After that:

- the workbench (`index.html`) gets a **My channel** button,
- the configurator (`configurator.html`) connects to your tenant and shows your published configuration,
- `examples/iframe.html` and `examples/live-channel.html` play your channel.

To check the name, open `https://player.viewstream.co.il/player/config/<tenant>.json` in a browser. If you get your
configuration, the name is right. If you get "Not found", the name is wrong, or your account has no player
configuration yet: ask your ViewStream contact.

## 2. Three ways to put your content on a page

| Way | Use it when | What you write |
|---|---|---|
| **iframe** | Almost always. ViewStream chooses the stream and settings, so nothing on your site changes when they do | `https://player.viewstream.co.il/e/<tenant>/live/<channel>` in an `<iframe>` |
| **Player tag** | Your page must listen to player events or lay itself out around the player. Agree it with ViewStream first | One `<script>` tag for `embed.js` with `data-src` and `data-tenant` |
| **Share link** | You only need a link to send or post | `https://player.viewstream.co.il/w/<tenant>/live/<channel>` |

In each address, `live/<channel>` can also be `vod/<video id>` or `clip/<clip id>`. Studio's **Embed & share** writes
all three for you, with the right ids.

For the player tag you also need your **CDN host**. It is the `cdn_hostname` value in your configuration (the address
in step 1). A live channel's stream is then:

```
https://<cdn-host>/live/<tenant>/<channel>/master.m3u8
```

```html
<div id="player"></div>
<script async src="https://player.viewstream.co.il/embed.js"
        data-target="#player"
        data-src="https://<cdn-host>/live/<tenant>/<channel>/master.m3u8"
        data-tenant="<tenant>"
        data-lang="en"></script>
```

From `data-tenant` and the stream address, the player finds your configuration and your programme guide by itself.
Working examples: `examples/iframe.html`, `examples/live-channel.html` and `examples/player-tag.html`. More detail:
[EMBED.md](EMBED.md).

## 3. Where features are configured

Every feature of the player is a key in your **player configuration**, a document you edit in ViewStream Studio under
**Players**. There are three places a setting can come from, and the stronger one wins:

1. **The page:** `data-*` attributes and `data-options` on the player tag
2. **Your player configuration** in Studio
3. **The player's built-in defaults**

Most customers need only the player configuration. A change there reaches viewers within about a minute, on every
page and every iframe, with no change to your site.

### One tenant, several configurations

- Your tenant has a **default** configuration.
- You can add **named** configurations, for example `news` or `kids`, and use one with `data-config="news"` on the
  tag or `?config=news` on an iframe or share link.
- In Studio you can also assign a configuration to a channel, a library section or a single video. The player then
  picks it for that content without anything on the page.

You can read any of them:

| Address | What it returns |
|---|---|
| `https://player.viewstream.co.il/player/config/<tenant>.json` | Your default configuration |
| `https://player.viewstream.co.il/player/config/<tenant>/<name>.json` | A named configuration |

### Trying a setting before you publish it

`configDoc` in `data-options` is a partial configuration that the player merges over your published one. Use it to try
a change on a test page:

```html
<script async src="https://player.viewstream.co.il/embed.js"
        data-src="https://<cdn-host>/live/<tenant>/<channel>/master.m3u8"
        data-tenant="<tenant>"
        data-options='{"configDoc": {"controls": {"speed": false}, "live": {"max_seek_back_s": 300}}}'></script>
```

When you are happy, set the same keys in Studio and remove `configDoc` from the page. Settings left on a page keep
overriding Studio, which is easy to forget.

The configurator in this kit does this for you: choose features in a form, see them on the player, and copy the
configuration keys or a test tag.

## 4. Feature by feature

Each row names the configuration key. The values and defaults are in [OPTIONS.md](OPTIONS.md).

| You want | Set |
|---|---|
| A ready-made look | `skin` (`classic`, `cinema`, `neon`, `glass`, `minimal`, `emoji`, `retro`, or an id from the [skin library](https://player.viewstream.co.il/skins/)) |
| Your own look | Design a theme on the workbench and send it to us: [THEMING.md](THEMING.md) |
| Your brand color, logo, watermark | `branding.color`, `branding.logo`, `branding.logo_position`, `branding.watermark` |
| Dark, light, or follow the device | `theme` |
| The player's language | `lang` (`he`, `en`, `ru`, `ar`) |
| Hide or show a button | `controls.*`: `speed`, `quality_menu`, `captions`, `chapters`, `share`, `pip`, `cast`, `fullscreen`, `volume`, `seek_buttons`, `stats` |
| Start playing by itself | `controls.autoplay_muted`. Browsers allow autoplay only when muted |
| Subtitles on from the start | `playback.captions_default: "on"` with `playback.captions_lang` |
| Larger or high-contrast subtitles | `playback.captions_style` |
| Viewers continue where they stopped | `playback.resume` |
| The programme card and programme seek bar on live | `live.epg_overlay`, `live.programme_bar` |
| Start-over, previous and next programme | `live.start_over_button`, `live.prev_next_buttons` |
| Limit how far viewers rewind a live channel | `live.max_seek_back_s` (`0` is live only) |
| A restart button on channels with no guide | `live.restart_button`, `live.restart_back_s` |
| Lower delay on live | `low_latency` |
| A title card on videos | `vod.title_overlay`, `vod.show_description`, `vod.show_date`, `vod.show_series` |
| Ads from your ad server | `ads.enabled`, `ads.default_tag` (a VAST or VMAP address), `ads.positions` |
| Your own video before the content | `ads.source: "house"` with `ads.house.asset_ids` |
| Limit how often ads run | `ads.max_per_session`, `ads.min_interval_s` |
| Only your sites may embed the player | `embed.allowed_domains` |
| Ask for consent before a viewer ID is set | `beacon.viewer_id_consent` |

Examples to try: `examples/configuration.html` (look and controls), `examples/ads.html` (a VAST pre-roll) and
`examples/video-options.html` (subtitles, chapters, thumbnails).

## 5. Before you go live

- [ ] The tag or iframe on your site has your tenant, and plays your channel, not the sample
- [ ] No `configDoc` is left on production pages: the settings are in Studio
- [ ] Viewing reports are on (`beacon.enabled`), because your statistics depend on them. Only this kit turns them off
- [ ] If you use `embed.allowed_domains`, every site that embeds the player is on the list, including test sites
- [ ] If your streams need signed playback, the player renews its tokens by itself. Check that playback continues
      past the first few minutes
- [ ] You tried the page on a real iPhone and a real Android phone

## 6. When something does not work

| What you see | Likely reason |
|---|---|
| "Not found" at `/player/config/<tenant>.json` | The tenant name is wrong, or there is no player configuration yet |
| The player loads but the stream does not play | The CDN host or the channel name in `data-src` is wrong. Copy the address from Studio |
| Playback is refused (the `vsdeny` event) | A playback rule refused it: token, country or blackout. Ask your ViewStream contact |
| The player works on one site and refuses to play on another | The second site is missing from `embed.allowed_domains` |
| A setting in Studio has no effect | The page sets the same thing in a `data-*` attribute or in `configDoc`, and the page wins |
| No programme card on a live channel | The channel has no programme guide, or `live.epg_overlay` is off |
| The page's events never fire | You used an iframe. Events reach your page only with the player tag |
