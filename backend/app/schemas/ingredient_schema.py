from typing import List, TYPE_CHECKING, Annotated
from fastapi import Query
from sqlmodel import SQLModel


# -----------------------------
# BASE
# -----------------------------
from typing import Optional

class IngredientBase(SQLModel):
    name: Annotated[str, Query(min_length=2, max_length=50)]
    description: Optional[str] = None


# -----------------------------
# CREATE
# -----------------------------
class IngredientCreate(IngredientBase):
    pass


# -----------------------------
# SIMPLE (para evitar recursión)
# -----------------------------
class IngredientSimple(SQLModel):
    id: int
    name: str


# -----------------------------
# READ (con productos simples)
# -----------------------------
if TYPE_CHECKING:
    from app.schemas.product_schema import ProductSimple


class IngredientRead(IngredientBase):
    id: int
    products: List["ProductSimple"] = []


# -----------------------------
# REBUILD
# -----------------------------
from app.schemas.product_schema import ProductSimple
IngredientRead.model_rebuild()
