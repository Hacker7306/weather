// https://geocoding-api.open-meteo.com/v1/search?name=Berlin
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41
//<i class="fa-thumbprint fa-light fa-paper-plane"></i>
let results = document.getElementById('result')
let city = document.getElementById('cityinput')
let btn = document.getElementById('btn')
let heading = document.getElementById('weather')
let body =  document.getElementsByTagName('body')[0];
let logo = document.getElementById('logo')
let lat;
let long;
let temp;
let time;
let country;
let state;
let timezone;
let isday;
let date;
let humidty;
let maxtemp;
let mintemp;
let uv;
let weather;
let code;
let gif;
let climateicon;
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weathercondition = ['Clear', 'Mist', 'Drizzle', 'Sandstorm', 'Fog', 'Drizzle', 'Rain', 'Snow', 'Intermediate Rain', 'Heavy Rain']
// const weathericon = ['weathericon/clear.png','weathericon/mist.png','weathericon/drizzle.png','weathericon/sand.png','weathericon/fog.png','weathericon/drizzle.png','weathericon/rain.png','weathericon/snow.png','weathericon/inter.png','anime/heavy.gif']
const weathericon = ['anime/clear.gif','anime/mist.gif','anime/drizzle.gif','anime/sand.gif','anime/fog.gif','anime/drizzle1.gif','anime/rain.gif','anime/snow.gif','anime/inter.gif','anime/heavy.gif']
const back = ['alto/1.jpg','alto/7.jpg','alto/9.jpg','alto/10.jpg','alto/11.jpg','alto/12.png','alto/13.jpg','alto/14.jpg','alto/15.jpg','alto/16.jpg','alto/17.jpg','alto/18.jpg','alto/19.jpg','alto/20.jpg','alto/21.jpg']
function getloc() {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city.value}`)
        .then((res) => res.json())
        .then((data) => {
            lat = data.results[0].latitude
            long = data.results[0].longitude
            country = data.results[0].country
            state = data.results[0].admin1
            timezone = data.results[0].timezone
            console.log(lat)
            console.log(long)
            console.log(country)
            console.log(state)
            console.log(timezone)
            console.log(data);
            if (lat) {
                logo.classList.remove('fa-search')
                logo.classList.add('fa-solid')
                logo.classList.add('fa-cog')
                logo.classList.add('fa-spin')  
            }
            getweather();
        })


}
function getweather() {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,uv_index_max,weather_code&current=rain,relative_humidity_2m,apparent_temperature,is_day,showers,wind_speed_10m,wind_direction_10m,surface_pressure`)
        .then((res)=>res.json())
        .then((data) => {
            console.log(data);
            temp = data.current.apparent_temperature;
            isday = data.current.is_day;
            humidty = data.current.relative_humidity_2m;
            let fulltime = data.current.time;
            let a = fulltime.toString();
            time = a.slice(11,16)
            let b = new Date(a.slice(0, 10));
            date = days[b.getDay()];
            wind = data.current.wind_speed_10m;
            maxtemp = Math.round(data.daily.temperature_2m_max[0]);
            console.log(maxtemp)
            mintemp = Math.round(data.daily.temperature_2m_min[0]);
            uv = Math.round(data.daily.uv_index_max[0]);
            let code1 = [];
            code1 = data.daily.weather_code[0];
            console.log(code);
            code = Math.floor(code1 / 10);
            console.log(code);
            weather = weathercondition[code]
            console.log(date, time, fulltime, weather);
            //<i class="fa-solid fa-thumbs-up"></i>

            setTimeout(() => {
                logo.classList.remove('fa-cog')
                logo.classList.remove('fa-spin')
                logo.classList.add('fa-check')
                setTimeout(display, 200);
            },600)
            // display()
            console.log(code);

    })
}
function icons() {
    climateicon = `${weathericon[code]}`
    let len = (back.length)-1;
    console.log(`len:${len}`);
        let rand = Math.floor(Math.random() * len)
    console.log(rand);
    body.style.backgroundImage = `url(${back[rand]})`;
}

function display() {
    heading.classList.remove('weather')
    heading.classList.add('show')
    city.classList.add('disable')
    btn.classList.add('disable')
    results.classList.remove('disable')

    icons()
    let coma = ','
    if (state == null) {
        state = ''
        coma = ''
    }
    let a = city.value.toUpperCase();
    let b = state.toUpperCase();
    if (a == b) {
        state = ''
        coma = ''  
    }
    if (temp > 28) {
        gif = 'anime/hot.gif'
    } else if (temp < 16) {
        gif = 'anime/cold.gif'
    } else {
    gif = 'disable'
        
    }
    heading.style.cursor = 'pointer'
    results.innerHTML = `

    <div class = 'card'>
    <div class = 'left'>
    <div class = 'loc'>${city.value}${coma}${state}</div>
    <h2 class='temper'>${temp}&deg;C<img src="${gif}" class = "hot ${gif}">
    </h2>
    <h4 class='date'>${date} | ${time}</h4>
    <img src="${climateicon}" class ="icons">
    </div>
    <div class = "right">
    <h3>weather : ${weather}</h3>
    <h3>max temp : ${maxtemp}&deg;C</h3>
    <h3>min temp : ${mintemp}&deg;C</h3>
    <h3>humidity : ${humidty}%</h3>
    <h3>wind speed : ${wind} Km/h </h3>
    <h3>Uv index : ${uv}</h3>
    </div>
    </div>

    `
    heading.addEventListener('click',resetall)

}

function resetall() {
    heading.style.cursor = 'text'
    heading.classList.add('weather')
    heading.classList.remove('show')
    results.classList.add('disable')
    city.classList.remove('disable')
    btn.classList.remove('disable')
    city.value = ''
    body.style.backgroundImage = ``;
    logo.classList.add('fa-search')
    logo.classList.remove('fa-check')  

}
btn.addEventListener('click', getloc)