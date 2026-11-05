

import asyncio
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from typing import Optional
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager


class DatabaseConn:
    _instance = Optional["DatabaseConn"] = None
    _lock: asyncio.Lock = asyncio.Lock()
    engine: AsyncEngine
    session_factory: async_sessionmaker[AsyncSession]

    @classmethod
    async def get_instance(cls, db_url: str = "") -> "DatabaseConn":
        """ async thread/task-safe singleton retriever """

        if cls._instance is None:
            async with cls._lock:
                if cls._instance is None:
                    if not db_url:
                        raise ValueError("Database URL must be provided on first initialization.")

                    instance = super().__new__(cls)
                    print("Initializing Async SQLAlchemy Engine and SessionFactory...")

                    instance.engine = create_async_engine(
                        db_url, pool_size=5, max_overflow=10, echo=False
                    )

                    instance.session_factory = async_sessionmaker(
                        bind=instance.engine,
                        autoflush=False,
                        expire_on_commit=False,
                        class_=AsyncSession,
                    )

                    cls._instance = instance

        return cls._instance


def get_session(self) -> AsyncSession:
    """Creates a new AsyncSession from the session factory."""
    return self.session_factory()

@asynccontextmanager
async def get_db_session(db_url: str) -> AsyncGenerator[AsyncSession, None]:
    """Async context manager for safely managing database sessions."""
    db = await DatabaseConn.get_instance(db_url)
    session = db.get_session()
    try:
        yield session
        await session.commit()
    except Exception:
        await session.rollback()
        raise
    finally:
        await session.close()





