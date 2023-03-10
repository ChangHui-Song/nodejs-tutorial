import { myAsyncAwait } from './asynchronous/async-await.example';
import { myCallback } from './asynchronous/callback.example';
import { myPromise } from './asynchronous/promise.example';

async function main() {
  myCallback();
  myPromise();
  myAsyncAwait();
}

main();
