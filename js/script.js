
var emptyInput1 = document.getElementById('empty-input1');
var emptyInput2 = document.getElementById('empty-input2');

const searchBtn = document.getElementById('search-button');

const searchCityInput = document.getElementById("search-city");

searchCityInput.addEventListener("keypress", (event) =>{
    if (event.key === "Enter"){
        searchBtn.click();
    }
});

const searchButton = () => {
    const searchCityInput = document.getElementById('search-city');
    const cityName = searchCityInput.value;
    emptyInput1.textContent = "";

    if (cityName === "") {
        emptyInput1.innerHTML = `
        <h4 class = "text-start text-danger mt-3">Please enter a city name to search....
        </h4>
        `;
    }
    searchCityInput.value = "";
    loadSearch(cityName);
}

const loadSearch = async (city) => {
    const api = "08f8fc54e1ca62d09c79db83e6882e82";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`;
    console.log(URL)
    const res = await fetch(URL);
    const data = await res.json();
    displayWeather(data);
}

const displayWeather = (cityWeather) => {
    if (cityWeather.message=== "city not found"){
        emptyInput1.innerHTML = ` <h4 class="text-start text-danger mt-3"> 
        No weather data found ! </h4>
        `;
    }
    var container= document.getElementById('container');
    container.textContent = "";
    const localDate = convertUnixTimeToLocal(cityWeather.dt);
    const sunRiseTime= convertUnixTimeToLocal(cityWeather.sys.sunrise);
    const sunSetTime= convertUnixTimeToLocal(cityWeather.sys.sunset);


    const div = document.createElement("div");


    div.innerHTML = `
        <h4 class="fs-2">${cityWeather.name}, ${cityWeather.sys.country}</h4>
        <h6>${localDate.fullDate}</h6>
        <img src="http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png" alt="">
        <h5 class="fs-1">${cityWeather.main.temp} &deg;C</h5>
        <h5>${cityWeather.weather[0].main}</h5>
        <h5><span class="me-3">Sunrise:
        ${sunRiseTime.time12h}</span> &
        
        <h5><span class="ms-3">Sunset:
        ${sunSetTime.time12h}</span></h5>
        
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