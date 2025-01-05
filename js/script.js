
const emptyInput = document.getElementById('empty-input');

const searchBtn = document.getElementById('search-button');

var searchCityInput = document.getElementById("search-city");

searchCityInput.addEventListener("keypress", (event) =>{
    if (event.key === "Enter"){
        searchBtn.click();
    }
});

const searchButton = () => {
    var searchCityInput = document.getElementById('search-city');
    var cityName = searchCityInput.value;
    emptyInput.textContent = "";

    if (cityName === "") {
        emptyInput.innerHTML = 
        `<h4 class = "text-start text-danger mt-2">Please enter a city name to search....
        </h4>
        `;
    }
    searchCityInput.value = "";
    loadSearch(cityName);
}

const loadSearch = async (city) => {
    const api = "08f8fc54e1ca62d09c79db83e6882e82";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    const res = await fetch(URL);
    const data = await res.json();
    displayWeather(data);
}

const displayWeather = (cityWeather) => {
    if (cityWeather.message=== "city not found"){
        emptyInput.innerHTML = ` <h4 class="text-start text-danger mt-3"> 
        No weather data found ! </h4>
        `;
    }
    var container= document.getElementById('container');
    container.textContent = "";
    const localDate = convertUnixTimeToLocal(cityWeather.dt);
    const sunRiseTime= convertUnixTimeToLocal(cityWeather.sys.sunrise);
    const sunSetTime= convertUnixTimeToLocal(cityWeather.sys.sunset);
    
    const cityLongitude = cityWeather.coord.lon;
    const cityLatitude = cityWeather.coord.lat;

    const timeZone = cityWeather.timezone/3600;

    const div = document.createElement("div");
// all connected to div element

    div.innerHTML = `
        <h4 class="fs-2 text-center">${cityWeather.name}, ${cityWeather.sys.country}</h4>
        <h6 class="text-center">${localDate.fullDate}</h6>
        <img class="offset-5 pe-5" src="http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png" 
        alt="">
        <h5 class="fs-1 text-center">${cityWeather.main.temp} &deg;C</h5>
        <h5 class="text-center">${cityWeather.weather[0].main}</h5>
        <h5 class="text-center"><span>Sunrise:
        ${sunRiseTime.time12h}</span> 
                    &
        <span>Sunset:
        ${sunSetTime.time12h}</span>
        </h5>
        <h5 class="text-center"><span>Timezone : ${timeZone}</span></h5>

        <h5 class="fs-2 text-center">City Longitude : ${cityLongitude} & City Latitude : ${cityLatitude}
        </h5>
    `;
    container.appendChild(div);
    
};

loadSearch("Chittagong");

const convertUnixTimeToLocal = (unixTime)=> {
    const milliSeconds = unixTime * 1000;
    const humanDateFormat = new Date (milliSeconds);
    const convertedTimeObj ={
        fullDate : humanDateFormat.toLocaleString("en-US", {
            day: "numeric",
            month: "short",
            year : "numeric"
        }),

        time12h : humanDateFormat.toLocaleString("en-US", {
            hour : "numeric",
            minute : "numeric",
            hour12 : true
        }),

        
    }
    return convertedTimeObj;
};