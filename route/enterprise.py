from fastapi import APIRouter
from service.google_places import buscar_empresas

router = APIRouter(prefix="/enterprise")

@router.get("/search_leads")
def buscar_leads(cidade: str):
    
    resultado = buscar_empresas(cidade)
    return resultado 

  