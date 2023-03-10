import axios from 'axios';

export function myCallback() {
  axios.get('http://numbersapi.com/random?min=1&max=200').then((res) => {
    const randomNumber = res.data.split(' ')[0];
    console.log(`random number: ${randomNumber}`);
    axios.get(`http://koreanjson.com/posts/${randomNumber}`).then((res) => {
      const userId = res.data.UserId;
      console.log(`userId: ${userId}`);
      axios.get(`http://koreanjson.com/posts?userId=${userId}`).then((res) => {
        const postTitles = res.data.map((post) => post.title);
        console.log(`postTitles: ${postTitles}`);
      });
    });
  });
}
