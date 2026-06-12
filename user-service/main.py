from fastapi import FastAPI, Depends, HTTPException
from database import engine, SessionLocal
from sqlalchemy.orm import Session
from models import Base, User
from schemas import UserCreate, UserResponse
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def validate_user(user: UserCreate, db: Session):
    if not user.name.strip():
        raise HTTPException(status_code=400, detail="O nome não pode ser vazio")
    if "@" not in user.email or "." not in user.email:
        raise HTTPException(status_code=400, detail="Email inválido")
    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="A senha deve ter pelo menos 6 caracteres")
    user_existing = db.query(User).filter(User.email == user.email).first()
    if user_existing:
        raise HTTPException(status_code=400, detail="Email já cadastrado no banco de dados")

@app.get("/home")
def home():
    ab = {"version": "1.0", "created": "Natanrcs"}
    return ab

@app.post("/users", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    validate_user(user, db)
    new_user = User(name=user.name, email=user.email, password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.get("/users", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado no banco de dados")
    return user

@app.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado no banco de dados")
    if not user.name.strip():
        raise HTTPException(status_code=400, detail="O nome não pode ser vazio")
    if "@" not in user.email or "." not in user.email:
        raise HTTPException(status_code=400, detail="Email inválido")
    if len(user.password) < 6:
        raise HTTPException(status_code=400, detail="A senha deve ter pelo menos 6 caracteres")
    email_duplicate = db.query(User).filter(User.email == user.email, User.id != user_id).first()
    if email_duplicate:
        raise HTTPException(status_code=400, detail="Email já está em uso")
    existing_user.name = user.name
    existing_user.email = user.email
    existing_user.password = user.password
    db.commit()
    db.refresh(existing_user)
    return existing_user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    db.delete(existing_user)
    db.commit()
    return {"message": "Usuário deletado com sucesso"}
