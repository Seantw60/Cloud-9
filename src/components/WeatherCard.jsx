export default function Framework() {


function WeeklyForecast({ forecast }) {
  const dailyData = forecast.filter((item, index) => index % 8 === 0).slice(0, 7);

  const getWeatherEmoji = (iconCode) => {
    const code = iconCode.substring(0, 2);
    const emojiMap = {
      '01': '☀️',
      '02': '⛅',
      '03': '☁️',
      '04': '☁️',
      '09': '🌧️',
      '10': '🌦️',
      '11': '⛈️',
      '13': '❄️',
      '50': '🌫️'
    };
    return emojiMap[code] || '☁️';
  };

  return (
    <div className="weekly-forecast">
      {dailyData.map((day, index) => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const emoji = getWeatherEmoji(day.weather[0].icon);

        return (
          <div key={index} className="day-card">
            <p className="day-name">{dayName}</p>
            <div className="weather-emoji">{emoji}</div>
            <p className="day-temp">{temp}°</p>
          </div>
        );
      })}
    </div>
  );
}

export default WeeklyForecast;