import os
import requests
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Any, List, Optional, Mapping

from langchain.agents import AgentExecutor, create_react_agent
from langchain.prompts import ChatPromptTemplate
from langchain.tools import Tool
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain.llms.base import LLM


load_dotenv(override=True)


class WatsonxLLM(LLM):
    @property
    def _llm_type(self) -> str:
        return "watsonx"

    def _call(
        self,
        prompt: str,
        stop: Optional[List[str]] = None,
        run_manager: Optional[Any] = None,
        **kwargs: Any,
    ) -> str:
        return query_watsonx(prompt)

    @property
    def _identifying_params(self) -> Mapping[str, Any]:
        return {}


class ChatRequest(BaseModel):
    query: str


def query_watsonx(prompt: str) -> str:
    token, project_id = os.getenv("IBM_ACCESS_TOKEN"), os.getenv("IBM_PROJECT_ID")
    if not token or not project_id:
        return "Error: Missing IBM_ACCESS_TOKEN or IBM_PROJECT_ID in .env"

    body = {
        "input": prompt,
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 500,
            "repetition_penalty": 1.2,
        },
        "model_id": os.getenv("MODEL_ID", "ibm/granite-3-8b-instruct"),
        "project_id": project_id,
    }
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {token}",
    }

    url = os.getenv(
        "WATSONX_URL",
        "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29",
    )
    res = requests.post(url, headers=headers, json=body)

    if res.status_code != 200:
        return f"Error from Watsonx API: {res.text}"

    return (
        res.json().get("results", [{}])[0].get("generated_text", "").strip()
        or "No text generated."
    )


def property_search_tool(query: str):
    api_key = os.getenv("RENTCAST_API_KEY")
    if not api_key:
        return "Error: Missing RENTCAST_API_KEY in environment variables"

    params: dict[str, str] = {}
    for part in query.split(","):
        if "=" in part:
            k, v = part.split("=", 1)
            params[k.strip()] = v.strip()

    rename_map = {"bedrooms": "beds", "bathrooms": "baths", "postal_code": "postalCode"}
    params = {rename_map.get(k, k): v for k, v in params.items()}

    params = {k: str(v) for k, v in params.items() if v is not None}

    url = "https://api.rentcast.io/v1/listings/rental"

    try:
        res = requests.get(
            url,
            headers={"Accept": "application/json", "X-Api-Key": api_key},
            params=params,
        )
        res.raise_for_status()
        return res.json()
    except requests.RequestException as e:
        return f"Error fetching data from RentCast: {str(e)}"


def build_agent():
    embeddings = HuggingFaceEmbeddings(
        model_name=os.getenv(
            "EMBEDDINGS_MODEL", "sentence-transformers/all-MiniLM-L6-v2"
        )
    )
    vectordb = Chroma(
        persist_directory=os.getenv("PERSIST_DIRECTORY", "db"),
        embedding_function=embeddings,
    )

    tools = [
        Tool(
            name="DocumentSearch",
            func=vectordb.as_retriever().get_relevant_documents,
            description="Search in provided documents.",
        ),
        Tool(
            name="RentCastAPI",
            func=property_search_tool,
            description="Get info about real estate listings. The query should be a comma-separated string of key-value pairs. Example: 'city=New York,state=NY,bedrooms=2'",
        ),
    ]

    prompt = ChatPromptTemplate.from_messages(
        [
            (
                "system",
                "You are a helpful assistant with access to tools:\n{tools}\n"
                "Tool names:\n{tool_names}\n"
                "Use format:\nQuestion:..\nThought:..\nAction:..\n"
                "Action Input:..\nObservation:..\nRepeat as needed.\n"
                "Thought: I now know the final answer\nFinal Answer:..",
            ),
            ("user", "{input}\n\n{agent_scratchpad}"),
        ]
    )

    return AgentExecutor(
        agent=create_react_agent(WatsonxLLM(), tools, prompt),
        tools=tools,
        verbose=False,
        handle_parsing_errors=True,
    )


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

agent_executor = build_agent()


@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        result = agent_executor.invoke({"input": req.query})
        return {"answer": result["output"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
