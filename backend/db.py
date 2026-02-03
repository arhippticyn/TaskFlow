from sqlalchemy import create_engine, String, ForeignKey
from sqlalchemy.orm import sessionmaker, Mapped, mapped_column, relationship
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DB_URL = os.getenv('DB_URL')


engine = create_engine(DB_URL)


SessionLocal = sessionmaker(bind=engine)


Base = declarative_base()

class User(Base):
    __tablename__ = 'users'


    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50))
    email: Mapped[str] = mapped_column(String(200))
    password_hash: Mapped[str | None] = mapped_column(nullable=True)
    is_active: Mapped[bool] = mapped_column(nullable=True)
    provider: Mapped[str] = mapped_column(nullable=True)
    provider_id: Mapped[str] = mapped_column(nullable=True)

    task = relationship('Task', back_populates='user', cascade='all, delete-orphan')


class Task(Base):
    __tablename__ = 'tasks'

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[str] = mapped_column(String(400))
    owner_id: Mapped[int] = mapped_column(ForeignKey('users.id'))

    user = relationship('User', back_populates='task')

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()