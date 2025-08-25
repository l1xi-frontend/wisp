const input_send = document.querySelector('#input')
const send_button = document.querySelector('.send-button')
const chat = document.querySelector('.chat')


function getTime() {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

input_send.addEventListener('input', () => {
  if (input_send.value.trim() === '') {
    send_button.disabled = true
    send_button.style.cssText = `opacity: 50%`
  } else {
    send_button.disabled = false
    send_button.style.cssText = `opacity: 100%`
  }
})

function sendMessage() {
  let message = document.createElement('span')
  let timeElement = document.createElement('span')
  let container_messege = document.createElement('span')
  
  message.classList.add('my-message')
  timeElement.classList.add('time')
  container_messege.classList.add('container-messege')
  
  message.textContent = input_send.value.trim()
  timeElement.textContent = getTime()
  
  chat.append(container_messege)
  container_messege.append(message)
  container_messege.append(timeElement)
  
  
  input_send.value = ''
  send_button.disabled = true
  send_button.style.cssText = `opacity: 50%`
  
}

send_button.addEventListener('click', sendMessage)

input_send.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !send_button.disabled) {
    sendMessage()
  }
})

