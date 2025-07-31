from flask import Blueprint, request
from controllers.usuario_controller import crear_usuario_controller

usuario_bp = Blueprint("usuario", __name__)

@usuario_bp.route("/new-user", methods=["POST"])
def new_user():
    data = request.get_json()
    return crear_usuario_controller(data)