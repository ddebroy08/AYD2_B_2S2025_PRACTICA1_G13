from config import get_postgres_connection
import bcrypt


def email_existe(email):
    conn = get_postgres_connection()
    with conn.cursor() as cursor:
        conn = get_postgres_connection()
        print(conn.dsn)  # Esto imprime la cadena de conexión usada
        cursor.execute("SELECT * FROM usuario WHERE email = %s", (email,))
        return cursor.fetchone() is not None

def insertar_usuario(nombre, email, password, nit, id_rol=1):
    conn = get_postgres_connection()
    with conn.cursor() as cursor:
        hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
        cursor.execute("""
            INSERT INTO usuario (id_rol, nombre, email, password, nit)
            VALUES (%s, %s, %s, %s, %s)
        """, (id_rol, nombre, email, hashed_pw, nit))
        conn.commit()
    conn.close()