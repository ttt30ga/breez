document.addEventListener('readystatechange', (event) => {
	if (event.target.readyState === 'complete') {
		initApp();
	}
});

const API_KEY = '5a7b2510914a22fd7ba68845a8b74973';

const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const DAYS = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',
];

// Date
let date = new Date();
let month = MONTHS[date.getMonth()];
let day = DAYS[date.getDay()];

const initApp = () => {
	let city = 'Milan';

	const getData = async () => {
		try {
			const currentData = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
			const response = await fetch(currentData);
			const data = await response.json();
			return data;
		} catch (err) {
			console.log(err);
		}
	};

	getData().then((data) => {
		// Store data
		let location = data.name;
		let description = data.weather[0].description;
		let temp = data.main.temp;
		let temp_min = data.main.temp_min;
		let temp_max = data.main.temp_max;
		let humidity = data.main.humidity;
		let pressure = data.main.pressure;
		let wind = data.wind.speed;
		let clouds = data.clouds.all;
		let sunrise = data.sys.sunrise;
		let sunset = data.sys.sunset;

		// Insert data
		document.getElementById('date').innerText =
			month + ', ' + day + ' ' + date.getDate();
		document.getElementById('location').innerText = location;
		document.getElementById('description').innerText = description;
		document.getElementById('temp').innerText = Math.round(temp) + '°';
		document.getElementById('temp_min').innerText = Math.round(temp_min) + '°';
		document.getElementById('temp_max').innerText = Math.round(temp_max) + '°';
		document.getElementById('clouds').innerText = clouds + '%';
		document.getElementById('wind').innerText = wind + 'km/h';
		document.getElementById('humidity').innerText = humidity + '%';
		document.getElementById('pressure').innerText = pressure;
		document.getElementById('sunrise').innerText =
			new Date(sunrise * 1000).getHours() +
			':' +
			new Date(sunrise * 1000).getMinutes();
		document.getElementById('sunset').innerText =
			new Date(sunset * 1000).getHours() +
			':' +
			new Date(sunset * 1000).getMinutes();
	});

	// const search = () => {
	// 	document.getElementById('go').addEventListener('click', () => {
	// 		let value = document.getElementById('search').value;
	// 		console.log(value);
	// 		return value;
	// 	});
	// };

	// search();
};
