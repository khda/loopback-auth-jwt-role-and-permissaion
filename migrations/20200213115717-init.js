'use strict';

const fs = require('fs');
const path = require('path');
const filename = path.basename(__filename, '.js');

exports.up = function(db, callbackUp) {
	fs.readFile(
		path.join(__dirname, 'sqls', `${filename}.up.sql`),
		'utf-8',
		function(error, data) {
			db.runSql(data, callbackUp);
		},
	);
};

exports.down = function(db, callbackDown) {
	fs.readFile(
		path.join(__dirname, 'sqls', `${filename}.down.sql`),
		'utf-8',
		function(error, data) {
			db.runSql(data, callbackDown);
		},
	);
};
