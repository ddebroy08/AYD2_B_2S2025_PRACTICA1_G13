from flask import Blueprint, request
from controllers.usuario_controller import crear_usuario_controller, usuario_login_controller, actualizar_usuario_controller, subir_foto_controller, agregar_tarjeta_controller, actualizar_tarjeta_controller
from flask import jsonify
from utils.validators import logout
from flask_login import login_required

usuario_bp = Blueprint("usuario", __name__)

@usuario_bp.route("/new-user", methods=["POST"])
def new_user():
    data = request.get_json()
    return crear_usuario_controller(data)


@usuario_bp.route('/login', methods=['POST'])
def usuario_login():
    data = request.get_json()
    response = usuario_login_controller(data)
    return jsonify(response)

@usuario_bp.route('/logout', methods=['POST'])
@login_required
def usuario_logout():
    return logout()

@usuario_bp.route('/update-user', methods=['PUT'])
@login_required
def update_user():
    data = request.get_json()
    nombre = data.get("nombre")
    email = data.get("email")
    password = data.get("password")
    nit = data.get("nit")
    return actualizar_usuario_controller(nombre, email, password, nit)

@usuario_bp.route('/add-picture', methods=['POST'])
@login_required
def add_picture():
    data = request.get_json()
    if not data:
        return jsonify(
            {
                "status": "Error",
                "message": "No se recibieron datos"
            }
        ), 400
    return subir_foto_controller(data)

@usuario_bp.route('/add-card', methods=['POST'])
@login_required
def add_card():
    data = request.get_json()
    if not data: 
        return jsonify(
            {
                "status": "Error",
                "message": "No se recibieron datos"
            }
        ), 400
    return agregar_tarjeta_controller(data)

@usuario_bp.route('/update-card', methods=['PUT'])
@login_required
def update_card():
    data = request.get_json()
    if not data:
        return jsonify(
            {
                "status": "Error",
                "message": "No se recibieron datos"
            }
        ), 400
    return actualizar_tarjeta_controller(data)