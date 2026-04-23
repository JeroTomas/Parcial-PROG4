from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from app.models.product_ingredient import ProductIngredient


class Ingredient(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str

    products: List["Product"] = Relationship(
        back_populates="ingredients",
        link_model=ProductIngredient
    )
