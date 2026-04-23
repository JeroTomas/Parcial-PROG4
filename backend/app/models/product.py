from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from app.models.product_ingredient import ProductIngredient

class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    price: float
    category_id: Optional[int] = Field(default=None, foreign_key="category.id")

    ingredients: List["Ingredient"] = Relationship(
        back_populates="products",
        link_model=ProductIngredient
    )
