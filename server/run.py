from http.server import HTTPServer

from src import EntityInspectorHTTPRequestHandler

if __name__ == '__main__':
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, EntityInspectorHTTPRequestHandler)
    print(f"Starting httpd server on port {port}")
    httpd.serve_forever()