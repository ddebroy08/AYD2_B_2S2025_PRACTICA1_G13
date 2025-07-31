from flask import Flask, jsonify
import psycopg2
from config import get_postgres_connection

app = Flask(__name__)

@app.route("/test-db")
def test_connection():
    conn = get_postgres_connection()
    if not conn:
        return jsonify({"status": "error", "message": "No se pudo conectar a PostgreSQL"}), 500
    try:
        with conn.cursor() as cur:
            cur.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public';
            """)
            tables = cur.fetchall()
        return jsonify({
            "status": "success",
            "tables": [t[0] for t in tables]
        })
    except psycopg2.Error as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    finally:
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)
