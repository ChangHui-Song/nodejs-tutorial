function checkNumberLength(frontNumber: string, backNumber: string): boolean {
  if (frontNumber.length !== 6 || backNumber.length !== 7) {
    console.log('개수를 제대로 입력해주세요.');
    return false;
  }
  return true;
}

function checkNumberGender(genderChecker: number): boolean {
  if (genderChecker < 1 && genderChecker > 4) {
    console.log('성별을 정확하게 입력해주세요.');
    return false;
  }
  return true;
}

function checkValidationRegistationNumber(numberSplition: string[]) {
  if (numberSplition.length !== 2) {
    console.log('구분자가 올바르지 않습니다.');
    return false;
  }
  const [frontNumber, backNumber] = numberSplition;
  if (!checkNumberLength(frontNumber, backNumber)) return false;
  if (!checkNumberGender(parseInt(numberSplition[1][0]))) return false;
  return true;
}

export default checkValidationRegistationNumber;
