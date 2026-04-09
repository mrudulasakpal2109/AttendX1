from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from database import Base
import datetime

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    roll_number = Column(String, unique=True, index=True)
    password = Column(String)  # hashed password in prod, raw in this demo
    name = Column(String, default="")
    student_class = Column(String, default="")

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class AttendanceSession(Base):
    __tablename__ = "attendance_sessions"
    
    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teachers.id"))
    session_token = Column(String, unique=True, index=True)
    class_name = Column(String)  # CMPN A, CMPN B, CMPN C
    duration = Column(Integer)   # 1 or 2 (hours)
    type = Column(String)        # Theory or Lab
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    expires_at = Column(DateTime)
