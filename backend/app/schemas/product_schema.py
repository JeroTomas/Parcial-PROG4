from typing import List, TYPE_CHECKING, Annotated
from fastapi import Query
from sqlmodel import SQLModel


# -----------------------------
# BASE
# -----------------------------
class ProductBase(SQLModel):
    name: Annotated[str, Query(min_length=2, max_length=50)]
    price: Annotated[float, Query(gt=0)]
    category_id: int


# -----------------------------
# CREATE
# -----------------------------
class ProductCreate(ProductBase):
    pass


# -----------------------------
# SIMPLE (para evitar recursión)
# -----------------------------
class ProductSimple(SQLModel):
    id: int
    name: str
    price: float
    category_id: int


# -----------------------------
# READ (con ingredientes simples)
# -----------------------------
if TYPE_CHECKING:
    from app.schemas.ingredient_schema import IngredientSimple


class ProductRead(ProductBase):
    id: int
    ingredients: List["IngredientSimple"] = []


# -----------------------------
# REBUILD
# -----------------------------
from app.schemas.ingredient_schema import IngredientSimple
ProductRead.model_rebuild()
