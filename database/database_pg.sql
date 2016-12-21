CREATE TABLE role
(
    id INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('role_id_seq'::regclass),
    name VARCHAR NOT NULL
);

CREATE TABLE "user"
(
    id INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    email VARCHAR NOT NULL,
    login VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP,
    id_role INTEGER,
    CONSTRAINT user_role__fk FOREIGN KEY (id_role) REFERENCES role (id)
);

CREATE TABLE session
(
    id INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('session_id_seq'::regclass),
    created_at TIMESTAMP DEFAULT now(),
    id_user INTEGER,
    CONSTRAINT session_user_fk FOREIGN KEY (id) REFERENCES "user" (id)
);

CREATE TABLE permission
(
    id INTEGER PRIMARY KEY NOT NULL DEFAULT nextval('permission_id_seq'::regclass),
    name VARCHAR NOT NULL,
    permission VARCHAR NOT NULL
);

CREATE TABLE role_permission
(
    id_role INTEGER NOT NULL,
    id_permission INTEGER NOT NULL,
    CONSTRAINT role_permission_role__fk FOREIGN KEY (id_role) REFERENCES role (id),
    CONSTRAINT role_permission_permission__fk FOREIGN KEY (id_permission) REFERENCES permission (id)
);