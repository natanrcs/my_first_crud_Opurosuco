from fastapi import FastAPI,Response,Depends, HTTPException
from backend.database import engine,SessionLocal
from sqlalchemy.orm import Session
from backend.models import Base,Product
from backend.schemas import ProductCreate, ProductResponse
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
#permissao para comunicacao em diferentes localhost
app.add_middleware(
    CORSMiddleware,allow_origins=["*"],allow_methods=["*"],allow_headers=["*"]
)
Base.metadata.create_all(bind=engine)

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def validate_product(product: ProductCreate,db: Session):
    #aqui remove os espaços em branco do nome do produto e valida se o preço e o estoque são positivos
    if product.price < 0:
        raise HTTPException(status_code=400, detail="O preço deve ser um valor positivo")
    if  product.stock < 0:
        raise HTTPException(status_code=400, detail="O estoque deve ser um valor positivo")
    product_existing= db.query(Product).filter(Product.name == product.name).first()
    if product_existing:
        raise HTTPException(status_code=400, detail="Produto já existe no banco de dados")

@app.get("/home")
def home():
    ab = {"version": "1.0","created": "Natanrcs"}
    return ab

@app.post("/products",response_model=ProductResponse)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    validate_product(product,db)
    new_product = Product(name=product.name, price=product.price, stock=product.stock)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@app.get("/products", response_model=List[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@app.get("/products/{product_id}", response_model=ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado no banco de dados")
    return product

@app.put("/products/{product_id}",response_model=ProductResponse)
def update_product(product_id: int, product: ProductCreate, db: Session = Depends(get_db)):
   existing_product = db.query(Product).filter(Product.id == product_id).first()
   if not existing_product:
        raise HTTPException(status_code=404, detail="Produto não encontrado no banco de dados")
   if product.price < 0:
       raise HTTPException(status_code=400, detail="Preço deve ser positivo")
   if product.stock < 0:
       raise HTTPException(status_code=400, detail="Estoque deve ser positivo")
   name_duplicate = db.query(Product).filter(Product.name == product.name,Product.id != product_id).first()
   if name_duplicate:
       raise HTTPException(status_code=400, detail="Nome já está em uso")
   existing_product.name = product.name
   existing_product.price = product.price
   existing_product.stock = product.stock
   db.commit()
   db.refresh(existing_product)
   return existing_product

@app.delete("/products/{product_id}")
def delete_product(product_id:int,db: Session=Depends(get_db)):
    existing_product = db.query(Product).filter(Product.id == product_id).first()
    if not existing_product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    db.delete(existing_product)
    db.commit()
    return {"message": "Produto deletado com sucesso"}