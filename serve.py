#!/usr/bin/env python3
"""Local dev server with livereload and no-cache headers.

Usage:  python serve.py          # default port 5500
        python serve.py 8080     # custom port
"""

import sys
import livereload
from tornado.web import RequestHandler

_original_set_default = RequestHandler.set_default_headers

def _no_cache_headers(self):
    _original_set_default(self)
    self.set_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")

RequestHandler.set_default_headers = _no_cache_headers

server = livereload.Server()
server.watch(".")
port = int(sys.argv[1]) if len(sys.argv) > 1 else 5500
server.serve(port=port, host="127.0.0.1", open_url_delay=1)
