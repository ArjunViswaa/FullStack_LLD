let target = "Pune";
const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

async function fetchData(target) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=1bd9be4938484432856140041252002&q=${target}&aqi=yes`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        const currentTemp = data.current.temp_c;
        const currentCondition = data.current.condition.text;
        const locationName = data.location.name;
        const localTime = data.location.localtime;
        const conditionEmoji = data.current.condition.icon;
        // DOM code
        form.addEventListener("submit", search);
        updateDOM(currentTemp, locationName, localTime, conditionEmoji, currentCondition );
        //search- callback function
        function search(e) {
            e.preventDefault();
            target = searchField.value;
            fetchData(target);
        }
    } catch (error) {
        console.log(error);
    }
}

fetchData(target);

function updateDOM(temp, locationName, time, emoji, condition) {
    temperatureField.innerText = `${temp}°C`;
    cityField.innerText = locationName;
    emojiField.src = emoji;
    weatherField.innerText = condition;
    const exactTime = time.split(" ")[1];
    const exactdate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactdate).getDay());
    dateField.innerText = `${exactTime} ${exactDay} ${exactdate}`
    console.log(exactDay);
}

function getDayFullName(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Don't Know";
    }
}