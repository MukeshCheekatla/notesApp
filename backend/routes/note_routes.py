from flask import Blueprint, request, jsonify
from extensions import db
from models import Note
from utils.auth import token_required
import datetime

note_bp = Blueprint("notes", __name__)


# =====================================================
# GET ALL NOTES (with archived filter)
# =====================================================
@note_bp.get("/api/notes")
@token_required
def get_notes(current_user):
    archived = request.args.get("archived", "false").lower() == "true"

    notes = (
        Note.query.filter_by(user_id=current_user.id, archived=archived)
        .order_by(Note.date_modified.desc())
        .all()
    )

    return jsonify([n.to_dict() for n in notes]), 200


# =====================================================
# GET A SINGLE NOTE
# =====================================================
@note_bp.get("/api/notes/<int:id>")
@token_required
def get_note(current_user, id):
    note = Note.query.filter_by(id=id, user_id=current_user.id).first()
    if not note:
        return jsonify({"error": "Note not found"}), 404

    return jsonify(note.to_dict()), 200


# =====================================================
# CREATE NOTE
# =====================================================
@note_bp.post("/api/notes")
@token_required
def create_note(current_user):
    data = request.get_json()
    content = data.get("content", "")

    if not content.strip():
        return jsonify({"error": "Content cannot be empty"}), 400

    new_note = Note(
        content=content,
        user_id=current_user.id
    )

    db.session.add(new_note)
    db.session.commit()

    return jsonify(new_note.to_dict()), 201


# =====================================================
# UPDATE NOTE
# =====================================================
@note_bp.put("/api/notes/<int:id>")
@token_required
def update_note(current_user, id):
    note = Note.query.filter_by(id=id, user_id=current_user.id).first()
    if not note:
        return jsonify({"error": "Note not found"}), 404

    data = request.get_json()
    note.content = data.get("content", note.content)
    note.date_modified = datetime.datetime.utcnow()

    db.session.commit()

    return jsonify(note.to_dict()), 200


# =====================================================
# DELETE NOTE
# =====================================================
@note_bp.delete("/api/notes/<int:id>")
@token_required
def delete_note(current_user, id):
    note = Note.query.filter_by(id=id, user_id=current_user.id).first()
    if not note:
        return jsonify({"error": "Note not found"}), 404

    db.session.delete(note)
    db.session.commit()

    return jsonify({"message": "Note deleted"}), 200


# =====================================================
# PIN / UNPIN NOTE
# =====================================================
@note_bp.patch("/api/notes/<int:id>/pin")
@token_required
def toggle_pin(current_user, id):
    note = Note.query.filter_by(id=id, user_id=current_user.id).first()
    if not note:
        return jsonify({"error": "Note not found"}), 404

    note.pinned = not getattr(note, "pinned", False)
    note.date_modified = datetime.datetime.utcnow()

    db.session.commit()

    return jsonify(note.to_dict()), 200


# =====================================================
# ARCHIVE / UNARCHIVE NOTE
# =====================================================
@note_bp.patch("/api/notes/<int:id>/archive")
@token_required
def toggle_archive(current_user, id):
    note = Note.query.filter_by(id=id, user_id=current_user.id).first()
    if not note:
        return jsonify({"error": "Note not found"}), 404

    note.archived = not note.archived
    note.date_modified = datetime.datetime.utcnow()

    db.session.commit()

    return jsonify(note.to_dict()), 200
