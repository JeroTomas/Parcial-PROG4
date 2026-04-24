def test_create_category(client):
    response = client.post("/categories/", json={"name": "Bebidas"})
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "Bebidas"
    assert "id" in data


def test_list_categories(client):
    response = client.get("/categories/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_category(client):
    # Crear categoría
    create = client.post("/categories/", json={"name": "Snacks"})
    category_id = create.json()["id"]

    # Actualizar
    update = client.put(f"/categories/{category_id}", json={"name": "Snacks Dulces"})
    assert update.status_code == 200
    assert update.json()["name"] == "Snacks Dulces"


def test_delete_category(client):
    create = client.post("/categories/", json={"name": "Eliminar"})
    category_id = create.json()["id"]

    delete = client.delete(f"/categories/{category_id}")
    assert delete.status_code == 200
