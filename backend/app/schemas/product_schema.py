from sqlmodel import SQLModel
from typing import Optional, List
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.schemas.ingredient_schema import IngredientRead


class ProductBase(SQLModel):
    name: str
    price: float
    category_id: int

class ProductCreate(ProductBase):
    pass

class ProductRead(ProductBase):
    id: int
    ingredients: List[IngredientRead] = []
