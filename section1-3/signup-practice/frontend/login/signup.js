// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex';
  const phoneNumber1 = document.querySelector('#PhoneNumber01').value;
  const phoneNumber2 = document.querySelector('#PhoneNumber02').value;
  const phoneNumber3 = document.querySelector('#PhoneNumber03').value;
  const phoneNumber = { phone: phoneNumber1 + phoneNumber2 + phoneNumber3 };

  const result = await axios.post(
    'http://localhost:3000/tokens/phone',
    phoneNumber
  );
  console.log(result);
};

// 회원 가입 API 요청
const submitSignup = async () => {
  const userInfo = document.querySelectorAll('.SignupInput');
  const user = {
    name: userInfo[0].value,
    personal: `${userInfo[1].value}-${userInfo[2].value}`,
    phone: userInfo[3].value + userInfo[4].value + userInfo[5].value,
    favorite: userInfo[6].value,
    email: userInfo[7].value,
    password: userInfo[8].value,
  };
  console.log(user);
  const result = await axios.post('http://localhost:3000/users', { user });
  console.log(result);
};
