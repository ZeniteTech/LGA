from database.base import Base
from database.connection import engine

# Importa todos os modelos
from model.Enterprise import Enterprise

def init_db():
    Base.metadata.create_all(bind=engine)