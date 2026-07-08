from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from typing import Optional
import time
import os
import uuid

from model_loader import generate_summary, is_model_loaded
from pdf_reader import extract_text_from_pdf
from doc_generator import generate_txt, generate_docx

router = APIRouter()

# Temporary directory for saving generated files
TEMP_DIR = "temp_files"
os.makedirs(TEMP_DIR, exist_ok=True)

@router.get("/health")
async def health_check():
    status = "Model Loaded" if is_model_loaded() else "Model Not Loaded"
    return {"status": status, "version": "1.0.0"}

@router.post("/summarize")
async def summarize(
    file: Optional[UploadFile] = File(None), 
    text: Optional[str] = Form(None)
):
    start_time = time.time()
    
    original_text = ""
    
    if file:
        if not file.filename.endswith(".pdf"):
            raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
        # Save temp file
        temp_pdf_path = os.path.join(TEMP_DIR, f"{uuid.uuid4()}.pdf")
        with open(temp_pdf_path, "wb") as buffer:
            buffer.write(await file.read())
            
        try:
            original_text = extract_text_from_pdf(temp_pdf_path)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error reading PDF: {str(e)}")
        finally:
            if os.path.exists(temp_pdf_path):
                os.remove(temp_pdf_path)
    
    elif text:
        original_text = text
        
    else:
        raise HTTPException(status_code=400, detail="Please provide either a PDF file or text.")

    if not original_text.strip():
        raise HTTPException(status_code=400, detail="Text to summarize cannot be empty.")

    try:
        # Perform summarization
        summary = generate_summary(original_text)
        
        processing_time = round(time.time() - start_time, 2)
        word_before = len(original_text.split())
        word_after = len(summary.split())
        
        return {
            "summary": summary,
            "original_text": original_text,
            "processing_time": processing_time,
            "word_before": word_before,
            "word_after": word_after
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Summarization error: {str(e)}")

class SummaryRequest(object):
    pass # Not using pydantic models for form data easily with File

@router.post("/download/txt")
async def download_txt(summary: str = Form(...)):
    if not summary:
        raise HTTPException(status_code=400, detail="Summary text is required.")
        
    file_path = os.path.join(TEMP_DIR, f"ringkasan_{uuid.uuid4()}.txt")
    generate_txt(summary, file_path)
    
    return FileResponse(
        path=file_path, 
        filename="ringkasan.txt", 
        media_type="text/plain",
        background=None # Ideally use background task to clean up
    )

@router.post("/download/docx")
async def download_docx(summary: str = Form(...)):
    if not summary:
        raise HTTPException(status_code=400, detail="Summary text is required.")
        
    file_path = os.path.join(TEMP_DIR, f"ringkasan_{uuid.uuid4()}.docx")
    generate_docx(summary, file_path)
    
    return FileResponse(
        path=file_path, 
        filename="ringkasan.docx", 
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        background=None # Ideally use background task to clean up
    )
