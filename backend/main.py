# To run this app:
# 1. Install the required libraries:
#    pip install fastapi[standard] uvicorn python-dotenv requests
# 2. Create a file named .env in the same directory and add your credentials:
#    ACCESS_TOKEN="your_bearer_token_here"
#    PROJECT_ID="your_project_id_here"
# 3. Run the app from your terminal:
#    uvicorn main:app --reload

import os
import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from a .env file
load_dotenv(override=True)

# Initialize FastAPI app
app = FastAPI()

# --- Configuration ---
# Fetch credentials from environment variables
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
PROJECT_ID = os.getenv("PROJECT_ID")
WATSONX_URL = (
    "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
)
MODEL_ID = "ibm/granite-3-8b-instruct"

# --- Add CORS Middleware ---
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Pydantic Model for Request Body ---
# This defines the expected JSON structure for incoming requests.
class PromptRequest(BaseModel):
    prompt: str


# --- API Endpoint ---
@app.post("/generate")
async def generate_text(request: PromptRequest):
    """
    Handles the text generation request by calling the Watsonx API.
    Accepts a JSON object with a "prompt" key.
    """
    # Check for the API key and Project ID every time the endpoint is called.
    if not ACCESS_TOKEN or not PROJECT_ID:
        return {
            "error": "Server configuration error: ACCESS_TOKEN or PROJECT_ID not found."
        }

    # The input structure for the model.
    input_text = f"Input: {request.prompt}\nOutput:"

    # Construct the request body for the Watsonx API
    body = {
        "input": input_text,
        "parameters": {
            "decoding_method": "greedy",
            "max_new_tokens": 250,
            "min_new_tokens": 0,
            "repetition_penalty": 1.2,
        },
        "model_id": MODEL_ID,
        "project_id": PROJECT_ID,
    }

    # Set the authorization headers
    headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": f"Bearer {ACCESS_TOKEN}",
    }

    # Make the POST request to the Watsonx API
    response = requests.post(WATSONX_URL, headers=headers, json=body)

    # Check if the request was successful
    if response.status_code != 200:
        return response.json()

    data = response.json()

    # Extract the generated text from the response
    generated_text = data.get("results", [{}])[0].get(
        "generated_text", "No text generated."
    )

    return {"generated_text": generated_text.strip()}
