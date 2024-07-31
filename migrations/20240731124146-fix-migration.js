'use strict';

var dbm;
var type;
var seed;
var fs = require('fs');
var path = require('path');
var Promise;
var bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function(db) {
  const password = 'sarah'; // Replace with the actual plaintext password
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  return db.runSql(
    'INSERT INTO public.users(user_id, name, username, password) VALUES (?, ?, ?, ?)',
    [11115, 's', 'ss', hashedPassword]
  );
};

exports.down = function(db) {
  return db.runSql('DELETE FROM public.users WHERE user_id = 3');
};

exports._meta = {
  "version": 1
};
