const sendMsgBtn = document.getElementById('send-msg');
const socket = io('http://localhost:3000');
socket.on('connection');

socket.on('message', (data) => {
    const name = document.querySelector('.name');
    const text = document.querySelector('.msg-text')
    const date = document.querySelector('small');

    name.innerHTML = 'temp-name';
    text.innerHTML = data;
    date.innerHTML = 'temp-date';

})
const sendMsg = () => {
    const messageBox = document.querySelector('#msg-box');
    const message = messageBox.value;
    socket.emit('message', message);
}

// When button is clicked, execute sendMsg function
sendMsgBtn.addEventListener('click', sendMsg);
