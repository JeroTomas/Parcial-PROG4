from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.schemas.ingredient_schema import IngredientCreate, IngredientRead
from app.services.ingredient_service import IngredientService

router = APIRouter(prefix="/ingredients", tags=["Ingredients"])


# -----------------------------
# CREATE
# -----------------------------
@router.post("/", response_model=IngredientRead)
def create_ingredient(
    ingredient: IngredientCreate,
    session: Session = Depends(get_session)
):
    return IngredientService.create_ingredient(ingredient, session)


# -----------------------------
# LIST
# -----------------------------
@router.get("/", response_model=list[IngredientRead])
def list_ingredients(session: Session = Depends(get_session)):
    return IngredientService.list_ingredients(session)


# -----------------------------
# UPDATE
# -----------------------------
@router.put("/{ingredient_id}", response_model=IngredientRead)
def update_ingredient(
    ingredient_id: int,
    ingredient_update: IngredientCreate,
    session: Session = Depends(get_session)
):
    return IngredientService.update_ingredient(
        ingredient_id,
        ingredient_update,
        session
    )


# -----------------------------
# DELETE
# -----------------------------
@router.delete("/{ingredient_id}")
def delete_ingredient(ingredient_id: int, session: Session = Depends(get_session)):
    IngredientService.delete_ingredient(ingredient_id, session)
    return {"message": "Ingredient deleted successfully"}
