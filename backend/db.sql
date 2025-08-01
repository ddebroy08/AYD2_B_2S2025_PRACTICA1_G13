CREATE OR REPLACE FUNCTION actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE ROL(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IMG(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    url_img VARCHAR(250),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE USUARIO(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_rol INTEGER NOT NULL,
    id_img INTEGER,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(150) NOT NULL,
    password VARCHAR(200) NOT NULL,
    nit VARCHAR(10) NOT NULL,
    estado VARCHAR(25) CHECK (estado IN ('Inactivo', 'Activo', 'Eliminado')) DEFAULT 'Activo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES ROL(id),
    FOREIGN KEY (id_img) REFERENCES IMG(id)
);

CREATE TABLE TARJETA(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    numero VARCHAR(12) NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    codigo_seguridad VARCHAR(3) NOT NULL,
    tipo VARCHAR(75) NOT NULL CHECK (tipo IN ('Tarjeta de debito', 'Tarjeta de credito')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id)
);
ALTER TABLE tarjeta ALTER COLUMN saldo TYPE DECIMAL(8, 2);
COMMIT;

CREATE TABLE PLAN(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(30) CHECK (nombre IN ('Mensual', 'Bimestral', 'Anual')) DEFAULT 'Mensual',
    precio INTEGER NOT NULL,
    nivel VARCHAR(30) CHECK (nivel IN ('Basico', 'Pro', 'Premium')) DEFAULT 'Basico',
    descripcion VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO PLAN (nombre, precio, nivel, descripcion) VALUES

('Mensual', 120, 'Basico', 'Acceso mensual al contenido básico.'),
('Mensual', 180, 'Pro', 'Acceso mensual al contenido Pro con más funciones.'),
('Mensual', 240, 'Premium', 'Acceso mensual completo sin restricciones.'),


('Bimestral', 216, 'Basico', 'Acceso por 2 meses al contenido básico con 10% de ahorro.'),
('Bimestral', 324, 'Pro', 'Acceso por 2 meses al contenido Pro con 10% de ahorro.'),
('Bimestral', 432, 'Premium', 'Acceso por 2 meses al contenido Premium con 10% de ahorro.'),


('Anual', 1152, 'Basico', 'Acceso anual al contenido básico con 20% de ahorro.'),
('Anual', 1728, 'Pro', 'Acceso anual al contenido Pro con 20% de ahorro.'),
('Anual', 2304, 'Premium', 'Acceso anual completo sin restricciones y con 20% de ahorro.');
COMMIT;

CREATE TABLE SUSCRIPCION(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    id_plan INTEGER NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    estado VARCHAR(25) CHECK( estado IN ('VENCIDO', 'ACTIVO')) DEFAULT 'ACTIVO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id),
    FOREIGN KEY (id_plan) REFERENCES PLAN(id)
);

ALTER TABLE suscripcion
ALTER COLUMN fecha_inicio SET DEFAULT CURRENT_DATE;
ALTER TABLE suscripcion
ALTER COLUMN fecha_vencimiento DROP NOT NULL;
COMMIT;


CREATE TABLE CATEGORIA_CONTENIDO(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(250) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE CONTENIDO(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_categoria INTEGER NOT NULL,
    titulo VARCHAR(50) NOT NULL,
    anio_creacion DATE NOT NULL,
    sinopsis VARCHAR(250) NOT NULL,
    link_video VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria) REFERENCES CATEGORIA_CONTENIDO(id)
);

CREATE TABLE BITACORA_REPRODUCCION(
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_usuario INTEGER NOT NULL,
    id_contenido INTEGER NOT NULL,
    fecha_reproduccion DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO (id),
    FOREIGN KEY (id_contenido) REFERENCES CONTENIDO(id)
);

-- ROL
CREATE TRIGGER trigger_update_rol
BEFORE UPDATE ON ROL
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

-- IMG
CREATE TRIGGER trigger_update_img
BEFORE UPDATE ON IMG
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

-- USUARIO
CREATE TRIGGER trigger_update_usuario
BEFORE UPDATE ON USUARIO
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

-- TARJETA
CREATE TRIGGER trigger_update_tarjeta
BEFORE UPDATE ON TARJETA
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

-- PLAN
CREATE TRIGGER trigger_update_plan
BEFORE UPDATE ON PLAN
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

-- SUSCRIPCION
CREATE TRIGGER trigger_update_suscripcion
BEFORE UPDATE ON SUSCRIPCION
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

-- CATEGORIA_CONTENIDO
CREATE TRIGGER trigger_update_categoria_contenido
BEFORE UPDATE ON CATEGORIA_CONTENIDO
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();

-- CONTENIDO
CREATE TRIGGER trigger_update_contenido
BEFORE UPDATE ON CONTENIDO
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();


COMMIT;


INSERT INTO ROL ( nombre) VALUES ( 'usuario'), ('admin');
commit;


DROP TRIGGER IF EXISTS trigger_update_rol ON ROL;
DROP TRIGGER IF EXISTS trigger_update_img ON IMG;
DROP TRIGGER IF EXISTS trigger_update_usuario ON USUARIO;
DROP TRIGGER IF EXISTS trigger_update_tarjeta ON TARJETA;
DROP TRIGGER IF EXISTS trigger_update_plan ON PLAN;
DROP TRIGGER IF EXISTS trigger_update_suscripcion ON SUSCRIPCION;
DROP TRIGGER IF EXISTS trigger_update_categoria_contenido ON CATEGORIA_CONTENIDO;
DROP TRIGGER IF EXISTS trigger_update_contenido ON CONTENIDO;

DROP TABLE IF EXISTS BITACORA_REPRODUCCION CASCADE;
DROP TABLE IF EXISTS CONTENIDO CASCADE;
DROP TABLE IF EXISTS CATEGORIA_CONTENIDO CASCADE;
DROP TABLE IF EXISTS SUSCRIPCION CASCADE;
DROP TABLE IF EXISTS PLAN CASCADE;
DROP TABLE IF EXISTS TARJETA CASCADE;
DROP TABLE IF EXISTS USUARIO CASCADE;
DROP TABLE IF EXISTS IMG CASCADE;
DROP TABLE IF EXISTS ROL CASCADE;

DROP FUNCTION IF EXISTS actualizar_updated_at() CASCADE;


ALTER TABLE usuario ADD CONSTRAINT unique_email UNIQUE (email);
commit;

SELECT pg_get_serial_sequence('usuario', 'id');
SELECT last_value FROM public.usuario_id_seq;
SELECT MAX(id) FROM usuario;


SELECT id, nombre, email, created_at, updated_at FROM usuario ORDER BY id;

DELETE FROM suscripcion;
commit;
ALTER SEQUENCE suscripcion_id_seq RESTART WITH 1;

SELECT * FROM information_schema.triggers WHERE event_object_table = 'tarjeta';
SELECT current_database();
SELECT current_schema();

SELECT * FROM tarjeta;

ALTER SEQUENCE usuario_id_seq RESTART WITH 1;
