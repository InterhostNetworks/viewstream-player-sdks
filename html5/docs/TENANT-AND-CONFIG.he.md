**עברית** | [English](TENANT-AND-CONFIG.md)

# חיבור ה-tenant שלכם והגדרת התכונות

המסמך הזה מוביל אתכם מהתוכן לדוגמה אל הערוץ שלכם, ומראה איפה מפעילים ומכבים כל תכונה של הנגן. בעמודים שבתיקייה
`examples/` ובקובץ `configurator.html` אפשר לנסות כל שלב.

## 1. ה-tenant שלכם

המונח **tenant** הוא השם הקצר (slug) של הארגון שלכם ב-ViewStream, למשל `my-company`. כל כתובת שהנגן משתמש בה כוללת
אותו. אפשר לקרוא אותו, וגם את השם הקצר של כל ערוץ, בכל קוד הטמעה ש-ViewStream Studio נותן לכם: פתחו ערוץ, קליפ או
סרטון, השתמשו ב-**הטמעה ושיתוף**, והסתכלו על הכתובת `/e/<tenant>/live/<channel>`.

כתבו את שניהם בקובץ `kit.config.js`:

```js
window.VS_KIT = {
  tenant: 'my-company',
  channel: 'main'
};
```

אחרי זה:

- בסביבת העבודה (`index.html`) מופיע הכפתור **My channel**,
- כלי התצורה (`configurator.html`) מתחבר ל-tenant שלכם ומציג את התצורה שפרסמתם,
- הדוגמאות `examples/iframe.html` ו-`examples/live-channel.html` מנגנות את הערוץ שלכם.

כדי לבדוק את השם, פתחו בדפדפן את הכתובת `https://player.viewstream.co.il/player/config/<tenant>.json`. אם מתקבלת
התצורה שלכם, השם נכון. אם מתקבלת התשובה "Not found", השם שגוי, או שלחשבון שלכם עדיין אין תצורת נגן: פנו לאיש הקשר
שלכם ב-ViewStream.

## 2. שלוש דרכים להציב את התוכן שלכם בעמוד

| דרך | מתי משתמשים בה | מה כותבים |
|---|---|---|
| **iframe** | כמעט תמיד. ViewStream בוחרת את השידור ואת ההגדרות, ולכן שום דבר באתר שלכם לא משתנה כשהם משתנים | הכתובת `https://player.viewstream.co.il/e/<tenant>/live/<channel>` בתוך `<iframe>` |
| **תגית נגן** | כשהעמוד שלכם חייב להאזין לאירועי הנגן או לסדר את עצמו סביב הנגן. תאמו זאת עם ViewStream מראש | תגית `<script>` אחת של `embed.js` עם `data-src` ועם `data-tenant` |
| **קישור לשיתוף** | כשצריך רק קישור לשליחה או לפרסום | הכתובת `https://player.viewstream.co.il/w/<tenant>/live/<channel>` |

בכל אחת מהכתובות, במקום `live/<channel>` אפשר לכתוב גם `vod/<video id>` או `clip/<clip id>`. הפעולה **הטמעה ושיתוף**
ב-Studio כותבת לכם את שלוש הדרכים, עם המזהים הנכונים.

לתגית הנגן צריך גם את **שם המארח של ה-CDN** שלכם. זהו הערך `cdn_hostname` בתצורה שלכם (הכתובת משלב 1). כתובת השידור
של ערוץ חי היא:

```
https://<cdn-host>/live/<tenant>/<channel>/master.m3u8
```

```html
<div id="player"></div>
<script async src="https://player.viewstream.co.il/embed.js"
        data-target="#player"
        data-src="https://<cdn-host>/live/<tenant>/<channel>/master.m3u8"
        data-tenant="<tenant>"
        data-lang="he"></script>
```

מתוך `data-tenant` וכתובת השידור הנגן מוצא בעצמו את התצורה שלכם ואת לוח השידורים שלכם. דוגמאות עובדות:
`examples/iframe.html`, `examples/live-channel.html` ו-`examples/player-tag.html`. פירוט נוסף: [EMBED.he.md](EMBED.he.md).

## 3. איפה מגדירים את התכונות

כל תכונה של הנגן היא מפתח ב**תצורת הנגן** שלכם, מסמך שעורכים ב-ViewStream Studio תחת **נגנים**. הגדרה יכולה להגיע
משלושה מקומות, והחזק גובר:

1. **העמוד:** מאפייני `data-*` ו-`data-options` שעל תגית הנגן
2. **תצורת הנגן שלכם** ב-Studio
3. **ברירות המחדל המובנות של הנגן**

רוב הלקוחות צריכים רק את תצורת הנגן. שינוי בה מגיע לצופים תוך כדקה, בכל עמוד ובכל iframe, בלי שום שינוי באתר שלכם.

### ארגון אחד, כמה תצורות

- לארגון שלכם יש תצורת **ברירת מחדל**.
- אפשר להוסיף תצורות **בעלות שם**, למשל `news` או `kids`, ולהשתמש באחת מהן עם `data-config="news"` על התגית או עם
  `?config=news` בכתובת של iframe או של קישור לשיתוף.
- ב-Studio אפשר גם לשייך תצורה לערוץ, למדור בספרייה או לסרטון בודד. הנגן בוחר אותה לתוכן הזה בלי שום דבר בעמוד.

אפשר לקרוא כל אחת מהן:

| כתובת | מה היא מחזירה |
|---|---|
| `https://player.viewstream.co.il/player/config/<tenant>.json` | תצורת ברירת המחדל שלכם |
| `https://player.viewstream.co.il/player/config/<tenant>/<name>.json` | תצורה בעלת שם |

### לנסות הגדרה לפני שמפרסמים אותה

המפתח `configDoc` בתוך `data-options` הוא תצורה חלקית שהנגן ממזג מעל התצורה שפרסמתם. השתמשו בו כדי לנסות שינוי
בעמוד בדיקה:

```html
<script async src="https://player.viewstream.co.il/embed.js"
        data-src="https://<cdn-host>/live/<tenant>/<channel>/master.m3u8"
        data-tenant="<tenant>"
        data-options='{"configDoc": {"controls": {"speed": false}, "live": {"max_seek_back_s": 300}}}'></script>
```

כשאתם מרוצים, קבעו את אותם מפתחות ב-Studio והסירו את `configDoc` מהעמוד. הגדרות שנשארות בעמוד ממשיכות לגבור על
Studio, וקל לשכוח את זה.

כלי התצורה שבערכה עושה את זה בשבילכם: בוחרים תכונות בטופס, רואים אותן על הנגן, ומעתיקים את מפתחות התצורה או תגית
לבדיקה.

## 4. תכונה אחר תכונה

בכל שורה מופיע מפתח התצורה. הערכים וברירות המחדל נמצאים במסמך [OPTIONS.he.md](OPTIONS.he.md).

| מה רוצים | מה קובעים |
|---|---|
| מראה מוכן | `skin` (`classic`, `cinema`, `neon`, `glass`, `minimal`, `emoji`, `retro`, או מזהה מתוך [ספריית הסקינים](https://player.viewstream.co.il/skins/)) |
| מראה משלכם | מעצבים בסביבת העבודה ושולחים אלינו: [THEMING.he.md](THEMING.he.md) |
| צבע המותג, לוגו וסימן מים | `branding.color`, `branding.logo`, `branding.logo_position`, `branding.watermark` |
| מראה כהה, בהיר או לפי המכשיר | `theme` |
| שפת הנגן | `lang` (`he`, `en`, `ru`, `ar`) |
| הסתרה או הצגה של כפתור | `controls.*`: `speed`, `quality_menu`, `captions`, `chapters`, `share`, `pip`, `cast`, `fullscreen`, `volume`, `seek_buttons`, `stats` |
| ניגון שמתחיל מעצמו | `controls.autoplay_muted`. דפדפנים מאפשרים ניגון אוטומטי רק במצב מושתק |
| כתוביות מההתחלה | `playback.captions_default: "on"` יחד עם `playback.captions_lang` |
| כתוביות גדולות או בניגודיות גבוהה | `playback.captions_style` |
| הצופים ממשיכים מהמקום שבו עצרו | `playback.resume` |
| כרטיס התוכנית ופס התוכנית בשידור חי | `live.epg_overlay`, `live.programme_bar` |
| התחלה מחדש, התוכנית הקודמת והתוכנית הבאה | `live.start_over_button`, `live.prev_next_buttons` |
| הגבלה של החזרה אחורה בערוץ חי | `live.max_seek_back_s` (הערך `0` פירושו שידור חי בלבד) |
| כפתור התחלה מחדש בערוצים בלי לוח שידורים | `live.restart_button`, `live.restart_back_s` |
| השהיה נמוכה יותר בשידור חי | `low_latency` |
| כרטיס כותרת בסרטונים | `vod.title_overlay`, `vod.show_description`, `vod.show_date`, `vod.show_series` |
| פרסומות משרת הפרסום שלכם | `ads.enabled`, `ads.default_tag` (כתובת VAST או VMAP), `ads.positions` |
| סרטון משלכם לפני התוכן | `ads.source: "house"` יחד עם `ads.house.asset_ids` |
| הגבלה של תדירות הפרסומות | `ads.max_per_session`, `ads.min_interval_s` |
| רק האתרים שלכם רשאים להטמיע את הנגן | `embed.allowed_domains` |
| בקשת הסכמה לפני קביעת מזהה צופה | `beacon.viewer_id_consent` |

דוגמאות לניסוי: `examples/configuration.html` (מראה ופקדים), `examples/ads.html` (פרסומת VAST לפני התוכן)
ו-`examples/video-options.html` (כתוביות, פרקים ותמונות ממוזערות).

## 5. לפני שעולים לאוויר

- [ ] בתגית או ב-iframe שבאתר שלכם מופיע ה-tenant שלכם, ומתנגן הערוץ שלכם ולא הדוגמה
- [ ] לא נשאר `configDoc` בעמודי הייצור: ההגדרות נמצאות ב-Studio
- [ ] דיווחי הצפייה פעילים (`beacon.enabled`), כי הסטטיסטיקות שלכם תלויות בהם. רק הערכה הזו מכבה אותם
- [ ] אם אתם משתמשים ב-`embed.allowed_domains`, כל אתר שמטמיע את הנגן נמצא ברשימה, כולל אתרי בדיקה
- [ ] אם השידורים שלכם דורשים צפייה חתומה, הנגן מחדש את הטוקנים בעצמו. בדקו שהניגון ממשיך גם אחרי הדקות
      הראשונות
- [ ] ניסיתם את העמוד באייפון אמיתי ובטלפון אנדרואיד אמיתי

## 6. כשמשהו לא עובד

| מה רואים | הסיבה הסבירה |
|---|---|
| התשובה "Not found" בכתובת `/player/config/<tenant>.json` | שם ה-tenant שגוי, או שעדיין אין תצורת נגן |
| הנגן נטען אבל השידור לא מתנגן | שם המארח של ה-CDN או שם הערוץ ב-`data-src` שגוי. העתיקו את הכתובת מ-Studio |
| הניגון נדחה (האירוע `vsdeny`) | כלל צפייה דחה אותו: טוקן, מדינה או חסימת שידור. פנו לאיש הקשר שלכם ב-ViewStream |
| הנגן עובד באתר אחד ומסרב לנגן באתר אחר | האתר השני חסר ברשימה `embed.allowed_domains` |
| להגדרה ב-Studio אין השפעה | העמוד קובע את אותו דבר במאפיין `data-*` או ב-`configDoc`, והעמוד גובר |
| אין כרטיס תוכנית בערוץ חי | לערוץ אין לוח שידורים, או שהמפתח `live.epg_overlay` כבוי |
| האירועים בעמוד אף פעם לא מופעלים | השתמשתם ב-iframe. האירועים מגיעים לעמוד רק עם תגית הנגן |
