import requests
import time

# from config.settings import GOOGLE_API_KEY
from config.settings import settings

URL = "https://places.googleapis.com/v1/places:searchText"


def buscar_empresas(cidade: str):
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": settings.GOOGLE_API_KEY,
        # Campos que retornam da api
        "X-Goog-FieldMask": "places.displayName,places.formattedAddress,places.priceLevel,places.websiteUri,places.nationalPhoneNumber,places.rating,nextPageToken"
    }

    todas_empresa = []
    page_token = None
    max_leads = 60

    while len(todas_empresa) < max_leads:
        body = {
            "textQuery": f"empresas em {cidade}",
            "pageSize": min(20, max_leads - len(todas_empresa)),
        }
        if page_token:
            body["pageToken"] = page_token

        response = requests.post(URL, headers=headers, json=body)

        if response.status_code != 200:
            print(f"Erro na requisição: {response.status_code} - {response.text}")
            return {}

        data = response.json()
        places = data.get("places", [])

        if not places:
            break

        todas_empresa.extend(places)
        page_token = data.get("nextPageToken")

        if not page_token:
            break

        time.sleep(2)  # Aguarda 2 segundos antes de fazer a próxima requisição

    return {"places": todas_empresa[:max_leads]}