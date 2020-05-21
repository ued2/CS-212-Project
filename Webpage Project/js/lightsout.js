//timer 
function Timer(elem) {
  var time = 0;
  var interval;
  var start_time;

  function update() {
    time += time_passed()
    var formattedtime = format_time(time)
    elem.textContent = formattedtime
  }

  function time_passed() {
    var now = Date.now()
    var timepassed = now - start_time
    start_time = now
    return timepassed
  }

  function format_time(timeinMilliseconds) {
    var time = new Date(timeinMilliseconds)
    var minutes = time.getMinutes().toString()
    var seconds = time.getSeconds().toString()

    if (minutes.length < 2) {
      minutes = '0' + minutes
    }
    if (seconds.length < 2) {
      seconds = '0' + seconds
    }
    return minutes + ':' + seconds
  }

  this.isOn = false

  this.start = function() {
    if (!this.isOn) {
      interval = setInterval(update, 10)
      start_time = Date.now()
      this.isOn = true
    }
  }
  this.stop = function() {
    if (this.isOn) {
      clearInterval(interval)
      interval = null
      this.isOn = false
    }
  }

  this.reset = function() {
    time = 0
  }

}


//game 

const height = 5
const width = 5

function setupGrid() {
  const squares = document.querySelectorAll('.lightsout-square')

  for (let i = 0; i < squares.length; i++) {
    const row = Math.floor(i / height)
    const col = i % height
    squares[i].style.gridRowStart = row + 1
    squares[i].style.gridColumnStart = col + 1
  }

  fill()
  watch.start()

  
}

function getRandomInt(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getSquare(row, col) {
  return document.querySelector(".lightsout-square" +
    `[style*="grid-row-start: ${row}"]` +
    `[style*="grid-column-start: ${col}"]`)

}

function getAdjacentSquares(row, col) {
  return [
    getSquare(row, col),
    getSquare(row - 1, col),
    getSquare(row + 1, col),
    getSquare(row, col - 1),
    getSquare(row, col + 1)
  ].filter((sqr) => sqr !== null)
}

function toggleSquare(square) {
  square.classList.toggle('js-lightsout-square-on')
}

function squareClicked (e) {
  const row = parseInt(this.style.gridRowStart, 10)
  const col = parseInt(this.style.gridColumnStart, 10)
  for (const square of getAdjacentSquares(row, col)) {
    toggleSquare(square)
  }
}

for (const square of document.querySelectorAll('.lightsout-square')) {
  square.addEventListener('click', squareClicked)     
}

function fill(){
  for (let i = 0; i < 10; i++) {
    const row = getRandomInt(1,6)
    const col = getRandomInt(1,6)
    const square = getSquare(row, col)
    if (square !== null) {
      square.click()

    }
  }
}

function win(){
 for (let row = 1; row < 6; row++){
    for (let col = 1; col < 6; col++){
      const sqr = getSquare(row,col)
      if (sqr.classList.contains('js-lightsout-square-on'))
        {return false}
      }
  }  
  return true
  }

var timer = document.getElementById('lightsout-timer')
var sbtn = document.getElementById('lightsout-newgame-btn')
var check = document.getElementById('lightsout-board')
var watch = new Timer(timer)

sbtn.addEventListener('click', function() {
  if (watch.isOn) {
    watch.reset()
    watch.start() 
    fill()
  }

})

check.addEventListener('click', function(){
  if (win()===true){
    watch.stop()
    watch.reset()
    fill()
    var time = document.getElementById('lightsout-timer').innerText
    alert('Congratiulations You Won!!!\nElasped time:' + time)
    watch.start()
  }
})
 
setupGrid()








