from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_google_genai import ChatGoogleGenerativeAI

# prompt
prompt_template = ChatPromptTemplate.from_messages([
  ("human", "{input_message}")
])

# LLM
# ここは切り替えれるようにしたい。
llm = ChatGoogleGenerativeAI(
    model="models/gemini-1.5-flash"
)

# output
output_parser = StrOutputParser()

# chain の作成
chain = prompt_template | llm | output_parser


async def question_to_llm(input_message: str):
  """
  LLMへ問い合わせる

  Args:
      input_message (str): 質問

  Yields:
      str: 返答
  """
  response_stream = chain.astream({
    "input_message": input_message
  })
  async for chunk in response_stream:
    yield chunk

