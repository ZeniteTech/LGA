from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth_route, empresario_route, servico_route
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")


settings = Settings()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_route.router)
app.include_router(empresario_route.router)
app.include_router(servico_route.router)