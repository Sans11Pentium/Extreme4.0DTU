from pydantic import BaseModel
import joblib
import pandas as pd


from fastapi import FastAPI, HTTPException
from langchain.document_loaders import TextLoader
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain_groq import ChatGroq
from transformers import pipeline


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


# Lease Text Processing
lease_text = """
This lease agreement states that the tenant must pay a security deposit of $2000.
The landlord has the right to terminate the lease within 30 days.
If the tenant does not pay rent for 2 months, eviction proceedings will begin.
Utilities must be paid separately.
"""
text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=20)
documents = text_splitter.create_documents([lease_text])
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_store = FAISS.from_documents(documents, embeddings)
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatGroq(model="mixtral-8x7b-32768", api_key="your_api_key"),
    retriever=vector_store.as_retriever()
)

# Sentiment Analysis Model
sentiment_model = pipeline("sentiment-analysis")

# Load Eviction Risk Model
model_path = "tenant_screening_model.pkl"  # Update with actual model path
model = joblib.load(model_path)

class LeaseQuestion(BaseModel):
    question: str

@app.post("/analyze_lease")
def analyze_lease(data: LeaseQuestion):
    if not data.question:
        raise HTTPException(status_code=400, detail="Question is required")
    answer = qa_chain.run(data.question)
    return {"response": answer}

class SentimentRequest(BaseModel):
    review: str

@app.post("/analyze_sentiment")
def analyze_sentiment(data: SentimentRequest):
    if not data.review:
        raise HTTPException(status_code=400, detail="Review text is required")
    result = sentiment_model(data.review)
    return result

class EvictionRiskRequest(BaseModel):
    age: int
    income: int
    rent_paid_on_time: float
    lease_violations: int
    property_damage_complaints: int
    review_sentiment_score: float

@app.post("/predict_eviction_risk")
def predict_eviction_risk(data: EvictionRiskRequest):
    try:
        user_data = {
            "Age": [data.age],
            "Income": [data.income],
            "Rent_Paid_on_Time": [data.rent_paid_on_time],
            "Lease_Violations": [data.lease_violations],
            "Property_Damage_Complaints": [data.property_damage_complaints],
            "Review_Sentiment_Score": [data.review_sentiment_score]
        }
        df = pd.DataFrame(user_data)
        prediction = model.predict(df)[0]
        result = "High Risk of Eviction" if prediction == 1 else "Low Risk of Eviction"
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

