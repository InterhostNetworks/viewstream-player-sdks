**עברית** | [English](EMBED.md)

# הצבת הנגן בעמוד

בדוגמאות שכאן, החליפו את `<tenant>` ב-slug של הארגון שלכם ב-ViewStream, את `<channel>` בערוץ שלכם, ואת `<cdn-host>`
בשם המארח של ה-CDN שלכם. שם המארח הוא הערך `cdn_hostname` בכתובת
`https://player.viewstream.co.il/player/config/<tenant>.json`. אפשר גם להעתיק קוד מוכן מ-ViewStream Studio: פתחו ערוץ,
קליפ או סרטון והשתמשו ב-**הטמעה ושיתוף**.

## ברירת המחדל: iframe

```html
<iframe src="https://player.viewstream.co.il/e/<tenant>/live/<channel>"
        allow="autoplay; fullscreen; picture-in-picture" allowfullscreen
        style="aspect-ratio:16/9;width:100%;border:0"></iframe>
```

זו ההטמעה המומלצת. ViewStream בוחרת את השידור ואת ההגדרות, ולכן עדכוני נגן ושינויים בשידור מגיעים לאתר שלכם בלי שום
שינוי מצדכם.

הנתיב הוא `/e/<tenant>/live/<channel>`, `/e/<tenant>/vod/<video id>` או `/e/<tenant>/clip/<clip id>`.

| אפשרות בשאילתה | משמעות |
|---|---|
| `autoplay=1` | התחלה במצב מושתק |
| `lang=he`, `en`, `ru` או `ar` | שפת הנגן |
| `config=<name>` | תצורת נגן בעלת שם |
| `start=<seconds>` | נקודת ההתחלה. לא לשידור חי |

## תגית נגן, כשהעמוד צריך לתקשר עם הנגן

```html
<div id="player"></div>
<script async src="https://player.viewstream.co.il/embed.js"
        data-target="#player"
        data-src="https://<cdn-host>/live/<tenant>/<channel>/master.m3u8"
        data-tenant="<tenant>"
        data-lang="he"></script>
```

השתמשו בתגית רק אם העמוד שלכם חייב להאזין לאירועי הנגן או לסדר את עצמו סביב הנגן. תאמו את השימוש עם ViewStream מראש.
במקרה הזה כתובת השידור קבועה בעמוד שלכם, ולכן שינוי בשידור מחייב שינוי באתר, והגדרות שבעמוד גוברות על התצורה
שב-Studio.

| מאפיין | משמעות |
|---|---|
| `data-config` | תצורת נגן בעלת שם |
| `data-skin` | סקין מובנה (`classic`, `cinema`, `neon`, `glass`, `minimal`, `emoji`, `retro`) או מזהה סקין מתוך `/skins/` |
| `data-lang` | `he`, `en`, `ru` או `ar` |
| `data-autoplay="1"` יחד עם `data-muted="1"` | ניגון אוטומטי. דפדפנים מאפשרים אותו רק במצב מושתק |
| `data-aspect` | למשל `16:9` |
| `data-width` | רוחב מרבי בפיקסלים |

הרשימה המלאה נמצאת במסמך [OPTIONS.he.md](OPTIONS.he.md).

## אירועים

האזינו על תיבת הנגן או על כל אלמנט אב שלה, כי האירועים מבעבעים למעלה.

| אירוע | `detail` | מתי |
|---|---|---|
| `vs:ready` | `{player, engine}` | הנגן נוצר. `player` הוא נגן Video.js |
| `vs:error` | `{error}` | הטוען נכשל |
| `vs:config` | `{theme, config}` | התצורה הוחלה |
| `vs:cinema` | `{on}` | מצב קולנוע הופעל או כובה |

```js
document.addEventListener('vs:ready', function (e) {
  var player = e.detail.player;
  player.on('play', function () { /* ... */ });
});
```

האירועים מגיעים לעמוד שלכם רק עם תגית הנגן. בתוך iframe הם נשארים בתוך ה-iframe.

אירועי Video.js הרגילים, כמו `play`, `pause` ו-`ended`, פועלים. קראו מידע מהנגן, ואל תשנו מהעמוד שלכם את המקור שלו או
את ההגדרות שלו.

## שידורים

השידורים מועברים כ-HLS עם מקטעי fMP4. ViewStream בוחרת את פורמט הסטרימינג, ולכן אל תבנו שום דבר שתלוי בו.

## פרסומות (VAST)

הפעלת הפרסומות ותגיות הפרסום נקבעות בתצורת הנגן שלכם ב-ViewStream Studio. אין צורך בשום דבר בעמוד שלכם. הנגן מטפל ב:

- פרסומות VAST 4.x ו-VMAP 1.0, כולל wrappers (עד 5 קפיצות) ורצפי פרסומות (pods)
- פרסומת לפני התוכן (pre-roll) בשידור חי; לפני התוכן, באמצעו ואחריו (pre, mid, post) בסרטון ובצפייה חוזרת
- זמן עד לדילוג, מעבר לאתר המפרסם בלחיצה, פיקסלי מעקב וקודי שגיאה של VAST
- קובצי פרסומת מסוג MP4
- כשל בפרסומת: אם פרסומת נכשלת או לא מתחילה בזמן, התוכן מתנגן

שני כפתורי ה-VAST בסביבת העבודה משתמשים בפרסומות הדגמה של ViewStream, כדי שתוכלו לעצב את סרגל הפרסומת.

## הסכמה ודיווחי צפייה

הנגן מדווח על הצפייה ל-ViewStream. השאירו את הדיווח פעיל בסביבת הייצור, כי הסטטיסטיקות שלכם תלויות בו. נעשה שימוש רק
במזהה צופה אנונימי ומגובב (hashed), ובלי הסכמה לא נעשה שימוש במזהה כלל.
