from contextlib import asynccontextmanager
from fastapi import FastAPI

from server.app.routes.admin_route import admin_route
from server.app.routes.auth_route import auth_route
from server.core.settings import Settings, get_settings
from server.store.conn import DatabaseConn
from fastapi.middleware.cors import CORSMiddleware


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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.get("/")
async def root():
    return {"message": "welcome to prop-desk service"}


@app.get("/health")
async def health():
    return {"health": "ok"}


app.include_router(router=auth_route, prefix="/auth/v1")
app.include_router(router=admin_route, prefix="/admin/v1")
