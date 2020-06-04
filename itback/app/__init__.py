from flask import Flask
from flask_migrate import Migrate
from .config import Configuration
# from .routes import whatever
from .models import db

app = Flask(__name__)
app.config.from_object(Configuration)
# app.register_blueprint(whatever.bp)
db.init_app(app)
Migrate(app, db)
