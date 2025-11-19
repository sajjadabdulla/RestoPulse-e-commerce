from flask import Flask
from .db import db, migrate
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    CORS(app)
    db.init_app(app)
    migrate.init_app(app, db)
    
    from .api.chat import bp as chat_bp
    from .api.orders import bp as orders_bp
    from .api.products import bp as products_bp
    
    app.register_blueprint(products_bp, url_prefix='/api')
    app.register_blueprint(orders_bp, url_prefix='/api')
    app.register_blueprint(chat_bp, url_prefix="/api")

    return app
