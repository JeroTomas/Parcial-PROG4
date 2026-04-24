from sqlmodel import Session, select
from fastapi import HTTPException
from app.models.ingredient import Ingredient
from app.schemas.ingredient_schema import IngredientCreate
from app.uow import UnitOfWork


class IngredientService:

    # -----------------------------
    # CREATE
    # -----------------------------
    @staticmethod
    def create_ingredient(data: IngredientCreate, session: Session) -> Ingredient:
        with UnitOfWork(session) as uow:
            ingredient = Ingredient.model_validate(data)
            session.add(ingredient)

            uow.commit()
            session.refresh(ingredient)
            return ingredient

    # -----------------------------
    # LIST
    # -----------------------------
    @staticmethod
    def list_ingredients(session: Session) -> list[Ingredient]:
        return session.exec(select(Ingredient)).all()

    # -----------------------------
    # UPDATE
    # -----------------------------
    @staticmethod
    def update_ingredient(
        ingredient_id: int,
        data: IngredientCreate,
        session: Session
    ) -> Ingredient:

        with UnitOfWork(session) as uow:
            ingredient = session.get(Ingredient, ingredient_id)
            if not ingredient:
                raise HTTPException(status_code=404, detail="Ingredient not found")

            ingredient.name = data.name

            session.add(ingredient)
            uow.commit()
            session.refresh(ingredient)
            return ingredient

    # -----------------------------
    # DELETE
    # -----------------------------
    @staticmethod
    def delete_ingredient(ingredient_id: int, session: Session) -> None:
        with UnitOfWork(session) as uow:
            ingredient = session.get(Ingredient, ingredient_id)
            if not ingredient:
                raise HTTPException(status_code=404, detail="Ingredient not found")

            session.delete(ingredient)
            uow.commit()
