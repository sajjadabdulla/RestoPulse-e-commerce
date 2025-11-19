from app.models import Product
from .groq_client import client

def find_relevant_products(query, limit=5):
    qlike = f"%{query}%"
    products = Product.query.filter(
        (Product.name.ilike(qlike)) |
        (Product.description.ilike(qlike)) |
        (Product.category.ilike(qlike))
    ).limit(limit).all()
    return products

def build_prompt(question, products):
    if not products:
        prod_text = "No relevant products found."
    else:
        lines = []
        for p in products:
            lines.append(f"- {p.name} (${p.price}): {p.description}")
        prod_text = "\n".join(lines)

    prompt = f"""
You are a product assistant. Answer the user's question using ONLY the product data below.
If the answer isn't in the product data, say: "No matching products found."

PRODUCT DATA:
{prod_text}

USER QUESTION:
{question}

ANSWER:
"""
    return prompt

def ask_ai(question):
    products = find_relevant_products(question)
    prompt = build_prompt(question, products)

    # call Groq chat/completion (example usage)
    resp = client.chat.completions.create(
        model="mixtral-8x7b-32768",
        messages=[{"role": "user", "content": prompt}]
    )
    answer = resp.choices[0].message.content
    return {"answer": answer, "products_found": [p.id for p in products]}
