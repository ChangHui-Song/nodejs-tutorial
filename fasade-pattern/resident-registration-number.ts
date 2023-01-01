import checkValidationRegistationNumber from './phoneNumberChecker';

function coverBackNumber(backNumber: string) {
  return backNumber[0] + '*'.repeat(6);
}

function residentRegistrationNumber(registrationNumber: string): string {
  const numberSplition = registrationNumber.split('-');
  if (!checkValidationRegistationNumber(numberSplition)) return '';
  numberSplition[1] = coverBackNumber(numberSplition[1]);
  return numberSplition.join('-');
}

console.log(residentRegistrationNumber('210510-1010101'));
console.log(residentRegistrationNumber('210510-1010101010101'));
console.log(residentRegistrationNumber('2105101010101'));
