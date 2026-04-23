from fastapi import FastAPI
from app.database import create_db_and_tables
from app.routers.category_router import router as category_router
from app.routers.ingredient_router import router as ingredient_router
from app.routers.product_router import router as product_router
from app.routers.product_ingredient_router import router as product_ingredient_router



app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(category_router)
app.include_router(ingredient_router)
app.include_router(product_router)
app.include_router(product_ingredient_router)

@app.get("/")
async def root():
    return {"message": "Hola Mundo"}

