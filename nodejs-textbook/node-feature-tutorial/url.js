// searchParams examples
const { url } = require('url');

const myURL = new URL(
  'http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript',
);
// console.log('myURL', myURL);
console.log('myURL.searchParams', myURL.searchParams);
console.log(
  "myURL.searchParams.getAll('category')",
  myURL.searchParams.getAll('category'),
);
console.log("myURL.searchParams.get('limit')", myURL.searchParams.get('limit'));
console.log("myURL.searchParams.has('page')", myURL.searchParams.has('page'));
console.log('myURL.searchParams.keys()', myURL.searchParams.keys());
console.log('myURL.searchParams.values()', myURL.searchParams.values());

myURL.searchParams.append('filter', 'ex3');
myURL.searchParams.append('filter', 'ex5');
console.log(
  "myURL.searchParams.getAll('filter')",
  myURL.searchParams.getAll('filter'),
);

myURL.searchParams.set('filter', 'ex6');
console.log(
  "myURL.searchParams.getAll('filter')",
  myURL.searchParams.getAll('filter'),
);

myURL.searchParams.delete('filter');
console.log(
  "myURL.searchParams.getAll('filter')",
  myURL.searchParams.getAll('filter'),
);

console.log(
  'myURL.searchParams.toString()',
  typeof myURL.searchParams.toString(),
);
console.log('myURL.search', typeof myURL.search);
