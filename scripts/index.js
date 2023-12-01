"use strict"
const cityDropdown = document.getElementById('cityDropdown')
const displayDiv=document.getElementById('displayDiv')
window.onload=function(){
    initCityDropdown();

 cityDropdown.addEventListener('change',onCityDropdownChanged)
}





function initCityDropdown(){
 for (let city of cities){
  let theOption = new Option (city.cityName);
  cityDropdown.appendChild(theOption);
 }
}

function onCityDropdownChanged (){
  console.log("onCityDropdownChanged")
let selectedCity= cities.find(city => city.cityName == cityDropdown.value)
let stationLookupUrl = 
`https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;
console.log(stationLookupUrl)
fetch(stationLookupUrl)
.then(response => response.json ())
.then(data => {
    let weatherUrl = data.properties.forecast;
     getWeather(weatherUrl);
})
}



function getWeather (weatherURL){
  console.log(weatherURL)
    fetch(weatherURL)
    .then(response => response.json ())
    .then(data => {
        let forecastArray = data.properties.periods;
       
    displayWeather (forecastArray);
  
    })
    }

function displayWeather (forecastArray){

  console.log(forecastArray)
  clearTable();
 for(let i=0; i< forecastArray.length; i++){

 let periodString = forecastArray[i].name;
 
 let temperatureString = "Temperature " + forecastArray[i].temperature + " " + 
 forecastArray[i].temperatureUnit;
 
 let windsString = "Winds " + forecastArray[i].windDirection + " " + 
 forecastArray[i].windSpeed;
 
 
 let shortForecastString = forecastArray[i].shortForecast
  addRowToTable(periodString, temperatureString, windsString, shortForecastString);
 }
}


function clearTable(){
 displayTable.innerHTML="";
}

function addRowToTable(periodString, temperatureString, windsString, shortForecastString){
  let tableBody = document.createElement('tbody');
    displayTable.appendChild(tableBody);

    let row = tableBody.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.textContent = periodString;
        cell2.textContent = temperatureString;
        cell3.textContent = windsString;
        cell4.textContent = shortForecastString;
    };








