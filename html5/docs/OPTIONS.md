**English** | [עברית](OPTIONS.he.md)

# Player capabilities and options

This is the full reference for the HTML5 player. You can try most of these options on the
[online configurator](https://player.viewstream.co.il/#configurator).

## Capabilities

| Capability | Status |
|---|---|
| HLS with adaptive quality, live and video | Available |
| Low-latency HLS | Available, off by default (`low_latency`) |
| Live rewind, start-over, catch-up, programme guide | Available |
| MP4 and WebM sources | Available |
| DASH sources | The player accepts a `.mpd` URL. ViewStream channels and videos are delivered as HLS, so ask us first |
| Subtitles (WebVTT), chapters, seek thumbnails | Available |
| Quality, speed, subtitle and audio menus | Available |
| VAST 4.x and VMAP 1.0: pre-, mid- and post-roll, wrappers, pods, skip, click-through, tracking | Available. Live is pre-roll only |
| Your own video as a pre-roll (house pre-roll) | Available |
| Google IMA as the ad engine | Available (`ads.engine`) |
| Server-side ad insertion | Built, off by default. Ask us |
| AES-128 encrypted video and signed playback tokens | Available |
| FairPlay and Widevine DRM | Not available yet |
| Chromecast | Chromium browsers, not iOS |
| AirPlay | Safari on macOS and iOS |
| Picture-in-picture, fullscreen, cinema mode | Available. Cinema mode is desktop only |
| Continue watching (stored only in the viewer's browser) | Available |
| Logo, watermark, skins, light and dark looks | Available |
| Languages: Hebrew and Arabic (right to left), English, Russian | Available |
| Keyboard control and screen reader labels | Available |
| Muted preview tiles | Available |
| Viewing reports to ViewStream analytics | On by default |

## Where settings come from

From strongest to weakest:

1. **The page:** `data-*` attributes and `data-options` on the player tag
2. **The player configuration:** set in ViewStream Studio → Players, and reaches viewers within about a minute
3. **The player's built-in defaults**

The rest of this page follows that split. Most customers need only the player configuration.

## Player configuration

You can read your current configuration at `https://player.viewstream.co.il/player/config/<tenant>.json`, or a named one
at `/player/config/<tenant>/<name>.json`. Studio can also assign a configuration to a channel, a library section or a
single video.

### General

| Key | Default | Values and meaning |
|---|---|---|
| `skin` | `classic` | `classic`, `cinema`, `neon`, `glass`, `minimal`, `emoji`, `retro`, or a skin id from the [skin library](https://player.viewstream.co.il/skins/) |
| `theme` | `auto` | `auto`, `light`, `dark` |
| `lang` | `he` | `he`, `en`, `ru`, `ar` |
| `big_play_button` | on | Play icon in the center before the first play |
| `low_latency` | off | Live: use low-latency HLS |
| `version_pin` | empty | Stay on a player version, such as `1` or `1.4`. Empty means the current version |

### Branding

| Key | Default | Values and meaning |
|---|---|---|
| `branding.color` | `#1FB6FF` | Accent color, `#RRGGBB` |
| `branding.accent_fg` | empty | Icon or text on the accent. Empty: chosen for contrast |
| `branding.focus` | empty | Keyboard focus ring color. Empty: neutral |
| `branding.logo` | empty | HTTPS URL of a logo over the video |
| `branding.logo_enabled` | on | Off hides the logo and keeps the URL |
| `branding.logo_position` | `top-right` | `top-left`, `top-right`, `bottom-left`, `bottom-right` |
| `branding.logo_width_pct` | `12` | 4–30, percent of the player width |
| `branding.logo_opacity_pct` | `90` | 10–100 |
| `branding.logo_margin_pct` | `2` | 0–10, percent of the player width |
| `branding.logo_link` | empty | HTTPS link when the logo is clicked |
| `branding.logo_during_ads` | off | Keep the logo over video ads |
| `branding.watermark` | empty | HTTPS URL of a semi-transparent watermark |
| `branding.poster_style` | `cover` | `cover`, `contain` |

### Controls

All are on or off.

| Key | Default | Meaning |
|---|---|---|
| `controls.autoplay_muted` | off | Start playing, muted |
| `controls.loop` | off | Play again from the start |
| `controls.speed` | on | Speed menu: 0.5× to 2× |
| `controls.quality_menu` | on | Quality menu |
| `controls.captions` | on | Subtitles menu |
| `controls.chapters` | on | Chapters |
| `controls.share` | on | Share button, where there is a page to share |
| `controls.pip` | on | Picture-in-picture |
| `controls.cast` | on | Chromecast |
| `controls.fullscreen` | on | Fullscreen |
| `controls.volume` | on | Volume |
| `controls.seek_buttons` | on | Back and forward 10 seconds |
| `controls.stats` | on | Technical stats panel in the settings menu |

### Playback

| Key | Default | Values and meaning |
|---|---|---|
| `playback.start_rung` | `auto` | `auto`, `highest`, `lowest`, or a quality such as `720p` |
| `playback.captions_lang` | empty | Subtitle language, as a two-letter code. `auto`: the viewer's language |
| `playback.captions_default` | empty | `on`: subtitles show from the start, and needs `captions_lang`. Empty or `off`: off until the viewer turns them on |
| `playback.safari_engine` | empty | Empty or `native`: iPhone, iPad and Safari use Safari's own player. `ours`: the ViewStream engine (less data on live, the quality menu, no AirPlay from the page). The player picks its engine before it loads this document, so the hosted pages and site pages apply it for you; on your own page set `data-safari-engine="mms"` on the tag |
| `playback.captions_style` | `default` | `default`, `large`, `high-contrast` |
| `playback.remember_volume` | on | Keep the viewer's volume in their browser |
| `playback.resume` | on | Video, clips and catch-up continue where the viewer stopped |

### Live

| Key | Default | Values and meaning |
|---|---|---|
| `live.epg_overlay` | on | Programme card: channel, title and times |
| `live.programme_bar` | on | The seek bar spans the current programme |
| `live.start_over_button` | on | Jump to the start of the current programme |
| `live.prev_next_buttons` | on | Previous and next programme |
| `live.show_channel_name` | on | Channel name on the card |
| `live.now_badge` | on | "Now" badge on the card |
| `live.wall_clock` | on | The time shows the real time of the frame |
| `live.time_zone` | `channel` | `channel` or `viewer` |
| `live.epg_card_position` | `bottom-start` | `bottom-start`, `bottom-end`, `top-start`, `top-end` |
| `live.back_to_live_button` | on | Back-to-live button while behind live |
| `live.back_to_live_label` | empty | Its label, up to 40 characters. Empty: localized default |
| `live.max_seek_back_s` | empty | How far viewers can rewind. Empty: the whole window. `0`: live only. Or 60–86400 seconds |
| `live.restart_button` | off | Restart button, for channels with no programme guide |
| `live.restart_back_s` | `0` | How far it jumps. `0`: the start of the window. Up to 86400 seconds |

### Video

| Key | Default | Meaning |
|---|---|---|
| `vod.title_overlay` | on | Title card with the controls |
| `vod.show_description` | off | Add the short description |
| `vod.show_date` | off | Add the publish date |
| `vod.show_series` | off | Add the series or section name |

### Ads

| Key | Default | Values and meaning |
|---|---|---|
| `ads.enabled` | off | Client-side ads on or off |
| `ads.source` | `tag` | `tag`: your VAST or VMAP tags. `house`: your own video as a pre-roll |
| `ads.engine` | `inhouse` | `inhouse` or `ima` (Google IMA) |
| `ads.default_tag` | empty | VAST or VMAP HTTPS URL. Required when ads are on with tags |
| `ads.positions` | `["pre"]` | Any of `pre`, `mid`, `post` |
| `ads.pre_tag`, `ads.mid_tag`, `ads.post_tag` | empty | A different tag for that position. Empty: `default_tag` |
| `ads.live_tag` | empty | Tag for live starts. Empty: `pre_tag`, then `default_tag` |
| `ads.mid_interval_s` | `0` | Video: seconds between mid-rolls when the tag is VAST, 0–3600 |
| `ads.skip_offset_s` | `-1` | Skip after this many seconds, up to 120. `-1`: the ad decides |
| `ads.max_per_session` | `6` | Ad breaks per session, up to 100. `0`: no limit |
| `ads.min_interval_s` | `300` | Minimum seconds between breaks, up to 86400 |
| `ads.timeout_ms` | `4000` | Time allowed for an ad to start, 1000–15000. After that, the content plays |
| `ads.test_mode` | off | Labeled test ads that don't count as revenue |
| `ads.personalised` | on | Personalized ads only after advertising consent |
| `ads.allowed_domains` | empty | Extra ad-server hosts allowed in Studio's preview |
| `ads.ssai` | off | Server-side ads on catch-up and start-over, where turned on for the channel |

#### House pre-roll

Used when `ads.source` is `house`.

| Key | Default | Values and meaning |
|---|---|---|
| `ads.house.asset_ids` | empty | 1–5 ready, unprotected Library videos with an MP4, each up to 3 minutes |
| `ads.house.rotation` | `round_robin` | `round_robin` or `random` |
| `ads.house.skip_after_s` | `0` | `0`: not skippable. Or 1–120 seconds |
| `ads.house.click_url` | empty | HTTPS "Learn more" link |
| `ads.house.frequency` | `every_play` | `every_play`, `session`, `interval` |
| `ads.house.interval_min` | `30` | For `interval`: at most once every 1–1440 minutes |
| `ads.house.live` | on | Before live channels |
| `ads.house.vod` | on | Before videos, clips and catch-up |

### Viewing reports, tiles and embedding

| Key | Default | Values and meaning |
|---|---|---|
| `beacon.enabled` | on | Viewing reports. Your statistics depend on them |
| `beacon.heartbeat_s` | set by ViewStream | How often a playing device reports |
| `beacon.viewer_id` | on | A random, anonymous first-party viewer ID |
| `beacon.viewer_id_consent` | off | Set that ID only after the page grants analytics consent |
| `tile.trigger` | `hover` | `hover` or `visible` |
| `tile.max_rung` | `360p` | Highest quality for previews: `highest`, `lowest`, or a quality such as `360p` |
| `embed.allowed_domains` | empty | Sites allowed to embed, such as `*.example.com`, up to 50. Empty: any site |

## Player tag attributes

These go on the `embed.js` tag and override the configuration. In this list, `data-idle-ms` sets the option `idleMs`.

### Source

| Attribute | Meaning |
|---|---|
| `data-src` | HLS, MP4 or other source URL |
| `data-tenant` | Your tenant. Otherwise taken from the URL |
| `data-config` | A named player configuration |
| `data-target` | CSS selector of the element to fill. Otherwise the player appears where the tag sits |
| `data-id` | An id for the player's box |
| `data-mode="tile"` | A muted preview tile instead of a full player |
| `data-trigger` | Tile: `auto`, `hover` or `visible` |

### Look and size

| Attribute | Meaning |
|---|---|
| `data-skin` | A built-in skin or a skin library id |
| `data-theme` | `auto`, `light`, `dark` |
| `data-lang` | `he`, `en`, `ru`, `ar` |
| `data-accent`, `data-accent-fg`, `data-focus` | Accent, its text color, and focus ring |
| `data-aspect` | `16:9`, `4:3`, `1:1`, `9:16`, `21:9` |
| `data-width` | Maximum width in pixels |
| `data-skin-menu="1"` | Let viewers change the skin in the settings menu |
| `data-label` | Screen reader label |

### Playback

| Attribute | Meaning |
|---|---|
| `data-autoplay="1"`, `data-muted="1"` | Autoplay. Browsers allow it only when muted |
| `data-loop="1"` | Play again from the start |
| `data-controls="0"` | No controls |
| `data-preload` | `metadata` (default), `auto`, `none` |
| `data-start`, `data-end` | Start and end, in seconds |
| `data-resume` | `ask` (default), `auto`, `off` |
| `data-idle-ms` | Hide the controls after this many milliseconds. Default 2000 |
| `data-poster` | Poster image URL |
| `data-title` | Title |
| `data-cast="0"` | No Chromecast |
| `data-cinema="1"` | Cinema button, desktop only. Your page lays itself out: listen for `vs:cinema` or style `html.vs-cinema-on` |

### Live

| Attribute | Meaning |
|---|---|
| `data-max-seek-back` | Seconds viewers can rewind. `0`: live only |
| `data-back-to-live="0"` | Hide the back-to-live button |
| `data-restart="1"` | Restart button, for channels with no guide |
| `data-restart-back` | Seconds it jumps back. `0`: the start of the window |
| `data-start-at="beginning"` | Open a catch-up at its start |
| `data-epg-card-position` | `bottom-start`, `bottom-end`, `top-start`, `top-end` |
| `data-channel-name` | Channel name on the card |
| `data-time-zone` | Time zone name for the clock and programme times |

### Lists and objects

These go in `data-options` as JSON.

| Key | Format |
|---|---|
| `sources` | `[{"src": "...", "type": "...", "height": 720, "label": "720p"}]` |
| `tracks` | `[{"src": "...vtt", "srclang": "he", "label": "עברית", "default": true}]` |
| `chapters` | `[{"start": 0, "title": "..."}]` |
| `thumbnails` | `{"sprite": "...jpg", "interval": 1, "width": 160, "height": 90, "cols": 10}` |
| `content` | `{"kind": "asset", "id": "..."}`. Names what plays when the URL doesn't. `kind` is `asset`, `clip` or `programme` |
| `meta` | `{"title": "...", "description": "...", "subtitle": "..."}` for the title card |
| `epg` | `{"tenant": "...", "channel": "..."}`, or `epgUrl` with a guide URL |
| `shareUrl` | The page the share button shares |
| `titleCard` | `false`: no title card |
| `doubleTapSkip` | `false`: no double-tap to skip on touch screens |
| `tapForSound` | `false`: no "tap for sound" prompt on autoplay |
| `timeshift` | `false`: no rewind into the recording on short live windows |
| `hour12` | `true`: 12-hour clock. The default is 24-hour |
| `configDoc` | A partial player configuration merged over the published one |

## Keyboard

| Key | Action |
|---|---|
| Space, `k` | Play or pause |
| ← and → | Back or forward 5 seconds |
| `j` and `l` | Back or forward 10 seconds |
| ↑ and ↓ | Volume |
| `m` | Mute |
| `f` | Fullscreen |
| `c` | Subtitles on or off |
| `p` | Picture-in-picture |
| `t` | Cinema mode, when turned on |
| `i` | Technical stats panel, when turned on |
| `<` and `>` | Slower or faster |
| `0`–`9` | Jump to 0–90% of a video |
| Home and End | Start or end of a video |

## Events

The player tag's main events are in [EMBED.md](EMBED.md). `vs:ready` gives you the player, which is a Video.js player, so
all standard Video.js events work. The player adds these. Their details can change between versions.

| Event | When |
|---|---|
| `vs:qualitychange`, `vs:captionchange`, `vs:audiochange` | The viewer changed quality, subtitles or audio |
| `vs:skinchange`, `vs:themechange` | The skin or the theme changed |
| `vs:menuopen`, `vs:cast`, `vs:resume` | A menu opened, casting changed, or playback resumed from a saved position |
| `vsdeny` | The CDN refused playback, for example for a token, geo or blackout reason |
| `vsreconnect`, `vstokenrefresh` | The player reconnected, or renewed its token |
| `vs:drmunavailable` | A DRM source was given, but DRM support isn't loaded |
| `adstart`, `adend`, `adskip`, `adclick`, `quartile` | Ad progress |

## Reading the player from your page

Please read from the player. Don't change its source or its settings from your page.

| Call | Returns |
|---|---|
| `window.VSEmbed` | `{version, players}`: every player the loader created |
| `player.vs.qualities()`, `player.vs.qualityLabel()` | Available qualities, and the current one |
| `player.vs.captionTracks()`, `player.vs.captionIndex()` | Subtitle tracks, and the current one |
| `player.vs.audioTracks()` | Audio tracks |
| `player.vs.skin()` | The current skin |
