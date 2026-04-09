from pydantic import BaseModel
from typing import Optional
import datetime

class StudentCreate(BaseModel):
    roll_number: str
    password: str

class TeacherCreate(BaseModel):
    username: str
    password: str

class ScanRequest(BaseModel):
    session_token: str
    roll_number: str 
    device_id: Optional[str] = None

class GenerateSessionRequest(BaseModel):
    class_name: str
    duration: int
    session_type: str
