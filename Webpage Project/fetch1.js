var api = 'https://api.aerisapi.com/forecasts/'
var apikey = "'?plimit=1&format=json&&client_id=5lKgtr1AMDRFOxMeTReqp&client_secret=mlHgByr5X4msZveHStafV5ftUbW6Ufbpq4z8OwkP'"
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
    console.log(json)
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


/*

5lKgtr1AMDRFOxMeTReqp

mlHgByr5X4msZveHStafV5ftUbW6Ufbpq4z8OwkP
*/
