const fs = require('fs').promises;

fs.readdir('./folder')
  .then((dir) => {
    console.log('dir=>', dir);
    return fs.unlink('./folder/newfile.js');
  })
  .then(() => {
    console.log('파일 삭제 성공');
    return fs.rmdir('./folder');
  })
  .then(() => {
    console.log('폴더 삭제 성공');
  })
  .catch((error) => {
    console.error('error=>', error);
  });

fs.unlink('./write.txt')
  .then((file) => {
    console.log('file 삭제 성공');
  })
  .catch((error) => {
    console.error('error=>', error);
  });
