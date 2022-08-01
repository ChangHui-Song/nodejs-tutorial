// buffer feature
const buffer = Buffer.from('저를 버퍼로 바꿔주세요');
console.log('buffer=>', buffer);
console.log('buffer.length=>', buffer.length);
console.log('buffer.toString()=>', buffer.toString());

// buffer concat
const bufferArray = [
  Buffer.from('띄엄 '),
  Buffer.from('띄엄 '),
  Buffer.from('띄어쓰기'),
];
const buffer2 = Buffer.concat(bufferArray);
console.log('buffer2.toString()=>', buffer2.toString());

// buffer allocation
const emptyBuffer = Buffer.alloc(5);
console.log('emptyBuffer=>', emptyBuffer);
