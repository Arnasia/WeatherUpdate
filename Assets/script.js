let city = document.getElementById("enter-city");
let searchBtn = document.getElementById("search-button");
let searchedCity = document.getElementById("city-name");
let currentWeather = document.getElementById("today-weather");

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
        
      })    

}

    searchBtn.addEventListener("click", function () {
        let citySearch = city.value;
        theWeather(citySearch);
        searchHistory.push(citySearch);
        
    })

    
