from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from app.database import get_session
from app.models.product import Product
from app.models.ingredient import Ingredient
from app.models.product_ingredient import ProductIngredient

router = APIRouter(prefix="/product-ingredients", tags=["Product-Ingredients"])

@router.post("/{product_id}/{ingredient_id}")
def add_ingredient_to_product(product_id: int, ingredient_id: int, session: Session = Depends(get_session)):
    product = session.get(Product, product_id)
    ingredient = session.get(Ingredient, ingredient_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    if not ingredient:
        raise HTTPException(status_code=404, detail="Ingredient not found")

    link = ProductIngredient(product_id=product_id, ingredient_id=ingredient_id)
    session.add(link)
    session.commit()

    return {"message": "Ingredient added to product successfully"}
