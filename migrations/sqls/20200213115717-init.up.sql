CREATE SCHEMA IF NOT EXISTS main;

CREATE TABLE IF NOT EXISTS main.users (
	id				SERIAL			PRIMARY KEY,
	username	VARCHAR(30)	NOT NULL,
	password	VARCHAR(50)	NOT NULL,
	archived	BOOLEAN			NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS main.roles (
	id					SERIAL			PRIMARY KEY,
	name				VARCHAR(20)	NOT NULL,
	description	VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS main.permissions (
	id					SERIAL			PRIMARY KEY,
	name				VARCHAR(20)	NOT NULL,
	description	VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS main.user_roles (
	id			SERIAL	PRIMARY KEY,
	user_id	INTEGER	REFERENCES main.users(id),
	role_id	INTEGER	REFERENCES main.roles(id)
);

CREATE TABLE IF NOT EXISTS main.role_permissions (
	id						SERIAL	PRIMARY KEY,
	role_id				INTEGER	REFERENCES main.roles(id),
	permission_id	INTEGER	REFERENCES main.permissions(id)
);

CREATE TABLE IF NOT EXISTS main.user_permissions (
	id						SERIAL	PRIMARY KEY,
	user_id				INTEGER	REFERENCES main.users(id),
	permission_id	INTEGER	REFERENCES main.permissions(id),
	allowed				BOOLEAN	NOT NULL DEFAULT TRUE
);
