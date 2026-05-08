from typing import List, TYPE_CHECKING, Annotated, Optional
from fastapi import Query
from sqlmodel import SQLModel


class IngredientBase(SQLModel):
    name: Annotated[str, Query(min_length=2, max_length=50)]
    description: Optional[str] = None


class IngredientCreate(IngredientBase):
    pass


class IngredientSimple(SQLModel):
    id: int
    name: str


if TYPE_CHECKING:
    from app.schemas.product_schema import ProductSimple


class IngredientRead(IngredientBase):
    id: int
    products: List["ProductSimple"] = []


from app.schemas.product_schema import ProductSimple
IngredientRead.model_rebuild()
