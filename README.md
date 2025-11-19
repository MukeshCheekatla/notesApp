# Notes App

A simple full-stack notes app I built to learn React and Flask properly.

### Features
- Register / Login
- Create, edit, delete notes
- Pin important notes
- Archive notes
- Responsive (works on mobile)

### Tech Stack
**Frontend**  
- React + Vite  
- Tailwind CSS  
- Lucide icons  

**Backend**  
- Flask  
- PostgreSQL + SQLAlchemy  
- JWT authentication  

### How to run

1. Backend
```bash
cd backend
python -m venv venv
source . venv\Scripts\activate         # Windows
pip install -r requirements.txt
python app.py                   # runs on http://localhost:5000
```
2. Frontend
```bash
cd frontend
npm install
npm run dev                     # opens http://localhost:5173