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

    def _send_json_response(self, data: dict, status:int = 200) -> None:
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        response = bytes(json.dumps(data), "utf-8")
        self.wfile.write(response)

    def do_GET(self) -> None:
        try:
            model = db.get_model()
            response_data = {"status": "success", "message": model}
            self._send_json_response(response_data)
        except DataBaseException as exc:
            self._send_json_response({"status": "error", "message": str(exc)}, status=404)

    def do_POST(self) -> None:
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

        try:
            data = json.loads(post_data)
            if not self._validate_model(data):
                raise ValueError
        except (json.JSONDecodeError, ValueError):
            error_data = {"status": "error", "message": "Invalid JSON"}
            self._send_json_response(error_data, status=400)
            return

        db.save_model(data)
        response_data = {"status": "success", "message": "Data received and saved"}
        self._send_json_response(response_data)
