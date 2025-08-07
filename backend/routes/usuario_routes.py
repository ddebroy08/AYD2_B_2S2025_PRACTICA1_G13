from flask import Blueprint, request
from controllers.usuario_controller import crear_usuario_controller,registrar_reproduccion_controller ,obtener_videos_con_suscripcion ,cancelar_suscripcion_controller, usuario_login_controller, actualizar_usuario_controller, subir_foto_controller, agregar_tarjeta_controller, actualizar_tarjeta_controller, agregar_suscripcion_controller, obtener_usuario_actual_controller, get_card_controller
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
        return jsonify({
            "status": "Error",
            "message": "No se recibieron datos"
        }), 400
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


@usuario_bp.route('/add-suscription', methods=['POST'])
@login_required
def get_suscription():
    data = request.get_json()
    if not data:
        return jsonify(
            {
                "status": "Error",
                "message": "No se recibieron datos"
            }
        ), 400
    return agregar_suscripcion_controller(data)


@usuario_bp.route('/current-user', methods=['GET'])
@login_required
def obtener_usuario_actual():
    return obtener_usuario_actual_controller()

@usuario_bp.route('/get-card', methods=['GET'])
@login_required
def get_card():
    return get_card_controller()

@usuario_bp.route('/cancel-subscription', methods=['POST'])
@login_required
def cancel_subscription():
    return cancelar_suscripcion_controller()

@usuario_bp.route('/user/all', methods=['GET'])
@login_required
def get_all_videos():
    return obtener_videos_con_suscripcion()

@usuario_bp.route('/watch/<int:id_contenido>', methods=['POST'])
@login_required
def ver_video(id_contenido):
    return registrar_reproduccion_controller(id_contenido)
