from flask import Flask, jsonify
from flask import request
from .db.api import DataBaseException, InvalidModel, Database as db

app = Flask(__name__)

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
    new_model = request.get_json()
    db.save_model(new_model)
    return jsonify({"status": "OK"})