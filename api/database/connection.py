from sqlalchemy import create_engine

from config.settings import settings

DATABASE_URL = (
    f"{settings.DB_URL}"
)

engine = create_engine(DATABASE_URL)