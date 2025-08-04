from flask import Flask
from routes.usuario_routes import usuario_bp
from routes.admin_routes import admin_bp
from models.usuario_model import Usuario
import flask_login

app = Flask(__name__)
app.secret_key = 'secret_pass'

login_manager = flask_login.LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return Usuario.get_by_id(user_id)

app.register_blueprint(usuario_bp)
app.register_blueprint(admin_bp)



if __name__ == "__main__":
    app.run(debug=True)
