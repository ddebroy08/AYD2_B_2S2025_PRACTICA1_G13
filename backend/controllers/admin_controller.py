from flask import jsonify
from utils.validators import email_existe, safety_password, login
from models.admin_model import insertar_administrador, agregar_contenido, buscar_por_anio


def crear_admin_controller(data):
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
        )
    
    if not safety_password(password):
        return jsonify(
            {
                "status": "Error",
                "message": "La contraseña no es segura"
            }
        )
    
    if email_existe(email):
        return jsonify(
            {
                "status": "Error",
                "message": "El email ya existe, no se puede crear el usuario"
            }
        )
        
    try:
        insertar_administrador(nombre, email, password, nit)
        return jsonify(
            {
                "status": "Success",
                "message": "Administrador creado correctamente"
            }
        ), 201
    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error al crear el administrador: {str(e)}"
            }
        )

def admin_login_controller(data):
    email = data.get("email")
    password = data.get("password")
    
    if not email or not password:
        return jsonify(
            {
                "status": "Error",
                "message": "Email y contraseña son obligatorios"
            }
        )
    return login(email, password)


def agregar_contenido_controller(data):
    categoria = data.get("categoria")
    titulo = data.get("titulo")
    anio = data.get("anio_creacion")
    sinopsis = data.get("sinopsis")
    url = data.get("link_video")    
    descripcion = data.get("descripcion")
    if not all([categoria, titulo, descripcion, anio, sinopsis, url]):
        return jsonify(
            {
                "status": "Error",
                "message": "Faltan campos obligatorios"
            }
        )
    try:
        agregar_contenido(categoria, titulo, descripcion, anio, sinopsis, url)
        return jsonify(
            {
                "status": "Success",
                "message": "Contenido agregado correctamente"
            }
        )
    except Exception as e:
        return jsonify(
            {
                "status": "Error",
                "message": f"Error al agregar contenido: {str(e)}"
            }
        )
