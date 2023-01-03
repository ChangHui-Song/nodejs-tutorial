export function checkValidationPhone(phoneNumber) {
  if (phoneNumber.length !== 11 && phoneNumber.length !== 10) {
    return false;
  }

  if (phoneNumber.match(/[^0-9]/g)?.length) {
    return false;
  }

  return true;
}

export function getToken() {
  const count = 6;
  if (count === undefined) {
    console.log('count is undefined');
    return null;
  } else if (count <= 0) {
    console.log('count is less then 0');
    return null;
  } else if (count >= 10) {
    console.log('count is greater then 10');
    return null;
  }
  return String(Math.floor(Math.random() * 10 ** count)).padStart(count, '0');
}

export function sendTokenToSMS(phoneNumber, token) {
  console.log('Send SMS to your phone');
  return true;
}
