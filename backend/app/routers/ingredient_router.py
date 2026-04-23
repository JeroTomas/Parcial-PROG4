from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.database import get_session
from app.models.ingredient import Ingredient
from app.schemas.ingredient_schema import IngredientCreate, IngredientRead

router = APIRouter(prefix="/ingredients", tags=["Ingredients"])

@router.post("/", response_model=IngredientRead)
def create_ingredient(ingredient: IngredientCreate, session: Session = Depends(get_session)):
    db_ingredient = Ingredient.model_validate(ingredient)
    session.add(db_ingredient)
    session.commit()
    session.refresh(db_ingredient)
    return db_ingredient

@router.get("/", response_model=list[IngredientRead])
def list_ingredients(session: Session = Depends(get_session)):
    ingredients = session.exec(select(Ingredient)).all()
    return ingredients
