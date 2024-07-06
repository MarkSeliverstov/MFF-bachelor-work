import json
import os

MODEL_FILE = "model.json"
ANNOTATIONS_FILE = "annotations.json"


def _get_full_path(filename: str) -> str:
    return os.path.dirname(__file__) + "/" + filename


class DataBaseException(Exception): ...


class InvalidModel(DataBaseException): ...


class Database:
    """Database for saving Entity Model."""

    @staticmethod
    def get_model() -> dict:
        file_path = _get_full_path(MODEL_FILE)
        if not os.path.exists(file_path):
            raise DataBaseException("Model doesn't exists.")
        with open(file_path, "r") as file:
            data = file.read()
            try:
                return json.loads(data)
            except json.JSONDecodeError:
                raise InvalidModel("Invalid model in the Database.")

    @staticmethod
    def save_model(model: dict) -> None:
        with open(_get_full_path(MODEL_FILE), "w") as f:
            print("Saving model")
            json.dump(model, f, indent=4)
            print("File saved")

    @staticmethod
    def get_annotations() -> dict:
        file_path = _get_full_path(ANNOTATIONS_FILE)
        if not os.path.exists(file_path):
            raise DataBaseException("Annotations doesn't exists.")
        with open(file_path, "r") as file:
            data = file.read()
            try:
                return json.loads(data)
            except json.JSONDecodeError:
                raise InvalidModel("Invalid annotations in the Database.")

    @staticmethod
    def save_annotations(annotations: dict) -> None:
        with open(_get_full_path(ANNOTATIONS_FILE), "w") as f:
            print("Saving annotations")
            json.dump(annotations, f, indent=4)
            print("File saved")
