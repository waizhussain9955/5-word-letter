"""
Quick Start Local Server
Run this script to test the website locally without CORS issues
"""

import http.server
import socketserver
import webbrowser
import os
from pathlib import Path

PORT = 8000
DIRECTORY = Path(__file__).parent

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(DIRECTORY), **kwargs)
    
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        url = f"http://localhost:{PORT}"
        print("\n" + "="*60)
        print("🚀 5 Letter Words - Local Development Server")
        print("="*60)
        print(f"\n✅ Server running at: {url}")
        print(f"📁 Serving from: {DIRECTORY}")
        print("\n📝 Available pages:")
        print(f"   • Homepage:        {url}/")
        print(f"   • 3 Letter Words:  {url}/3-letter-words.html")
        print(f"   • 4 Letter Words:  {url}/4-letter-words.html")
        print(f"   • 5 Letter Words:  {url}/5-letter-words.html")
        print(f"   • 6 Letter Words:  {url}/6-letter-words.html")
        print(f"   • 7 Letter Words:  {url}/7-letter-words.html")
        print("\n💡 Tips:")
        print("   • Press Ctrl+C to stop the server")
        print("   • Word filters will work properly on this server")
        print("   • Changes to files will be reflected on refresh")
        print("\n" + "="*60 + "\n")
        
        # Open browser automatically
        print("🌐 Opening browser...")
        webbrowser.open(url)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n✅ Server stopped. Goodbye!")

if __name__ == "__main__":
    run_server()
