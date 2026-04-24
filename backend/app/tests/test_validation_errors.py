def test_invalid_min_price(client):
    response = client.get("/products/?min_price=-10")
    assert response.status_code == 422  # Error de validación


def test_invalid_max_price(client):
    response = client.get("/products/?max_price=0")
    assert response.status_code == 422


def test_invalid_category_id_filter(client):
    response = client.get("/products/?category_id=0")
    assert response.status_code == 422
