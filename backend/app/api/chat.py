from flask import Blueprint, request, jsonify
from app.ai.rag_chat import ask_ai

bp = Blueprint("chat", __name__)

@bp.route("/chat", methods=["POST"])
def chat():
    data = request.json or {}
    question = data.get("question", "").strip()
    if not question:
        return jsonify({"error": "Question required"}), 400

    try:
        result = ask_ai(question)
        return jsonify({"status": "success", "answer": result["answer"], "products_found": result["products_found"]})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
