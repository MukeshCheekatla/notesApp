# Notes App - React + Flask + PostgreSQL

A full-stack notes application with user authentication, similar to Google Keep.

## Features

✨ **User Authentication** - Secure JWT-based auth
📝 **Create & Edit Notes** - Rich note editing with titles and content
🎨 **Color Coding** - 6 different colors for organizing notes
📌 **Pin Important Notes** - Keep important notes at the top
🗄️ **Archive Notes** - Archive old notes to keep workspace clean
🗑️ **Delete Notes** - Permanently remove notes
📱 **Responsive Design** - Works on desktop and mobile

## Tech Stack

### Backend
- Flask 3.0
- PostgreSQL (via psycopg2)
- SQLAlchemy ORM
- JWT Authentication
- Flask-CORS

### Frontend
- React 18
- Vite
- Tailwind CSS
- Lucide Icons

## Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+

## Installation

### 1. PostgreSQL Setup

Install PostgreSQL and create a database:

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Start PostgreSQL
sudo service postgresql start  # Linux
brew services start postgresql  # macOS

# Create database (will be done automatically by setup script)
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# DATABASE_URL=postgresql://postgres:password@localhost:5432/notesapp

# Run database setup script
python setup_db.py

# Start the Flask server
python app.py
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:3000` or `http://localhost:5173`

## Project Structure

```
notes-app/
├── backend/
│   ├── app.py                 # Main Flask application
│   ├── config.py              # Configuration
│   ├── models.py              # Database models
│   ├── auth.py                # Auth utilities
│   ├── auth_routes.py         # Auth endpoints
│   ├── note_routes.py         # Note endpoints
│   ├── setup_db.py            # Database setup script
│   ├── requirements.txt       # Python dependencies
│   └── .env.example           # Environment variables template
│
└── frontend/
    ├── src/
    │   ├── App.jsx            # Main app component
    │   ├── AuthContext.jsx    # Auth context
    │   ├── Login.jsx          # Login component
    │   ├── Header.jsx         # Header component
    │   ├── NotesList.jsx      # Notes list component
    │   ├── NoteCard.jsx       # Note card component
    │   ├── NoteModal.jsx      # Note edit modal
    │   ├── api.js             # API service
    │   ├── main.jsx           # React entry point
    │   └── index.css          # Global styles
    ├── index.html             # HTML template
    ├── package.json           # Node dependencies
    ├── vite.config.js         # Vite configuration
    └── tailwind.config.js     # Tailwind configuration
```

## API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user
- `GET /api/user` - Get current user

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes?archived=true` - Get archived notes
- `GET /api/notes/:id` - Get specific note
- `POST /api/notes` - Create new note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `PATCH /api/notes/:id/pin` - Toggle pin status
- `PATCH /api/notes/:id/archive` - Toggle archive status

## Environment Variables

### Backend (.env)
```
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://postgres:password@localhost:5432/notesapp
```

## Database Schema

### Users Table
- id (Primary Key)
- username (Unique)
- email
- password_hash
- created_at

### Notes Table
- id (Primary Key)
- title
- content (Text)
- color
- pinned (Boolean)
- archived (Boolean)
- created_at
- updated_at
- user_id (Foreign Key)

## Development

### Running Tests
```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build
```

## Troubleshooting

### PostgreSQL Connection Issues
- Ensure PostgreSQL is running: `sudo service postgresql status`
- Check credentials in .env file
- Verify database exists: `psql -U postgres -l`

### CORS Issues
- Check that Flask-CORS is properly configured
- Verify frontend URL in CORS settings

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

## License

MIT

## Contributing

Pull requests are welcome!