from sqlmodel import Session, select
from fastapi import HTTPException
from app.models.category import Category
from app.schemas.category_schema import CategoryCreate
from app.uow import UnitOfWork


class CategoryService:

    # -----------------------------
    # CREATE
    # -----------------------------
    @staticmethod
    def create_category(data: CategoryCreate, session: Session) -> Category:
        with UnitOfWork(session) as uow:
            category = Category(name=data.name, parent_id=data.parent_id)
            session.add(category)

            uow.commit()
            session.refresh(category)
            return category

    # -----------------------------
    # LIST
    # -----------------------------
    @staticmethod
    def list_categories(session: Session) -> list[Category]:
        return session.exec(select(Category)).all()

    # -----------------------------
    # UPDATE
    # -----------------------------
    @staticmethod
    def update_category(
        category_id: int,
        data: CategoryCreate,
        session: Session
    ) -> Category:

        with UnitOfWork(session) as uow:
            category = session.get(Category, category_id)
            if not category:
                raise HTTPException(status_code=404, detail="Category not found")

            category.name = data.name
            category.parent_id = data.parent_id

            session.add(category)
            uow.commit()
            session.refresh(category)
            return category

    # -----------------------------
    # DELETE
    # -----------------------------
    @staticmethod
    def delete_category(category_id: int, session: Session) -> None:
        from app.models.product import Product
        with UnitOfWork(session) as uow:
            category = session.get(Category, category_id)
            if not category:
                raise HTTPException(status_code=404, detail="Category not found")

            # Cascade delete products
            products = session.exec(select(Product).where(Product.category_id == category_id)).all()
            for prod in products:
                prod.ingredients = []  # Clear relationships in link table
                session.delete(prod)

            session.delete(category)
            uow.commit()
