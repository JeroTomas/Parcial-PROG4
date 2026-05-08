from sqlmodel import Session, select
from fastapi import HTTPException
from app.models.category import Category
from app.schemas.category_schema import CategoryCreate
from app.uow import UnitOfWork


class CategoryService:

    @staticmethod
    def create_category(data: CategoryCreate, session: Session) -> Category:
        with UnitOfWork(session) as uow:
            category = Category(name=data.name, parent_id=data.parent_id)
            session.add(category)

            session.flush()
            session.refresh(category)
            return category

    @staticmethod
    def list_categories(session: Session) -> list[Category]:
        return session.exec(select(Category).where(Category.is_deleted == False)).all()

    @staticmethod
    def get_category(category_id: int, session: Session) -> Category | None:
        category = session.get(Category, category_id)
        if category and category.is_deleted:
            return None
        return category

    @staticmethod
    def update_category(
        category_id: int,
        data: CategoryCreate,
        session: Session
    ) -> Category:

        with UnitOfWork(session) as uow:
            category = session.get(Category, category_id)
            if not category or category.is_deleted:
                raise HTTPException(status_code=404, detail="Category not found")

            category.name = data.name
            category.parent_id = data.parent_id

            session.add(category)
            session.flush()
            session.refresh(category)
            return category

    @staticmethod
    def delete_category(category_id: int, session: Session) -> None:
        from app.models.product import Product
        with UnitOfWork(session) as uow:
            category = session.get(Category, category_id)
            if not category or category.is_deleted:
                raise HTTPException(status_code=404, detail="Category not found")

            products = session.exec(select(Product).where(Product.category_id == category_id)).all()
            for prod in products:
                prod.is_deleted = True

            category.is_deleted = True
