#!/usr/bin/env python3
"""Runs the HTML5 player workbench on your computer, with a sample live channel.

    python3 serve.py [port]      (default 8000)

Serves this folder, plus a looping 30-second sample as a live HLS channel with a 2-minute rewind window, its
start-over and catch-up playlists, and a programme guide of 6-minute programmes. Only your own computer can reach it.
"""
import datetime as dt
import functools
import http.server
import json
import os
import re
import sys
import time

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.abspath(__file__))
MEDIA = os.path.join(ROOT, 'sample-media', 'live')
SEGS = []
for line in open(os.path.join(MEDIA, 'playlist.m3u8')):
    m = re.match(r'#EXTINF:([\d.]+)', line)
    if m:
        SEGS.append([float(m.group(1)), None])
    elif line.strip().endswith('.m4s'):
        SEGS[-1][1] = line.strip()
LOOP = sum(d for d, _ in SEGS)
CUM = [sum(d for d, _ in SEGS[:i]) for i in range(len(SEGS))]
N = len(SEGS)
T0 = (int(time.time()) // 60) * 60 - 3600  # the channel "started" an hour ago
WINDOW = 120  # rewind window, seconds
PROG = 360  # programme length, seconds
MPEGURL = 'application/vnd.apple.mpegurl'
MASTER = ('#EXTM3U\n#EXT-X-VERSION:7\n#EXT-X-INDEPENDENT-SEGMENTS\n'
          '#EXT-X-STREAM-INF:BANDWIDTH=776938,RESOLUTION=640x360,FRAME-RATE=30.000,CODECS="avc1.4d401f"\nv.m3u8\n')


def start_of(k):
    return T0 + (k // N) * LOOP + CUM[k % N]


def k_at(t):
    loops = int((t - T0) // LOOP)
    rem = (t - T0) - loops * LOOP
    return loops * N + max(j for j in range(N) if CUM[j] <= rem + 1e-9)


def iso(t):
    return dt.datetime.fromtimestamp(t, dt.timezone.utc).isoformat(timespec='milliseconds').replace('+00:00', 'Z')


def playlist(k_from, kind):
    k_max = k_at(time.time()) - 1  # the newest complete segment
    out = ['#EXTM3U', '#EXT-X-VERSION:7', '#EXT-X-TARGETDURATION:4', f'#EXT-X-MEDIA-SEQUENCE:{k_from}',
           f'#EXT-X-DISCONTINUITY-SEQUENCE:{k_from // N}']
    if kind == 'event':
        out.append('#EXT-X-PLAYLIST-TYPE:EVENT')
    out.append('#EXT-X-MAP:URI="/sample-media/live/init.mp4"')
    for k in range(k_from, k_max + 1):
        if k % N == 0 and k != k_from:
            out += ['#EXT-X-DISCONTINUITY', '#EXT-X-MAP:URI="/sample-media/live/init.mp4"']
        d, f = SEGS[k % N]
        out += [f'#EXT-X-PROGRAM-DATE-TIME:{iso(start_of(k))}', f'#EXTINF:{d:.6f},', f'/sample-media/live/{f}']
    return '\n'.join(out) + '\n'


def guide():
    names = ['Morning Show', 'News at the Hour', 'Weather', 'Sport Today', 'The Interview', 'Culture Desk', 'Evening News']
    progs, t, i = [], T0, 0
    while t < time.time() + 3600:
        progs.append({'id': f'p{i}', 'title': names[i % len(names)], 'start': iso(t), 'stop': iso(t + PROG)})
        t += PROG
        i += 1
    return {'name': 'Sample Channel', 'programmes': progs}


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')  # a refresh always shows your latest CSS
        super().end_headers()

    def answer(self, body, content_type):
        data = body.encode()
        self.send_response(200)
        self.send_header('Content-Type', content_type)
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        path = self.path.split('?')[0]
        if path == '/live/sample/main/master.m3u8':
            return self.answer(MASTER, MPEGURL)
        if path == '/live/sample/main/v.m3u8':
            return self.answer(playlist(max(0, k_at(time.time() - WINDOW)), 'live'), MPEGURL)
        m = re.match(r'^/m/catchup/main/(\d+)/live/(master|v)\.m3u8$', path)
        if m:
            if m.group(2) == 'master':
                return self.answer(MASTER, MPEGURL)
            return self.answer(playlist(k_at(int(m.group(1)) / 1000), 'event'), MPEGURL)
        if path == '/epg/sample/main.json':
            return self.answer(json.dumps(guide()), 'application/json')
        return super().do_GET()

    def log_message(self, *args):
        pass


Handler.extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, '.m4s': 'video/mp4', '.mp4': 'video/mp4'}
print(f'Open http://localhost:{PORT}  (press Ctrl+C to stop)')
http.server.ThreadingHTTPServer(('127.0.0.1', PORT), functools.partial(Handler, directory=ROOT)).serve_forever()
