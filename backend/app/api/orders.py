from flask import Blueprint, request, jsonify
from app.db import db
from app.models import Order

bp = Blueprint('orders', __name__)

@bp.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    product_ids = data.get("product_ids", [])
    total_amount = data.get("total_amount", 0)

    order = Order(
        product_ids=",".join(map(str, product_ids)),
        total_amount=total_amount
    )

    db.session.add(order)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Order placed!"
    }), 201
