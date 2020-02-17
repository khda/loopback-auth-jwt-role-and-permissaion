INSERT INTO
	main.users
	(username, password)
VALUES
	('Sam', '123'),
	('Cat', 'qwe'),
	('Dog', 'asd');

INSERT INTO
	main.roles
	(name)
VALUES
	('Admin'),
	('Dispatcher'),
	('Driver');

INSERT INTO
	main.permissions
	(name)
VALUES
	('Create'),
	('Read'),
	('Update'),
	('Delete');

INSERT INTO
	main.user_roles
	(user_id, role_id)
VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 2),
	(2, 3),
	(3, 3);

INSERT INTO
	main.role_permissions
	(role_id, permission_id)
VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 4),
	(2, 1),
	(2, 2),
	(2, 3),
	(3, 2);

INSERT INTO
	main.user_permissions
	(user_id, permission_id, allowed)
VALUES
	(1, 1, true),
	(1, 2, true),
	(1, 3, true),
	(1, 4, true),
	(2, 1, true),
	(2, 2, true),
	(2, 3, false),
	(3, 2, true);
