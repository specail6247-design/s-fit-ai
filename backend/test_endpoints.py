from fastapi.testclient import TestClient
from main import app
from unittest.mock import patch

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "S_FIT AI Masterpiece Backend Operational"}

@patch("replicate.run")
def test_generate(mock_run):
    mock_run.return_value = "https://example.com/result.png"

    response = client.post("/generate", json={
        "user_photo": "https://example.com/user.jpg",
        "garment_image": "https://example.com/garment.jpg",
        "category": "upper_body"
    })

    assert response.status_code == 200
    assert response.json()["success"] == True
    assert response.json()["image_url"] == "https://example.com/result.png"

@patch("replicate.run")
def test_generate_with_accessory(mock_run):
    # Mock return values for two consecutive calls
    mock_run.side_effect = ["https://example.com/garment_only.png", "https://example.com/final_with_accessory.png"]

    response = client.post("/generate", json={
        "user_photo": "https://example.com/user.jpg",
        "garment_image": "https://example.com/garment.jpg",
        "accessory_image": "https://example.com/necklace.jpg",
        "category": "upper_body"
    })

    assert response.status_code == 200
    assert response.json()["success"] == True
    assert response.json()["image_url"] == "https://example.com/final_with_accessory.png"
    assert mock_run.call_count == 2

@patch("replicate.run")
def test_upscale(mock_run):
    mock_run.return_value = "https://example.com/upscaled.png"

    response = client.post("/upscale", json={
        "image_url": "https://example.com/input.png"
    })

    assert response.status_code == 200
    assert response.json()["success"] == True
    assert response.json()["image_url"] == "https://example.com/upscaled.png"

@patch("replicate.run")
def test_cinematic(mock_run):
    mock_run.return_value = "https://example.com/video.mp4"

    response = client.post("/cinematic", json={
        "image_url": "https://example.com/input.png"
    })

    assert response.status_code == 200
    assert response.json()["success"] == True
    assert response.json()["video_url"] == "https://example.com/video.mp4"

if __name__ == "__main__":
    test_root()
    test_generate()
    test_generate_with_accessory()
    test_upscale()
    test_cinematic()
    print("All tests passed!")
