from flask import Flask, jsonify, request
from .db.api import DataBaseException, InvalidModel, Database as db

app = Flask(__name__)

authorized_key = "123456789"

@app.route("/model", methods=["GET"])
def get_model():
    try:
        model = db.get_model()
    except InvalidModel as err:
        return jsonify({"status": "ERROR", "message": str(err)}), 500
    except DataBaseException as err:
        return jsonify({"status": "ERROR", "message": str(err)}), 404
    return jsonify(model)
    
@app.route("/model", methods=["POST"])
def save_model():
    req = request.get_json()
    if (req["authorizedKey"] != authorized_key):
        print(f"Wrong key: {req['authorizedKey']}")
        return jsonify({"status": "ERROR", "message": "Wrong authorized key"}), 300
    db.save_model(req["model"])
    return jsonify({"status": "OK"})

@app.route("/model/complition-items", methods=["POST"])
def get_complition_items_from_model():
    editor_line = request.get_json();
    print(f"Recieved line from client: {editor_line}")
    cmp_items = ["HELLO", "FROM", "SERVER"]
    print(jsonify(cmp_items))
    return jsonify(cmp_items)

