//Declaração de variaveis e botões
const pomodoroTimer = document.querySelector('#pomodoro-timer')
const startButton = document.querySelector('#pomodoro-start')
const pauseButton = document.querySelector('#pomodoro-pause')
const stopButton = document.querySelector('#pomodoro-stop')
let type = 'Work'
let timeSpentInCurrentSession = 0
let currentTaskLabel = document.querySelector('#pomodoro-clock-task')
// Começar
startButton.addEventListener('click', () => {
  tpomodoro()
})
// Pausar
pauseButton.addEventListener('click', () => {
  tpomodoro()
})
// Parar
stopButton.addEventListener('click', () => {
  tpomodoro(true)
})
//Váriavel para saber se precisso começar,parar ou pausar o temporizador
let clockRun = false

// Em segundos declarando 25 mins
let workSessionDuration = 1500
let currentTimeLeftInSession = 1500
// Em segundos declarando 5 mins
let breakSessionDuration = 300

const tpomodoro= (reset) => {
    if (reset) {
      // Parar o cronometro
    } else {
      if (clockRun === true) {
        // Pausar o cronometro
        clearInterval(clockTimer) // limpando temporizador
        clockRun = false
      } else {
        // começar o cronometro
        clockRun = true
      }
      clockTimer = setInterval(() => {
        // diminuir o tempo restante / aumentar o tempo gasto
        stepDown()
        displayCurrentTimeLeftInSession() // função para exibir temporizador
      }, 1000)
    }
    
  }
//Função para funcionalidade do relogio
  const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession
    let result = ''
    const seconds = secondsLeft % 60 // devolve quantidade de segundos
    const minutes = parseInt(secondsLeft / 60) % 60 //devolve quantidade de minutos
    let hours = parseInt(secondsLeft / 3600) //devolve quantidade de horas
    // adicionar zeros líderes se for menor que 10
    function addLeadingZeroes(time) {
      return time < 10 ? `0${time}` : time
    }
    if (hours > 0) result += `${hours}:`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`
    pomodoroTimer.innerText = result.toString()
  }
  pomodoroTimer.innerText = result
//Função para parar relogio
  const stopClock = () => {
    displaySessionLog(type)
    // 1) redefinir o temporizador que definimos
    clearInterval(clockTimer)
    // 2) atualizar nossa variável para saber que o temporizador está parado
    clockRun = false
    // redefinir o tempo deixado na sessão para o seu estado original
    currentTimeLeftInSession = workSessionDuration
    // atualizar o temporizador exibido
    displayCurrentTimeLeftInSession()
    type = 'Work'
    timeSpentInCurrentSession = 0
  }
//Função para agrupar uma sessão de trabalho com a seção de break
  const stepDown = () => {
    if (currentTimeLeftInSession > 0) {
      // diminuir o tempo restante / aumentar o tempo gasto
      currentTimeLeftInSession--
      timeSpentInCurrentSession++
    } else if (currentTimeLeftInSession === 0) {
        timeSpentInCurrentSession = 0
      // O temporizador acabou -> se o trabalho mudar para quebrar, viceversa
      if (type === 'Work') {
        currentTimeLeftInSession = breakSessionDuration
        displaySessionLog('Work')
        type = 'Break'
      } else {
        currentTimeLeftInSession = workSessionDuration
        type = 'Work'
        displaySessionLog('Break')
      }
    }
    displayCurrentTimeLeftInSession()
  }
  //Função para exibir registro de seção
  const displaySessionLog = (type) => {
    const sessionsList = document.querySelector('#pomodoro-sessions')
    // apêndice li a ele
    const li = document.createElement('li')
    if (type === 'Work') {
        sessionLabel = currentTaskLabel.value ? currentTaskLabel.value : 'Work'
        workSessionLabel = sessionLabel
      } else {
        sessionLabel = 'Break'
      }
    let elapsedTime = parseInt(timeSpentInCurrentSession / 60)
    elapsedTime = elapsedTime > 0 ? elapsedTime : '< 1'
    const text = document.createTextNode(`${sessionLabel} : ${elapsedTime} min`)
    li.appendChild(text)
    sessionsList.appendChild(li)
  }