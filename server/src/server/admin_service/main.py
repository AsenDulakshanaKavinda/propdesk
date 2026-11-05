from fastapi import FastAPI

app = FastAPI("Admin Service")

@app.get("/")
async def root():
    return { "message" : "welcome to admin service"}

@app.get("/health")
async def health():
    return { "health" : "ok"}