from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router
from model_loader import load_model

app = FastAPI(title="EduSummarize AI API", version="1.0.0")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    load_model()

@app.get("/")
def root():
    return {
        "status": "online",
        "message": "EduSummarize AI Backend API is running!",
        "docs": "/docs"
    }

app.include_router(router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
