from sqlmodel import Session, select
from fastapi import HTTPException
from app.models.product import Product
from app.models.category import Category
from app.schemas.product_schema import ProductCreate
from app.uow import UnitOfWork


class ProductService:

    @staticmethod
    def create_product(data: ProductCreate, session: Session) -> Product:
        with UnitOfWork(session) as uow:
            category = session.get(Category, data.category_id)
            if not category:
                raise HTTPException(status_code=404, detail="Category not found")

            product = Product.model_validate(data)
            session.add(product)

            uow.commit()
            session.refresh(product)
            return product

    @staticmethod
    def list_products(
        session: Session,
        category_id: int | None,
        min_price: float | None,
        max_price: float | None
    ) -> list[Product]:

        query = select(Product)

        if category_id is not None:
            query = query.where(Product.category_id == category_id)

        if min_price is not None:
            query = query.where(Product.price >= min_price)

        if max_price is not None:
            query = query.where(Product.price <= max_price)

        return session.exec(query).all()

    @staticmethod
    def get_product(product_id: int, session: Session) -> Product:
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product

    @staticmethod
    def update_product(
        product_id: int,
        data: ProductCreate,
        session: Session
    ) -> Product:

        with UnitOfWork(session) as uow:
            product = session.get(Product, product_id)
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")

            product.name = data.name
            product.price = data.price
            product.category_id = data.category_id

            session.add(product)
            uow.commit()
            session.refresh(product)
            return product

    @staticmethod
    def delete_product(product_id: int, session: Session) -> None:
        with UnitOfWork(session) as uow:
            product = session.get(Product, product_id)
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")

            session.delete(product)
            uow.commit()
