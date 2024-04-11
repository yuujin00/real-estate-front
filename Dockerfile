# Node.js 이미지를 베이스로 사용
FROM node:latest

# 작업 디렉터리 설정
WORKDIR /app

# 애플리케이션 파일들을 컨테이너로 복사
COPY . /app

# 의존성 설치
RUN npm install

# 빌드
# Node.js의 기본 메모리 제한을 늘립니다.
# NODE_OPTIONS 환경 변수를 사용하여 메모리 제한을 늘립니다.
# max_old_space_size 옵션은 Node.js에서 사용할 최대 힙 메모리 크기를 지정합니다.
# 여기에서는 4GB로 설정했습니다. 필요에 따라 조정할 수 있습니다.
RUN NODE_OPTIONS="--max_old_space_size=4096" npm run build

# 런타임 이미지 선택
FROM nginx:alpine

# 빌드 파일을 Nginx 서버의 루트 디렉터리로 복사
COPY --from=0 /app/build /usr/share/nginx/html

# 80 포트 열기
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
