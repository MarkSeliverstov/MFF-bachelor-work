import structlog
import logging

from backend import flaskapp

logger = structlog.get_logger()
structlog.configure(wrapper_class=structlog.make_filtering_bound_logger(logging.INFO))

if __name__ == "__main__":
    port = 5000
    flaskapp.app.run(port=port)
