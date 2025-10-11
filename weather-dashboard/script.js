// script.js
class WeatherDashboard {
    constructor() {
        this.apiKey = '6fdaa89d77712ccd797e0a955a4b810a'; // You'll need to get this from OpenWeatherMap
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        this.recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadRecentSearches();
    }

    initializeElements() {
        this.cityInput = document.getElementById('cityInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.weatherDisplay = document.getElementById('weatherDisplay');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.errorMessage = document.getElementById('errorMessage');
        this.recentSearchesContainer = document.getElementById('recentSearches');
        this.recentList = document.getElementById('recentList');
        
        // Weather display elements
        this.cityName = document.getElementById('cityName');
        this.currentDate = document.getElementById('currentDate');
        this.weatherIcon = document.getElementById('weatherIcon');
        this.temperature = document.getElementById('temperature');
        this.humidity = document.getElementById('humidity');
        this.windSpeed = document.getElementById('windSpeed');
        this.feelsLike = document.getElementById('feelsLike');
        this.weatherDescription = document.getElementById('weatherDescription');
    }

    attachEventListeners() {
        this.searchBtn.addEventListener('click', () => this.searchWeather());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
    }

    async searchWeather() {
        const city = this.cityInput.value.trim();
        
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }

        this.hideError();
        this.showLoading();
        this.hideWeatherDisplay();

        try {
            const weatherData = await this.fetchWeatherData(city);
            this.displayWeather(weatherData);
            this.addToRecentSearches(city);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.hideLoading();
        }
    }

    async fetchWeatherData(city) {
        const url = `${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            } else if (response.status === 401) {
                throw new Error('Invalid API key. Please check your configuration.');
            } else {
                throw new Error('Failed to fetch weather data. Please try again.');
            }
        }

        return await response.json();
    }

    displayWeather(data) {
        this.cityName.textContent = `${data.name}, ${data.sys.country}`;
        this.currentDate.textContent = new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        this.temperature.textContent = `${Math.round(data.main.temp)}°C`;
        this.humidity.textContent = `${data.main.humidity}%`;
        this.windSpeed.textContent = `${data.wind.speed} m/s`;
        this.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        this.weatherDescription.textContent = data.weather[0].description;
        
        // Set weather icon (using emoji for simplicity)
        const icon = this.getWeatherIcon(data.weather[0].main);
        this.weatherIcon.textContent = icon;
        
        this.showWeatherDisplay();
    }

    getWeatherIcon(weatherCondition) {
        const iconMap = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Fog': '🌫️'
        };
        
        return iconMap[weatherCondition] || '🌈';
    }

    addToRecentSearches(city) {
        // Remove if already exists
        this.recentSearches = this.recentSearches.filter(item => 
            item.toLowerCase() !== city.toLowerCase()
        );
        
        // Add to beginning
        this.recentSearches.unshift(city);
        
        // Keep only last 5 searches
        this.recentSearches = this.recentSearches.slice(0, 5);
        
        // Save to localStorage
        localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches));
        
        this.loadRecentSearches();
    }

    loadRecentSearches() {
        if (this.recentSearches.length === 0) {
            this.recentSearchesContainer.classList.add('hidden');
            return;
        }

        this.recentSearchesContainer.classList.remove('hidden');
        this.recentList.innerHTML = '';

        this.recentSearches.forEach(city => {
            const button = document.createElement('button');
            button.textContent = city;
            button.className = 'bg-white bg-opacity-20 text-white px-3 py-2 rounded-lg hover:bg-opacity-30 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white';
            button.addEventListener('click', () => {
                this.cityInput.value = city;
                this.searchWeather();
            });
            this.recentList.appendChild(button);
        });
    }

    showLoading() {
        this.loadingSpinner.classList.remove('hidden');
    }

    hideLoading() {
        this.loadingSpinner.classList.add('hidden');
    }

    showWeatherDisplay() {
        this.weatherDisplay.classList.remove('hidden');
        this.weatherDisplay.classList.add('fade-in');
    }

    hideWeatherDisplay() {
        this.weatherDisplay.classList.add('hidden');
        this.weatherDisplay.classList.remove('fade-in');
    }

    showError(message) {
        this.errorMessage.textContent = message;
        this.errorMessage.classList.remove('hidden');
    }

    hideError() {
        this.errorMessage.classList.add('hidden');
    }
}

// Initialize the dashboard when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new WeatherDashboard();
});