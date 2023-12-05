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

    def _send_response(self, data: bytes, status: int = 200) -> None:
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(data)


    def _get_model(self):
        try:
            model = db.get_model()
            response = bytes(json.dumps(model), "utf-8")
            self._send_response(response)
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
        response = bytes("received post request:<br>{}".format(data), "utf-8")
        self._send_response(response)

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
