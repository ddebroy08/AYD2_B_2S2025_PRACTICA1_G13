from flask import jsonify
from utils.validators import email_existe, safety_password, login


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
        # Aquí iría la lógica para crear el administrador
        pass
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

