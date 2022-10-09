const socket = io()

const name = prompt('ismingizni kirgazing')
const input = document.getElementById("input")

let h3 = document.createElement('h3')
h3.innerText += 'You joined'
div.appendChild(h3)
socket.emit('new-user', name)


socket.on('new-user-joined', newuser => {
    let h3 = document.createElement('h3')
    h3.innerText += `${newuser} joined`
    div.appendChild(h3)
    console.log(newuser);
})
// let message = input.value 


form.addEventListener('submit', (e) => {
    e.preventDefault()  
    let h4 = document.createElement('h4')
    h4.innerText +=`You: ${input.value} `
    div.appendChild(h4)

    socket.emit('new-message', {message: input.value, sender: name})
    input.value = ""
})

socket.on('new-user-message', ({sender, message}) => {
    let h4 = document.createElement('h4')
    h4.innerText += `${sender}:  ${message}`
    div.appendChild(h4)
})

input.addEventListener('keyup', () => {
    socket.emit('user-typing', {sender: name} )
})

let h4_typing = document.createElement('h4')

socket.on('typing', ({ sender }) => {
    h4_typing.innerText += `${sender}: typing... `
    div.appendChild(h4_typing)

    if (h4_typing.textContent) {
        setTimeout(() => {
            h4_typing.textContent = ""
        }, 1000)
    }
})
