import requests

# from config.settings import GOOGLE_API_KEY
from api.config.settings import settings

URL = "https://places.googleapis.com/v1/places:searchText"

def buscar_empresas(cidade: str):
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": settings.GOOGLE_API_KEY,
        # Campos que retornam da api
        "X-Goog-FieldMask":"places.displayName,places.formattedAddress,places.priceLevel,places.websiteUri,places.nationalPhoneNumber,places.rating"
    }
    
    body = {
        "textQuery": f"empresas em {cidade}",
    }
    
    response = requests.post(URL, headers=headers, json=body)
    
    if response.status_code != 200:
        print(f"Erro na requisição: {response.status_code} - {response.text}")
        return {}
    # response.raise_for_status()  # Levanta uma exceção se a resposta não for bem-sucedida
    return response.json()