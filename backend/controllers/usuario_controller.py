from flask import jsonify
from models.usuario_model import insertar_usuario, email_existe
import re

def safety_password(password):
    return (
        len(password) >= 8 and
        re.search(r"[A-Z]", password) and
        re.search(r"[a-z]", password) and
        re.search(r"[0-9]", password) and
        re.search(r"[!@#$%^&*(),.?\":{}|<>]", password)
    )

def crear_usuario_controller(data):
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")
    nit = data.get("nit")

    if not all([nombre, email, password, nit]):
        return jsonify({"status": "Error", "message": "Faltan campos obligatorios"}), 400

    if not safety_password(password):
        return jsonify({"status": "Error", "message": "La contraseña no es segura"}), 400

    if email_existe(email):
        return jsonify({"status": "Error", "message": "El email ya está en uso"}), 400

    try:
        insertar_usuario(nombre, email, password, nit)
        return jsonify({"status": "Success", "message": "Usuario creado"}), 201
    except Exception as e:
        return jsonify({"status": "Error", "message": f"Error en DB: {str(e)}"}), 500
