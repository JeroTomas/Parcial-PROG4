from sqlmodel import Session, select
from fastapi import HTTPException
from app.models.ingredient import Ingredient
from app.schemas.ingredient_schema import IngredientCreate
from app.uow import UnitOfWork


class IngredientService:

    @staticmethod
    def create_ingredient(data: IngredientCreate, session: Session) -> Ingredient:
        with UnitOfWork(session) as uow:
            ingredient = Ingredient.model_validate(data)
            session.add(ingredient)

            session.flush()
            session.refresh(ingredient)
            return ingredient

    @staticmethod
    def list_ingredients(session: Session) -> list[Ingredient]:
        return session.exec(select(Ingredient).where(Ingredient.is_deleted == False)).all()

    @staticmethod
    def update_ingredient(
        ingredient_id: int,
        data: IngredientCreate,
        session: Session
    ) -> Ingredient:

        with UnitOfWork(session) as uow:
            ingredient = session.get(Ingredient, ingredient_id)
            if not ingredient or ingredient.is_deleted:
                raise HTTPException(status_code=404, detail="Ingredient not found")

            ingredient.name = data.name
            ingredient.description = data.description

            session.add(ingredient)
            session.flush()
            session.refresh(ingredient)
            return ingredient

    @staticmethod
    def delete_ingredient(ingredient_id: int, session: Session) -> None:
        with UnitOfWork(session) as uow:
            ingredient = session.get(Ingredient, ingredient_id)
            if not ingredient or ingredient.is_deleted:
                raise HTTPException(status_code=404, detail="Ingredient not found")

            ingredient.is_deleted = True
