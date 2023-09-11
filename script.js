er-APPconst apikey = "09e79eaf2984514c8c52f6e965117b8e"
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchinput = document.getElementById("input1");
const searchbtn = document.getElementById("btn");
async function checkweather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").innerHTML = "Invalid City Name";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        const data = await response.json();

        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;

        document.querySelector(".desc").innerHTML = (data.weather[0].description)[0].toUpperCase() + data.weather[0].description.slice(1);
        document.querySelector(".temp2").innerHTML = data.name;

        document.querySelector(".wind").innerHTML = `${data.wind.speed}Km/h`;

        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;

        document.querySelector("#icon").src = `./images/${data.weather[0].main}.png`;

       
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        console.log(data);

    }

};
searchbtn.addEventListener("click", () => {
    if(searchinput.value==""){
        
        document.querySelector(".error").innerHTML = "Please Enter City Name";
        document.querySelector(".error").style.display = "block";
        
    }else{
        
        checkweather(searchinput.value);
    }
    
    

})


