from database.base import Base
from database.connection import engine

# Importa todos os models
from Model.Enterprise import Enterprise


def main():
    Base.metadata.create_all(bind=engine)
    print("Banco inicializado com sucesso!")


if __name__ == "__main__":
    main()