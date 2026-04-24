def test_create_product_with_invalid_category(client):
    product_data = {
        "name": "Producto inválido",
        "price": 1000,
        "category_id": 99999
    }

    response = client.post("/products/", json=product_data)
    assert response.status_code == 404


def test_update_nonexistent_product(client):
    response = client.put("/products/99999", json={
        "name": "Nada",
        "price": 100,
        "category_id": 1
    })
    assert response.status_code == 404


def test_delete_nonexistent_product(client):
    response = client.delete("/products/99999")
    assert response.status_code == 404
