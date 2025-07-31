from config import get_postgres_connection
import bcrypt, flask_login


def insertar_administrador(nombre, email, password, nit, id_rol=0):
    conn = get_postgres_connection()
    with conn.cursor() as cursor:
        hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        cursor.execute("""
            INSERT INTO administrador (id_rol, nombre, email, password, nit)
            VALUES (%s, %s, %s, %s, %s)
        """, (id_rol, nombre, email, hashed_pw, nit))
        conn.commit()
        

class Administrador(flask_login.UserMixin):
    def __init__(self, id, email, id_rol):
        self.id = id
        self.email = email
        self.id_rol = id_rol

    @classmethod
    def get_by_id(cls, admin_id):
        conn = get_postgres_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, email, id_rol FROM administrador WHERE id = %s", (admin_id,))
            row = cursor.fetchone()
        conn.close()
        if row:
            return cls(row[0], row[1], row[2])
        return None