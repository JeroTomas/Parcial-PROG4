from typing import Annotated, Optional
from fastapi import Query
from sqlmodel import SQLModel


class CategoryBase(SQLModel):
    name: Annotated[str, Query(min_length=2, max_length=50)]
    parent_id: Optional[int] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryRead(CategoryBase):
    id: int
