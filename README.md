## nodeJS + Socketio + RabbitMQ 샘플 ##

rocksea(http://rocksea.tistory.com/284) 샘플을 수정.

rocksea는 메시지를 모든 사용자에게 전송하는 예제이고,

본 예제는 두가지의 보다 다양한 예제 제공.

첫 샘플은  사용자 리스트를 보여 주고, 지정된 사용자들에게만 메시지 전송 (app1.js + step1).
두번째 샘플은  사용자 리스트를 보여 주고, 지정된 사용자와 채팅  (app2.js + step2).

## 사전 설치 ##
- npm install amqp
- npm install socket.io
- socket.io의 클라이언트인 socket.io.js파일을 루뜨 디렉토리에 복사

## step1 실행 ##
1. 콘솔에서 node app1.js를 실행
2. 웹브라우저를 2개 실행하여 http://localhost/step1/message.html에 접속
3. 각각 다른 아이디로 접속
4. 사용자 리스트에서 다른 사용자를 지정한뒤 메시지 입력
  
## step2 실행 ##
1. 콘솔에서 node app2.js를 실행
2. 웹브라우저를 2개 실행하여 http://localhost/step2/message.html에 접속
3. 각각 다른 아이디로 접속
4. 사용자 리스트에서 다른 사용자를 더블 클릭하여 채팅창 실행. 
5. 채팅창에서 메시지 입력

license: MIT
