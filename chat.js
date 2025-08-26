const input_send = document.querySelector('#input')
const send_button = document.querySelector('.send-button')
const chat = document.querySelector('.chat')
const input_field = document.querySelector('.input-field')
const main = document.querySelector('.main')
const menu = document.querySelector('.menu')
const pull_out_menu = document.querySelector('.pull-out-menu')
const theme_divs = document.querySelectorAll('.settings-theme div')

function getTime() {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}
    
function applyTheme(themeName) {
  const root = document.documentElement;
      
  if (themeName === 'dark-theme') {
    root.style.setProperty('--blue', '#1e1f24');
    root.style.setProperty('--light-blue', '#4e5963');
    root.style.setProperty('--light-blue-transparent', '#4e596360');
    root.style.setProperty('--black', '#fff');
  } else {
    root.style.setProperty('--blue', '#6F79E9');
    root.style.setProperty('--light-blue', '#A2AAFC');
    root.style.setProperty('--light-blue-transparent', '#A2AAFC60');
    root.style.setProperty('--black', '#000');
  }
      
  theme_divs.forEach(div => {
    div.classList.remove('active');
    if (div.className === themeName) {
    div.classList.add('active');
    }
  });
    
  localStorage.setItem('selectedTheme', themeName);
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

const position_Input = input_field.getBoundingClientRect()
const Y_input = position_Input.top
const HEIGHT_input = position_Input.height

const height_added_to_y = Y_input + HEIGHT_input

const height_main = main.offsetHeight

if (Math.round(height_added_to_y) == document.documentElement.clientHeight) {
  //ничего не делать
} else {
   main.style.flex = `0 0 ${document.documentElement.clientHeight - HEIGHT_input - document.querySelector('header').offsetHeight}px`;
}

menu.onclick = () => {
  menu.classList.toggle('click')
  pull_out_menu.classList.toggle('show')
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('selectedTheme') || 'light-theme';
  applyTheme(savedTheme);
});

theme_divs.forEach((div) => {
  div.addEventListener('click', () => {
    applyTheme(div.className);
  });
});
