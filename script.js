const searchinput = document.getElementById("input1");
const searchbtn = document.getElementById("btn");
async function checkweather(city,ans) {
    const apikey = "09e79eaf2984514c8c52f6e965117b8e"
    const apiurl = ans ==='°C'?"https://api.openweathermap.org/data/2.5/weather?units=metric&q=":"https://api.openweathermap.org/data/2.5/weather?units=standard&q=";
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").innerHTML = "Invalid City Name";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        const data = await response.json();

        document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}${ans}`;

        document.querySelector(".desc").innerHTML = (data.weather[0].description)[0].toUpperCase() + data.weather[0].description.slice(1);
        document.querySelector(".temp2").innerHTML = data.name;

        document.querySelector(".wind").innerHTML = `${data.wind.speed}Km/h`;

        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;

        document.querySelector("#icon").src = `images/${(data.weather[0].main).toLowerCase()}.png`;

       
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
        const answer=document.getElementById("weather1");
        checkweather(searchinput.value,answer.value);
        
    }
    
    

})


