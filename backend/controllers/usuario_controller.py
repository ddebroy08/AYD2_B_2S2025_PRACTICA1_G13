from flask import jsonify
from models.usuario_model import insertar_usuario, actualizar_usuario, subir_foto, agregar_tarjeta, actualizar_tarjeta
from utils.validators import email_existe, safety_password, login, tarjeta_existente
from config import get_postgres_connection
from flask_login import current_user
import bcrypt



def crear_usuario_controller(data):
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")
    nit = data.get("nit")

    if not all([nombre, email, password, nit]):
        return jsonify(
            {
                "status": "Error",
                "message": "Faltan campos obligatorios"
            }
        ), 400

    if not safety_password(password):
        return jsonify(
            {
                "status": "Error",
                "message": "La contraseña no es segura"
            }
        ), 400

    if email_existe(email):
        return jsonify(
            {
                "status": "Error",
                "message": "El email ya está en uso"
            }
        ), 400

    try:
        insertar_usuario(nombre, email, password, nit)
        return jsonify(
            {
                "status": "Success",
                "message": "Usuario creado"
            }
        ), 201
    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error en DB: {str(e)}"
            }
        ), 500

def usuario_login_controller(data):
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return {
            "status": "error",
            "message": "Faltan campos requeridos"
        }
    
    return login(email, password)

def actualizar_usuario_controller(nombre, email, password, nit):
    conn = get_postgres_connection()
    if not conn:
        return jsonify(
            {
                "status": "Error",
                "message": "No se pudo conectar a la base de datos"
            }
        ), 500
        
    try:
        with conn.cursor() as cursor:
            id_usuario = current_user.id
            cursor.execute("SELECT nombre, email, password, nit FROM usuario WHERE id = %s", (id_usuario,))
            usuario_actual = cursor.fetchone()
            if not usuario_actual:
                return jsonify(
                    {
                        "status": "Error",
                        "message": "Usuario no encontrado"
                    }
                ), 404
            # Guardar estos datos por si el usuario manda campos vacíos, se usan los datos actuales
            nombre_actual, email_actual, password_actual, nit_actual = usuario_actual
            
            # Acá validamos si vienen datos nuevos o no
            nombre = nombre if nombre else nombre_actual
            email = email if email else email_actual
            password = password if password else password_actual
            nit = nit if nit else nit_actual
            
            if password:
                if not safety_password(password):
                    return jsonify(
                        {
                            "status": "Error",
                            "message": "La contraseña no es segura"
                        }
                    ), 400
            
            if email != email_actual:
                with conn.cursor() as cursor:
                    cursor.execute("SELECT 1 FROM usuario WHERE email = %s", (email,))
                    if cursor.fetchone():
                        return jsonify(
                            {
                                "status": "Error",
                                "message": "El email ya está en uso"
                            }
                        ), 400
            
            with conn.cursor() as cursor:
                hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                hashed_str = hashed.decode('utf-8')
                actualizar_usuario(nombre, email, hashed_str, nit)
                return jsonify(
                    {
                        "status": "Success",
                        "message": "Usuario actualizado"
                    }
                ), 200
    
    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error al actualizar el usuario: {str(e)}"
            }
        ), 500



def subir_foto_controller(data):
    # Lógica para subir la foto
    url = data.get("url_img")
    if not url:
        return jsonify(
            {
                "status": "Error",
                "message": "No se recibió la URL de la foto"
            }
        ), 400
        
    id_usuario = current_user.id
    conn = get_postgres_connection()
    if not conn:
        return jsonify(
            {
                "status": "Error",
                "message": "No se pudo conectar a la base de datos"
            }
        ), 500

    try:
        subir_foto(url)
        return jsonify(
            {
                "status": "Success",
                "message": "Foto subida correctamente"
            }
        ), 200
    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error al subir la foto: {str(e)}"
            }
        ), 500


def agregar_tarjeta_controller(data):
    numero = data.get("numero")
    fecha_vencimiento = data.get("fecha_vencimiento")
    codigo_seguridad = data.get("codigo_seguridad")
    tipo = data.get("tipo")
    
    if not all([numero, fecha_vencimiento, codigo_seguridad, tipo]):
        return jsonify(
            {
                "status": "Error",
                "message": "Faltan campos obligatorios"
            }
        ), 400
    
    conn = get_postgres_connection()
    if not conn:
        return jsonify(
            {
                "status": "Error",
                "message": "No se pudo conectar a la base de datos"
            }
        ), 500
    if tarjeta_existente(numero):
        return jsonify(
            {
                "status": "Error",
                "message": "La tarjeta ya existe"
            }
        ), 400
        
    try:
        agregar_tarjeta(numero, fecha_vencimiento, codigo_seguridad, tipo)
        return jsonify(
            {
                "status": "Success",
                "message": "Tarjeta agregada correctamente"
            }
        )
    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error al agregar la tarjeta: {str(e)}"
            }
        ), 500
        
def actualizar_tarjeta_controller(data):
    numero_antiguo = data.get("numero_antiguo")
    numero = data.get("numero")
    fecha_vencimiento = data.get("fecha_vencimiento")
    codigo_seguridad = data.get("codigo_seguridad")
    tipo = data.get("tipo")
    
    if not all([numero, fecha_vencimiento, codigo_seguridad, tipo]):
        return jsonify(
            {
                "stataus": "Error",
                "message": "Actualizar TODOS los campos"
            }
        )
    
    if not numero_antiguo:
        return jsonify(
            {
                "status": "Error",
                "message": "Proporcionar número antiguo de la tarjeta para actualizar"
            }
        ), 400
    try:
        actualizar_tarjeta(numero_antiguo, numero, fecha_vencimiento, codigo_seguridad, tipo)
        return jsonify(
            {
                "status": "Success",
                "message": "Tarjeta actualizada correctamente"
            }
        )
    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error al actualizar la tarjeta: {str(e)}"
            }
        ), 500