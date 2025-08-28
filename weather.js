// OpenWeather API key
const apiKey = "d0d4d0b7c74afe574e824bbfa295102a";  

async function getWeather(city) {
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    showWeather(data);

  } catch (error) {
    document.getElementById("weather").innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

function showWeather(data) {
  const weatherDiv = document.getElementById("weather");
  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>🌡️ Temp: ${data.main.temp} °C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>☁️ ${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
  `;
}

// Event listener for button
document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  getWeather(city);
})
