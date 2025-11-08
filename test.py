from markitdown import MarkItDown

md = MarkItDown(docintel_endpoint="https://docintel-endpoint.cognitiveservices.azure.com/")
result = md.convert("test.pdf")
print(result.text_content)