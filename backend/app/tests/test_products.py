def test_create_product(client):
    # Crear categoría primero
    category = client.post("/categories/", json={"name": "Lácteos"}).json()

    product_data = {
        "name": "Leche",
        "price": 1200,
        "category_id": category["id"]
    }

    response = client.post("/products/", json=product_data)
    assert response.status_code == 200
    assert response.json()["name"] == "Leche"


def test_list_products(client):
    response = client.get("/products/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_product(client):
    category = client.post("/categories/", json={"name": "Panadería"}).json()

    create = client.post("/products/", json={
        "name": "Pan",
        "price": 800,
        "category_id": category["id"]
    }).json()

    product_id = create["id"]

    update = client.put(f"/products/{product_id}", json={
        "name": "Pan Integral",
        "price": 900,
        "category_id": category["id"]
    })

    assert update.status_code == 200
    assert update.json()["name"] == "Pan Integral"


def test_delete_product(client):
    category = client.post("/categories/", json={"name": "Eliminar"}).json()

    create = client.post("/products/", json={
        "name": "Producto X",
        "price": 500,
        "category_id": category["id"]
    }).json()

    product_id = create["id"]

    delete = client.delete(f"/products/{product_id}")
    assert delete.status_code == 200
