'use strict';

var dbm;
var type;
var seed;
var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt');
var dotenv = require('dotenv');
var util = require('util'); // Import the util module

dotenv.config();

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function(db) {
  // Using promisified readFile
  const readFileAsync = util.promisify(fs.readFile); // Use util.promisify
  const filePath = path.join(__dirname, 'sqls', '20240731132502-initialize-up.sql');
  
  return readFileAsync(filePath, {encoding: 'utf-8'})
    .then(data => {
      console.log('Received data:', data);
      return db.runSql(data);
    })
    .then(() => {
      const password = process.env.USER_PASSWORD || 's123';
      const hashedPassword = bcrypt.hashSync(password, 10);
      
      return db.runSql(
        'INSERT INTO public.users(user_id, name, username, password) VALUES ($1, $2, $3, $4)',
        [1111, 'sarah', 'sarahh', hashedPassword]
      );
    });
};

exports.down = function(db) {
  const readFileAsync = util.promisify(fs.readFile);
  const filePath = path.join(__dirname, 'sqls', '20240731132502-initialize-down.sql');

  return readFileAsync(filePath, {encoding: 'utf-8'})
    .then(data => {
      console.log('Received data:', data);
      return db.runSql(data);
    })
    .then(() => {
      return db.runSql('DELETE FROM public.users where user_id =1111');
    });
};

exports._meta = {
  "version": 1
};
