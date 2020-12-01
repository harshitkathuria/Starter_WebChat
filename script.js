const socket = io('http://localhost:3000')
const messsageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What is your name?')
appendMessage('You Joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} joined`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} left`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`, true)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
  messageInput.focus();
})

function appendMessage(msg, onRight = false) {
  const el = document.createElement('div')
  el.innerText = msg
  if(onRight) {
    el.style.textAlign = 'right'
  }
  messsageContainer.append(el)
}