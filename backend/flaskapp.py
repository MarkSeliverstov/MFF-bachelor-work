import os
import structlog

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

from .db.api import DataBaseException, InvalidModel, Database as db
from .src.annotations_to_entities_converter import AnnotationsToEntitiesConverter

logger = structlog.get_logger()

load_dotenv()
authorized_key = os.getenv("AUTHORIZED_KEY")
if not authorized_key:
    raise Exception(
        "Authorized key not found in environment variables. Please set it up."
    )

app = Flask(__name__)
cors = CORS(app)


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
    if req["authorizedKey"] != authorized_key:
        logger.error(f"Wrong key: {req['authorizedKey']}")
        return jsonify({"status": "ERROR", "message": "Wrong authorized key"}), 300
    db.save_model(req["model"])
    return jsonify({"status": "OK"})


@app.route("/entities", methods=["GET"])
def get_entities():
    try:
        annotations = db.get_annotations()
        converter = AnnotationsToEntitiesConverter()
        entities = converter.convert(annotations)
    except DataBaseException as err:
        return jsonify({"status": "ERROR", "message": str(err)}), 404
    except Exception as err:
        return jsonify({"status": "ERROR", "message": str(err)}), 500
    return jsonify(entities)


@app.route("/annotations", methods=["GET"])
def get_annotations():
    try:
        annotations = db.get_annotations()
    except DataBaseException as err:
        return jsonify({"status": "ERROR", "message": str(err)}), 404
    return jsonify(annotations)


@app.route("/annotations", methods=["POST"])
def save_annotations():
    req = request.get_json()
    if req["authorizedKey"] != authorized_key:
        logger.error(f"Wrong key: {req['authorizedKey']}")
        return jsonify({"status": "ERROR", "message": "Wrong authorized key"}), 300
    db.save_annotations(req["annotations"])
    return jsonify({"status": "OK"})


@app.route("/model/complition-items", methods=["POST"])
def get_complition_items_from_model():
    editor_line = request.get_json()
    logger.info(f"Recieved line from client: {editor_line}")
    cmp_items = ["HELLO", "FROM", "SERVER"]
    logger.info(f"Sending complition items to client: {cmp_items}")
    return jsonify(cmp_items)
