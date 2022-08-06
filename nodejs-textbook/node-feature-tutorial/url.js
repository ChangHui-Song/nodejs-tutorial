// searchParams examples
const url = require('url');

const { URL } = url;
const myURL = new URL(
  'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'
);
console.log('myURL:', myURL);
console.log('url.format(myURL):', url.format(myURL));
console.log('--------------------------------------------------------');
const parseUrl = url.parse(
  'http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor'
);
console.log('parseUrl:', parseUrl);
console.log('url.format(parseUrl):', url.format(parseUrl));
