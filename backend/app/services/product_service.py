from sqlmodel import Session, select
from fastapi import HTTPException
from app.models.product import Product
from app.models.category import Category
from app.models.ingredient import Ingredient
from app.schemas.product_schema import ProductCreate, ProductRead
from app.uow import UnitOfWork


class ProductService:

    @staticmethod
    def create_product(data: ProductCreate, session: Session) -> ProductRead:
        with UnitOfWork(session) as uow:
            # Validar categoría
            category = session.get(Category, data.category_id)
            if not category:
                raise HTTPException(status_code=404, detail="Category not found")

            # Crear producto base
            product = Product(
                name=data.name,
                price=data.price,
                category_id=data.category_id
            )
            session.add(product)
            session.flush()  # obtener ID antes de agregar ingredientes

            # Agregar ingredientes
            product.ingredients = []
            for ing_id in data.ingredients:
                ing = session.get(Ingredient, ing_id)
                if not ing:
                    raise HTTPException(status_code=404, detail=f"Ingredient {ing_id} not found")
                product.ingredients.append(ing)

            uow.commit()
            session.refresh(product)

            return ProductRead(
                id=product.id,
                name=product.name,
                price=product.price,
                category_id=product.category_id,
                ingredients=[i.id for i in product.ingredients]
            )

    @staticmethod
    def list_products(
        session: Session,
        category_id: int | None,
        min_price: float | None,
        max_price: float | None
    ) -> list[ProductRead]:

        query = select(Product)

        if category_id is not None:
            query = query.where(Product.category_id == category_id)

        if min_price is not None:
            query = query.where(Product.price >= min_price)

        if max_price is not None:
            query = query.where(Product.price <= max_price)

        products = session.exec(query).all()

        return [
            ProductRead(
                id=p.id,
                name=p.name,
                price=p.price,
                category_id=p.category_id,
                ingredients=[i.id for i in p.ingredients]
            )
            for p in products
        ]

    @staticmethod
    def get_product(product_id: int, session: Session) -> ProductRead:
        product = session.get(Product, product_id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")

        return ProductRead(
            id=product.id,
            name=product.name,
            price=product.price,
            category_id=product.category_id,
            ingredients=[i.id for i in product.ingredients]
        )

    @staticmethod
    def update_product(
        product_id: int,
        data: ProductCreate,
        session: Session
    ) -> ProductRead:

        with UnitOfWork(session) as uow:
            product = session.get(Product, product_id)
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")

            product.name = data.name
            product.price = data.price
            product.category_id = data.category_id

            # Actualizar ingredientes
            product.ingredients = []
            for ing_id in data.ingredients:
                ing = session.get(Ingredient, ing_id)
                if not ing:
                    raise HTTPException(status_code=404, detail=f"Ingredient {ing_id} not found")
                product.ingredients.append(ing)

            session.add(product)
            uow.commit()
            session.refresh(product)

            return ProductRead(
                id=product.id,
                name=product.name,
                price=product.price,
                category_id=product.category_id,
                ingredients=[i.id for i in product.ingredients]
            )

    @staticmethod
    def delete_product(product_id: int, session: Session) -> None:
        with UnitOfWork(session) as uow:
            product = session.get(Product, product_id)
            if not product:
                raise HTTPException(status_code=404, detail="Product not found")

            session.delete(product)
            uow.commit()
