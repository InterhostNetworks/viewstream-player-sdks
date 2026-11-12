**English** | [עברית](README.he.md)

# ViewStream HTML5 Player SDK

Put the ViewStream HTML5 player on your website and design its look. You write one CSS file and see it on the real player,
with live, video and ads, on your own computer.

## Start in 2 minutes

You need Python 3 and a modern browser. No account is needed.

```bash
cd viewstream-html5-player-sdk-1.1.0
python3 serve.py
```

Open <http://localhost:8000>, edit `theme/my-theme.css`, and refresh.

The workbench includes a sample live channel with a programme guide, a sample video with subtitles and chapters, and
VAST ads. Use its buttons to switch content, language, dark or light, and phone, tablet or desktop width. **Keep controls
visible** stops the controls from hiding while you work. **Without my theme** shows the player's default look.

**To see your own channel,** put your tenant and channel in `kit.config.js`. A **My channel** button then appears.

The same server also runs two more tools:

- <http://localhost:8000/configurator.html>: choose the content, look and features in a form, see them on the player,
  and copy the configuration keys, the player tag or the iframe.
- <http://localhost:8000/examples/>: small working pages for the iframe, the player tag, a live channel, video
  options, the player configuration, ads, events and preview tiles. Each prints its own code.

## What's in the kit

| Path | What it is |
|---|---|
| `index.html`, `serve.py` | The workbench and its small local server |
| `theme/my-theme.css` | **Your working file** |
| `kit.config.js` | Optional: your tenant and channel |
| `configurator.html` | The configurator: build a player configuration and its embed code |
| `examples/` | Working example pages, ready to copy |
| `docs/TENANT-AND-CONFIG.md` | **Start here for your own content:** connecting your tenant, and where each feature is configured |
| `docs/OPTIONS.md` | **Every player capability and option:** configuration, tag attributes, keyboard, events |
| `docs/THEMING.md` | Colors, sizes, class names and player states |
| `docs/EMBED.md` | How the player goes on a page, its events, and how ads work |
| `reference/vs-vjs.reference.css` | The player's own CSS, read-only, for looking up class names |
| `sample-media/` | The sample live channel's video |
| `LICENSE` | The terms for using the kit |

Every document is also available in Hebrew, under the same name with `.he` before `.md`.

The player's code isn't in the kit. The workbench loads it from `player.viewstream.co.il`, the same place your site
will, so you always design on the current player.

## Don't need a custom design?

The player has ready-made skins, shown at <https://player.viewstream.co.il/skins/>. Your ViewStream contact can set one
for you, or see `data-skin` in `docs/EMBED.md`.

## What you can change

- Colors, fonts, sizes, spacing, corners and shadows
- Icons, buttons and menus
- The programme card, the seek bar and the subtitle style
- The look of the ad bar: the skip button, "Learn more" and the countdown

## What stays with ViewStream

Please leave these as they are. If your design needs a change here, ask us.

- **The player code and how it plays:** adaptive quality, live and rewind behavior, recovery, the streaming format and
  ad logic. Don't copy or change the player's JavaScript or CSS, and don't host your own copy.
- **Which buttons and features are on, and the ad tags:** these are set in your player configuration in ViewStream
  Studio.
- **Viewing reports:** your production pages must keep them on. They're off on this workbench only, so design work
  doesn't count in your statistics.

## Before you hand it back

Check every item on the workbench, and on real devices:

- [ ] Both languages you use: nothing is mirrored the wrong way or cut off
- [ ] Phone 360, tablet and desktop: all buttons fit on one row
- [ ] Live: the programme card, seek bar, back-to-live button and live marker are clear
- [ ] Video: subtitles are readable on bright and dark pictures, and chapters and thumbnails look right
- [ ] Ads: the skip button, "Learn more" and countdown are clear, with and without a skip button
- [ ] The keyboard works: the focus ring shows on every control (Tab key)
- [ ] Fullscreen, on a desktop browser and on a real iPhone and Android phone. iPhones may use their own controls in
      fullscreen, so check what your design looks like there
- [ ] Dark and light, if you use both

## Handing it back

Send `theme/my-theme.css`, along with any fonts and images it uses, to your ViewStream contact. We review it and publish
it as your skin, and it then works on all your players, including iframes and hosted pages. Please don't put it on
production pages yourself.

Host fonts and images on a domain you control, over HTTPS and with CORS open, or send them to us with the theme.

## License

The kit is for ViewStream customers and people working for them, only to design and integrate the ViewStream player.
The player itself and the service behind it are not part of the kit and are not licensed by it. The full terms are in
[LICENSE](LICENSE).
