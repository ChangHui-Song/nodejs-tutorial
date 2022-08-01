const EventEmitter = require('events');

const myEvent = new EventEmitter();
myEvent.addListener('event1', () => {
  console.log('event 1');
});
myEvent.on('event2', () => {
  console.log('event 2');
});
myEvent.on('event2', () => {
  console.log('event 2-1');
});
myEvent.once('event3', () => {
  console.log('event 3 (once)');
});

myEvent.emit('event1');
myEvent.emit('event2');
myEvent.emit('event3');
myEvent.emit('event3');

myEvent.on('event4', () => {
  console.log('event 4');
});
myEvent.removeAllListeners('event4');
myEvent.emit('event4');

const listener1 = () => {
  console.log('event 5 (first)');
};
const listener2 = () => {
  console.log('event 5 (second)');
};
myEvent.on('event5', listener1);
myEvent.on('event5', listener2);
myEvent.removeListener('event5', listener2);
myEvent.emit('event5');

console.log(
  "myEvent.listenerCount('event2')=>",
  myEvent.listenerCount('event2')
);
