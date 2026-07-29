from fastapi import APIRouter
from service.google_places import buscar_empresas

router = APIRouter(prefix="/enterprise", tags=["Enterprise"])

@router.get("/search_leads")
def enterprise_route(nichoEmpresa_cidade: str):
    
    resultado = buscar_empresas(nichoEmpresa_cidade)
    return resultado 

  