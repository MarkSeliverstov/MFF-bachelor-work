from server import flaskapp

if __name__ == '__main__':
    port = 5000
    flaskapp.app.run(port=port)
    flaskapp.app.logger.info(f"App is running on port {port}.")