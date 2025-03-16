from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

# Load the trained Random Forest model
rf_model = joblib.load("random_forest_tenant_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")

# Define a mapping for categorical encoding
employment_stability_mapping = {'Low': 0, 'Medium': 1, 'High': 2}  
rental_payment_mapping = {'Late': 0, 'On Time': 1, 'Missed': 2}  

# Initialize FastAPI app
app = FastAPI()

# Define request schema
class TenantRequest(BaseModel):
    credit_score: int
    monthly_income: float
    employment_stability: str
    rental_payment_history: str
    previous_evictions: int
    criminal_record_flag: int
    references_score: int

@app.post("/predict")
def predict_tenant_risk(tenant: TenantRequest):
    # Convert input to DataFrame
    tenant_data = pd.DataFrame([tenant.dict()])
    
    # Encode categorical variables
    tenant_data['employment_stability'] = tenant_data['employment_stability'].map(employment_stability_mapping).fillna(-1).astype(int)
    tenant_data['rental_payment_history'] = tenant_data['rental_payment_history'].map(rental_payment_mapping).fillna(-1).astype(int)
    
    # Make prediction using Random Forest model
    risk_prediction = rf_model.predict(tenant_data)
    
    # Convert NumPy int64 to Python int
    predicted_risk_label = label_encoder.inverse_transform(risk_prediction)
    
    return {"predicted_risk_level": str(predicted_risk_label[0])}  # Convert to string for safe serialization


# Run using: uvicorn tenant_screening_api:app --reload
