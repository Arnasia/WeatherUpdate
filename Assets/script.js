let APIKey = "84b79da5e5d7c92085660485702f4ce8";
let currentWeather = document.getElementById("today-weather")


function theWeather(cityName) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
     axios.get(queryURL)
     .then(function (response) {

        currentWeather.classList.remove("d-none");

}