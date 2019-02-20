const fs = require('fs');
const path = require('path');
const walk = require('./modules/walk');
const copyFile = require('./modules/copyFile');
const removeFolder = require('./modules/removeFolder');

const inputFolder = process.argv[2];
const outputFolder = process.argv[3];
const isShouldRemoveInputFolder = process.argv[4];

// Проверяет существует ли папка, если нет - создает ее
const checkOrCreateFolder = function (dirName) {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
  }
};

// Вызывается после копирования всех файлов
const done = function (err) {
  if (err) throw err;
  console.log('Все файлы скопированы!');

  if (isShouldRemoveInputFolder) {
    removeFolder(inputFolder);
    console.log('Исходная папка удалена!');
  }
};

// Вызывается когда walk находит очередной файл
const callback = function (filePath, cb) {
  const fileName = path.basename(filePath);
  const folderName = fileName[0].toUpperCase();
  const newFilePath = path.resolve(outputFolder, `./${folderName}/${fileName}`);
  checkOrCreateFolder(path.resolve(outputFolder, `./${folderName}`));
  copyFile(filePath, path.resolve(outputFolder, newFilePath), cb);
};

// Проверяем передачу параметров
if (!inputFolder || !outputFolder) {
  throw new Error('Не указаны пути к выходной или выходной папке!');
} else {
  // Если пути переданы - чекаем есть ли выходной каталог, иначе создаем его
  checkOrCreateFolder(outputFolder);
}

// Запускаем нашу главную функцию прохода по каталогу
walk(inputFolder, done, callback);
