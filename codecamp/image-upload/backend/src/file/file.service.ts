import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';

@Injectable()
export class FileService {
  async upload({ files }) {
    const waitedFiles = await Promise.all(files);

    const storage = new Storage({
      projectId: process.env.GOOGLE_PROJECTID,
      keyFilename: process.env.GOOGLE_KEYFILE,
    }).bucket(process.env.GOOGLE_BUCKET);

    const promisedFiles = waitedFiles.map((file) => {
      return new Promise((resolve, reject) => {
        file
          .createReadStream()
          .pipe(storage.file(file.filename).createWriteStream())
          .on('finish', () =>
            resolve(`${process.env.GOOGLE_BUCKET}/${file.filename}`),
          )
          .on('error', () => reject('fail'));
      });
    });
    const result = await Promise.all(promisedFiles);

    return result;
  }
}
