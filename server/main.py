from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import pandas as pd
import joblib
import os

# ── Paths ─────────────────────────────────────────────
BASE_DIR = Path(__file__).parent.resolve()
MODEL_PATH = BASE_DIR / "model" / "random_forest_model.joblib"   

# ── Load Model ────────────────────────────────────────
if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Model not found at {MODEL_PATH}")

model = joblib.load(MODEL_PATH)

# Expected class order (must match training label encoding)
CLASSES = [
    "Benign", "Bot", "Brute Force", "DDoS",
    "Infiltration", "PortScan", "Web Attack"
]

# ── FastAPI App ───────────────────────────────────────
app = FastAPI(
    title="CPRF Network Attack Detector",
    description="Class Probability Random Forest IDS API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # tighten this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(400, "Only CSV files are accepted")

    try:
        df = pd.read_csv(file.file)
    except Exception as e:
        raise HTTPException(400, f"Invalid CSV: {str(e)}")

    try:
        predictions = model.predict(df)
        probabilities = model.predict_proba(df)
    except Exception as e:
        raise HTTPException(500, f"Prediction failed: {str(e)}")

    model_classes = [str(cls) for cls in getattr(model, "classes_", CLASSES)]

    results = []
    for pred_value, probs in zip(predictions, probabilities):
        try:
            class_idx = int(pred_value)
            class_name = model_classes[class_idx] if 0 <= class_idx < len(model_classes) else str(pred_value)
        except (TypeError, ValueError):
            class_name = str(pred_value)

        results.append({
            "class": class_name,
            "confidence": float(max(probs)),
            "probabilities": {
                cls: float(prob) for cls, prob in zip(model_classes, probs)
            }
        })

    return {"predictions": results}

@app.get("/health")
async def health():
    return {"status": "ok", "model_loaded": MODEL_PATH.name}