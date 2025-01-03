from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def query_test():
    """
    Test endpoint for query routes.
    """
    return {"message": "Query route is working!"}
