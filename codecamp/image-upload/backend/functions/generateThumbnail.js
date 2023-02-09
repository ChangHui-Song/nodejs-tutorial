const { Storage } = require('@google-cloud/storage');
const sharp = require('sharp');

/**
 * Triggered from a change to a Cloud Storage bucket.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.generateThumbnail = async (event, context) => {
  console.log('=======================');
  console.log(`event: ${JSON.stringify(event)}`);
  console.log(`context: ${JSON.stringify(context)}`);
  const { bucket, name } = event;

  if (name.includes('thumb/')) return;

  const newStorage = new Storage().bucket(bucket);
  const originalFile = newStorage.file(name);
  const readStream = originalFile.createReadStream();
  const [prefix, postfix] = name.split('/origin/');

  const resizedfilesPromise = [
    { size: 240, fname: `${prefix}/thumb/s/${postfix}` },
    { size: 360, fname: `${prefix}/thumb/m/${postfix}` },
    { size: 1280, fname: `${prefix}/thumb/l/${postfix}` },
  ].map((data) => {
    const { size, fname } = data;
    const thumbFile = newStorage.file(fname);
    const writeStream = thumbFile.createWriteStream();
    sharp(readStream).resize({ width: size, fit: 'inside' }).pipe(writeStream);
    console.log('======================testline');
    console.log(fname);

    return new Promise((resolve, reject) => {
      writeStream
        .on('finish', () => resolve(fname))
        .on('error', () => reject('resizing error'));
      console.log('===========================testline2');
    });
  });
  return await Promise.all(resizedfilesPromise);
};
