const chatForm = document.getElementById('chat-form');
const chatMsg = document.querySelector('.msg-body')
const socket = io();

//Message from server
socket.on('message', message => {
    // console.log(message);
    outputMessage(message);
})

// Message Submit
chatForm.addEventListener('submit', (e) => {
    // Prevent page from refreshing
    e.preventDefault();
    // Get Message Text
    const msg = e.target.elements.msg.value;
    //emitting the message to the server
    socket.emit('chatMessage', msg)

    // Clear input field & focus once sent
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('msg-body');
    div.innerHTML = `
    <p class="name">${message.username} @ <span>${message.time}</span></p>
    <p class="msg-text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-list').appendChild(div);
}