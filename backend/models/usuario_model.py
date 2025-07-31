from config import get_postgres_connection
import bcrypt, flask_login
from flask import jsonify
from utils.validators import email_existe, safety_password, generar_saldo_random
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

def agregar_tarjeta(numero, fecha_vencimiento, cvv, tipo, saldo=None):
    id_usuario = current_user.id
    print(f"ID usuario {id_usuario}")
    if saldo is None:
        saldo = float(generar_saldo_random())
        print(f"Saldo generado: {saldo}")
        print(type(saldo))
    
    conn = get_postgres_connection()
    if not conn:
        return jsonify(
            {
                "status": "Error",
                "message": "No se pudo conectar a la base de datos en agregar_tarjeta"
            }
        ), 500
    try:
        with conn.cursor() as cursor:
            cursor.execute("""INSERT INTO tarjeta (id_usuario, numero, fecha_vencimiento, codigo_seguridad, tipo, saldo) VALUES (%s, %s, %s, %s, %s, %s)""",
                        (id_usuario, numero, fecha_vencimiento, cvv, tipo, saldo))
            conn.commit()
        conn.close()
        return jsonify(
            {
                "status": "Success",
                "message": "Tarjeta agregada correctamente"
            }
        ), 200

    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error al agregar la tarjeta: {str(e)}"
            }
        ), 500

def actualizar_tarjeta(numero_antiguo, numero, fecha_vencimiento, cvv, tipo, saldo = None):
    id_usuario = current_user.id
    
    if saldo is None:
        saldo = float(generar_saldo_random())
        print(f"Saldo generado: {saldo}")
    
    conn = get_postgres_connection()
    if not conn: 
        return jsonify(
            {
                "status":" Error",
                "message": "No se pudo conectar a la base de datos en actualizar_tarjeta"
            }
        )
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM tarjeta WHERE id_usuario = %s AND numero = %s", (id_usuario, numero_antiguo))
            tarjeta = cursor.fetchone()
            if not tarjeta:
                return jsonify(
                    {
                        "status": "Error",
                        "message": "Tarjeta no encontrada"
                    }
                ), 404
            tarjeta_id = tarjeta[0]
            cursor.execute("""UPDATE tarjeta SET numero = %s, fecha_vencimiento = %s, codigo_seguridad = %s, tipo = %s, saldo = %s WHERE id = %s""",
                        (numero, fecha_vencimiento, cvv, tipo, saldo, tarjeta_id))
            conn.commit()
            return jsonify(
                {
                    "status": "Success",
                    "message": "Tarjeta actualizada correctamente"
                }
            ), 200
        cursor.close()
    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error al actualizar la tarjeta: {str(e)}"
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
