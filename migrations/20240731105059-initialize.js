'use strict';

var dbm;
var type;
var seed;
var fs = require('fs');
var path = require('path');
var Promise;



/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};
require('dotenv').config();
exports.up = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20240731105059-initialize-up.sql');
  
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
      if (err) return reject(err);
      console.log('Read SQL data: ' + data);
      
      db.runSql(data, function(err) {
        if (err) return reject(err);
        console.log('Migration up executed successfully.');
        resolve();
      });
    });
  });
};


exports.down = function(db) {
  var filePath = path.join(__dirname, 'sqls', '20240731105059-initialize-down.sql');
  
  return new Promise(function(resolve, reject) {
    fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
      if (err) return reject(err);
      console.log('Read SQL data for down migration: ' + data);
      
      db.runSql(data, function(err) {
        if (err) return reject(err);
        console.log('Migration down executed successfully.');
        resolve();
      });
    });
  });
};

exports._meta = {
  "version": 1
};
