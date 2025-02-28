from langchain_openai import ChatOpenAI

def main():
    print("Hello, print.")

    llm = ChatOpenAI()
    llm.invoke("Hello, with LLM.")


if __name__ == "__main__":
    main()
