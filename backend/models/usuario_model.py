from config import get_postgres_connection
import bcrypt, flask_login
from flask import jsonify
from utils.validators import email_existe, safety_password
from flask_login import current_user


def insertar_usuario(nombre, email, password, nit, id_rol=1):
    conn = get_postgres_connection()
    with conn.cursor() as cursor:
        hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        hashed_str = hashed.decode('utf-8')
        cursor.execute("""
            INSERT INTO usuario (id_rol, nombre, email, password, nit)
            VALUES (%s, %s, %s, %s, %s)
        """, (id_rol, nombre, email, hashed_str, nit))
        conn.commit()
    conn.close()
    
def actualizar_usuario(nombre, email, password, nit):
    conn = get_postgres_connection()
    if not conn:
        return jsonify(
            {
                "status": "Error",
                "message": "No se pudo conectar a la base de datos en actualizar_usuario"
            }
        )
    print(f"Nombre: {nombre}, Email: {email}, NIT: {nit}")
    # Actualizar el usuario en la base de datos
    id_usuario = current_user.id
    query = """UPDATE usuario SET nombre = %s, email = %s, password = %s, nit = %s WHERE id = %s"""
    with conn.cursor() as cursor:
        cursor.execute(query, (nombre, email, password, nit, id_usuario))
        conn.commit()
    conn.close()

def subir_foto(url):
    conn = get_postgres_connection()
    if not conn:
        return jsonify(
            {
                "status": "Error",
                "message": "No se pudo conectar a la base de datos en subir_foto"
            }
        )
    try:
        with conn.cursor() as cursor:
            # Validar si existe foto
            cursor.execute("SELECT id_img FROM usuario WHERE id = %s", (current_user.id,))
            result = cursor.fetchone()
            if not result:
                return jsonify(
                    {
                        "status": "Error",
                        "message": "Usuario no encontrado"
                    }
                ), 404
            
            id_img = result[0]
            if id_img is None:
                cursor.execute("INSERT INTO img (url_img) VALUES (%s) RETURNING id", (url,))
                new_img_id = cursor.fetchone()[0]
                #Asociar la img al usuario
                cursor.execute("UPDATE usuario SET id_img = %s WHERE id = %s", (new_img_id, current_user.id))
            else:
                cursor.execute("UPDATE img SET url = %s WHERE id = %s", (url, id_img))
            conn.commit()
            return jsonify(
                {
                    "status": "Success",
                    "message": "Foto subida correctamente"
                }
            ), 200
        conn.close()
        
    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error al subir la foto: {str(e)}"
            }
        ), 500


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
