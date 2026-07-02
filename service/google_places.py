import requests

# from config.settings import GOOGLE_API_KEY
from config.settings import settings

URL = "https://places.googleapis.com/v1/places:searchText"

def buscar_empresas(cidade: str):
    headers = {
        "Content-Type": "application/json",
        "X-Google-Places-Api": settings.GOOGLE_API_KEY,
        # Campos que retornam da api
        "X-Goog-FieldMask":"places.displayName,places.formattedAddress,places.priceLevel,places.websiteUri,places.phoneNumber,places.rating,places.reviews,places.openingHours"
    }
    body = {
        "textQuery": f"empresas em {cidade}",
    }
    
    response = requests.post(URL, headers=headers, json=body)
    
    # response.raise_for_status()  # Levanta uma exceção se a resposta não for bem-sucedida
    return response.json()