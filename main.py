from service.google_places import buscar_empresas

# Importa todos os models
# from Model.Enterprise import Enterprise


def main():
    resultado = buscar_empresas("São Paulo")

    for empresa in resultado.get("places", []):
        print("-" * 40)
        print(f"Nome: {empresa.get('name')}")
        print(f"Endereço: {empresa.get('formatted_address')}")
        print(f"Nível de Preço{empresa.get('priceLevel')}")
        print(f"Avaliação: {empresa.get('rating')}")
        print("-" * 40)
        
if __name__ == "__main__":
    main()