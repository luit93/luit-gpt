import bot from './assets/bot.svg'
import user from './assets/user.svg'

const form = document.querySelector('form')
const chatContainer = document.querySelector('#chat-container')

let loadDots;

function loader(element){
    element.textContent = ''

    loadDots = setInterval(()=>{
        element.textContent += '.'

        if(element.textContent === '....'){
            element.textContent = ''
        }
    },300)
}

function typer(element, text){
    let i=0
    let interval = setInterval(()=>{
        if(i<text.length){
            element.innerHTML += text.charAt(i)
            i++
        }
        else{
            clearInterval(interval)
        }
    },20)
}

// generate unique ID for each message div of bot
function generateId(){
    const timeStamp = Date.now()
    const randomNum = Math.random()
    const hexadecStr = randomNum.toString(16)
    return `id-${timeStamp}-${hexadecStr}`
}

function chatBand(isBot, value,id){
    return (
    `
    <div class="wrapper ${isBot && 'bot'}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isBot ? bot : user} 
                      alt="${isBot ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="answer" id=${id}>${value}</div>
            </div>
        </div>
    `
   )
}

const handleOnSubmit= async (e)=>{
    e.preventDefault()
    const data = new FormData(form)

    //user chat band
    chatContainer.innerHTML += chatBand(false,data.get('prompt'))
    //clear input area
    form.reset()

    //bot chat band
    const id= generateId()
    chatContainer.innerHTML += chatBand(true," ",id)

    //scrolling while answer is generated
    chatContainer.scrollTop = chatContainer.scrollHeight
    // current answer div
    const answerDiv = document.getElementById(id)

    loader(answerDiv)


}

form.addEventListener('submit', handleOnSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleOnSubmit(e)
    }
})