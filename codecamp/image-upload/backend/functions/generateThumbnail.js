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

  if (event.name.includes('thumb/')) return;

  const storage = new Storage().bucket(event.bucket);
  const [prefix, postfix] = event.name.split('/origin/');

  const resizedfilesPromise = [
    { size: 240, fname: `${prefix}/thumb/s/${postfix}` },
    { size: 360, fname: `${prefix}/thumb/m/${postfix}` },
    { size: 1280, fname: `${prefix}/thumb/l/${postfix}` },
  ].map(
    (data) =>
      new Promise((resolve, reject) => {
        storage
          .file(event.name)
          .createReadStream()
          .pipe(sharp().resize({ width: data.size }))
          .pipe(storage.file(`${data.fname}`))
          .createWriteStream()
          .on('finish', () => resolve())
          .on('error', () => reject());
      }),
  );
  await Promise.all(resizedfilesPromise);
};
