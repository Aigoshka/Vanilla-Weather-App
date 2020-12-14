let now = new Date ();
function formatHour(date) {
  let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
  let minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  return `${hour}:${minute}`;
}
function formatDate(timestamp) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let date = new Date(timestamp);
  let month = months[date.getMonth()];
  let day = days[date.getDay()];
  let currentDate = date.getDate();
  return `${day}, ${currentDate} ${month}`;
}

function nameForecast() {

let now = new Date;
let extraDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat","Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let days2 = extraDays[now.getDay() + 1];
let days3 = extraDays[now.getDay() + 2];
let days4 = extraDays[now.getDay() + 3];
let days5 = extraDays[now.getDay() + 4];
let days6 = extraDays[now.getDay() + 5];


let daytwo = document.querySelector("#weekday1");
daytwo.innerHTML = `${days2}`;

let daythree = document.querySelector("#weekday2");
daythree.innerHTML = `${days3}`;

let dayfour = document.querySelector("#weekday3");
dayfour.innerHTML = `${days4}`;

let dayfive = document.querySelector("#weekday4");
dayfive.innerHTML = `${days5}`;

let daysix = document.querySelector("#weekday5");
daysix.innerHTML = `${days6}`;

}
nameForecast();


function displayTemperature(response){
let temperatureElement =document.querySelector("#current-temp");
let cityElement =document.querySelector("#city");
let descriptionElement =document.querySelector("#current-desc");
let humidityElement =document.querySelector("#humidity");
let windElement =document.querySelector("#wind");
let pressureElement =document.querySelector("#pressure");
let feelsElement =document.querySelector("#feels-like-deegre");
let dateElement=document.querySelector("#date");
let hourElement=document.querySelector("#current-hour");
let iconElement=document.querySelector("#icon");

celsiusTemperature=Math.round(response.data.main.temp);

temperatureElement.innerHTML=Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=response.data.wind.speed;
pressureElement.innerHTML=Math.round(response.data.main.temp_max);
feelsElement.innerHTML=Math.round(response.data.main.feels_like);
dateElement.innerHTML=formatDate (response.data.dt*1000);
hourElement.innerHTML=formatHour (now);
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].description);
}

function search (city){

    let apiKey ="f36e45e370221a0b671266843fbab2eb";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);

     let extraUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(extraUrl).then(displayExtraDays);
}

function displayExtraDays(response) {
  document.querySelector("#day1").innerHTML = Math.round(response.data.list[7].main.temp);
  document.querySelector("#iconday1").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[7].weather[0].icon}@2x.png`
  );
  document.querySelector("#day2").innerHTML = Math.round(response.data.list[14].main.temp);
  document.querySelector("#iconday2").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[14].weather[0].icon}@2x.png`
  );
  document.querySelector("#day3").innerHTML = Math.round(response.data.list[22].main.temp);
  document.querySelector("#iconday3").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[22].weather[0].icon}@2x.png`
  );
  document.querySelector("#day4").innerHTML = Math.round(response.data.list[30].main.temp);
  document.querySelector("#iconday4").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[30].weather[0].icon}@2x.png`
  );
  document.querySelector("#day5").innerHTML = Math.round(response.data.list[38].main.temp);
  document.querySelector("#iconday5").setAttribute ("src",`http://openweathermap.org/img/wn/${response.data.list[38].weather[0].icon}@2x.png`
  );
}




function handelSubmit (event){
    event.preventDefault ();
    let searchTextInput =document.querySelector("#search-text-input");
    search (searchTextInput.value);
}
search("Prague");

function showPosition(position) {
  let apiKey = "f36e45e370221a0b671266843fbab2eb";
  let apiGeoLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiGeoLocation).then(displayTemperature);
  let apiUrlHourly = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlHourly).then(displayExtraDays);
  console.log(apiUrlHourly);
}
function geoPlace(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
//search form
let form =document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

//geoLocation
let geoButton = document.querySelector("#geo-loc");
geoButton.addEventListener("click", geoPlace);

//F|C
function showTemperatureC(event) {
  event.preventDefault();
  let currentTempElement=document.querySelector("#current-temp");

  currentTempElement.innerHTML = celsiusTemperature;
}
let temperatureC = document.querySelector("#celsius");
temperatureC.addEventListener("click", showTemperatureC);


let celsiusTemperature=null;


function showTemperatureF(event) {
  event.preventDefault();
  let currentTempElement=document.querySelector("#current-temp");
  let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
currentTempElement.innerHTML=Math.round(fahrenheitTemperature);
}
let temperatureF = document.querySelector("#fahrenheit");
temperatureF.addEventListener("click", showTemperatureF);

