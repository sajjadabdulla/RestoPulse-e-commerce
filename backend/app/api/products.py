from flask import Blueprint, jsonify, request
from app.models import Product
from app.db import db  

bp = Blueprint('products', __name__)


@bp.route('/products', methods=['GET'])
def list_products():
    q = request.args.get('q')
    query = Product.query
    if q:
        qlike = f"%{q}%"
        query = query.filter(
            (Product.name.ilike(qlike)) |
            (Product.description.ilike(qlike)) |
            (Product.category.ilike(qlike))
        )
    products = query.all()

    return jsonify([
        {
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'category': p.category
        }
        for p in products
    ])



@bp.route('/products', methods=['POST'])
def create_product():
    data = request.json

    required = ["name", "description", "price", "category"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"'{field}' is required"}), 400

    new_product = Product(
        name=data['name'],
        description=data['description'],
        price=data['price'],
        category=data['category']
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({
        'message': 'Product created successfully',
        'product': {
            'id': new_product.id,
            'name': new_product.name,
            'description': new_product.description,
            'price': new_product.price,
            'category': new_product.category
        }
    }), 201
