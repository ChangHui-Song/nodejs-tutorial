import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

import { getToday } from 'src/commons/libs/utils';

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
        const fname = `${getToday()}/${uuidv4()}/origin/${file.filename}`;
        file
          .createReadStream()
          .pipe(storage.file(fname).createWriteStream())
          .on('finish', () => resolve(`${process.env.GOOGLE_BUCKET}/${fname}`))
          .on('error', () => reject('fail'));
      });
    });
    const result = await Promise.all(promisedFiles);

    return result;
  }
}
