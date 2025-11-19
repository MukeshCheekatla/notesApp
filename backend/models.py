from extensions import db
import datetime

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    notes = db.relationship("Note", backref="user", lazy=True, cascade="all, delete-orphan")


# models.py (add these fields)
class Note(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), default="Untitled")   # ADD THIS
    content = db.Column(db.Text, nullable=False)
    color = db.Column(db.String(20), default="yellow")      # ADD THIS

    date_created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    date_modified = db.Column(
        db.DateTime,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow
    )

    pinned = db.Column(db.Boolean, default=False)
    archived = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,                   # ADD
            "content": self.content,
            "color": self.color,                   # ADD
            "date_created": self.date_created.isoformat(),
            "date_modified": self.date_modified.isoformat(),
            "pinned": self.pinned,
            "archived": self.archived,
            "user_id": self.user_id
        }
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    date_modified = db.Column(
        db.DateTime,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow
    )

    pinned = db.Column(db.Boolean, default=False)
    archived = db.Column(db.Boolean, default=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "date_created": self.date_created.isoformat(),
            "date_modified": self.date_modified.isoformat(),
            "pinned": self.pinned,
            "archived": self.archived,
            "user_id": self.user_id
        }
