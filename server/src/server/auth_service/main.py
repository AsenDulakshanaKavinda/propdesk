from fastapi import FastAPI

app = FastAPI("Auth Service")

@app.get("/")
async def root():
    return { "message" : "welcome to auth service"}

@app.get("/health")
async def health():
    return { "health" : "ok"}