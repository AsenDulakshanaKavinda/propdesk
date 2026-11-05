from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from server.core.settings import Settings, get_settings
from server.store.conn import DatabaseConn
from server.auth_service.routes import auth_route

@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    app.state.settings = settings

    # Initialize database connection singleton
    await DatabaseConn.get_instance(db_url=settings.secrets.async_db_url)

    yield

    # Clean up database connection on shutdown
    await DatabaseConn.disconnect()


app = FastAPI(lifespan=lifespan)


def get_admin_settings() -> Settings:
    return app.state.settings


from server.auth_service.routes import auth_route

@app.get("/")
async def root():
    return { "message" : "welcome to auth service"}

@app.get("/health")
async def health():
    return { "health" : "ok"}

app.include_router(router=auth_route, prefix="/auth/v1")