from http.server import BaseHTTPRequestHandler
import json

from .db import DataBaseException, Database as db

class EntityInspectorHTTPRequestHandler(BaseHTTPRequestHandler):
    """Request handler for EntityInspector.

    `GET` Return model if exist.\n
    `POST` Validate and rewrite model.
    """
    
    def _validate_model(self, model: dict) -> bool:
        # Some validation logic
        return True if model else False

    def _send_model(self, model: dict) -> None:
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = bytes(json.dumps(model), "utf-8")
        self.wfile.write(response)


    def _get_model(self):
        try:
            model = db.get_model()
            self._send_model(model)
        except DataBaseException as exc:
            self.send_error(404, str(exc))

    def _save_model(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        try:
            data = json.loads(post_data)
            if not self._validate_model(data):
                raise ValueError
        except (json.JSONDecodeError, ValueError):
            self.send_error(400, "Invalid JSON")
            return

        db.save_model(data)
        self.send_response(200, "Data received and saved")
        self.wfile.write()

    def do_GET(self) -> None:
        if self.path == '/model':
            self._get_model()
        else:
            self.send_error(404, "API Not Found")

    def do_POST(self) -> None:
        if self.path == '/model':
            self._save_model()
        else:
            self.send_error(404, "API Not Found")
