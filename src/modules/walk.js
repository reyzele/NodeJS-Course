const fs = require('fs');
const util = require('util');
const readDir = util.promisify(fs.readdir);
const asyncStat = util.promisify(fs.stat);

const walk = function (dir, done, callback) {
  readDir(dir)
    .then(data => {
      let i = 0;

      const next = function () {
        let filePath = data[i++];
        if (!filePath) return done(null);

        filePath = dir + '/' + filePath;
        asyncStat(filePath)
          .then(stat => {
            if (stat && stat.isDirectory()) {
              walk(filePath, function (_) {
                next();
              }, callback);
            } else {
              callback(filePath, next);
            }
          });
      };

      next();
    });
};

module.exports = walk;
