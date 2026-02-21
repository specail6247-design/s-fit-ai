from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": "Masterpiece Fit Backend Running"}

@app.post("/api/try-on")
async def try_on(user_image: UploadFile = File(None), garment_image: UploadFile = File(None)):
    # Mock processing - In a real scenario, this would call Replicate IDM-VTON
    return JSONResponse(content={"result_url": "https://placehold.co/600x800.png?text=Try+On+Result"})

@app.post("/api/cinematic")
async def cinematic(source_image: UploadFile = File(None)):
    # Mock video generation - In a real scenario, this would call Runway Gen-3/4
    return JSONResponse(content={"video_url": "https://www.w3schools.com/html/mov_bbb.mp4"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
