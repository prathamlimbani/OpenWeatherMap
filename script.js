const apiKey = 'your_api_key_here';  // Replace with your OpenWeatherMap API key
const weatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');
const error = document.getElementById('error');

weatherBtn.addEventListener('click', getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (city === '') {
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);
    cityInput.value = '';
  } catch (error) {
    showError();
  }
}

function displayWeather(data) {
  const cityName = document.getElementById('cityName');
  const weatherDesc = document.getElementById('weatherDesc');
  const temperature = document.getElementById('temperature');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('windSpeed');

  cityName.textContent = `Weather in ${data.name}`;
  weatherDesc.textContent = data.weather[0].description;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  weatherInfo.classList.remove('hidden');
  error.classList.add('hidden');
}

function showError() {
  weatherInfo.classList.add('hidden');
  error.classList.remove('hidden');
}
