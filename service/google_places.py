import time
import requests
from config.settings import settings

URL = "https://places.googleapis.com/v1/places:searchText"

def buscar_empresas(query: str, limite=60):
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": settings.GOOGLE_API_KEY,
        # Campos que retornam da API
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.priceLevel,places.websiteUri,places.nationalPhoneNumber,places.rating,nextPageToken"
    }

    places = []
    page_token = None

    while len(places) < limite:
        payload = {
            "textQuery": query,
            "pageSize": min(20, limite - len(places))
        }

        if page_token:
            payload["pageToken"] = page_token
    
        response = requests.post(URL, headers=headers, json=payload).json()
        
        # Pega a lista da página atual
        novos_places = response.get("places", [])
        
        # Adiciona os novos lugares na lista acumuladora 'places'
        places.extend(novos_places)

        # Atualiza o token para a próxima requisição
        page_token = response.get("nextPageToken")

        # Se não houver mais token ou se a busca não trouxe novos resultados, encerra
        if not page_token or not novos_places or len(places) >= limite:
            break

        time.sleep(2)

    return {"places": places[:limite]}