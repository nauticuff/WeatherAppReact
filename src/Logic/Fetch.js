
//Obtains unparsed weather data for current day
const getCurrentWeather = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e92049667f7b9c84ccc3a419657fb86a`);
    const data = await response.json();
    return data;
}

//Obtains uparsed weather data for next 5 days
const getForecastWeather = async (lat, lon) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e92049667f7b9c84ccc3a419657fb86a`);
    const data = await response.json();
    return data;
}

export { getCurrentWeather, getForecastWeather }

