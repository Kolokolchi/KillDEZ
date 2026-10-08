#!/usr/bin/env python3
"""
Simple HTTP Server with optional lead capture API
Run: python server.py [port]
"""

import http.server
import socketserver
import os
import json
import sys
from datetime import datetime

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

LEADS_FILE = os.path.join(DIRECTORY, "leads.json")

class SiteHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        if self.path == "/api/order":
            content_length = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(content_length).decode("utf-8")
            try:
                data = json.loads(body)
                data["id"] = datetime.now().strftime("%Y%m%d%H%M%S")
                data["received_at"] = datetime.now().isoformat()
                data["status"] = "new"

                leads = []
                if os.path.exists(LEADS_FILE):
                    try:
                        with open(LEADS_FILE, "r", encoding="utf-8") as f:
                            leads = json.load(f)
                    except Exception:
                        leads = []
                
                leads.insert(0, data)
                with open(LEADS_FILE, "w", encoding="utf-8") as f:
                    json.dump(leads, f, ensure_ascii=False, indent=2)

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "lead_id": data["id"]}).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

    def do_GET(self):
        if self.path == "/api/leads":
            leads = []
            if os.path.exists(LEADS_FILE):
                try:
                    with open(LEADS_FILE, "r", encoding="utf-8") as f:
                        leads = json.load(f)
                except Exception:
                    leads = []
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.end_headers()
            self.wfile.write(json.dumps(leads, ensure_ascii=False).encode("utf-8"))
        else:
            super().do_GET()

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), SiteHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}/")
        print(f"Serving files from: {DIRECTORY}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
