let now = new Date ();
function formatHour (date){
let hour = (date.getHours() < 10 ? "0" : "") + date.getHours();
let minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
formatHour =`${hour}:${minute}`;
return formatHour;
}
function formatDate(timestamp){
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
  let days = ["Sunday","Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];  
  let date = new Date (timestamp);
  let month=months[date.getMonth()];
  let day= days[date.getDay()];
  let currentDate=date.getDate();
formatDate=`${day}, ${currentDate} ${month}`;
return formatDate;
  
}

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

temperatureElement.innerHTML=Math.round(response.data.main.temp);
cityElement.innerHTML=response.data.name;
descriptionElement.innerHTML=response.data.weather[0].description;
humidityElement.innerHTML=response.data.main.humidity;
windElement.innerHTML=response.data.wind.speed;
pressureElement.innerHTML=Math.round(response.data.main.temp_max);
feelsElement.innerHTML=Math.round(response.data.main.feels_like);
dateElement.innerHTML=formatDate (response.data.dt*1000);
hourElement.innerHTML=formatHour (now);
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt",response.data.weather[0].description);
}

function search (city){

    let apiKey ="f36e45e370221a0b671266843fbab2eb";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handelSubmit (event){
    event.preventDefault ();
    let searchTextInput =document.querySelector("#search-text-input");
    search (searchTextInput.value);
}
search("Prague");

//search form
let form =document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);