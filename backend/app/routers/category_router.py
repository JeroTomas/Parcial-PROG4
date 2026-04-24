from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.database import get_session
from app.schemas.category_schema import CategoryCreate, CategoryRead
from app.services.category_service import CategoryService

router = APIRouter(prefix="/categories", tags=["Categories"])


# -----------------------------
# CREATE
# -----------------------------
@router.post("/", response_model=CategoryRead)
def create_category(
    category: CategoryCreate,
    session: Session = Depends(get_session)
):
    return CategoryService.create_category(category, session)


# -----------------------------
# LIST
# -----------------------------
@router.get("/", response_model=list[CategoryRead])
def list_categories(session: Session = Depends(get_session)):
    return CategoryService.list_categories(session)


# -----------------------------
# UPDATE
# -----------------------------
@router.put("/{category_id}", response_model=CategoryRead)
def update_category(
    category_id: int,
    category_update: CategoryCreate,
    session: Session = Depends(get_session)
):
    return CategoryService.update_category(
        category_id,
        category_update,
        session
    )


# -----------------------------
# DELETE
# -----------------------------
@router.delete("/{category_id}")
def delete_category(category_id: int, session: Session = Depends(get_session)):
    CategoryService.delete_category(category_id, session)
    return {"message": "Category deleted successfully"}
