import os
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma


# Directory for persistent ChromaDB
PERSIST_DIRECTORY = "db"
INGESTED_FILES_LOG = ".ingested_files"


def get_ingested_files():
    if not os.path.exists(INGESTED_FILES_LOG):
        return set()
    with open(INGESTED_FILES_LOG, "r") as f:
        return set(f.read().splitlines())


def log_ingested_file(filename):
    with open(INGESTED_FILES_LOG, "a") as f:
        f.write(f"{filename}\n")


def ingest_pdfs():
    data_dir = "data"
    if not os.path.exists(data_dir):
        print(f"Error: Directory '{data_dir}' not found.")
        return

    ingested_files = get_ingested_files()
    all_pdf_files = {f for f in os.listdir(data_dir) if f.endswith(".pdf")}

    new_pdf_files = sorted(list(all_pdf_files - ingested_files))

    if not new_pdf_files:
        print("No new PDF files to ingest.")
        return

    print(f"Found {len(new_pdf_files)} new PDF files to ingest: {new_pdf_files}")

    print("Creating embeddings with a local model...")
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    print(f"Loading existing vector store from '{PERSIST_DIRECTORY}'...")
    vectordb = Chroma(
        persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings
    )

    for pdf_file in new_pdf_files:
        try:
            pdf_path = os.path.join(data_dir, pdf_file)
            print(f"Processing {pdf_path}...")
            loader = PyPDFLoader(pdf_path)
            documents = loader.load()

            print("Splitting document into chunks...")
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=1000, chunk_overlap=200
            )
            splits = text_splitter.split_documents(documents)

            print(f"Adding {len(splits)} chunks to the vector store...")
            vectordb.add_documents(splits)

            log_ingested_file(pdf_file)
            print(f"Successfully ingested {pdf_file}")

        except Exception as e:
            print(f"Error processing {pdf_file}: {e}")
            print("Skipping this file.")

    print("\nIngestion complete.")
    print(f"Vector store now contains {vectordb._collection.count()} documents.")


if __name__ == "__main__":
    ingest_pdfs()
