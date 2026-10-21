def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract plain text from a PDF file using pypdf (lightweight) or fitz as fallback."""
    text = ""
    try:
        try:
            from pypdf import PdfReader
            reader = PdfReader(pdf_path)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + " "
            return text.strip()
        except ImportError:
            import fitz  # PyMuPDF fallback
            doc = fitz.open(pdf_path)
            for page in doc:
                page_text = page.get_text("text")
                if page_text:
                    text += page_text + " "
            doc.close()
            return text.strip()
    except Exception as e:
        raise Exception(f"Failed to read PDF file: {str(e)}")
