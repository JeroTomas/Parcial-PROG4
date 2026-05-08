import pytest
from fastapi.testclient import TestClient
from main import app
from app.database import create_db_and_tables


@pytest.fixture(scope="session", autouse=True)
def setup_database():
    create_db_and_tables()


@pytest.fixture
def client():
    return TestClient(app)
