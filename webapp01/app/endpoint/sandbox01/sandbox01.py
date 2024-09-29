from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.endpoint.sandbox01.spec.question import QuestionRequest

from app.endpoint.sandbox01 import sandbox01_llm

router = APIRouter(prefix="/sandbox01")

@router.post("/question")
async def question(request: QuestionRequest):
    return StreamingResponse(
        sandbox01_llm.question_to_llm(request.input_message),
        media_type="text/event-stream",
    )
