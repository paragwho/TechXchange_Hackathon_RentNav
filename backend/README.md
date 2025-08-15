# AI Agent for Real Estate Document Analysis

## Overview

This project is a sophisticated AI agent designed to answer questions by leveraging both a private knowledge base of documents and external APIs. It uses a Large Language Model (LLM) as its reasoning engine to decide which tool to use based on the user's query. The application is built with FastAPI, making it a robust and scalable web service.

## Architecture

The application is built on an **agentic RAG (Retrieval-Augmented Generation)** architecture. The core of the application is an AI agent that intelligently orchestrates a set of tools to answer user queries.

Here are the main components:

- **FastAPI Server:** Provides the web API interface for interacting with the AI agent.
- **AI Agent:** The "brain" of the application. It uses an IBM LLM to reason about user queries and decide which tool to use.
- **Tools:** The agent has access to a set of tools:
    - **DocumentSearch:** A tool that searches a vector database of your private documents to answer questions based on their content.
    - **RentCastAPI:** A tool that can be used to fetch real-time real estate data (currently a placeholder).
- **Vector Database:** A ChromaDB vector store that contains the numerical representations (embeddings) of your documents.
- **Embedding Model:** A local `sentence-transformers` model that is used to convert your documents and user queries into embeddings.

### How it Works (Query Handling)

When a user sends a query to the `/chat` endpoint, the application follows these steps:

1.  **Query Received:** The FastAPI server receives the user's query.
2.  **Agent Invoked:** The query is passed to the AI agent.
3.  **Reasoning (ReAct Loop):** The agent uses the **ReAct (Reasoning and Acting)** framework to decide how to respond:
    - **Thought:** The LLM thinks about the user's query and examines the descriptions of the available tools.
    - **Action:** The LLM decides which tool is the most appropriate and what input to give it.
    - **Observation:** The agent runs the chosen tool and gets the result.
    - **Repeat:** The agent repeats the Thought-Action-Observation loop until it has enough information to answer the user's question.
4.  **Final Answer:** The agent generates a final answer based on the information it has gathered.
5.  **Response Sent:** The FastAPI server sends the agent's final answer back to the user as a JSON response.

## Setup and Installation

1.  **Clone the Repository:**
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>
    ```

2.  **Create a Virtual Environment:**
    ```bash
    python -m venv .venv
    .venv\Scripts\activate
    ```

3.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up Environment Variables:**
    - Create a file named `.env` in the root of the project.
    - Add your IBM Cloud credentials to the `.env` file:
      ```
      IBM_ACCESS_TOKEN="your_ibm_access_token"
      IBM_CLOUD_PROJECT_ID="your_ibm_cloud_project_id"
      ```

5.  **Add Documents:**
    - Place the PDF documents you want to query into the `data` directory.

6.  **Ingest Documents:**
    - Run the ingestion script to create the vector database:
      ```bash
      python ingest.py
      ```

## Running the Application

To run the FastAPI server, use the following command:

```bash
uvicorn qa:app --reload
```

The server will be available at `http://127.0.0.1:8000`.

## API Usage

You can interact with the AI agent by sending a `POST` request to the `/chat` endpoint.

**Request:**

- **URL:** `/chat`
- **Method:** `POST`
- **Body (JSON):**
  ```json
  {
    "query": "your question here"
  }
  ```

**Example with `curl`:**

```bash
curl -X POST "http://127.0.0.1:8000/chat" -H "Content-Type: application/json" -d '{"query": "What is the Real Estate Act 2016 about?"}'
```

**Response:**

```json
{
  "answer": "The agent's final answer will be here."
}
```
