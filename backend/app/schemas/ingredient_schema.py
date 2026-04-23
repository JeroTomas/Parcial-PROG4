from sqlmodel import SQLModel
from typing import Optional, List
from typing import TYPE_CHECKING
if TYPE_CHECKING:
    from app.schemas.product_schema import ProductRead

class IngredientBase(SQLModel):
    name: str

class IngredientCreate(IngredientBase):
    pass

class IngredientRead(IngredientBase):
    id: int
    products: List[ProductRead] = []
