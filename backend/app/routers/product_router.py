from fastapi import APIRouter, Depends, HTTPException, Query
from typing import Annotated, List
from sqlmodel import Session
from app.database import get_session
from app.schemas.product_schema import ProductCreate, ProductRead
from app.services.product_service import ProductService

router = APIRouter(prefix="/products", tags=["Products"])


# -----------------------------
# CREATE
# -----------------------------
@router.post("/", response_model=ProductRead)
def create_product(
    product: ProductCreate,
    session: Session = Depends(get_session)
):
    return ProductService.create_product(product, session)


# -----------------------------
# LIST + FILTER BY CATEGORY + PRICE
# -----------------------------
@router.get("/", response_model=List[ProductRead])
def list_products(
    category_id: Annotated[int | None, Query(gt=0)] = None,
    min_price: Annotated[float | None, Query(gt=0)] = None,
    max_price: Annotated[float | None, Query(gt=0)] = None,
    session: Session = Depends(get_session)
):
    return ProductService.list_products(
        session=session,
        category_id=category_id,
        min_price=min_price,
        max_price=max_price
    )


# -----------------------------
# GET BY ID
# -----------------------------
@router.get("/{product_id}", response_model=ProductRead)
def get_product(product_id: int, session: Session = Depends(get_session)):
    return ProductService.get_product(product_id, session)


# -----------------------------
# UPDATE
# -----------------------------
@router.put("/{product_id}", response_model=ProductRead)
def update_product(
    product_id: int,
    product_update: ProductCreate,
    session: Session = Depends(get_session)
):
    return ProductService.update_product(product_id, product_update, session)


# -----------------------------
# DELETE
# -----------------------------
@router.delete("/{product_id}")
def delete_product(product_id: int, session: Session = Depends(get_session)):
    ProductService.delete_product(product_id, session)
    return {"message": "Product deleted successfully"}
