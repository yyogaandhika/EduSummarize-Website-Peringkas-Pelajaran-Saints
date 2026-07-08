from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from model_loader import load_model

app = FastAPI(title="EduSummarize AI API", version="1.0.0")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the exact frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model
@app.on_event("startup")
async def startup_event():
    print("Loading model on startup...")

    success = load_model()

    if success:
        print("✅ Model loaded successfully.")
    else:
        print("❌ Failed to load model.")

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
