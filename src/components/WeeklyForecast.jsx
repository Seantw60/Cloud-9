import React from 'react';

function WeeklyForecast({ forecast }) {
	if (!forecast || !forecast.length) return null;

	// Show a simple 5-item forecast (first 5 entries)
	return (
		<div className="weekly-forecast">
			<h3>Weekly Forecast</h3>
			<ul>
				{forecast.slice(0, 5).map((item, i) => (
					<li key={i} className="forecast-item">
						<div className="date">{new Date(item.dt * 1000).toLocaleDateString()}</div>
						<div className="temp">{Math.round(item.main.temp)}°F</div>
					</li>
				))}
			</ul>
			</div>
		);
	}

	export default WeeklyForecast;
