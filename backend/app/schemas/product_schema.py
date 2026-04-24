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
    ingredients: List[int]  # ahora el create también recibe IDs


# -----------------------------
# SIMPLE (para evitar recursión)
# -----------------------------
class ProductSimple(SQLModel):
    id: int
    name: str
    price: float
    category_id: int


# -----------------------------
# READ (devuelve IDs, NO objetos)
# -----------------------------
class ProductRead(ProductBase):
    id: int
    ingredients: List[int] = []


# -----------------------------
# REBUILD
# -----------------------------
ProductRead.model_rebuild()
