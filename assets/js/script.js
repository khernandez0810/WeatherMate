
var currentCity = document.querySelector('#currentcity');
var currentCityTemp = document.querySelector('#currentCityTemp');
var currentCityWind = document.querySelector('#currentCityWind');
var currentCityHumidity = document.querySelector('#currentCityHumidity');
var searchBtn = document.querySelector('#searchbtn');
var currentCityIcon = document.querySelector('#currentCityIcon')

var day1date = document.querySelector('#date1');
var day1Icon = document.querySelector('#icon1');
var day1Temp = document.querySelector('#temp1');
var day1Wind = document.querySelector('#wind1');
var day1Hum = document.querySelector('#hum1');

var day2date = document.querySelector('#date2');
var day2Icon = document.querySelector('#icon2');
var day2Temp = document.querySelector('#temp2');
var day2Wind = document.querySelector('#wind2');
var day2Hum = document.querySelector('#hum2');

var day3date = document.querySelector('#date3');
var day3Icon = document.querySelector('#icon3');
var day3Temp = document.querySelector('#temp3');
var day3Wind = document.querySelector('#wind3');
var day3Hum = document.querySelector('#hum3');

var day4date = document.querySelector('#date4');
var day4Icon = document.querySelector('#icon4');
var day4Temp = document.querySelector('#temp4');
var day4Wind = document.querySelector('#wind4');
var day4Hum = document.querySelector('#hum4');

var day5date = document.querySelector('#date5');
var day5Icon = document.querySelector('#icon5');
var day5Temp = document.querySelector('#temp5');
var day5Wind = document.querySelector('#wind5');
var day5Hum = document.querySelector('#hum5');
var city = document.getElementById('city');

var today = dayjs().format('dddd, MMMM D, YYYY');
var todayDate = document.querySelector('#today'); 
var city1 = document.getElementById('btn1');

function fetchWeather() {
    var city = document.getElementById('city').value;
    console.log(city);
    saveCity();

    var locationQuery = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=afeb5de2076b8a55a907ef83c79b6a96'
    fetch(locationQuery)
        .then(function (response) {
            console.log(response)
            if(response.status !== 200){
                alert("Please Choose a valid City");
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var cityLon = data[0].lon;
            var cityLat = data[0].lat;
     
    var weatherQuery = 'https://api.openweathermap.org/data/2.5/weather?lat=' + cityLat + '&lon=' +  cityLon + '&units=imperial&appid=afeb5de2076b8a55a907ef83c79b6a96'
    fetch(weatherQuery)
        .then(function (response) {
            console.log(response)
            return response.json();

        })
        .then(function (data) {
            console.log(data);
            todayDate.textContent = today;

            var currenticonCode = data.weather[0].icon; 
console.log(currenticonCode);
currentCityIcon.innerHTML = "<img src=http://openweathermap.org/img/wn/"+currenticonCode+"@2x.png>"
          currentCity.textContent = data.name;
          currentCityTemp.textContent = "Temp (F)  " + data.main.temp;
          currentCityWind.textContent = "Wind Speed:  " + data.wind.speed + "  mph";
          currentCityHumidity.textContent = "Humidity:  " + data.main.humidity + "  %";

        });

        var futureWeatherQuery = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon=' + cityLon + '&units=imperial&appid=afeb5de2076b8a55a907ef83c79b6a96';

        fetch(futureWeatherQuery)
        .then(function (response){
            console.log(response)
            return response.json();
        })
        .then(function (data){
            console.log(data);
            day1date.textContent = dayjs().add(1, 'day').format('dddd, MMMM D, YYYY')
            day2date.textContent = dayjs().add(2, 'day').format('dddd, MMMM D, YYYY')
            day3date.textContent = dayjs().add(3, 'day').format('dddd, MMMM D, YYYY')
            day4date.textContent = dayjs().add(4, 'day').format('dddd, MMMM D, YYYY')
            day5date.textContent = dayjs().add(5, 'day').format('dddd, MMMM D, YYYY')

            var day1iconCode = data.list[5].weather[0].icon; 
            var day2iconCode = data.list[13].weather[0].icon; 
            var day3iconCode = data.list[21].weather[0].icon; 
            var day4iconCode = data.list[29].weather[0].icon; 
            var day5iconCode = data.list[37].weather[0].icon; 

            day1Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/"+day1iconCode+"@2x.png>"
            day2Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/"+day2iconCode+"@2x.png>"
            day3Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/"+day3iconCode+"@2x.png>"
            day4Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/"+day4iconCode+"@2x.png>"
            day5Icon.innerHTML = "<img src=http://openweathermap.org/img/wn/"+day5iconCode+"@2x.png>"



            day1Temp.textContent = "Temp: " + data.list[5].main.temp + " (F)";
            day2Temp.textContent = "Temp: " + data.list[13].main.temp  + " (F)";
            day3Temp.textContent = "Temp: " +data.list[21].main.temp  + " (F)";
            day4Temp.textContent = "Temp: " +data.list[29].main.temp  + " (F)";
            day5Temp.textContent = "Temp: " +data.list[37].main.temp  + " (F)";

            day1Wind.textContent = "Wind: " + data.list[5].wind.speed + " mph";
            day2Wind.textContent = "Wind: " + data.list[13].wind.speed  + " mph";
            day3Wind.textContent = "Wind: " + data.list[21].wind.speed  + " mph";
            day4Wind.textContent = "Wind: " + data.list[29].wind.speed  + " mph";
            day5Wind.textContent = "Wind: " + data.list[37].wind.speed  + " mph";

            day1Hum.textContent = "Humidity: " + data.list[5].main.humidity + "%";
            day2Hum.textContent = "Humidity: " +  data.list[13].main.humidity + "%";
            day3Hum.textContent = "Humidity: " +  data.list[21].main.humidity + "%";
            day4Hum.textContent = "Humidity: " +  data.list[29].main.humidity + "%";
            day5Hum.textContent = "Humidity: " +  data.list[37].main.humidity + "%";



        })



    })

function saveCity(){
localStorage.setItem('cities', city);
};

}

    
function setCity(){
    localStorage.getItem('cities', city)
city1.textContent = city.value
}


    searchBtn.addEventListener("click",function(event){
        event.preventDefault();
        fetchWeather();
        setCity();
    })
