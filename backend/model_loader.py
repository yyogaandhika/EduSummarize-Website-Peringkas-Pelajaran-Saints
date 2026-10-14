import os
import requests
import traceback
from dotenv import load_dotenv

# Load .env file if available
load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
HF_TOKEN = os.getenv("HF_TOKEN", "")
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

def load_model():
    """Cek konfigurasi API key yang tersedia."""
    global GEMINI_API_KEY, HF_TOKEN, GROQ_API_KEY
    load_dotenv()
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
    HF_TOKEN = os.getenv("HF_TOKEN", "")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")

    if GEMINI_API_KEY:
        print("✅ EduSummarize AI menggunakan Google Gemini API")
        return True
    elif GROQ_API_KEY:
        print("✅ EduSummarize AI menggunakan Groq API")
        return True
    elif HF_TOKEN:
        print("✅ EduSummarize AI menggunakan Hugging Face Inference API")
        return True
    else:
        print("⚠️ API Key belum diset. Tambahkan GEMINI_API_KEY / GROQ_API_KEY / HF_TOKEN di .env")
        return True  # Tetap return True agar server tidak crash saat startup

def is_model_loaded():
    return bool(os.getenv("GEMINI_API_KEY") or os.getenv("GROQ_API_KEY") or os.getenv("HF_TOKEN"))

def _summarize_with_gemini(text: str, max_length: int = 150) -> str:
    api_key = os.getenv("GEMINI_API_KEY")
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
    
    prompt = (
        "Kamu adalah asisten AI EduSummarize khusus materi pelajaran sains (Fisika, Biologi, Kimia, dll).\n"
        "Tugas: Buat ringkasan yang jelas, padat, terstruktur, dan mudah dipahami siswa dalam Bahasa Indonesia dari materi berikut:\n\n"
        f"Materi:\n{text}\n\n"
        "Ringkasan:"
    )
    
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "maxOutputTokens": 600,
            "temperature": 0.3
        }
    }
    
    response = requests.post(url, json=payload, timeout=30)
    if response.status_code != 200:
        raise Exception(f"Gemini API Error ({response.status_code}): {response.text}")
        
    data = response.json()
    try:
        summary = data["candidates"][0]["content"]["parts"][0]["text"].strip()
        return summary
    except Exception as e:
        raise Exception(f"Gagal memproses respons Gemini: {str(e)}")

def _summarize_with_groq(text: str, max_length: int = 150) -> str:
    api_key = os.getenv("GROQ_API_KEY")
    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {
                "role": "system",
                "content": "Kamu adalah asisten AI EduSummarize untuk pelajaran sains. Buat ringkasan materi dalam bahasa Indonesia yang padat, akurat, dan mudah dipahami siswa."
            },
            {
                "role": "user",
                "content": text
            }
        ],
        "temperature": 0.3,
        "max_tokens": 600
    }
    response = requests.post(url, headers=headers, json=payload, timeout=30)
    if response.status_code != 200:
        raise Exception(f"Groq API Error ({response.status_code}): {response.text}")
    data = response.json()
    return data["choices"][0]["message"]["content"].strip()

def _summarize_with_huggingface(text: str, max_length: int = 150) -> str:
    token = os.getenv("HF_TOKEN")
    url = "https://api-inference.huggingface.co/models/cahya/t5-base-indonesian-summarization-cased"
    headers = {"Authorization": f"Bearer {token}"}
    payload = {
        "inputs": text,
        "parameters": {
            "max_length": max_length,
            "min_length": 25
        }
    }
    response = requests.post(url, headers=headers, json=payload, timeout=30)
    if response.status_code != 200:
        raise Exception(f"Hugging Face API Error ({response.status_code}): {response.text}")
    data = response.json()
    if isinstance(data, list) and len(data) > 0 and "summary_text" in data[0]:
        return data[0]["summary_text"].strip()
    return str(data)

def generate_summary(text: str, max_length: int = 150) -> str:
    load_dotenv()
    gemini_key = os.getenv("GEMINI_API_KEY")
    groq_key = os.getenv("GROQ_API_KEY")
    hf_token = os.getenv("HF_TOKEN")

    if gemini_key:
        return _summarize_with_gemini(text, max_length)
    elif groq_key:
        return _summarize_with_groq(text, max_length)
    elif hf_token:
        return _summarize_with_huggingface(text, max_length)
    else:
        raise RuntimeError("API Key belum diset! Silakan tambahkan GEMINI_API_KEY atau HF_TOKEN.")
