var api = 'http://api.openweathermap.org/data/2.5/weather?q='
var apikey = '&APPID=f726e0bc590a35d4d30cd42d5c079dd1&units=imperial'
var button = document.getElementById('submit')
var input = document.getElementById('search')


const current = document.querySelector('.current')


button.addEventListener('click',function(){
var url = api +input.value+apikey
console.log(url)

fetch(url)
  .then((response) => {
    if (response.ok) {
      return response.json()
    }
  })
  .then((json) => {
    var section = document.createElement('section')
    var p = document.createElement('p')
    var h2 = document.createElement('h2')
    p.style.textAlign = "center"
    h2.style.marginBottom = "-1em"
    h2.innerText = json.name 
    p.innerText =  " Temperature: " + json.main.temp + " degrees"
    current.appendChild(section)
    section.appendChild(h2)
    section.appendChild(p)
  })

})

