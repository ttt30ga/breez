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

					const getWeatherData = async () => {
						try {
							const weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&units=metric&appid=${API_KEY}`;
							const response = await fetch(weather);
							const data = await response.json();
							return data;
						} catch (err) {
							console.log(err);
						}
					};

					getWeatherData().then((data) => {
						populateData(data);
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

	function populateData(data) {
		document.getElementById('date').innerText = month + ', ' + day + ' ' + date.getDate();
		document.getElementById('location').innerText = data.timezone;
		document.getElementById('description').innerText = data.current.weather[0].description;
		document.getElementById('temp').innerText = Math.round(data.current.temp) + '°';
		document.getElementById('tempMin').innerText = Math.round(data.daily[0].temp.min) + '°';
		document.getElementById('tempMax').innerText = Math.round(data.daily[0].temp.max) + '°';
		document.getElementById('clouds').innerText = data.current.clouds + '%';
		document.getElementById('wind').innerText = data.current.wind_speed + ' km/h';
		document.getElementById('humidity').innerText = data.current.humidity + '%';
		document.getElementById('pressure').innerText = data.current.pressure;
		document.getElementById('sunrise').innerText =
			new Date(data.current.sunrise * 1000).getHours() + ':' + new Date(data.current.sunrise * 1000).getMinutes();
		document.getElementById('sunset').innerText =
			new Date(data.current.sunset * 1000).getHours() + ':' + new Date(data.current.sunset * 1000).getMinutes();

		data.daily
			.slice(1) // This skip the 1 entry which is the current day
			.map((data) => {
				let date = new Date(data.dt * 1000);
				const list = document.createElement('div');
				list.classList.add('card');

				list.innerHTML = `
				<div class="card-body">
					<div class="flex horizontal details">
						<h5 class="titleS">${DAYS_SHORT[date.getDay()] + ' ' + date.getDate()}</h5>
						<svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M8.0033 0.972089C9.66184 0.269133 11.5 1.48649 11.5 3.28785C11.5 4.67695 10.3739 5.80303 8.98482 5.80303L3 5.80303C2.44772 5.80303 2 5.35532 2 4.80303C2 4.25075 2.44772 3.80303 3 3.80303L8.98482 3.80303C9.26935 3.80303 9.5 3.57238 9.5 3.28785C9.5 2.91888 9.12349 2.66953 8.78378 2.81352L8.60236 2.89041C8.09386 3.10593 7.50693 2.86843 7.29141 2.35993C7.07588 1.85144 7.31339 1.2645 7.82188 1.04898L8.0033 0.972089ZM13.32 4.26581C14.5188 3.06697 16.4274 2.96126 17.7513 4.02038C18.5426 4.65343 19 5.61604 19 6.6242C19 8.47544 17.5005 10 15.6361 10L1.5 10C0.947715 10 0.5 9.55228 0.5 9C0.5 8.44772 0.947715 8 1.5 8L15.6361 8C16.3828 8 17 7.384 17 6.6242C17 6.21837 16.8147 5.83237 16.5019 5.58212C15.9738 5.15963 15.2124 5.20179 14.7342 5.68002L14.2071 6.20711C13.8166 6.59763 13.1834 6.59763 12.7929 6.20711C12.4024 5.81658 12.4024 5.18342 12.7929 4.79289L13.32 4.26581ZM5 12C4.44772 12 4 12.4477 4 13C4 13.5523 4.44772 14 5 14L13 14C13.5523 14 14 13.5523 14 13C14 12.4477 13.5523 12 13 12L5 12Z"
								class="icons"
							/>
						</svg>
					</div>
					<div class="description">
						<h4 class="titleXS-regular tertiary">${data.weather[0].description}</h4>
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
				document.getElementById('daily-weather').appendChild(list);
			})
			.join('');
	}

	// const search = () => {
	// 	document.getElementById('go').addEventListener('click', () => {
	// 		let value = document.getElementById('search').value;
	// 		console.log(value);
	// 		return value;
	// 	});
	// };

	// search();
};
