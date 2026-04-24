def test_create_ingredient(client):
    response = client.post("/ingredients/", json={"name": "Azúcar"})
    assert response.status_code == 200
    assert response.json()["name"] == "Azúcar"


def test_list_ingredients(client):
    response = client.get("/ingredients/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)


def test_update_ingredient(client):
    create = client.post("/ingredients/", json={"name": "Sal"})
    ingredient_id = create.json()["id"]

    update = client.put(f"/ingredients/{ingredient_id}", json={"name": "Sal Fina"})
    assert update.status_code == 200
    assert update.json()["name"] == "Sal Fina"


def test_delete_ingredient(client):
    create = client.post("/ingredients/", json={"name": "Eliminar"})
    ingredient_id = create.json()["id"]

    delete = client.delete(f"/ingredients/{ingredient_id}")
    assert delete.status_code == 200
