from app.db import db

class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(100))


class Order(db.Model):   
    __tablename__ = "orders"

    id = db.Column(db.Integer, primary_key=True)
    product_ids = db.Column(db.String, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
