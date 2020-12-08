function displayTemperature(response){
    console.log (response.data);
let temperatureElement =document.querySelector("#current-temp");
let cityElement =document.querySelector("#city");
let descriptionElement =document.querySelector("#current-desc");
let humidityElement =document.querySelector("#humidity");
let windElement =document.querySelector("#wind");
let pressureElement =document.querySelector("#pressure");
let feelsElement =document.querySelector("#feels-like-deegre");

temperatureElement.innerHTML=Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=response.data.wind.speed;
pressureElement.innerHTML=Math.round(response.data.main.temp_max);
feelsElement.innerHTML=Math.round(response.data.main.feels_like);
}


let apiKey ="f36e45e370221a0b671266843fbab2eb";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=prague&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);