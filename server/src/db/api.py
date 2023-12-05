import json
import os

_MODEL_FILE_PATH = os.path.dirname(__file__) + "/model.json"

class DataBaseException(Exception):
    ...

class Database:
    """Database for saving Entity Model."""    

    @staticmethod
    def get_model() -> dict:
        if not os.path.exists(_MODEL_FILE_PATH):
            raise DataBaseException("Model doesn't exists.")
        with open(_MODEL_FILE_PATH, 'r') as file:
            data = file.read()
            try:
                return json.loads(data)
            except json.JSONDecodeError:
                raise DataBaseException("Invalid model in the Database.")

    @staticmethod
    def save_model(model: dict) -> None:
        with open(_MODEL_FILE_PATH, 'w') as f:
            print("Saving model")
            json.dump(model, f, indent=4)
            print("Model saved")
