from typing import Annotated, Optional
from fastapi import Query
from sqlmodel import SQLModel


# -----------------------------
# BASE
# -----------------------------
class CategoryBase(SQLModel):
    name: Annotated[str, Query(min_length=2, max_length=50)]
    parent_id: Optional[int] = None


# -----------------------------
# CREATE
# -----------------------------
class CategoryCreate(CategoryBase):
    pass


# -----------------------------
# READ
# -----------------------------
class CategoryRead(CategoryBase):
    id: int
