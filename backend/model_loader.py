import os
import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import traceback

# Global variables to hold model and tokenizer
tokenizer = None
model = None

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

def load_model():
    global tokenizer, model

    try:
        print("MODEL DIR:", MODEL_DIR)
        print("FILES:", os.listdir(MODEL_DIR))

        device = "cuda" if torch.cuda.is_available() else "cpu"
        print("Loading on", device)

        tokenizer = AutoTokenizer.from_pretrained(
            MODEL_DIR,
            local_files_only=True
        )

        print("Tokenizer OK")

        model = AutoModelForSeq2SeqLM.from_pretrained(
            MODEL_DIR,
            local_files_only=True
        )

        print("Model OK")

        model.to(device)

        print("Moved to", device)

        return True

    except Exception:
        traceback.print_exc()
        return False

def is_model_loaded():
    return tokenizer is not None and model is not None

def generate_summary(text: str, max_length: int = 150):
    if not is_model_loaded():
        # Fallback if model is not loaded (e.g. during development before model is added)
        # return "Model belum diload. Silakan tambahkan file model ke folder backend/models."
        raise RuntimeError("Model is not loaded.")
        
    device = "cuda" if torch.cuda.is_available() else "cpu"
    
    # Prefix text if necessary for the fine-tuned model (often used in t5)
    # The pdf wireframe uses prefix "ringkas teks ini: " for generation.
    prefix = "ringkas teks ini: "
    input_text = prefix + text
    
    inputs = tokenizer(input_text, return_tensors="pt", max_length=512, truncation=True)
    inputs = {k: v.to(device) for k, v in inputs.items()}
    
    # Generate summary based on wireframe specifications
    outputs = model.generate(
        **inputs,
        max_new_tokens=max_length,
        num_beams=4,
        early_stopping=True
    )
    
    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return summary
