const apiKey = "YOUR_OPENWEATHER_API_KEY"; // Replace with your actual API key

function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                document.getElementById("weatherResult").innerHTML = "<p>City not found! Try again.</p>";
                return;
            }

            const { name, sys, main, weather, wind } = data;
            const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString();
            const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString();

            const weatherHTML = `
                <h2>${name}, ${sys.country}</h2>
                <p><strong>Temperature:</strong> ${main.temp}°C (Feels like ${main.feels_like}°C)</p>
                <p><strong>Humidity:</strong> ${main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
                <p><strong>Weather:</strong> ${weather[0].description}</p>
                <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">
                <p><strong>Sunrise:</strong> ${sunriseTime} | <strong>Sunset:</strong> ${sunsetTime}</p>
            `;
            document.getElementById("weatherResult").innerHTML = weatherHTML;
        })
        .catch(error => console.error("Error fetching data:", error));
}
