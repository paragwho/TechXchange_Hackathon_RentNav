# main.py
# To run this app:
# 1. Install the required libraries:
#    pip install fastapi uvicorn python-dotenv requests
# 2. Create a file named .env in the same directory and add your credentials:
#    IBM_API_KEY="your_bearer_token_here"
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
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# --- Configuration ---
# Fetch credentials from environment variables
IBM_API_KEY = os.getenv("IBM_API_KEY")
PROJECT_ID = os.getenv("PROJECT_ID")
WATSONX_URL = (
    "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29"
)
MODEL_ID = "ibm/granite-3-8b-instruct"

# --- Add CORS Middleware ---
# This allows your frontend to make requests to this backend.
# In production, you should restrict the origins to your frontend's domain.
origins = [
    "http://localhost",
    "http://localhost:3000",  # Example for React
    "http://localhost:8080",  # Example for Vue
    "http://localhost:4200",  # Example for Angular
    "*",  # Allow all for hackathon simplicity
]

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
    if not IBM_API_KEY or not PROJECT_ID:
        return {
            "error": "Server configuration error: IBM_API_KEY or PROJECT_ID not found."
        }

    # The input structure for the model.
    input_text = f"""Input: You are a helpful housing rights chatbot. A tenant asks, 'My landlord says I have to leave in 3 days, can he do that?' Provide a supportive and informative answer explaining the concept of an eviction notice period, and then ask for their city and state to give a more specific answer.
Output: Of course I can help. It sounds like you're in a stressful situation. In most places, a landlord can't force you to leave with only three days' notice without a formal eviction process. This process includes a written "notice to quit." The required notice period varies a lot by location. To give you the most accurate information, could you please tell me your city and state?

Input: {request.prompt}
Output:"""

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
        "Authorization": f"Bearer {IBM_API_KEY}",
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


# To run the app directly (for development)
if __name__ == "__main__":
    import uvicorn

    print("\n--- Starting Watsonx Backend API ---")
    print("API running on http://127.0.0.1:8000")
    print("Endpoint available at POST /generate")
    print("------------------------------------\n")
    uvicorn.run(app, host="127.0.0.1", port=8000)
