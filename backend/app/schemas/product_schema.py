from typing import List, TYPE_CHECKING, Annotated
from fastapi import Query
from sqlmodel import SQLModel


class ProductBase(SQLModel):
    name: Annotated[str, Query(min_length=2, max_length=50)]
    price: Annotated[float, Query(gt=0)]
    category_id: int
    image_url: str | None = None
    description: str | None = None


class ProductCreate(ProductBase):
    ingredients: List[int]


class ProductSimple(SQLModel):
    id: int
    name: str
    price: float
    category_id: int


class ProductRead(ProductBase):
    id: int
    ingredients: List[int] = []


ProductRead.model_rebuild()
