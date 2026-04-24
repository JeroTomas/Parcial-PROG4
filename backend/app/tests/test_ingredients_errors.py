def test_update_nonexistent_ingredient(client):
    response = client.put("/ingredients/99999", json={"name": "Nada"})
    assert response.status_code == 404


def test_delete_nonexistent_ingredient(client):
    response = client.delete("/ingredients/99999")
    assert response.status_code == 404
