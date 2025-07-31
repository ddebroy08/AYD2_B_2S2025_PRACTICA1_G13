from flask import Blueprint, request
from controllers.admin_controller import crear_admin_controller
import flask_login 
from flask_login import login_required


admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/admin", methods=["POST"])
def crear_admin():
    data = request.json
    return crear_admin_controller(data)

