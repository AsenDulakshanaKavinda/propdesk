from __future__ import annotations

from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from sqlalchemy.ext.asyncio import AsyncSession

from server.admin_service.route.routes import admin_route
from server.core.settings import Settings, get_settings
from server.store.conn import DatabaseConn, get_db_session


@asynccontextmanager
async def lifespan(app: FastAPI):
    settings = get_settings()
    app.state.settings = settings

    # Initialize database connection singleton
    await DatabaseConn.get_instance(db_url=settings.secrets.async_db_url)

    yield

    # Clean up database connection on shutdown
    await DatabaseConn.disconnect()


app = FastAPI(title="Admin Service", lifespan=lifespan)


def get_admin_settings() -> Settings:
    return app.state.settings


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for yielding database sessions."""
    async with get_db_session() as session:
        yield session


@app.get("/")
async def root():
    return {"message": "welcome to admin service"}


@app.get("/health")
async def health():
    return {"health": "ok"}


app.include_router(admin_route, prefix="/api/v1")
