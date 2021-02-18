# realtime-chat

## Build and Deploy a Realtime Chat App with Socket.io, Node.js and React.js
 
- Web page for Client : https://602bbff9e592841e55a8141e--real-time-chat-site-leeseungmin.netlify.app/

- Server : https://realtime-chats-app.herokuapp.com


### 필요한 언어 

html,css,javascript,react hooks

### 목적 

원하는 방을 개설한뒤, 한명 이상의 user와 realtime으로 메세지 및 사진 송수신 

### 기능 
1. user name 과 room number을 입력받는다.
2. 해당 room에 중복되는 user name 일시, 오류메세지
3. chatting room 에서는 일반적인 메세지 , 사진 송수신이 가능.
4. 추가적으로 현재 room에 참여한 인원을 보여준다.
5. user의 입장, 퇴장시 서버에서 room에 참여한 전원에게 알림 기능을 제공.
  
  
### 기술

1. Socekt.io
- It can Make it realtime

2. server 
- based on node.js
- express

3. client
- based on React hooks

### npm modules

- server : npm install --save cors nodemon express socket.io

- client : npm install --save react-router react-router-dom socket.io-client react-scroll-to-bottom react-emoji query-string

### Deployment

- server : 'Heroku'

- client : 'Netlify'

### 한계

1. 핸드폰에서 사진 파일을 전송할 시, 서버쪽에서 사진 파일을 처리하지 못하는 것으로 보임.
2. 한번에 많은 사진을 선택해 전송하려고 하는데, input Tag를 동적으로 늘려서 추가하는 것 외에는 생각이 나지 않음. 추후에 개선가능시 개선할 예정.

