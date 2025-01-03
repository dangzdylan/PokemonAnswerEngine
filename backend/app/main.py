from fastapi import FastAPI
from app.routes.query import router as query_router
from fastapi.middleware.cors import CORSMiddleware

# Initialize the FastAPI app
app = FastAPI(
    title="Pokémon Answer Engine",
    description="An answer engine to provide responses about Pokémon using RAG.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update this for stricter security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the query routes
app.include_router(query_router, prefix="/query", tags=["Query"])

@app.get("/")
async def root():
    """
    Root endpoint to check if the API is running.
    """
    return {"message": "Welcome to the Pokémon Answer Engine!"}
