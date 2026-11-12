**English** | [עברית](THEMING.he.md)

# Theming the player

Write every rule under `.video-js.vs-theme.my-theme`. That keeps your CSS from touching your page, and it beats the
player's own rules without `!important`.

Start with the variables. They change most of the player at once and keep working when we update it. Use a class
override only when a variable can't do what you need.

## Variables

| Variable | Controls | Player default |
|---|---|---|
| `--vs-accent` | Main color: big play button, progress, highlights | `#47C7F4` |
| `--vs-accent-ink` | Icon or text on the accent color. Keep contrast at 4.5:1 or better | `#04121B` |
| `--vs-ui` | Icons and text | `#fff` |
| `--vs-ui-dim` | Secondary text | `rgba(255,255,255,.72)` |
| `--vs-panel` | Menus and panels | `rgba(12,16,22,.92)` |
| `--vs-border` | Panel borders | `rgba(255,255,255,.14)` |
| `--vs-hover` | Hover background | `rgba(255,255,255,.08)` |
| `--vs-scrim-1`, `--vs-scrim-2` | Shades behind the controls | dark, semi-transparent |
| `--vs-rail` | Seek bar track | `#BDBDBD` |
| `--vs-buf` | Buffered part of the seek bar | `#636363` |
| `--vs-lane` | Strip behind the seek bar | `#04090E` |
| `--vs-mark` | Chapter marks on the seek bar | `#04090E` |
| `--vs-bar`, `--vs-bar-hover` | Seek bar height, normal and on hover | `4px`, `7px` |
| `--vs-volrail`, `--vs-volfill` | Volume track and fill | `#636363`, `#fff` |
| `--vs-cue-bg`, `--vs-cue-ink` | Subtitle background and text | `rgba(0,0,0,.76)`, `#fff` |
| `--vs-ring`, `--vs-ring-alt` | Keyboard focus ring, two contrasting colors | `#fff`, `#000` |
| `--vs-radius` | Player corners | `14px` |
| `--vs-ease` | Animation curve | `cubic-bezier(.22,.61,.36,1)` |

The player sets a few variables itself while it runs, such as `--vs-cb-h`, `--vs-tb-h`, `--vs-lb` and the `--vs-logo-*`
values. Don't set those.

### The accent color in production

The accent color in your player configuration overrides `--vs-accent`, `--vs-accent-ink` and `--vs-volfill`, and the
focus color overrides `--vs-ring`. The workbench clears the accent, so your theme shows as written. When you hand back
your theme, tell us your final colors and we'll set your configuration to match.

### Light and dark

Dark is the first block of variables. Light is the block for `.video-js.vs-theme.vs-light.my-theme`. The player adds
`vs-light` when the light look is in use, so style both.

### Fonts

Set `font-family` on `.video-js.vs-theme.my-theme`. Host the font files as the README describes.

## Main parts

| Part | Classes |
|---|---|
| Control bar and buttons | `.vjs-control-bar`, `.vjs-button`, `.vjs-big-play-button`, `.vs-settings-button`, `.vs-gear` |
| Seek bar on video | `.vjs-progress-control`, `.vjs-play-progress`, `.vjs-load-progress` |
| Programme seek bar on live | `.vs-pbar`, `.vs-pbar-track`, `.vs-pbar-play`, `.vs-pbar-knob`, `.vs-pbar-tip`, `.vs-pbar-l`, `.vs-pbar-r` |
| Programme card on live | `.vs-epg-card`, `.vs-epg-ch`, `.vs-epg-title`, `.vs-epg-time`, `.vs-epg-range`, `.vs-epg-now`, `.vs-epg-dot` |
| Programme buttons on live | `.vs-epg-btn`, `.vs-epg-startover`, `.vs-epg-prev`, `.vs-epg-next` |
| Video title card | `.vs-vod-card`, `.vs-vod-desc` |
| Settings menu | `.vs-menu`, `.vs-mi`, `.vs-mlabel`, `.vs-mval` |
| Thumbnails over the seek bar | `.vs-thumb`, `.vs-thumb__img`, `.vs-thumb__txt` |
| Next-up card | `.vs-upnext` and its `.vs-upnext__*` parts |
| "Continue watching" prompt | `.vs-resume`, `.vs-resume__go` |
| Toast message | `.vs-toast` |
| Logo and watermark | `.vs-logo`, `.vs-watermark` |

## Ad bar

| Part | Class |
|---|---|
| Whole ad layer | `.vs-ad` |
| Ad video. Don't restyle it | `.vs-ad__video` |
| Bar with the label and countdown | `.vs-ad__bar`, `.vs-ad__tag`, `.vs-ad__txt` |
| Skip button | `.vs-ad__skip` |
| "Learn more" link | `.vs-ad__more` |
| Progress line | `.vs-ad__progress` |
| Resume button | `.vs-ad__resume` |

The skip button, "Learn more" and the ad label must stay visible and easy to click, because viewers and advertisers rely on them.

## States

The player adds these classes to its main element. Use them to style each situation.

| Class | Meaning |
|---|---|
| `vjs-playing`, `vjs-paused`, `vjs-waiting` | Playing, paused, buffering |
| `vjs-user-active`, `vjs-user-inactive` | Controls showing, controls hidden |
| `vjs-fullscreen` | Fullscreen |
| `vs-ad-playing` | An ad is playing |
| `vs-menu-open` | A menu is open |
| `vs-has-pbar`, `vs-epg-card-on`, `vs-epg-noprog` | Live: programme bar shown, card shown, no programme information |
| `vs-live-only` | Live with no way to go back |
| `vs-reconnecting`, `vs-blocked` | Reconnecting, playback refused |
| `vs-casting`, `vs-airplay-on` | Casting to a TV |
| `vs-content-rtl`, `vs-lang-he` | Hebrew or other right-to-left content |
| `vs-w-xs`, `vs-w-s` | Very narrow and narrow player. Use these instead of media queries, because the player can be small on a wide screen |
| `vs-cc-large`, `vs-cc-high-contrast` | Viewer's subtitle style |

For anything else, search `reference/vs-vjs.reference.css`.

## Rules that keep the player working

- **Right-to-left:** use `inset-inline-start`, `margin-inline-end` and similar properties rather than `left` and
  `right`. The seek bar is the exception, because it always runs left to right.
- **Don't move or resize the video:** leave `.vjs-tech` and `.vs-ad__video` alone, and don't add filters to them.
- **Keep the focus ring:** never use `outline: none` without a visible replacement.
- **Touch targets:** keep buttons at 40 × 40 px or larger on phones.
- **Avoid fixed widths:** the player runs from a small tile to fullscreen.
- **Avoid `!important`:** it can break states the player needs, such as hiding controls during an ad.
- **Internal names:** class names can change between player versions, so variables are the safer choice.
