import axios from 'axios';

export async function myAsyncAwait() {
  const randomNumberRequest = await axios.get(
    'http://numbersapi.com/random?min=1&max=200'
  );
  const randomNumber = randomNumberRequest.data.split(' ')[0];
  console.log(`randomNumber: ${randomNumber}`);

  const randomPostRequest = await axios.get(
    `http://koreanjson.com/posts/${randomNumber}`
  );
  const userIdOfRandomPost = randomPostRequest.data.UserId;
  console.log(`userIdOfRandomPost: ${userIdOfRandomPost}`);

  const allPostsOfUser = await axios.get(
    `http://koreanjson.com/posts?userId=${userIdOfRandomPost}`
  );
  const postTitles = allPostsOfUser.data.map((post) => post.title);
  console.log(`postTitles: ${postTitles}`);
}
