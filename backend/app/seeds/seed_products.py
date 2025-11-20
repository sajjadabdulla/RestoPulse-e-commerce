from app import create_app
from app.db import db
from app.models import Product

SAMPLES = [
    {'name':'Wireless Mouse','description':'Ergonomic wireless mouse','price':19.99,'category':'accessories'},
    {'name':'Gaming Keyboard','description':'RGB mechanical keyboard','price':79.90,'category':'gaming'},
    {'name':'USB-C Hub','description':'Multiport adapter','price':34.50,'category':'accessories'},
    {'name':'Gaming Headset','description':'Surround sound headset','price':59.99,'category':'gaming'},
    {'name':'1080p Webcam','description':'HD webcam with mic','price':49.99,'category':'electronics'},
    {'name':'Portable SSD 500GB','description':'Fast NVMe SSD','price':89.99,'category':'storage'},
    {'name':'Monitor 24"','description':'IPS 1080p monitor','price':129.99,'category':'display'},
    {'name':'Laptop Stand','description':'Aluminium ergonomic stand','price':29.99,'category':'accessories'},
    {'name':'Bluetooth Speaker','description':'Portable speaker','price':39.99,'category':'audio'},
    {'name':'Wireless Charger','description':'Qi fast charger','price':25.99,'category':'accessories'},
]

def seed():
    app = create_app()
    with app.app_context():
        for s in SAMPLES:
            exists = Product.query.filter_by(name=s['name']).first()
            if not exists:
                p = Product(**s)
                db.session.add(p)
        db.session.commit()
        print('Seeded products.')

if __name__ == '__main__':
    seed()
