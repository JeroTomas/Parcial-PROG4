import os
from sqlmodel import SQLModel, create_engine, Session
from dotenv import load_dotenv

# 1. Cargar variables del archivo .env
load_dotenv()

# 2. Leer la URL de conexión
DATABASE_URL = os.getenv("DATABASE_URL")

# 3. Crear el motor de conexión a PostgreSQL
engine = create_engine(DATABASE_URL, echo=True)

# 4. Crear las tablas automáticamente
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# 5. Crear una sesión por cada request
def get_session():
    with Session(engine) as session:
        yield session
