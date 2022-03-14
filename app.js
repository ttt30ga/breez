import * as icon from './icons.js';

document.addEventListener('readystatechange', (event) => {
	if (event.target.readyState === 'complete') {
		initApp();
	}
});

const API_KEY = '5a7b2510914a22fd7ba68845a8b74973';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Date
let date = new Date();
let month = MONTHS[date.getMonth()];
let day = DAYS[date.getDay()];
let dayShort = DAYS_SHORT[date.getDay()];

const initApp = () => {
	function getGeolocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					let lat = position.coords.latitude;
					let lon = position.coords.longitude;

					getWeatherData(lat, lon).then((data) => {
						document.getElementById('hourly-weather').innerHTML = '';
						document.getElementById('daily-weather').innerHTML = '';
						populateCurrentData(data);
						populateForecastData(data);
						getReverseGeocodingData(lat, lon);
					});
				},
				(error) => {
					switch (error.code) {
						case error.PERMISSION_DENIED:
							x.innerHTML = 'User denied the request for Geolocation.';
							break;
						case error.POSITION_UNAVAILABLE:
							x.innerHTML = 'Location information is unavailable.';
							break;
						case error.TIMEOUT:
							x.innerHTML = 'The request to get user location timed out.';
							break;
						case error.UNKNOWN_ERROR:
							x.innerHTML = 'An unknown error occurred.';
							break;
					}
				}
			);
		}
	}

	getGeolocation();

	const getWeatherData = async (lat, lon) => {
		try {
			const weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
			const response = await fetch(weather);
			const data = await response.json();
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	const getDirectGeocodingData = async (city) => {
		try {
			const location = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${API_KEY}`;
			const response = await fetch(location);
			const data = await response.json();
			let lat = data[0].lat;
			let lon = data[0].lon;
			getWeatherData(lat, lon).then((data) => {
				document.getElementById('hourly-weather').innerHTML = '';
				document.getElementById('daily-weather').innerHTML = '';
				populateCurrentData(data);
				populateForecastData(data);
				getReverseGeocodingData(lat, lon);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const getReverseGeocodingData = async (lat, lon) => {
		try {
			const location = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
			const response = await fetch(location);
			const data = await response.json();
			let cityName = data[0].name;
			getWeatherData(lat, lon, cityName).then((data) => {
				populateCurrentData(data, cityName);
			});
		} catch (err) {
			console.log(err);
		}
	};

	// Search
	let searchForm = document.getElementById('searchForm');
	let search = document.getElementById('search');

	searchForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const city = search.value;

		if (city) {
			getDirectGeocodingData(city);
			search.value = '';
		}
	});

	function populateCurrentData(data, cityName) {
		if (cityName) {
			document.getElementById('date').innerText = month + ', ' + day + ' ' + date.getDate();
			document.getElementById('location').innerText = cityName;
			document.getElementById('description').innerText = capitaliseString(data.current.weather[0].description);
			document.getElementById('temp').innerText = Math.round(data.current.temp) + '°';
			document.getElementById('tempMin').innerText = Math.round(data.daily[0].temp.min) + '°';
			document.getElementById('tempMax').innerText = Math.round(data.daily[0].temp.max) + '°';
			document.getElementById('clouds').innerText = data.current.clouds + '%';
			document.getElementById('wind').innerText = data.current.wind_speed + ' km/h';
			document.getElementById('windDeg').innerText = data.current.wind_deg;
			document.getElementById('humidity').innerText = data.current.humidity + '%';
			document.getElementById('pressure').innerText = data.current.pressure + ' hPa';
			document.getElementById('visibility').innerText = data.current.visibility / 1000 + ' km';
			document.getElementById('dewPoint').innerText = Math.round(data.current.dew_point) + '°';
			document.getElementById('uvi').innerText = data.current.uvi;
			document.getElementById('sunrise').innerText =
				new Date(data.current.sunrise * 1000).getHours() + ':' + new Date(data.current.sunrise * 1000).getMinutes();
			document.getElementById('sunset').innerText =
				new Date(data.current.sunset * 1000).getHours() + ':' + new Date(data.current.sunset * 1000).getMinutes();
		}
	}

	function populateForecastData(data) {
		data.hourly
			.slice(0, 25) // This
			.map((data) => {
				let date = new Date(data.dt * 1000);
				const hourlyList = document.createElement('div');

				hourlyList.innerHTML = `
				<div class="flex vertical hourly details">
					${populateIcon(data.weather[0].id)}
					<h5 class="titleXS secondary">${date.getHours()}</h5>
				</div>
				`;
				document.getElementById('hourly-weather').appendChild(hourlyList);
			});

		data.daily
			.slice(1) // This skip the 1st entry which is the current day
			.map((data) => {
				let date = new Date(data.dt * 1000);
				const dailyList = document.createElement('div');
				dailyList.classList.add('card');

				dailyList.innerHTML = `
				<div class="card-body">
					<div class="flex horizontal details">
						<h5 class="titleS">${DAYS_SHORT[date.getDay()] + ' ' + date.getDate()}</h5>
						${populateIcon(data.weather[0].id)}
					</div>
					<div class="description">
						<h4 class="titleXS-regular tertiary">${capitaliseString(data.weather[0].description)}</h4>
					</div>
					<div class="flex horizontal details space8">
						<h3 class="titleXS secondary">Min</h3>
						<h3 class="titleXS primary">${Math.round(data.temp.min) + '°'}</h3>
					</div>
					<div class="flex horizontal details">
						<h3 class="titleXS secondary">Max</h3>
						<h3 class="titleXS primary">${Math.round(data.temp.max) + '°'}</h3>
					</div>
				</div>
				`;
				document.getElementById('daily-weather').appendChild(dailyList);
			})
			.join('');
	}

	function populateIcon(id) {
		if (id >= 200 && id <= 232) {
			return icon.thunderstorm;
		} else if (id >= 300 && id <= 321) {
			return icon.showerRain;
		} else if (id >= 500 && id <= 504) {
			return icon.rain;
		} else if (id == 511) {
			return icon.snow;
		} else if (id >= 520 && id <= 531) {
			return icon.showerRain;
		} else if (id >= 600 && id <= 622) {
			return icon.snow;
		} else if (id >= 700 && id <= 781) {
			return icon.showerRain;
		} else if (id == 800) {
			return icon.sun;
		} else if (id == 801) {
			return icon.fewClouds;
		} else if (id == 802) {
			return icon.scatteredClouds;
		} else if (id == 803 || id == 804) {
			return icon.brokenClouds;
		}
	}

	function capitaliseString(word) {
		return word.charAt(0).toUpperCase() + word.slice(1);
	}
};
