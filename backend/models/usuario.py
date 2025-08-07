from flask import Blueprint, request, jsonify
from config import get_postgres_connection
import flask_login


class Usuario(flask_login.UserMixin):
    def __init__(self, id, email, id_rol):
        self.id = id
        self.email = email
        self.id_rol = id_rol

    @classmethod
    def get_by_id(cls, user_id):
        conn = get_postgres_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, email, id_rol FROM usuario WHERE id = %s", (user_id,))
            row = cursor.fetchone()
        conn.close()
        if row:
            return cls(row[0], row[1], row[2])
        return None

    @classmethod
    def get_by_id_rol(cls, id_rol):
        conn = get_postgres_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, email, id_rol FROM usuario WHERE id_rol = %s", (id_rol,))
            row = cursor.fetchone()
        conn.close()
        if row:
            return cls(row[0], row[1], row[2])
        return None