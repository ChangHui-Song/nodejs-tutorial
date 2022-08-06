const url = require('url');
const querystring = require('querystring');

const parseUrl = url.parse(
  'http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript'
);
console.log('parseUrl:', parseUrl);
const query = querystring.parse(parseUrl.query);
console.log('querystring.parse(parseUrl.query):', query);
console.log('querystring.stringify(query):', querystring.stringify(query));
