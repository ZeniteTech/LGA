import os
from dotenv import load_dotenv

load_dotenv()


class Settings:

    DB_URL: str = os.getenv("DB_URL")
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY")


settings = Settings()