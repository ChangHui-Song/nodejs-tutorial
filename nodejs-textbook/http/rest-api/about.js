async function getUser() {
  const res = await axios.get('./users');
  const users = res.data;
  const list = document.querySelector('#list');
  list.innerHTML = '';
  Object.keys(users).map(function (key) {
    const userDiv = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = users[key];
    userDiv.appendChild(span);
    list.appendChild(userDiv);
  });
}

window.onload = getUser;
