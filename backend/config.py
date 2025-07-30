import psycopg2

def get_postgres_connection():
    try:
        connection = psycopg2.connect(
            host="localhost",
            port=5432,
            dbname="mystreamingapp",
            user="myuser",
            password="mypassword"
        )
        print("Conexión exitosa!!")
        return connection
    
    except psycopg2.Error as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None