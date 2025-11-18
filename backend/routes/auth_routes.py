from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db
from models import User
import datetime
import jwt
from utils.auth import token_required

# ------------------------------
# 1. CREATE BLUEPRINT FIRST
# ------------------------------
auth_bp = Blueprint("auth", __name__)

# ------------------------------
# 2. REGISTER ROUTE
# ------------------------------
@auth_bp.post("/api/register")
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    hashed = generate_password_hash(password)
    user = User(username=username, password_hash=hashed)
    db.session.add(user)
    db.session.commit()

    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)},
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({"token": token, "username": user.username}), 201

# ------------------------------
# 3. LOGIN ROUTE
# ------------------------------
@auth_bp.post("/api/login")
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    user = User.query.filter_by(username=username).first()

    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode(
        {"user_id": user.id, "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)},
        current_app.config["SECRET_KEY"],
        algorithm="HS256"
    )

    return jsonify({"token": token, "username": user.username}), 200

# ------------------------------
# 4. CURRENT USER ROUTE (NEW)
# ------------------------------
@auth_bp.get("/api/user")
@token_required
def get_current_user(current_user):
    return {
        "id": current_user.id,
        "username": current_user.username,
    }, 200


