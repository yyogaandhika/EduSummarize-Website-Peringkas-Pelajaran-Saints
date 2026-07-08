import fitz  # PyMuPDF

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extracts text from a given PDF file using PyMuPDF.
    """
    text = ""
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            page_text = page.get_text("text")
            if page_text:
                text += page_text + " "
        doc.close()
        return text.strip()
    except Exception as e:
        raise Exception(f"Failed to read PDF file: {str(e)}")
