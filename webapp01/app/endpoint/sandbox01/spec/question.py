from pydantic import BaseModel

class QuestionRequest(BaseModel):
    input_message: str
