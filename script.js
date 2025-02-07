const geoApiKey = "a2af729752msh9113f9879905b99p1b5c20jsn645e7f4e6bc5"; // Replace with your GeoDB API key
const weatherApiKey = "1d0d7c16f7eb396a653d359fea36b92f"; // Replace with your OpenWeather API key

// Fetch city suggestions
function fetchCitySuggestions() {
    const query = document.getElementById("cityInput").value;
    if (query.length < 2) return; // Start fetching after 2 characters

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5`;

    fetch(url, {
        method: "GET",
        headers: {
            "X-RapidAPI-Key": geoApiKey,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        const suggestions = document.getElementById("suggestions");
        suggestions.innerHTML = ""; // Clear previous suggestions

        data.data.forEach(city => {
            let li = document.createElement("li");
            li.textContent = `${city.city}, ${city.countryCode}`;
            li.onclick = () => {
                document.getElementById("cityInput").value = city.city;
                suggestions.innerHTML = ""; // Hide suggestions
            };
            suggestions.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching cities:", error));
}

// Fetch Weather Data
function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

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
