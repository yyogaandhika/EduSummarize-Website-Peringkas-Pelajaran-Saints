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
    api_key = (os.getenv("GEMINI_API_KEY") or "").strip()
    if not api_key:
        raise Exception("GEMINI_API_KEY tidak ditemukan di Environment Variables Vercel.")

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

    headers = {
        "x-goog-api-key": api_key,
        "Content-Type": "application/json"
    }

    def _is_text_model(name: str) -> bool:
        name_lower = name.lower()
        excluded = ["tts", "audio", "embed", "imagen", "transcription", "realtime", "search"]
        return not any(ex in name_lower for ex in excluded)

    # 1. Otomatis deteksi model teks aktif yang tersedia untuk API key ini
    target_models = []
    for api_version in ["v1beta", "v1"]:
        try:
            list_url = f"https://generativelanguage.googleapis.com/{api_version}/models"
            res = requests.get(list_url, headers=headers, params={"key": api_key}, timeout=10)
            if res.status_code == 200:
                data = res.json().get("models", [])
                flash_models = [
                    (api_version, m["name"].replace("models/", ""))
                    for m in data
                    if "generateContent" in m.get("supportedGenerationMethods", []) 
                    and _is_text_model(m.get("name", ""))
                    and "flash" in m.get("name", "").lower()
                ]
                other_models = [
                    (api_version, m["name"].replace("models/", ""))
                    for m in data
                    if "generateContent" in m.get("supportedGenerationMethods", [])
                    and _is_text_model(m.get("name", ""))
                    and "flash" not in m.get("name", "").lower()
                ]
                target_models.extend(flash_models + other_models)
                if target_models:
                    break
        except Exception:
            pass

    # 2. Jika ListModels belum mengembalikan hasil, gunakan daftar fallback teks
    if not target_models:
        fallback_names = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-1.5-flash-latest",
            "gemini-1.5-pro",
            "gemini-1.5-pro-latest"
        ]
        target_models = [("v1beta", name) for name in fallback_names] + [("v1", name) for name in fallback_names]

    last_error = ""
    for api_version, model_name in target_models:
        url = f"https://generativelanguage.googleapis.com/{api_version}/models/{model_name}:generateContent"
        try:
            response = requests.post(
                url,
                headers=headers,
                params={"key": api_key},
                json=payload,
                timeout=30
            )
            if response.status_code == 200:
                res_json = response.json()
                return res_json["candidates"][0]["content"]["parts"][0]["text"].strip()
            elif response.status_code == 403:
                raise Exception(f"Gemini API Error (403): {response.text}")
            else:
                last_error = response.text
        except Exception as e:
            if "403" in str(e):
                raise e
            last_error = str(e)

    raise Exception(f"Gemini API Error: {last_error}")

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
