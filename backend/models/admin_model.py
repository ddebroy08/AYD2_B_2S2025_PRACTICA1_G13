from config import get_postgres_connection
import bcrypt, flask_login
from flask import jsonify
from .usuario import Usuario

def insertar_administrador(nombre, email, password, nit, id_rol=2):
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
            hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            hashed_str = hashed.decode('utf-8')
            cursor.execute("""
                INSERT INTO usuario (id_rol, nombre, email, password, nit)
                VALUES (%s, %s, %s, %s, %s)
            """, (id_rol, nombre, email, hashed_str, nit))
            conn.commit()
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
        ), 500
    finally:
        conn.close()
        


def agregar_contenido(categoria, titulo, descripcion, anio, sinopsis, url):
    id_admin = flask_login.current_user.id
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
            # Validar que si sea administrador
            cursor.execute("SELECT id_rol FROM usuario WHERE id = %s", (id_admin,))
            rol = cursor.fetchone()[0]
            if rol == 2:
                #obtener el id de la cateria 
                cursor.execute("SELECT id FROM categoria_contenido WHERE nombre = %s", (categoria,))
                categoria_id = cursor.fetchone()
                if not categoria_id:
                    return jsonify(
                        {
                            "status": "Error",
                            "message": "Categoría no encontrada"
                        }
                    ), 404
                categoria_id = categoria_id[0]
                cursor.execute("""INSERT INTO contenido (id_categoria, titulo, anio_creacion, sinopsis, link_video, descripcion) VALUES (%s, %s, %s, %s, %s, %s)""",
                            (categoria_id, titulo, anio, sinopsis, url, descripcion))
                conn.commit()
                return jsonify(
                    {
                        "status": "Success",
                        "message": "Contenido agregado correctamente"
                    }
                ), 201
            else:
                return jsonify(
                    {
                        "status": "Error",
                        "message": "No tienes permisos para agregar contenido"
                    }
                ), 403
    except Exception as e:
            return jsonify(
                {
                    "status": "Error",
                    "message": f"Error al agregar contenido: {str(e)}"
                }
            ), 500
    finally:
        conn.close()

def obtener_todos_los_videos():
    conn = get_postgres_connection()
    if not conn:
        return jsonify({
            "status": "Error",
            "message": "No se pudo conectar a la base de datos"
        }), 500

    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT c.id_categoria, c.titulo, c.anio_creacion, c.sinopsis, c.link_video, c.descripcion,
                       cc.nombre
                FROM contenido c
                JOIN categoria_contenido cc ON c.id_categoria = cc.id
            """)
            videos = cursor.fetchall()

            if not videos:
                return jsonify({
                    "status": "Success",
                    "message": "No hay videos disponibles"
                }), 200

            video_list = []
            for video in videos:
                video_data = {
                    "titulo": video[1],
                    "anio_creacion": video[2],
                    "sinopsis": video[3],
                    "link_video": video[4],
                    "descripcion": video[5],
                    "categoria": video[6]
                }
                video_list.append(video_data)

            return jsonify({
                "status": "Success",
                "videos": video_list
            }), 200
    except Exception as e:
        return jsonify({
            "status": "Error",
            "message": f"Error al obtener los videos: {str(e)}"
        }), 500
    finally:
        conn.close()

def buscar_por_anio(anio):
    conn = get_postgres_connection()
    if not conn:
        return jsonify({
            "status": "Error",
            "message": "No se pudo conectar a la base de datos"
        })
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT c.id_categoria, c.titulo, c.anio_creacion, c.sinopsis, c.link_video, c.descripcion,
                       cc.nombre
                FROM contenido c
                JOIN categoria_contenido cc ON c.id_categoria = cc.id
                WHERE c.anio_creacion = %s
            """, (anio,))
            videos = cursor.fetchall()

            if not videos:
                return jsonify({
                    "status": "Success",
                    "message": "No hay videos disponibles para el año especificado"
                }), 200

            video_list = []
            for video in videos:
                video_data = {
                    "titulo": video[1],
                    "anio_creacion": video[2],
                    "sinopsis": video[3],
                    "link_video": video[4],
                    "descripcion": video[5],
                    "categoria": video[6]
                }
                video_list.append(video_data)

            return jsonify({
                "status": "Success",
                "videos": video_list
            }), 200
    except Exception as e:
        return jsonify({
            "status": "Error",
            "message": f"Error al obtener los videos por año: {str(e)}"
        }), 500
    finally:
        conn.close()
        
        
def buscar_por_titulo(titulo):
    conn = get_postgres_connection()
    if not conn:
        return jsonify({
            "status": "Error",
            "message": "No se pudo conectar a la base de datos"
        })
    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                SELECT c.id_categoria, c.titulo, c.anio_creacion, c.sinopsis, c.link_video, c.descripcion,
                       cc.nombre
                FROM contenido c
                JOIN categoria_contenido cc ON c.id_categoria = cc.id
                WHERE c.titulo = %s
            """, (titulo,))
            videos = cursor.fetchall()

            if not videos:
                return jsonify({
                    "status": "Success",
                    "message": "No hay videos disponibles para el año especificado"
                }), 200

            video_list = []
            for video in videos:
                video_data = {
                    "titulo": video[1],
                    "anio_creacion": video[2],
                    "sinopsis": video[3],
                    "link_video": video[4],
                    "descripcion": video[5],
                    "categoria": video[6]
                }
                video_list.append(video_data)

            return jsonify({
                "status": "Success",
                "videos": video_list
            }), 200
    except Exception as e:
        return jsonify({
            "status": "Error",
            "message": f"Error al obtener los videos por año: {str(e)}"
        }), 500
    finally:
        conn.close()
        