from flask import Blueprint, request, jsonify
from controllers.admin_controller import crear_admin_controller, agregar_contenido_controller
from models.admin_model import obtener_todos_los_videos, buscar_por_anio, buscar_por_titulo
import flask_login 
from flask_login import login_required


admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/new-admin", methods=["POST"])
def new_admin():
    data = request.get_json()
    if not data:
        return jsonify(
            {
                "status": "Error",
                "message": "No se recibieron datos"
            }
        ), 400
    return crear_admin_controller(data)

'''
@admin_bp.route("/login", methods=["POST"])
def crear_admin():
    data = request.json
    return login(data)
'''

@admin_bp.route("/admin/add-video", methods=["POST"])
@login_required
def agregar_video():
    data = request.json
    if not data:
        return jsonify(
            {
                "status": "Error",
                "message": "No se recibieron datos"
            }
        )
    return agregar_contenido_controller(data)

@admin_bp.route("/admin/all", methods=["GET"])
@login_required
def obtener_los_videos():
    return obtener_todos_los_videos()

# LO MANEJA POR LA FECHA COMPLETA, NO POR EL AÑO
# SI QUIEREN LO MODIFICAN
@admin_bp.route("/admin/by-year", methods=["POST"])
@login_required
def obtener_videos_por_anio():
    data = request.json
    anio = data.get("anio")
    if not data:
        return jsonify(
            {
                "status": "Error",
                "message": "No se recibieron datos"
            }
        ), 400
    return buscar_por_anio(anio)

@admin_bp.route("/admin/by-title", methods=["POST"])
@login_required
def obtener_videos_por_titulo():
    data = request.json
    titulo = data.get("titulo")
    if not data:
        return jsonify(
            {
                "status" : "Error",
                "message" : "Debe proporcionar el titulo"
            }
        )
    return buscar_por_titulo(titulo)