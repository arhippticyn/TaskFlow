from fastapi import FastAPI, Depends, status, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from models import LoginUser, UserResponse, RegisterUser
from db import User, get_db
from sqlalchemy.orm import Session
import jwt
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from datetime import datetime, timezone, timedelta
from authlib.integrations.starlette_client import OAuth
from dotenv import load_dotenv
import os

load_dotenv()

ALGORITM = 'HS256'
SECRET_KEY = '09d25e094faa6ca2556c818166b7a9563b93f7099f6f8f4caa6cf63b88e8d3e7'
EXPIRES = 15
GITHUB_CLIENT_ID = os.getenv('GITHUB_CLIENT_ID')
GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET')
GOOGLE_CLIENT_ID = os.getenv('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.getenv('GOOGLE_CLIENT_SECRET')

app = FastAPI()

origins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        
    allow_credentials=True,
    allow_methods=["*"],          
    allow_headers=["*"],
)

app.add_middleware(
    SessionMiddleware,
    secret_key=SECRET_KEY
)
pwd_context = CryptContext(schemes=['argon2'], deprecated='auto')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')

oauth = OAuth()

oauth.register(
    name="google",
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    authorize_url="https://accounts.google.com/o/oauth2/v2/auth",
    access_token_url="https://oauth2.googleapis.com/token",
    api_base_url="https://www.googleapis.com/oauth2/v2/",
    client_kwargs={"scope": "email profile"},
)


oauth.register(
    name='github',
    client_id=GITHUB_CLIENT_ID,
    client_secret=GITHUB_CLIENT_SECRET,
    access_token_url='https://github.com/login/oauth/access_token',
    authorize_url='https://github.com/login/oauth/authorize',
    api_base_url='https://api.github.com/',
    client_kwargs={'scope': 'user:email'}
)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hash_password: str) -> str:
    return pwd_context.verify(plain_password, hash_password)

@app.post('/auth/register', response_model=UserResponse)
async def register(user: RegisterUser,db: Session = Depends(get_db)):
    user_db = db.query(User).filter(User.username == user.username).first()

    if user_db:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='User is already register')
    
    if not user_db:
        user_new = User(username=user.username, email=user.email, password_hash=hash_password(user.password), is_active=True,provider='local', provider_id=user.username)
        db.add(user_new)
        db.commit()
        db.refresh(user_new)

    return user_new

@app.post('/auth/login')
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user_db = db.query(User).filter(User.username == form_data.username).first()

    if not user_db:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User is not found')
    
    if not verify_password(form_data.password, user_db.password_hash):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Username or password is not correct')
    
    if user_db is None:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail='User is not found')
    
    payload = {
        'sub': user_db.username,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=EXPIRES)
    }

    access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITM)

    return {'access_token': access_token, 'type': 'bearer'}

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    creditials_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},)

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITM])
        username = payload.get('sub')

        if username is None:
            raise creditials_exception
        
    except:
        raise creditials_exception
    
    user = db.query(User).filter(User.username == username).first()

    if user is None:
        raise creditials_exception
    
    return user

@app.get('/users/me', response_model=UserResponse)
async def read_user(user: User = Depends(get_current_user)):
    return user

@app.get('/auth/google/login')
async def google_login(request: Request):
    redirect_uri = 'http://127.0.0.1:8000/auth/google/callback'
    return await oauth.google.authorize_redirect(request, redirect_uri)

@app.get('/auth/github/login')
async def github_login(request: Request):
    redirect_uri = 'http://127.0.0.1:8000/auth/github/callback'
    return await oauth.github.authorize_redirect(request, redirect_uri)

@app.get('/auth/google/callback')
async def google_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    resp = await oauth.google.get("userinfo", token=token)
    user_info = resp.json()


    email = user_info['email']
    username = user_info['email'].split('@')[0]
    provider = 'google'
    provider_id = user_info['id']

    user = db.query(User).filter(User.provider == provider, User.provider_id == provider_id).first()

    if not user:
        user = User(username=username, email=email,password_hash='oauth_google', is_active=True, provider=provider, provider_id=provider_id)
        db.add(user)
        db.commit()
        db.refresh(user)

    payload = {
        'sub': user.username,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=EXPIRES)
    }

    access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITM)

    return {'access_token': access_token, 'type': 'bearer'}

@app.get('/auth/github/callback')
async def github_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.github.authorize_access_token(request)
    resp = await oauth.github.get('user', token=token)
    profile = resp.json()

    email_resp = await oauth.github.get('user/emails', token=token)
    emails = email_resp.json()
    email = next((e['email'] for e in emails if e['primary'] and e.get('verified', True)), None)

    username = profile['login']
    provider = 'github'
    provider_id = str(profile['id'])

    user = db.query(User).filter(User.provider == provider, User.provider_id == provider_id).first()

    if not user:
        user = User(username=username, email=email, password_hash='oauth_github', is_active=True, provider=provider, provider_id=provider_id)
        db.add(user)
        db.commit()
        db.refresh(user)

    payload = {
        'sub': user.username,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=EXPIRES)
    }

    access_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITM)

    return {'access_token': access_token, 'type': 'bearer'}