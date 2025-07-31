from config import get_postgres_connection

import re
from flask import jsonify
import flask_login
import bcrypt

def email_existe(email):
    conn = get_postgres_connection()
    with conn.cursor() as cursor:
        conn = get_postgres_connection()
        cursor.execute("SELECT * FROM usuario WHERE email = %s", (email,))
        return cursor.fetchone() is not None

def tarjeta_existente(numero):
    conn = get_postgres_connection()
    if not conn:
        return jsonify(
            {
                "status": "Error",
                "message": "No se pudo conectar a la base de datos"
            }
        )
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM tarjeta WHERE numero = %s", (numero,))
        return cursor.fetchone() is not None

def safety_password(password):
    return (
        len(password) >= 8 and
        re.search(r"[A-Z]", password) and
        re.search(r"[a-z]", password) and
        re.search(r"[0-9]", password) and
        re.search(r"[!@#$%^&*(),.?\":{}|<>]", password)
    )

def login(email, password):
    from models.usuario_model import Usuario
    from models.admin_model import Administrador
    try:
        conn = get_postgres_connection()
        cursor = conn.cursor()
        query = "SELECT id, password, id_rol, email FROM usuario WHERE email = %s"
        cursor.execute(query, (email,))
        result = cursor.fetchone()
        cursor.close()
        conn.close()

        if result:
            user_id, hashed_password, id_rol, user_mail = result
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8')):
                if id_rol == 2:
                    admin = Administrador(user_id, user_mail, id_rol)
                if id_rol == 1:
                    user = Usuario(user_id, user_mail, id_rol)
                flask_login.login_user(user)
                return {
                    "status": "success",
                    "user_id": user_id,
                    "id_rol": id_rol
                }
        return {
            "status": "error",
            "message": "Credenciales inválidas"
        }
    except Exception as e:
        return {
            "status": "error",
            "message": f"Error de servidor: {str(e)}"
        }
        
def logout():
    try:
        flask_login.logout_user()
        return jsonify({"status": "success", "message": "Sesión cerrada"}), 200
    except Exception as e:
        return jsonify(
            {
                "status": "error", 
                "message": f"Error al cerrar sesión: {str(e)}"
            }), 500