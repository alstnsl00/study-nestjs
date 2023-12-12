const socket = io('http://localhost:3000/chat');
const roomSocket = io('http://localhost:3000/room');
let currentRoom = '';

const nickname = prompt('닉네임을 입력해주세요.');

function sendMessage() {
  if (currentRoom === '') {
    alert('방은 선택해주세요');
    return;
  }
  const msg = $('#message').val();
  const data = { msg, nickname, room: currentRoom };
  $('#chat').append(`<div>나: ${msg}</div>`);
  roomSocket.emit('message', data);
  return false;
}

socket.on('connect', () => {
  console.log('connected');
});

roomSocket.on('message', (data) => {
  console.log(data);
  $('#chat').append(`<div>${data.msg}</div>`);
});

function createRoom() {
  const room = prompt('생성할 방의 이름을 입력해주세요.');
  roomSocket.emit('createRoom', { room, nickname });
}

roomSocket.on('rooms', (data) => {
  $('#rooms').empty();
  data.forEach((room) => {
    $('#rooms').append(
      `<li>${room} <button onclick="joinRoom('${room}')">Join</button</li>`,
    );
  });
});

socket.on('notice', (data) => {
  $('#notice').append(`<div>${data.msg}</div>`);
});

function joinRoom(room) {
  roomSocket.emit('joinRoom', { room, nickname, toLeaveRoom: currentRoom });
  $('#chat').html('');
  currentRoom = room;
}
