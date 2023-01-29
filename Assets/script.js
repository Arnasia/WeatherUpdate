let city = document.getElementById("enter-city");
let searchBtn = document.getElementById("search-button");
let searchedCity = document.getElementById("city-name");
let currentWeather = document.getElementById("today-weather");
let currentTemp = document.getElementById("temperature");
let currentWind = document.getElementById("wind-speed");
let currentHumidity = document.getElementById("humidity");
let currentIconEl = document.getElementById("current-pic");
let fiveday = document.getElementById("fiveday-header");
let history = document.getElementById("history");
let clearHistory = document.getElementById("clear-history");

let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

let APIKey = "84b79da5e5d7c92085660485702f4ce8";

function theWeather(cityName) {
    let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
    axios.get(queryURL)
        .then(function (response) {

            currentWeather.classList.remove("d-none");

            let currentDate = new Date(response.data.dt * 1000);
            let day = currentDate.getDate();
            let month = currentDate.getMonth() + 1;
            let year = currentDate.getFullYear();
            searchedCity.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";

            let weatherIcon = response.data.weather[0].icon;
            currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
            currentIconEl.setAttribute("alt", response.data.weather[0].description);

            currentTemp.innerHTML = "Temp: " + k2f(response.data.main.temp) + " &#176F";

            currentWind.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

            currentHumidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            
            console.log(currentWind)



            let displayedCity = response.data.id;
            let fivedayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + displayedCity + "&appid=" + APIKey;
            axios.get(fivedayQueryURL)
                .then(function (response) {
                    fiveday.classList.remove("d-none");


                    let fivedayEls = document.querySelectorAll(".forecast");
                    for (i = 0; i < fivedayEls.length; i++) {
                        fivedayEls[i].innerHTML = "";
                        let forecastIndex = i * 8 + 4;
                        let forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                        let forecastDay = forecastDate.getDate();
                        let forecastMonth = forecastDate.getMonth() + 1;
                        let forecastYear = forecastDate.getFullYear();
                        let forecastDateEl = document.createElement("p");
                        forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
                        forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                        fivedayEls[i].append(forecastDateEl);

                        let fivedayWeatherEl = document.createElement("img");
                        fivedayWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                        fivedayWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                        fivedayEls[i].append(fivedayWeatherEl);

                        let fivedayTempEl = document.createElement("p");
                        fivedayTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                        fivedayEls[i].append(fivedayTempEl);

                        let fivedayWindEl = document.createElement("p");
                        fivedayWindEl.innerHTML = "Wind: " + response.data.list[forecastIndex].wind.speed + " MPH";
                        fivedayEls[i].append(fivedayWindEl);


                        let fivedayHumidityEl = document.createElement("p");
                        fivedayHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                        fivedayEls[i].append(fivedayHumidityEl);

                    }


                })
        })



}

searchBtn.addEventListener("click", function () {
    let citySearch = city.value;
    theWeather(citySearch);
    searchHistory.push(citySearch);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

clearHistory.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    renderSearchHistory();
})


function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}


function renderSearchHistory() {
    history.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        let historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function () {
            theWeather(historyItem.value);
        })
        history.append(historyItem);
    }
}

renderSearchHistory();
if (searchHistory.length > 0) {
    theWeather(searchHistory[searchHistory.length - 1]);
}

