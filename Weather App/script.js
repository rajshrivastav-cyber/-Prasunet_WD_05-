const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherDiv = document.getElementById('weather');

const apiKey = 'your_api_key'; // Replace with your OpenWeatherMap API key

// Event listener for form submission
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent default form submission
    
    const location = locationInput.value.trim();

    // Check if location is provided
    if (location.length === 0) {
        alert('Please enter a location');
        return;
    }

    // Fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            // Display weather information
            const weatherHtml = `
                <h2>Current Weather in ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp} &deg;C</p>
                <p><strong>Weather:</strong> ${data.weather[0].main}</p>
                <p><strong>Description:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            `;
            weatherDiv.innerHTML = weatherHtml;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
});
