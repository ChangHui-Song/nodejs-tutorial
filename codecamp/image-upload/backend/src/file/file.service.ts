import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  upload({ files }) {
    console.log(files);
    // 구글 스토리지에 파일 업로드하기
    return ['~~~url'];
  }
}
