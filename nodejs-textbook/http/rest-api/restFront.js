async function getUser() {
  try {
    const res = await axios.get('/users');
    const users = res.data;
    const list = document.querySelector('#list');
    console.log('res:', res);
    list.innerHTML = '';
    Object.keys(users).map(function (key) {
      const userDiv = document.createElement('div');
      const span = document.createElement('span');
      span.textContent = users[key];
      const edit = document.createElement('button');
      edit.textContent = '수정';
      edit.addEventListener('click', async () => {
        const name = prompt('변경할 이름을 입력해 주세요.');
        if (!name) {
          return alert('이름을 반드시 입력하셔야 합니다.');
        }
        try {
          await axios.put('/user/' + key, { name });
          getUser();
        } catch (error) {
          console.error('error=>', error);
        }
      });
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => {
        try {
          await axios.delete('/user/' + key);
          getUser();
        } catch (error) {
          console.error('error=>', error);
        }
      });
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
      console.log('res.data=>', res.data);
    });
  } catch (error) {
    console.error('error=>', error);
  }
}

window.onload = getUser;
document.querySelector('#form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  if (!name) {
    return alert('이름을 입력하세요.');
  }
  try {
    await axios.post('/user', { name });
    getUser();
  } catch (error) {
    console.error('error=>', error);
  }
  e.target.username.value = '';
});
