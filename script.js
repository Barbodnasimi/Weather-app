    const API_KEY= 'd2cb30e4016f79ff91c03d8f54b50d4b'
    const Temperature = document.querySelector('.temp')
    const City = document.querySelector('.city')
    const Humidity = document.querySelector('.humidity') 
    const WindSpeed = document.querySelector('.wind')
    const SearchInput = document.querySelector('.search input')
    const SearchButton = document.querySelector('.search button')
    const Weathers = document.querySelector('.Weathers')
    const WeatherIcon = document.querySelector('.wheather-icon')
    const weather = document.querySelector('.weather')
    const ErrorMessage = document.querySelector('.error')

function TextChanger(Data) {
    Temperature.innerHTML = Data.Temperature
    City.innerHTML = Data.city
    Humidity.innerHTML = Data.humidity
    WindSpeed.innerHTML = Data.windspeed
    Weathers.innerHTML = Data.weather
}

function IconChanger(Data) {
    ['clouds' , 'rain' , 'Clear' , 'snow' , 'Fog', 'drizzle'].forEach( (wheathers)=> {
        if(wheathers = Data.weather){
            WeatherIcon.src = `images/${wheathers}.png`
        }
    } )
}

// function IconChanger(Data) {
//     if (Data.weather = 'clouds') {
//         WeatherIcon.src = 'images/clouds.png'
//     }

//     else if(Data.weather = 'rain') {
//         WeatherIcon.src = 'images/rain.png'
//     }

//     else if(Data.weather = 'Clear'){
//         WeatherIcon.src = 'images/clear.png'
//     }

//     else if(Data.weather = 'snow'){
//         WeatherIcon.src = 'images/snow.png'
//     }

//     else if(Data.weather = 'Fog'){
//         WeatherIcon.src = 'images/mist.png'
//     }

//     else if(Data.weather = 'drizzle'){
//         WeatherIcon.src = 'images/drizzle.png'
//     }
// }

   async function checkWeather(city) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const response = await res.json()
    if (res.status == 404) {
        ErrorMessage.style.display = 'block'
    }else {
        weather.style.display = 'block'
        ErrorMessage.style.display = 'none'
        let Data =  {
            city: response.name,
            windspeed: Math.ceil(response.wind.speed)+ 'km/h',
            humidity: response.main.humidity+'%',
            Temperature: Math.ceil(response.main.temp)+'°c',
            weather: response.weather[0].main
        }
        IconChanger(Data)
        TextChanger(Data)
        // Temperature.innerHTML = Data.Temperature
        // City.innerHTML = Data.city
        // Humidity.innerHTML = Data.humidity
        // WindSpeed.innerHTML = Data.windspeed
        // Weathers.innerHTML = Data.weather
       }
    }
   
    SearchInput.addEventListener('keypress' , function(e){
      if (e.keyCode === 13) {
   
    let InputValue = SearchInput.value 
    SearchInput.value =''
    checkWeather(InputValue)
      }
   })


   SearchButton.addEventListener('click' , function(){
    let InputValue = SearchInput.value 
    SearchInput.value =''
    checkWeather(InputValue)
   })