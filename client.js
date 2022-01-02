import { io } from 'socket.io-client'

const socket = io('http://localhost:8081')

let users = []

const messages = {
  general: [],
  randam: [],
  jokes: [],
  javascript: []
}

socket.emit('join server', 'world');

socket.on('new user', (allUsers) => {
  console.log('test', allUsers)
  users = [...allUsers]
});
const roomName = 'general'
socket.emit('join room', roomName, (message) => {
  // console.log(message)
  messages[roomName] = [...message]
})


socket.emit('send message', {
  content: '여긴 자바스크립트 채널이야2',
  to: 'general',
  sender: 'world',
  chatName: 'general',
  isChannel: 1
})

socket.on('new message', ({ content, chatName, sender }) => {
  console.log(content, chatName, sender)
})

console.log(messages)
// socket.on('message', data => {
//   console.log(data)
// })

// socket.on('greetings', (data1, data2, data3) => {
//   console.log('data1', data1)
//   console.log('data2', data2)
//   console.log('data3', data3)

// })