def test_get_nonexistent_category(client):
    response = client.get("/categories/99999")
    assert response.status_code == 404


def test_update_nonexistent_category(client):
    response = client.put("/categories/99999", json={"name": "Nada"})
    assert response.status_code == 404


def test_delete_nonexistent_category(client):
    response = client.delete("/categories/99999")
    assert response.status_code == 404
